/**
 * 結果診断画面
 * app_definition: タイプ表示、残高、内訳、シェア文、もう一度遊ぶ / 分析へ
 */

import type { GameState } from '../hooks/useGameState'
import { Button } from '../components/common/Button'
import { ResultSummary } from '../components/result/ResultSummary'
import { ResultBreakdown } from '../components/result/ResultBreakdown'
import { SharePanel } from '../components/result/SharePanel'
import { RESULT_SCREEN } from '../constants/copy'
import { getResultInfo } from '../utils/result'

interface ResultScreenProps {
  game: GameState
}

function buildShareText(resultLabel: string, balance: number): string {
  return `【100oku Desire】診断結果: ${resultLabel}。残高: ${(balance / 100_000_000).toFixed(0)}億円。あなたも試してみて！`
}

export function ResultScreen({ game }: ResultScreenProps) {
  const { balance, categoryScores, result, restartGame, goToAnalytics } = game

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
