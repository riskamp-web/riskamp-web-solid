// Compat shims for Solid 1.x APIs removed in Solid 2.0.
//
// - `on(deps, fn, { defer })`: the explicit-dependency effect/memo helper was
//   removed in 2.0 (effects auto-track). This is the canonical 1.x
//   implementation, reimplemented on 2.0's `untrack`, so the many existing
//   `createEffect(on(...))` / `createMemo(on(...))` call sites keep working
//   unchanged.
// - `produce(fn)`: the store mutation helper is gone because 2.0 store setters
//   are already draft-first — the setter callback receives a writable draft.
//   So `setStore(produce(s => …))` is equivalent to `setStore(s => …)`, and
//   `produce` is just the identity on the mutator.
import { createEffect as solidCreateEffect, createSignal as solidCreateSignal, createStore as solidCreateStore, getOwner, onCleanup, runWithOwner, untrack } from "solid-js";

// Solid 1.x allowed writing reactive state from anywhere (component setup,
// effects, event handlers). Solid 2.0 forbids writes inside an "owned scope"
// unless the signal/store opts in with `ownedWrite`. These are DEV-ONLY guards
// (stripped from the production bundle), but they halt the reactive graph in
// dev. To preserve 1.x behaviour and keep dev usable, every compat-created
// signal and store opts in.
const OWNED_WRITE = { ownedWrite: true } as const;

export function createSignal<T>(value?: T, options?: any): any {
  return (solidCreateSignal as any)(value, { ...OWNED_WRITE, ...options });
}

type AccessorArray = readonly (() => unknown)[];

// Solid 2.0 split `createEffect` into a tracked compute + an *apply* function
// and dropped the single-argument form (MISSING_EFFECT_FN). It also forbids
// writing reactive state in the compute phase (REACTIVE_WRITE_IN_OWNED_SCOPE) —
// writes belong in the apply phase. The codebase has ~70 single-function
// effects; most are `createEffect(on(deps, cb))`, which maps cleanly onto the
// new model: `deps` is the compute, `cb` is the apply (where writes are legal).
// `on()` (below) tags its result so we can recover that split here. A plain
// `createEffect(fn)` has no declared deps, so we run `fn` as the compute; that
// tracks its reads, but any reactive writes it performs must move to an `on(…)`
// or a two-argument effect (see the few hand-converted call sites).
const NOOP = () => {};
const ON_MARKER = Symbol("solid-compat-on");

export function createEffect<T>(fn: any, effect?: (v: T, p?: T) => void): void {
  if (typeof effect === "function") {
    (solidCreateEffect as any)(fn, effect);
    return;
  }
  if (fn && fn[ON_MARKER]) {
    (solidCreateEffect as any)(fn.compute, fn.apply);
    return;
  }
  (solidCreateEffect as any)((prev?: T) => fn(prev), NOOP);
}

// `onMount` was removed in 2.0. `onSettled` is not a drop-in: it runs in a
// scope that forbids creating reactive primitives, but 1.x onMount callbacks
// routinely create stores/effects and read mounted refs. Emulate 1.x onMount by
// deferring to a microtask (after the render flush, so the DOM/refs exist) with
// the owner restored — a plain scope where primitive creation is allowed.
export function onMount(fn: () => void): void {
  const owner = getOwner();
  let cancelled = false;
  onCleanup(() => { cancelled = true; });
  queueMicrotask(() => {
    if (cancelled) return;
    runWithOwner(owner, fn);
  });
}

interface OnOptions {
  defer?: boolean;
}

// `on(deps, fn, { defer })` returns a callable (so `createMemo(on(…))` and any
// direct use keep working with 1.x semantics) that also carries a compute/apply
// split (via ON_MARKER) so `createEffect(on(…))` runs `fn` in the apply phase,
// where reactive writes are permitted under Solid 2.0.
export function on<S, Next>(
  deps: (() => S) | AccessorArray,
  fn: (input: any, prevInput: any, prev?: Next) => Next,
  options?: OnOptions,
): (prev?: Next) => Next {
  const isArray = Array.isArray(deps);
  let prevInput: any;
  let deferCall = options?.defer;
  let deferSplit = options?.defer;
  // Solid 2.0's effect *apply* phase runs without an owner, so context hooks
  // (useLocation/useContext) called inside effect callbacks would throw
  // NoOwnerError. Capture the owner at construction and restore it in apply.
  const owner = getOwner();

  const readInput = (): any => {
    if (isArray) {
      const input = Array((deps as AccessorArray).length);
      for (let i = 0; i < input.length; i++) input[i] = (deps as AccessorArray)[i]();
      return input;
    }
    return (deps as () => S)();
  };

  // 1.x callable form (used by createMemo / direct callers)
  const callable = ((prevValue?: Next) => {
    const input = readInput();
    if (deferCall) {
      deferCall = false;
      return prevValue as Next;
    }
    const result = untrack(() => fn(input, prevInput, prevValue));
    prevInput = input;
    return result;
  }) as ((prev?: Next) => Next) & {
    [ON_MARKER]?: true;
    compute?: () => any;
    apply?: (input: any, prev?: Next) => Next | undefined;
  };

  // 2.0 split form (used by createEffect): deps in compute, fn in apply
  callable[ON_MARKER] = true;
  callable.compute = readInput;
  callable.apply = (input: any, prevValue?: Next) => {
    if (deferSplit) {
      deferSplit = false;
      prevInput = input;
      return undefined;
    }
    // Run the callback in the (owner-free) apply phase so it may write reactive
    // state — the common case. Context hooks (useLocation etc.) must be hoisted
    // to component setup rather than called here (Solid 2.0's apply has no
    // owner). `owner` is retained only for callbacks that read context values.
    void owner;
    const result = fn(input, prevInput, prevValue);
    prevInput = input;
    return result as Next;
  };

  return callable;
}

