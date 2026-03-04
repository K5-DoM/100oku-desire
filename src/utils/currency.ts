/**
 * 金額のフォーマット
 * 100億円表記など、表示用に整形する
 */

/**
 * 数値を「○億円」形式で返す（1億未満は「○千万円」なども可、ここでは億単位で統一）
 */
export function formatYen(amount: number): string {
  if (amount >= 100_000_000) {
    const oku = Math.floor(amount / 100_000_000)
    return `${oku}億円`
  }
  if (amount >= 10_000_000) {
    const sen = Math.floor(amount / 10_000_000)
    return `${sen}千万円`
  }
  return `${amount.toLocaleString()}円`
}
