/**
 * 採用する / しない の操作UI
 * app_definition: YES/NO ボタン、見た目だけスワイプ演出も後で可
 */

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { Button } from '../common/Button'
import { GAME_SCREEN } from '../../constants/copy'

interface ChoiceActionsProps {
  onAccept: () => void
  onReject: () => void
  canAccept?: boolean
  className?: string
}

export function ChoiceActions({
  onAccept,
  onReject,
  canAccept = true,
  className = '',
}: ChoiceActionsProps) {
  return (
    <motion.div
      className={`flex gap-4 justify-center mt-6 ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <Button
        variant="secondary"
        onClick={onReject}
        className="flex items-center gap-2 min-w-[100px]"
      >
        <X className="w-4 h-4" />
        {GAME_SCREEN.rejectLabel}
      </Button>
      <Button
        onClick={onAccept}
        disabled={!canAccept}
        className="flex items-center gap-2 min-w-[100px]"
      >
        <Check className="w-4 h-4" />
        {GAME_SCREEN.acceptLabel}
      </Button>
    </motion.div>
  )
}
