
import type { ExtendedFunctionDescriptor } from '@trebco/treb/treb-calculator/src/descriptors';
import type { LanguageModel } from '@trebco/treb/treb-data-model';
import type { CellValue, EmbeddedSpreadsheet } from '@trebco/treb';
import { IsComplex, ValueType, type UnionValue } from '@trebco/treb/treb-base-types';
import type { ExpressionUnit, Parser } from '@trebco/treb/treb-parser';
import { NumberFormat, NumberFormatCache } from '@trebco/treb/treb-format';
import type { FunctionLibrary } from '@trebco/treb/treb-calculator/src/function-library';
import type { Calculator } from '@trebco/treb/treb-calculator';
import { MCCompositeFunctionDescriptor } from '../../../../../RAW/treb-mc/src/descriptors';

export interface FunctionArg {
  name: string;
  value: string;
  calculated?: string;
  description?: string;

  /** utility: last calculated value, so we don't do this unecessarily */
  last_calculated_value?: string;

  /** error flag */
  error?: boolean;

  volatile?: boolean;
  type?: ValueType;

  /** 
   * flag indicating this is a repeat of the last argument, for 
   * functions that take a variable number. FIXME: some take variable
   * pairs? sometimes not in the last position? it's complicated.
   */
  repeat?: boolean;
}

export function TranslateDescriptor(source: ExtendedFunctionDescriptor, language_model?: LanguageModel): (ExtendedFunctionDescriptor & { name: string }) {

  const clone: (ExtendedFunctionDescriptor & { name: string }) = JSON.parse(JSON.stringify(source));
  clone.name = source.canonical_name;

  if (language_model) {
    for (const entry of language_model.functions || []) {
      if (entry.base.toUpperCase() === source.canonical_name.toUpperCase()) {
        clone.name = entry.name;
        clone.description = entry.description;
        if (clone.arguments && entry.arguments) {
          for (const [index, arg] of entry.arguments.entries()) {
            if (arg && clone.arguments[index]) {
              clone.arguments[index].name = arg;
            }
          }
        }
        break;
      }
    }

  }

  return clone;

};

export function FormatValue2(sheet: EmbeddedSpreadsheet, cell_format: string, value: UnionValue): string {

  if (value.type === ValueType.array) {
    return value.value.map(col => col.map(cell => FormatValue2(sheet, cell_format, cell)).join(',')).join(',');
  }

  switch (value.type) {
    case ValueType.error:
      return '#' + value.value.toString();

    case ValueType.boolean:
      return value.value.toString();

    case ValueType.string:
      return value.value;

    case ValueType.complex:
    case ValueType.number:
      return sheet.FormatNumber(value.value, cell_format);

    default:
      return '??';

  }

  return '';
  
}

export function CalculateAndRender(sheet: EmbeddedSpreadsheet, argument: boolean, text: string, format = 'General', formatter?: NumberFormat): {
  text: string;
  type: ValueType;
  volatile?: boolean;
} {

  if (text === '') {
    return { text: '', type: ValueType.undefined };
  }
  else if (argument && (text[0] === '=')) {
    return { text: 'EXPR', type: ValueType.error };
  }
  else {
    
    // we could use the parser here to figure out if the 
    // expression can be calculated, that would avoid calculation
    // errors for incomplete/invalid formulas while typing. wastes
    // cycles though

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parser = (sheet as any).parser as Parser;
    const parsed = parser.Parse(text);
    const calculator: Calculator = (sheet as any).calculator;

    if (parsed.error) {
      return { text: 'EXPR', type: ValueType.error };
    }
    else {

      const lib = (calculator as any).library as FunctionLibrary;
      let is_volatile = false;

      if (parsed.expression) {
        parser.Walk(parsed.expression, (unit) => {
          if (unit.type === 'call') {
            // console.info(unit.name);
            const resolved = lib.Get(unit.name);
            if (resolved.volatile || (resolved as MCCompositeFunctionDescriptor).simulation_volatile) {
              is_volatile = true;
              return false;
            }
          }
          return true;
        });
      }

      if (is_volatile) {
        return { text: '', type: ValueType.undefined, volatile: true };
      }

      const calculated_result = calculator.Evaluate(text, (sheet as any).grid.active_sheet, {}, true);

      // return { text: RenderCellValue(sheet, Convert(calculated_result), format, formatter), type: calculated_result.type };
      return { text: RenderCellValue2(sheet, calculated_result, format, formatter), type: calculated_result.type };

    }
  }

}

