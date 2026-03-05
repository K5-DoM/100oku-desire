/**
 * 選択画面（メイン）
 * app_definition: 1枚ずつカード、残高表示、採用/しない
 */

import type { GameState } from '../hooks/useGameState'
import { CARDS } from '../data/cards'
import { BalanceHeader } from '../components/game/BalanceHeader'
import { ChoiceCard } from '../components/game/ChoiceCard'
import { ChoiceActions } from '../components/game/ChoiceActions'
import { ProgressBar } from '../components/common/ProgressBar'

interface GameScreenProps {
  game: GameState
}

export function GameScreen({ game }: GameScreenProps) {
  const { balance, currentCardIndex, chooseCurrentCard, totalCards, remainingCardCount } = game
  const card = currentCardIndex !== null ? CARDS[currentCardIndex] : null

  if (!card) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-500">
        <p>カードがありません</p>
      </div>
    )
  }

  const canAccept = balance >= card.cost
  const presentedCount = totalCards - remainingCardCount

  return (
    <div className="flex flex-col flex-1">
      <BalanceHeader balance={balance} />
      <ProgressBar value={presentedCount} max={totalCards} className="my-2" />
      <div className="flex-1 flex flex-col justify-center">
        <ChoiceCard
          key={currentCardIndex}
          card={card}
          onAccept={() => chooseCurrentCard(true)}
          onReject={() => chooseCurrentCard(false)}
          canAccept={canAccept}
        />
        <ChoiceActions
          onAccept={() => chooseCurrentCard(true)}
          onReject={() => chooseCurrentCard(false)}
          canAccept={canAccept}
        />
      </div>
    </div>
  )
}
