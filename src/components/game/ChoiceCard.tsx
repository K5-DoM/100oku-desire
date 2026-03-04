/**
 * 1枚の選択カード（タイトル・説明・金額・カテゴリ）
 * app_definition: 1枚ずつカード表示、採用/しないで進める
 */

import type { Card } from '../../types/card'
import { CategoryBadge } from './CategoryBadge'
import { formatYen } from '../../utils/currency'

interface ChoiceCardProps {
  card: Card
  className?: string
}

export function ChoiceCard({ card, className = '' }: ChoiceCardProps) {
  return (
    <article
      className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${className}`}
    >
      <CategoryBadge category={card.category} className="mb-2" />
      <h2 className="text-lg font-semibold text-gray-900">{card.title}</h2>
      <p className="text-sm text-gray-600 mt-1">{card.description}</p>
      <p className="text-base font-medium text-indigo-600 mt-2">{formatYen(card.cost)}</p>
    </article>
  )
}
