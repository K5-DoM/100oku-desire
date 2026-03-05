/**
 * 選択傾向（カテゴリ別の内訳）
 * app_definition: どのカテゴリが多かったかを表示
 */

import type { CategoryScores } from '../../types/game'
import { CategoryBadge } from '../game/CategoryBadge'
import type { CardCategory } from '../../types/card'

const CATEGORY_ORDER: CardCategory[] = ['community', 'investment', 'experience', 'asset']

interface ResultBreakdownProps {
  categoryScores: CategoryScores
  className?: string
}

export function ResultBreakdown({ categoryScores, className = '' }: ResultBreakdownProps) {
  return (
    <section className={`rounded-2xl bg-white/80 backdrop-blur-sm border border-white/90 p-4 shadow-lg ${className}`}>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">選択傾向</h3>
      <ul className="space-y-2">
        {CATEGORY_ORDER.map((cat) => {
          const count = categoryScores[cat] ?? 0
          if (count === 0) return null
          return (
            <li key={cat} className="flex items-center gap-2 text-sm">
              <CategoryBadge category={cat} />
              <span>{count}回</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
