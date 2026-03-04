/**
 * ゲーム状態の一元管理（A担当: 画面遷移・状態の中心）
 * app_definition: 単一ページで状態切り替え、残高・選択カード・診断結果を保持
 */

import { useState, useCallback } from 'react'
import type { Screen } from '../types/game'
import type { ResultType } from '../types/result'
import type { CategoryScores } from '../types/game'
import { INITIAL_BALANCE } from '../constants/game'
import { CARDS } from '../data/cards'
import { computeResultType } from '../utils/result'
// localStorage 永続化は step 4 で利用（utils/storage）

function defaultCategoryScores(): CategoryScores {
  return {}
}

function addCategoryScore(
  prev: CategoryScores,
  category: keyof CategoryScores,
  delta: number
): CategoryScores {
  const next = { ...prev }
  next[category] = (next[category] ?? 0) + delta
  return next
}

export type GameState = ReturnType<typeof useGameState>

export function useGameState() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start')
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [balance, setBalance] = useState(INITIAL_BALANCE)
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([])
  const [categoryScores, setCategoryScores] = useState<CategoryScores>(defaultCategoryScores)
  const [result, setResult] = useState<ResultType | null>(null)

  const startGame = useCallback(() => {
    setCurrentScreen('game')
    setCurrentCardIndex(0)
    setBalance(INITIAL_BALANCE)
    setSelectedCardIds([])
    setCategoryScores(defaultCategoryScores())
    setResult(null)
  }, [])

  const chooseCurrentCard = useCallback(
    (accepted: boolean) => {
      const card = CARDS[currentCardIndex]
      if (!card) return

      if (accepted) {
        // 残高不足の場合は採用できない
        if (card.cost > balance) {
          return
        }
        const newBalance = balance - card.cost
        setBalance(newBalance)
        setSelectedCardIds((ids) => [...ids, card.id])
        setCategoryScores((s) => addCategoryScore(s, card.category, 1))
      }

      const nextIndex = currentCardIndex + 1
      if (nextIndex >= CARDS.length) {
        const finalScores = accepted
          ? addCategoryScore(categoryScores, card.category, 1)
          : categoryScores
        setResult(computeResultType(finalScores))
        setCurrentScreen('result')
      } else {
        setCurrentCardIndex(nextIndex)
      }
    },
    [balance, currentCardIndex, categoryScores]
  )

  const goToAnalytics = useCallback(() => {
    setCurrentScreen('analytics')
  }, [])

  const restartGame = useCallback(() => {
    setCurrentScreen('start')
    setCurrentCardIndex(0)
    setBalance(INITIAL_BALANCE)
    setSelectedCardIds([])
    setCategoryScores(defaultCategoryScores())
    setResult(null)
  }, [])

  return {
    currentScreen,
    currentCardIndex,
    balance,
    selectedCardIds,
    categoryScores,
    result,
    startGame,
    chooseCurrentCard,
    goToAnalytics,
    restartGame,
  }
}
