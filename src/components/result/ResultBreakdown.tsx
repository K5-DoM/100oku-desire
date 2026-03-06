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
  const rows = CATEGORY_ORDER
    .map((cat) => ({ category: cat, count: categoryScores[cat] ?? 0 }))
    .filter((row) => row.count > 0)
  const maxCount = rows.reduce((max, row) => Math.max(max, row.count), 1)

  return (
    <section className={`rounded-3xl bg-white/85 backdrop-blur-sm border border-white/90 p-5 shadow-lg ${className}`}>
      <h3 className="text-base font-semibold text-gray-900">選択傾向</h3>
      <p className="text-xs text-gray-500 mt-1">カテゴリごとの選択回数</p>
      <ul className="space-y-3 mt-4">
        {rows.map(({ category, count }) => (
          <li key={category} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-sm">
              <CategoryBadge category={category} className="rounded-lg px-2.5 py-1 text-xs font-semibold" />
              <span className="text-gray-700 font-medium tabular-nums">{count}回</span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-500"
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
          </li>
        ))}
        {rows.length === 0 && <li className="text-sm text-gray-500">データなし</li>}
      </ul>
    </section>
  )
}
