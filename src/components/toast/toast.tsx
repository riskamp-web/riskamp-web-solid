
import { For, Show } from 'solid-js';
import { icons } from '~/components/icon-sets';
import { t } from '~/i18n/i18n';
import { toast, type ToastVariant } from './toast-control';

import styles from './toast.module.css';

/** the shared icon set has no dedicated error/success glyphs; the warning
 * triangle and the check carry the variant, tinted by the CSS above. */
const variantIcon: Record<ToastVariant, string> = {
  error: icons.warning,
  success: icons.confirm,
};

/**
 * the global notification host. mounted once in Root, next to <Spinner />.
 * renders whatever the toast-control singleton holds.
 */
export function Toaster() {
  return (
    <div class={styles.host} role='region' aria-label={t('toast.region-label')} aria-live='polite'>
      <For each={toast.items}>
        {item => (
          <div
            class={styles.toast}
            classList={{ [styles.error]: item.variant === 'error', [styles.success]: item.variant === 'success' }}
            role={item.variant === 'error' ? 'alert' : 'status'}
          >
            <span class={styles.icon} innerHTML={variantIcon[item.variant]} />
            <span class={styles.message}>{item.message}</span>
            <Show when={item.action}>
              {action => (
                <button
                  type='button'
                  class={styles.action}
                  onClick={() => { toast.dismiss(item.id); action().run(); }}
                >
                  {action().label}
                </button>
              )}
            </Show>
            <button
              type='button'
              class={styles.dismiss}
              aria-label={t('toast.dismiss')}
              onClick={() => toast.dismiss(item.id)}
              innerHTML={icons.close}
            />
          </div>
        )}
      </For>
    </div>
  );
}
