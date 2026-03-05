/**
 * 結果診断画面
 * app_definition: タイプ表示、残高、内訳、シェア文、もう一度遊ぶ / 分析へ
 * 表示後にプレイデータを1回だけ送信（BACKEND_DESIGN）
 */

import { useEffect, useRef } from 'react'
import type { GameState } from '../hooks/useGameState'
import type { PlayPayload } from '../types/game'
import { Button } from '../components/common/Button'
import { ResultSummary } from '../components/result/ResultSummary'
import { ResultBreakdown } from '../components/result/ResultBreakdown'
import { ResultTagSummary } from '../components/result/ResultTagSummary'
import { SharePanel } from '../components/result/SharePanel'
import { RESULT_SCREEN } from '../constants/copy'
import { getResultInfo } from '../utils/result'
import { submitPlay } from '../api/client'

interface ResultScreenProps {
  game: GameState
}

function buildShareText(resultLabel: string, balance: number): string {
  return `【100oku Desire】診断結果: ${resultLabel}。残高: ${(balance / 100_000_000).toFixed(0)}億円。あなたも試してみて！`
}

function buildPayload(game: GameState): PlayPayload | null {
  const { playAttributes, selectedCardIds, categoryScores, result, balance } = game
  if (!result) return null
  return {
    ageGroup: playAttributes?.ageGroup ?? null,
    gender: playAttributes?.gender ?? null,
    location: playAttributes?.location ?? null,
    selectedCardIds,
    categoryScores,
    result,
    balance,
    submittedAt: new Date().toISOString(),
  }
}

export function ResultScreen({ game }: ResultScreenProps) {
  const { balance, categoryScores, selectedCardIds, result, restartGame, goToAnalytics } = game
  const sentRef = useRef(false)

  useEffect(() => {
    if (!result || sentRef.current) return
    const payload = buildPayload(game)
    if (payload) {
      sentRef.current = true
      submitPlay(payload).catch(() => {})
    }
  }, [result, game])

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-500">
        <p>結果を計算中...</p>
      </div>
    )
  }

  const info = getResultInfo(result)
  const shareText = buildShareText(info.label, balance)

  return (
    <div className="flex flex-col space-y-6">
      <ResultSummary resultType={result} balance={balance} />
      <ResultBreakdown categoryScores={categoryScores} />
      <ResultTagSummary selectedCardIds={selectedCardIds} />
      <SharePanel shareText={shareText} />
      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={goToAnalytics}>
          分析を見る
        </Button>
        <Button onClick={restartGame}>{RESULT_SCREEN.restartButton}</Button>
      </div>
    </div>
  )
}
