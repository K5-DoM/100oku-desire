/**
 * 結果画面の診断タイプ・説明・残高の要約
 * app_definition: ユーザータイプ1つ、説明文、残高表示
 */

import { formatYen } from '../../utils/currency'
import { getResultInfo } from '../../utils/result'
import type { ResultType } from '../../types/result'

interface ResultSummaryProps {
  resultType: ResultType
  balance: number
  className?: string
}

export function ResultSummary({ resultType, balance, className = '' }: ResultSummaryProps) {
  const info = getResultInfo(resultType)
  return (
    <section className={className}>
      <h2 className="text-lg font-semibold text-gray-900">{info.label}</h2>
      <p className="text-sm text-gray-600 mt-1">{info.description}</p>
      <p className="text-base font-medium mt-2">残高: {formatYen(balance)}</p>
    </section>
  )
}
