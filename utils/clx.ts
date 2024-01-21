/**
 * @description
 * Helper for concatenating class names without using complex string templating
 *
 * @example
 * before: <div class=`${display ? 'flex' : ''} flex-col bg-white`>
 * after: <div class={clx(display && 'flex', 'flex-col bg-white')}>
 */
export const clx = (
  ...args: (string | undefined | null | false | "")[]
): string => args.filter(Boolean).join(" ");