export function RenderCellValue2(sheet: EmbeddedSpreadsheet, value: UnionValue|UnionValue[]|UnionValue[][], format = 'General', formatter?: NumberFormat): string {

  if (!formatter) {
    formatter = NumberFormatCache.Get('format');
  }
 
  if(Array.isArray(value)) {
    return value.map(element => RenderCellValue2(sheet, element, format, formatter)).join(', ');
  }
  else if (value.type === ValueType.array) {
    return value.value.map(element => RenderCellValue2(sheet, element, format, formatter)).join(', ');
  }

  switch (value.type) {
    case ValueType.undefined:
      return '';
    case ValueType.number:
      return sheet?.FormatNumber(value.value, format) || '';
    case ValueType.string:
      return `"` + value.value + `"`;
    case ValueType.complex: 
      return sheet.FormatNumber(value.value, format);     
    case ValueType.error:
      return '#' + value.value;
    case ValueType.boolean:
      return value.value.toString();
      
  }

  return '{}' ; // formatter.Format(value.value);

}

export function RenderCellValue(sheet: EmbeddedSpreadsheet, value: CellValue|CellValue[]|CellValue[][], format = 'General', formatter?: NumberFormat): string {

  if (!formatter) {
    formatter = NumberFormatCache.Get('format');
  }
 
  if(Array.isArray(value)) {
    return value.map(element => RenderCellValue(sheet, element, format, formatter)).join(', ');
  }

  switch (typeof value) {
    case 'undefined':
      return '';

    case 'number':
      return sheet?.FormatNumber(value, format) || '';

    case 'string':
      return `"` + value + `"`;

    case 'object':
      if (IsComplex(value)) {
        return sheet?.FormatNumber(value, format) || '';
      }
      return '(Object)';

  }

  return formatter.Format(value);
  // return value.toString();

};

export function ApplyArgs(sheet: EmbeddedSpreadsheet, function_data: ExtendedFunctionDescriptor, args?: ExpressionUnit[], format = 'General') {

  let index = 0;
  const count = Math.max(function_data.arguments?.length || 0, args?.length || 0);
  const function_args: FunctionArg[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parser: Parser = (sheet as any).parser;

  const function_args_length = function_data.arguments?.length || 0;
  const has_repeat = function_args_length ? 
    function_data.arguments?.[function_args_length - 1].repeat : false;

  const formatter = NumberFormatCache.Get(format);

  for (; index < count; index++) {

    const arg = function_data.arguments?.[index];
    const function_arg: FunctionArg = {
      name: arg?.name|| '',
      value: '',
      description: arg?.description,
    };

    if (has_repeat && index >= function_args_length - 1) {
      function_arg.repeat = true;
    }

    const arg_value = args?.[index];
    if (arg_value) {
      function_arg.value = parser.Render(arg_value, { missing: '' });
      function_arg.last_calculated_value = (function_arg.value || '').trim();

      const temp = CalculateAndRender(sheet, true, function_arg.value, format, formatter);
      function_arg.calculated = temp.text;
      function_arg.volatile = temp.volatile;
      function_arg.type = temp.type;

    } 
    else {
      // ...
    }

    /*
    if (inputs[index]) {
      inputs[index].textContent = function_arg.value || '';
    }
    */

    function_args.push(function_arg);

  }

  // add a blank arg if the last one is populated and repeats

  if (function_args.length && 
      function_args[function_args.length - 1].value && 
      function_data.arguments &&
      has_repeat) {
    
    function_args.push({
      name: '',
      value: '',
      repeat: true,
    });

    /*
    if (inputs[function_args.length - 1]) {
      inputs[function_args.length - 1].textContent = '';
    }
    */

  }

  return function_args;

};
