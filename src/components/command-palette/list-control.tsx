
import { Accessor, createEffect, createSignal, For, on, onCleanup, Setter } from 'solid-js';
import style from './command-palette.module.css';

export interface ListRef {
  delta: (delta: number) => void;
  index: () => number;
};

export interface Props<T> {

  /** should be a signal */
  list: Accessor<T[]>;

  /** optional function to extract/convert to label */
  label?: (item: T) => string;

  /**  */
  selectedIndex?: Accessor<number>;

  /**  */
  setSelectedIndex?: Setter<number>;

  /** click handler */
  onclick?: (event: MouseEvent, item: T, index: number) => void|Promise<void>;

  /** ref for list delta */
  ref?: (ref: ListRef) => void;

};

export function ListControl<T extends { toString: () => string }>(props: Props<T>) {

  let node_list: HTMLElement[] = [];

  const selectedIndexSignal = createSignal(-1);
  const [selectedIndex, setSelectedIndex] = [
    props.selectedIndex || selectedIndexSignal[0],
    props.setSelectedIndex || selectedIndexSignal[1],
  ];

  function Label(item: T) {
    if (props.label) {
      return props.label(item);
    }
    return item.toString();
  }

  const listRef = {
    delta: (delta: number) => {
      const count = props.list().length;
      let target = selectedIndex() + delta;
      target = Math.max(0, Math.min(target, count - 1));
      setSelectedIndex(target);
    },
    index: () => selectedIndex(),
  };

  if (props.ref) {
    props.ref(listRef);
  }

  createEffect(on(selectedIndex, value => {
    if (value >= 0) {
      requestAnimationFrame(() => {
        const element = node_list[value];
        if (element) {
          element.scrollIntoView({
            inline: 'nearest',
            block: 'nearest',
            // behavior: 'smooth',
          });
        }
        else {
          console.info(`missing element`, value);
        }
      });
    }
  }));

  onCleanup(() => {
    node_list = [];
  });

  return <>
      <menu class={style['menu-list']}>
        <For each={props.list()}>
          {(item, index) => <>
              <li onmouseenter={() => setSelectedIndex(index())}
                  onclick={event => props.onclick?.(event, item, index())}
                  ref={element => node_list[index()] = element}
                  classList={{[style.selected]: index() === selectedIndex()}}>
                {Label(item)}
              </li>
            </>}
        </For>
      </menu>
    </>;

}