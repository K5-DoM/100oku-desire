/**
 * 分析画面（デモ用）
 * app_definition: 集計グラフ風UI、固定データで企業向け活用を見せる
 */

import type { GameState } from '../hooks/useGameState'
import { Button } from '../components/common/Button'
import { analyticsMock } from '../data/analyticsMock'
import { ANALYTICS_SCREEN } from '../constants/copy'

interface AnalyticsScreenProps {
  game: GameState
}

export function AnalyticsScreen({ game }: AnalyticsScreenProps) {
  const { restartGame } = game

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-xl font-bold text-gray-900">{ANALYTICS_SCREEN.title}</h1>
      <p className="text-sm text-gray-600">{ANALYTICS_SCREEN.description}</p>

      <section>
        <h2 className="text-sm font-medium text-gray-700 mb-2">カテゴリ別人気率</h2>
        <ul className="space-y-2">
          {analyticsMock.categoryRates.map((r) => (
            <li key={r.categoryId} className="flex items-center gap-2 text-sm">
              <span className="w-24">{r.label}</span>
              <div className="flex-1 h-4 bg-gray-200 rounded overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded"
                  style={{ width: `${r.rate * 100}%` }}
                />
              </div>
              <span className="tabular-nums">{(r.rate * 100).toFixed(0)}%</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-medium text-gray-700 mb-2">地域貢献系の選択率</h2>
        <p className="text-lg font-medium">
          {(analyticsMock.communityPickRate * 100).toFixed(0)}%
        </p>
      </section>

      <section>
        <h2 className="text-sm font-medium text-gray-700 mb-2">人気カードランキング</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          {analyticsMock.popularCards.map((c) => (
            <li key={c.rank}>
              {c.title} … {c.pickCount}回
            </li>
          ))}
        </ol>
      </section>

      <Button variant="secondary" onClick={restartGame}>
        最初に戻る
      </Button>
    </div>
  )
}
