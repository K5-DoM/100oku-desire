/**
 * 採用する / しない の操作UI
 * app_definition: YES/NO ボタン、見た目だけスワイプ演出も後で可
 */

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
    <div className={`flex gap-3 justify-center mt-4 ${className}`}>
      <Button variant="secondary" onClick={onReject}>
        {GAME_SCREEN.rejectLabel}
      </Button>
      <Button onClick={onAccept} disabled={!canAccept}>
        {GAME_SCREEN.acceptLabel}
      </Button>
    </div>
  )
}
