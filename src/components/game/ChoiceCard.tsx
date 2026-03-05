/**
 * 1枚の選択カード（タイトル・説明・金額・カテゴリ）
 * app_definition: 1枚ずつカード表示、採用/しないで進める
 * スワイプ（右→採用、左→しない）またはボタンで操作可能
 */

import { motion, useMotionValue, useTransform, animate, type PanInfo } from 'framer-motion'
import type { Card } from '../../types/card'
import { CategoryBadge } from './CategoryBadge'
import { formatYen } from '../../utils/currency'

const SWIPE_THRESHOLD = 80

interface ChoiceCardProps {
  card: Card
  onAccept: () => void
  onReject: () => void
  canAccept?: boolean
  className?: string
}

export function ChoiceCard({ card, onAccept, onReject, canAccept = true, className = '' }: ChoiceCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-18, 18])
  const acceptOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1])
  const rejectOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0])

  async function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.x > SWIPE_THRESHOLD && canAccept) {
      await animate(x, 500, { duration: 0.25, ease: 'easeOut' })
      onAccept()
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      await animate(x, -500, { duration: 0.25, ease: 'easeOut' })
      onReject()
    }
  }

  return (
    <motion.article
      className={`relative rounded-2xl border border-white/90 bg-white/90 backdrop-blur-sm p-5 shadow-xl shadow-indigo-100/50 cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* 採用オーバーレイ（右スワイプ） */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-emerald-400/20 border-2 border-emerald-400 flex items-center justify-start pl-5 pointer-events-none"
        style={{ opacity: acceptOpacity }}
      >
        <span className="text-emerald-600 font-extrabold text-2xl border-2 border-emerald-600 px-3 py-1 rounded-lg -rotate-12">
          採用!
        </span>
      </motion.div>

      {/* しないオーバーレイ（左スワイプ） */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-red-400/20 border-2 border-red-400 flex items-center justify-end pr-5 pointer-events-none"
        style={{ opacity: rejectOpacity }}
      >
        <span className="text-red-500 font-extrabold text-2xl border-2 border-red-500 px-3 py-1 rounded-lg rotate-12">
          しない
        </span>
      </motion.div>

      <CategoryBadge category={card.category} className="mb-2" />
      {card.imageUrl && (
        <img
          src={card.imageUrl}
          alt={card.title}
          className="w-full h-44 object-cover rounded-xl mb-3"
          loading="lazy"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />
      )}
      <h2 className="text-lg font-semibold text-gray-900">{card.title}</h2>
      <p className="text-sm text-gray-600 mt-1">{card.description}</p>
      <p className="text-base font-semibold text-indigo-600 mt-2 tabular-nums">{formatYen(card.cost)}</p>
    </motion.article>
  )
}
