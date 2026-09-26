
import { createSignal } from 'solid-js';

/**
 * base parameter type. you can extend with any other data.
 */
export interface ParameterType {

  element?: HTMLDivElement;
  validate?: (value: string) => boolean;

  // now required
  valid: () => boolean;
  setValid: (value: boolean) => void;

  // new, value as string
  value: () => string;
  setValue: (value: string) => void;

  // initial value
  initialValue: () => string;
  setInitialValue: (value: string) => void;

}

/**
 * utility to create parameters, atm just adds signal for valid
 * @param source 
 * @returns 
 */
export function CreateParameters<T = unknown>(source: T[]): (T & ParameterType)[] {
  return source.map(entry => {

    const [valid, setValid] = createSignal<boolean>(false);
    const [value, setValue] = createSignal<string>('');
    const [initialValue, setInitialValue] = createSignal<string>('');

    const composite: T & ParameterType = {
      valid, setValid, 
      value, setValue,
      initialValue, setInitialValue,
      ...entry,
    };

    return composite;

  });
}
