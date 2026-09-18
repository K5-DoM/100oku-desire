/**
 * 結果診断の型定義
 * app_definition: 地域再生型 / 未来投資型 / 夢の浪費王 / バランス経営者
 */

export type ResultType =
  | 'community-builder'   // 地域再生型
  | 'future-investor'     // 未来投資型
  | 'big-spender'         // 夢の浪費王
  | 'balanced-operator'   // バランス経営者

export interface ResultInfo {
  type: ResultType
  label: string
  description: string
}
