/**
 * 診断結果の算出・ラベル取得
 * B担当: 診断ロジックの詳細はここに実装
 * app_definition: タイプに応じた説明文、選択傾向（カテゴリ）を表示
 */

import type { ResultType, ResultInfo } from '../types/result'
import type { CategoryScores } from '../types/game'

const RESULT_INFOS: Record<ResultType, ResultInfo> = {
  'community-builder': {
    type: 'community-builder',
    label: '地域再生型',
    description: '地域やコミュニティへの投資を重視するタイプです。',
  },
  'future-investor': {
    type: 'future-investor',
    label: '未来投資型',
    description: '将来への投資・成長を選ぶタイプです。',
  },
  'big-spender': {
    type: 'big-spender',
    label: '夢の浪費王',
    description: '体験に大胆に使うタイプです。',
  },
  'balanced-operator': {
    type: 'balanced-operator',
    label: 'バランス経営者',
    description: 'バランスよく分散して使うタイプです。',
  },
}

export function getResultInfo(type: ResultType): ResultInfo {
  return RESULT_INFOS[type]
}

/**
 * カテゴリスコアから診断タイプを決定する（簡易ロジック・雛形）
 * 後でB担当がロジックを詰める
 */
export function computeResultType(categoryScores: CategoryScores): ResultType {
  const community = categoryScores.community ?? 0
  const investment = categoryScores.investment ?? 0
  const experience = categoryScores.experience ?? 0

  if (community >= 2) return 'community-builder'
  if (investment >= 2) return 'future-investor'
  if (experience >= 2) return 'big-spender'
  return 'balanced-operator'
}
