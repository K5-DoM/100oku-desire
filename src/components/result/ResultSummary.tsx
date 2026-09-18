/**
 * 結果画面の診断タイプ・説明・残高の要約
 * app_definition: ユーザータイプ1つ、説明文、残高表示
 */

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
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
      className={`rounded-2xl bg-white/80 backdrop-blur-sm border border-white/90 p-5 shadow-lg ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Award className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-semibold text-gray-900">{info.label}</h2>
      </div>
      <p className="text-sm text-gray-600 mt-1">{info.description}</p>
      <p className="text-base font-semibold text-indigo-600 mt-2 tabular-nums">残高: {formatYen(balance)}</p>
    </motion.section>
  )
}
