/**
 * 結果画面の診断タイプ・説明・残高の要約
 * app_definition: ユーザータイプ1つ、説明文、残高表示
 */

import { motion } from 'framer-motion'
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
    <motion.section
      className={`rounded-3xl bg-white/85 backdrop-blur-sm border border-white/90 p-6 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-xs font-semibold text-indigo-700 tracking-wide">診断タイプ</p>
      <h2 className="text-2xl font-bold text-gray-900 mt-1 leading-tight">{info.label}</h2>
      <p className="text-sm text-gray-600 mt-3">{info.description}</p>
      <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-indigo-100 bg-indigo-50 px-3 py-2">
        <span className="text-xs font-medium text-indigo-700">残高</span>
        <span className="text-lg font-bold text-indigo-700 tabular-nums">{formatYen(balance)}</span>
      </div>
    </motion.section>
  )
}