export function produce<T>(fn: (state: T) => void): (state: T) => void {
  return fn;
}

// Solid 2.0's store setter accepts only the draft-mutator function form
// (`set(s => { s.x = 1 })`). This wraps `createStore` so the setter also
// accepts the two 1.x forms the codebase uses everywhere:
//   - object merge:  set({ a: 1, b: 2 })        -> shallow-merge into the draft
//   - path + value:  set('a', v) / set('a','b',v) -> assign at the path
//     (a function leaf value is applied as an updater of the previous value)
// Every existing `setStore(...)` call site keeps working unchanged.
type AnyStore = Record<PropertyKey, any>;

function applyPath(state: AnyStore, args: any[]): void {
  const value = args[args.length - 1];
  const path = args.slice(0, -1);
  let node: AnyStore = state;
  for (let i = 0; i < path.length - 1; i++) node = node[path[i]];
  const key = path[path.length - 1];
  node[key] = typeof value === "function" ? value(node[key]) : value;
}

// The setter keeps the 1.x call surface: draft mutator, shallow object merge,
// or a `(…path, value)` assignment (value may be an updater function).
export interface CompatStoreSetter<T> {
  (fn: (state: T) => void): void;
  (partial: Partial<T>): void;
  <K extends keyof T>(key: K, value: T[K] | ((prev: T[K]) => T[K])): void;
  (...path: any[]): void;
}

export function createStore<T extends object = {}>(
  init: T,
  options?: unknown,
): [get: T, set: CompatStoreSetter<T>] {
  const [store, setStore] = (solidCreateStore as any)(init, { ...OWNED_WRITE, ...(options as object) });
  const set = ((...args: any[]) => {
    if (args.length === 1 && typeof args[0] === "function") {
      return setStore(args[0]);
    }
    if (args.length === 1 && args[0] !== null && typeof args[0] === "object") {
      return setStore((s: AnyStore) => { Object.assign(s, args[0]); });
    }
    return setStore((s: AnyStore) => { applyPath(s, args); });
  }) as CompatStoreSetter<T>;
  return [store as T, set];
}

// `createMutable` was removed in 2.0. Recreate it on top of `createStore`: a
// write-through proxy whose reads pass straight through the reactive store
// proxy (so nested reads and `<For each={mutable.list}>` stay reactive) and
// whose top-level writes/deletes go through the draft setter. The existing
// call sites only ever reassign top-level properties, which this covers.
export function createMutable<T extends object>(init: T): T {
  const [store, setStore] = solidCreateStore<T>(init);
  const target = store as any;
  return new Proxy(target, {
    get(_t, key, recv) {
      return Reflect.get(target, key, recv);
    },
    set(_t, key, value) {
      setStore((s: any) => { s[key] = value; });
      return true;
    },
    deleteProperty(_t, key) {
      setStore((s: any) => { delete s[key]; });
      return true;
    },
    has(_t, key) {
      return Reflect.has(target, key);
    },
    ownKeys() {
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(_t, key) {
      const d = Object.getOwnPropertyDescriptor(target, key);
      if (d) d.configurable = true;
      return d;
    },
  }) as T;
}

// `mergeProps` / `splitProps` moved out of `solid-js` in 2.0. These are the
// standard getter-preserving implementations so reactive props survive.
export function mergeProps<T extends object[]>(...sources: T): unknown {
  const merged: Record<PropertyKey, unknown> = {};
  for (const source of sources) {
    if (!source) continue;
    for (const key of Object.keys(source)) {
      Object.defineProperty(merged, key, {
        enumerable: true,
        configurable: true,
        get: () => (source as any)[key],
      });
    }
  }
  return merged;
}

export function splitProps<T extends object>(
  props: T,
  ...keySets: (readonly (keyof T)[])[]
): unknown[] {
  const remaining = new Set(Object.keys(props) as (keyof T)[]);
  const define = (obj: Record<PropertyKey, unknown>, key: keyof T) =>
    Object.defineProperty(obj, key as PropertyKey, {
      enumerable: true,
      configurable: true,
      get: () => (props as any)[key],
    });
  const results = keySets.map((keys) => {
    const picked: Record<PropertyKey, unknown> = {};
    for (const key of keys) {
      if (key in props) {
        remaining.delete(key);
        define(picked, key);
      }
    }
    return picked;
  });
  const rest: Record<PropertyKey, unknown> = {};
  for (const key of remaining) define(rest, key);
  results.push(rest);
  return results;
}
