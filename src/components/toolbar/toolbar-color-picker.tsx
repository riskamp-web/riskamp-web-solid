
import { For, Show, createSignal } from 'solid-js';
import style from './toolbar.module.css';
import shared from '../../style/shared.module.css';
import { t } from '~/i18n/i18n';

import '~/components/tabs.css';

import { ColorButtonControl } from './toolbar-utils';
import { ToolbarCommand, ToolbarCommandKey } from './toolbar-commands';
import { CommandMessage, StateOf, UpdateToolbarState } from './toolbar-store';

import { icons } from '~/components/icon-sets';
import { MenuButton } from '../menu-button/menu-button';
import { SpreadsheetType } from '~/lib/spreadsheet-type';
import { Color, ThemeColor } from '@trebco/treb';
import { Measurement } from '@trebco/treb/treb-utils';
import { IsDarkTheme, TintedColor, theme_tints } from './color-picker-tints';

interface ColorType {
  color: Color;
  resolved: string;
};

const base_other_colors = ['Black', 'White', 'Gray', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

const color_map: Map<string, string> = new Map();
function MapColor(color: string) {
  color = color.toLowerCase();
  let mapped = color_map.get(color);
  if (mapped) { return mapped; }
  const clamped = Measurement.MeasureColor(color).slice(0, 3);
  mapped = '#' + Array.from(clamped).map((value: number) => {
    const s = value.toString(16);
    if (s.length === 1) { return '0' + s; }
    return s;
  }).join('').toUpperCase();
  color_map.set(color, mapped);
  return mapped;
};


function IsThemeColor(color: Color): color is ThemeColor {
  return !!color && (typeof (color as ThemeColor).theme !== 'undefined');
}

function ThemeColorTitle(sheet: SpreadsheetType|undefined, color: Color) {
  let text = '';

  if (IsThemeColor(color)) {
    switch (color.theme) {
      case 0:
      case 2:
        text = t('color-picker.theme.background');
        break;

      case 1:
      case 3:
        text = t('color-picker.theme.text');
        break;

      default:
        text = t('color-picker.theme.accent');
        break;
    }

    if (color.tint) {
      text += ` (${sheet?.FormatNumber(color.tint, '+0%;-0%')})`;
    }

  }
  return text;
}

export function ColorButton(props: { 
      control: ColorButtonControl, 
      sheet: () => SpreadsheetType|undefined,
      HandleCommand: (event: Event, command: ToolbarCommand & { key: ToolbarCommandKey}) => void,
    }) {

    const [themeColors, setThemeColors] = createSignal<ColorType[][]>([]);
    const [otherColors, setOtherColors] = createSignal<ColorType[]>([]);

    const [newColorSelected, setNewColorSelected] = createSignal<string|undefined>(undefined);

    /**
     * here we're updating colors every time you open the 
     * color chooser. that's because the theme may have changed.
     * but that's a rare event -- we can almost certainly do 
     * better. unfortunately I don't think there's a spreadsheet
     * event for theme changes (could be wrong, or also, FIXME 
     * on the TREB side)
     */
    function BeforeToggle(event: ToggleEvent) {
      
      if (event.newState !== 'open') {
        return;
      }

      setNewColorSelected(undefined);

      const sheet = props.sheet();
      if (sheet) {

        // TREB's own rows are fixed; we only take the base (tint 0) color
        // of each column from it, and build our rows from theme_tints.

        const source = (sheet?.document_styles.theme_colors || []) as ColorType[][];
        const base = source.slice(0, theme_tints.length).map((column, theme) =>
          column.find(entry => !(entry.color as ThemeColor).tint) || { color: { theme }, resolved: '' });

        const dark = IsDarkTheme(base[0]?.resolved || '', base[1]?.resolved || '');
        const colors: ColorType[][] = [base];

        for (let i = 0; i < theme_tints[0].length; i++) {
          colors.push(base.map((entry, theme) => {
            const tint = theme_tints[theme][i];
            return {
              color: { theme, tint },
              resolved: TintedColor(entry.resolved, tint, dark),
            };
          }));
        }

        setThemeColors(colors);
        
        const mapped_colors = base_other_colors.map(MapColor);
        const additional_colors: string[] = sheet?.document_styles.colors.map((color: string) => MapColor(color)).filter((test: string) => {
          return !mapped_colors.includes(test);
        }) || [];

        setOtherColors([...mapped_colors, ...additional_colors].map(text => {
          return {
            resolved: text,
            color: { text },
          };
        }));

      }

    }

    // eslint-disable-next-line no-unassigned-vars -- assigned by the ref
    let native_color_chooser: HTMLInputElement|undefined;

    /**
     * remember the chosen color (so the main button re-applies it), and
     * dispatch it. the dispatch carries the color itself rather than
     * reading it back from the store.
     */
    function ApplyColor(event: Event, active_color: Color|undefined) {
      const key = props.control.command.key;
      UpdateToolbarState(draft => {
        draft.commands[key].active_color = active_color;
      });
      props.HandleCommand(event, CommandMessage(props.control.command, { active_color }));
    }

    return <>
        <MenuButton onbeforetoggle={BeforeToggle}>
          <MenuButton.Static>
            <button style={`--applied-color: ${StateOf(props.control.command).value || '#fff'};`}
                    classList={{ 
                      [style['toolbar-button']]: true, 
                      [style['color-button']]: true,
                    }}
                    title={t(props.control.command.title)}
                    onclick={e => props.HandleCommand(e, CommandMessage(props.control.command))}
                    innerHTML={props.control.command.icon || ''} 
            ></button>
                  
          </MenuButton.Static>
          <MenuButton.Menu>
            <div class={style['color-picker']}>
              <h1>{t(props.control.command.title)}</h1>

              <h2>{t('color-picker.theme_colors')}</h2>
              <div class={style.swatches} style={`grid-template-columns: repeat(${
                themeColors()[0]?.length || 0}, auto)`}>
                <For each={themeColors()[0]}>
                  {color => <button class={style.swatch}
                                    onclick={e => ApplyColor(e, color.color)}
                                    title={ThemeColorTitle(props.sheet(), color.color)}
                                    style={`--swatch-color: ${color.resolved};`}
                                  />}
                </For>
              </div>

              <div classList={{[style.swatches]: true, [style.tints]: true}} style={`grid-template-columns: repeat(${
                themeColors()[0]?.length || 0}, auto)`}>

                <For each={themeColors().slice(1)}>
                  {row => <div class="display-contents">
                    <For each={row}>
                      {color => <button class={style.swatch} 
                                        onclick={e => ApplyColor(e, color.color)}
                                        title={ThemeColorTitle(props.sheet(), color.color)}
                                        style={`--swatch-color: ${color.resolved};`}
                                      />}
                    </For>
                  </div>}
                </For>

              </div>

              <Show when={props.control.command.default_color_text}>
                <h2>{t('color-picker.no_color')}</h2>
                <div class={style.swatches}>
                  <div class="flex-row gap-1">
                    <button class={style.swatch} 
                            onclick={e => ApplyColor(e, undefined)}
                            innerHTML={icons.close} />
                    <button onclick={e => ApplyColor(e, undefined)} 
                            classList={{[shared['bare-button']]: true, [style['plaintext-button']]: true}}>{t(props.control.command.default_color_text)}</button>
                  </div>
                </div>
              </Show>

              <h2>{t('color-picker.other_colors')}</h2>
              <div class={style.swatches} style={`grid-template-columns: repeat(${
                themeColors()[0]?.length || 0}, auto)`}>

                  <For each={otherColors()}>
                    {color => <button class={style.swatch} 
                                      onclick={e => ApplyColor(e, color.color)}
                                      title={color.resolved}
                                      style={`--swatch-color: ${color.resolved};`}
                                    />}
                  </For>

              </div>

              <h2>{t('color-picker.new_color')}</h2>
                <div class={style.swatches}>
                  <div class="flex-row gap-1">
                    <input type="color"
                           ref={native_color_chooser} 
                           onchange={e => setNewColorSelected(e.currentTarget.value)} />
                    <button classList={{[shared['bare-button']]: true, [style['plaintext-button']]: true}}
                            onclick={() => native_color_chooser?.click()}>{t('color-picker.choose_color')}</button>
                    <div class="flex-grow"></div>
                    <button disabled={!newColorSelected()}
                            onclick={e => ApplyColor(e, { text: newColorSelected() })}
                            class={style.swatch} 
                            title={t('color-picker.use_selected_color')}
                            innerHTML={icons.confirm} />
                  </div>
                </div>

            </div>
          </MenuButton.Menu>
        </MenuButton>
      </>    
  }
