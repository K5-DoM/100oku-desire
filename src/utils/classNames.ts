/**
 * className の結合用（Tailwind 等で条件付きクラスを並べるときに使用）
 */

export function classNames(...args: (string | undefined | false)[]): string {
  return args.filter(Boolean).join(' ')
}
