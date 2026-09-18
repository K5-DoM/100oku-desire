/**
 * カード関連の型定義
 * app_definition: カードデータ（id, title, description, cost, category, 任意: sponsorName, impactTag）
 */

/** カテゴリ: 投資 / 地域貢献 / 体験 / 資産形成（「欲望」は体験に統合） */
export type CardCategory = 'investment' | 'community' | 'experience' | 'asset'

export interface Card {
  id: string
  title: string
  description: string
  cost: number
  category: CardCategory
  imageUrl?: string
  sponsorName?: string
  impactTag?: string
}
