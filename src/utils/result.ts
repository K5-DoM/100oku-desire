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

/** 診断に使うカテゴリと ResultType の対応（asset は除外） */
const CATEGORY_TO_RESULT: Record<string, ResultType> = {
  community: 'community-builder',
  investment: 'future-investor',
  experience: 'big-spender',
} as const

const DIAGNOSIS_CATEGORIES = ['community', 'investment', 'experience'] as const

/**
 * カテゴリスコアから診断タイプを決定する。
 * 選んだ枚数が最も多いカテゴリで決定。同点ならバランス経営者。
 */
export function computeResultType(categoryScores: CategoryScores): ResultType {
  const scores = {
    community: categoryScores.community ?? 0,
    investment: categoryScores.investment ?? 0,
    experience: categoryScores.experience ?? 0,
  }
  const maxScore = Math.max(
    scores.community,
    scores.investment,
    scores.experience
  )
  const leaders = DIAGNOSIS_CATEGORIES.filter((cat) => scores[cat] === maxScore)
  if (leaders.length === 1) {
    return CATEGORY_TO_RESULT[leaders[0]]
  }
  return 'balanced-operator'
}
