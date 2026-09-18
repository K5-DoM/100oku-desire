/**
 * ゲーム状態・画面遷移の型定義
 * app_definition: 単一ページで状態切り替え、React Router は使わない
 */

import type { CardCategory } from './card'
import type { ResultType } from './result'

/** 表示する画面: 開始 / 属性入力 / 選択 / 結果 / 分析 */
export type Screen = 'start' | 'attributes' | 'game' | 'result' | 'analytics'

/** プレイ前入力（属性）。スキップ時は null または 未回答 */
export type AgeGroup =
  | '10代'
  | '20代'
  | '30代'
  | '40代'
  | '50代'
  | '60代以上'
  | '未回答'

export type Gender = '男性' | '女性' | 'その他' | '答えたくない' | '未回答'

export interface PlayAttributes {
  ageGroup: AgeGroup | null
  gender: Gender | null
  location: string | null
}

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

/** プレイ1件の送信ペイロード（POST /api/play） */
export interface PlayPayload {
  ageGroup: string | null
  gender: string | null
  location: string | null
  selectedCardIds: string[]
  categoryScores: CategoryScores
  result: ResultType
  balance: number
  submittedAt: string
}
