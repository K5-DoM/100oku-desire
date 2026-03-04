/**
 * 開始画面
 * app_definition: タイトル、残高100億円、開始ボタン、短い説明文
 */

import type { GameState } from '../hooks/useGameState'
import { Button } from '../components/common/Button'
import { START_SCREEN } from '../constants/copy'

interface StartScreenProps {
  game: GameState
}

export function StartScreen({ game }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-2xl font-bold text-gray-900">{START_SCREEN.title}</h1>
      <p className="mt-2 text-lg text-gray-600">{START_SCREEN.balanceLabel}</p>
      <p className="mt-4 text-sm text-gray-500 max-w-xs">{START_SCREEN.description}</p>
      <Button className="mt-8" onClick={game.startGame}>
        {START_SCREEN.startButton}
      </Button>
    </div>
  )
}
