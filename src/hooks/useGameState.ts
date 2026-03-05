/**
 * ゲーム状態の一元管理（A担当: 画面遷移・状態の中心）
 * app_definition: 単一ページで状態切り替え、残高・選択カード・診断結果を保持
 * カードはランダム順で提示。残高以上のカードは出さず、提示可能カードがなくなったら結果へ。
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

/** 未提示のカード index 一覧から、残高以下でランダムに1つ選ぶ。なければ null */
function pickNextCardIndex(
  remainingIndices: number[],
  balance: number
): number | null {
  const affordable = remainingIndices.filter((i) => CARDS[i].cost <= balance)
  if (affordable.length === 0) return null
  return affordable[Math.floor(Math.random() * affordable.length)]
}

export type GameState = ReturnType<typeof useGameState>

export function useGameState() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('start')
  /** 現在表示中のカードの index（CARDS へのインデックス）。null は結果画面へ遷移するとき */
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null)
  /** まだ提示していないカードの index 一覧 */
  const [remainingIndices, setRemainingIndices] = useState<number[]>([])
  const [balance, setBalance] = useState(INITIAL_BALANCE)
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([])
  const [categoryScores, setCategoryScores] = useState<CategoryScores>(defaultCategoryScores)
  const [result, setResult] = useState<ResultType | null>(null)

  const startGame = useCallback(() => {
    setBalance(INITIAL_BALANCE)
    setSelectedCardIds([])
    setCategoryScores(defaultCategoryScores())
    setResult(null)
    const allIndices = CARDS.map((_, i) => i)
    const first = pickNextCardIndex(allIndices, INITIAL_BALANCE)
    if (first === null) {
      setResult(computeResultType({}))
      setCurrentScreen('result')
      setCurrentCardIndex(null)
      setRemainingIndices([])
    } else {
      setCurrentScreen('game')
      setCurrentCardIndex(first)
      setRemainingIndices(allIndices.filter((i) => i !== first))
    }
  }, [])

  const chooseCurrentCard = useCallback(
    (accepted: boolean) => {
      const card = currentCardIndex !== null ? CARDS[currentCardIndex] : null
      if (!card) return

      if (accepted) {
        if (card.cost > balance) return
        setBalance((b) => b - card.cost)
        setSelectedCardIds((ids) => [...ids, card.id])
        setCategoryScores((s) => addCategoryScore(s, card.category, 1))
      }

      const newBalance = accepted ? balance - card.cost : balance
      const finalScores =
        accepted ? addCategoryScore(categoryScores, card.category, 1) : categoryScores
      const newRemaining = remainingIndices.filter((i) => i !== currentCardIndex)

      const nextIndex = pickNextCardIndex(newRemaining, newBalance)
      if (nextIndex === null) {
        setRemainingIndices(newRemaining)
        setResult(computeResultType(finalScores))
        setCurrentScreen('result')
        setCurrentCardIndex(null)
      } else {
        setCurrentCardIndex(nextIndex)
        setRemainingIndices(newRemaining.filter((i) => i !== nextIndex))
      }
    },
    [balance, currentCardIndex, categoryScores, remainingIndices]
  )

  const goToAnalytics = useCallback(() => {
    setCurrentScreen('analytics')
  }, [])

  const restartGame = useCallback(() => {
    setCurrentScreen('start')
    setCurrentCardIndex(null)
    setRemainingIndices([])
    setBalance(INITIAL_BALANCE)
    setSelectedCardIds([])
    setCategoryScores(defaultCategoryScores())
    setResult(null)
  }, [])

  const totalCards = CARDS.length
  const remainingCardCount = remainingIndices.length

  return {
    currentScreen,
    currentCardIndex,
    balance,
    selectedCardIds,
    categoryScores,
    result,
    totalCards,
    remainingCardCount,
    startGame,
    chooseCurrentCard,
    goToAnalytics,
    restartGame,
  }
}
