/**
 * ゲーム状態・画面遷移の型定義
 * app_definition: 単一ページで状態切り替え、React Router は使わない
 */

import type { CardCategory } from './card'
import type { ResultType } from './result'

/** 表示する画面: 開始 / 選択 / 結果 / 分析 */
export type Screen = 'start' | 'game' | 'result' | 'analytics'

/** カテゴリ別スコア（選択したカードのカテゴリ集計用） */
export type CategoryScores = Partial<Record<CardCategory, number>>

export interface GameStateData {
  currentScreen: Screen
  currentCardIndex: number
  balance: number
  selectedCardIds: string[]
  categoryScores: CategoryScores
  result: ResultType | null
}
