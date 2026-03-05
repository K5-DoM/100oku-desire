/**
 * カードのカテゴリ表示用バッジ
 */

import type { CardCategory } from '../../types/card'
import { classNames } from '../../utils/classNames'

const CATEGORY_LABELS: Record<CardCategory, string> = {
  investment: '投資',
  community: '地域貢献',
  experience: '体験',
  asset: '資産形成',
}

interface CategoryBadgeProps {
  category: CardCategory
  className?: string
}

export function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const label = CATEGORY_LABELS[category]
  return (
    <span
      className={classNames(
        'inline-block px-2 py-0.5 text-xs font-medium rounded',
        'bg-gray-100 text-gray-700',
        className
      )}
    >
      {label}
    </span>
  )
}
