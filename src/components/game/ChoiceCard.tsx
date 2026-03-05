/**
 * 1枚の選択カード（タイトル・説明・金額・カテゴリ）
 * app_definition: 1枚ずつカード表示、採用/しないで進める
 */

import { motion } from 'framer-motion'
import type { Card } from '../../types/card'
import { CategoryBadge } from './CategoryBadge'
import { formatYen } from '../../utils/currency'

interface ChoiceCardProps {
  card: Card
  className?: string
}

export function ChoiceCard({ card, className = '' }: ChoiceCardProps) {
  return (
    <motion.article
      className={`rounded-2xl border border-white/90 bg-white/90 backdrop-blur-sm p-5 shadow-xl shadow-indigo-100/50 ${className}`}
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <CategoryBadge category={card.category} className="mb-2" />
      <h2 className="text-lg font-semibold text-gray-900">{card.title}</h2>
      <p className="text-sm text-gray-600 mt-1">{card.description}</p>
      <p className="text-base font-semibold text-indigo-600 mt-2 tabular-nums">{formatYen(card.cost)}</p>
    </motion.article>
  )
}
