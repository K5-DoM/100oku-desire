/**
 * カード関連の型定義
 * app_definition: カードデータ（id, title, description, cost, category, 任意: sponsorName, impactTag）
 */

/** カテゴリ: 欲望 / 投資 / 地域貢献 / 体験 / 資産形成 */
export type CardCategory =
  | 'desire'
  | 'investment'
  | 'community'
  | 'experience'
  | 'asset'

export interface Card {
  id: string
  title: string
  description: string
  cost: number
  category: CardCategory
  sponsorName?: string
  impactTag?: string
}
