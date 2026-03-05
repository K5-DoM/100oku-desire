/**
 * 分析画面
 * 「分析を見る」で遷移した際に API を叩き、実データを表示する。
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { BarChart3 } from 'lucide-react'
import type { GameState } from '../hooks/useGameState'
import { Button } from '../components/common/Button'
import { ANALYTICS_SCREEN } from '../constants/copy'
import { fetchAnalytics, type AnalyticsResponse } from '../api/client'

const CHART_COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe']

interface AnalyticsScreenProps {
  game: GameState
}

export function AnalyticsScreen({ game }: AnalyticsScreenProps) {
  const { restartGame } = game
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchAnalytics().then((res) => {
      if (!cancelled) {
        setData(res)
        setLoaded(true)
      }
    })
    return () => { cancelled = true }
  }, [])

  if (!loaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3 text-gray-500">
        <div className="w-8 h-8 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-sm">データを読み込み中...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-gray-500">
        <p className="text-sm text-center">分析データを取得できませんでした。<br />バックエンドが起動しているか確認してください。</p>
        <Button variant="secondary" onClick={restartGame}>最初に戻る</Button>
      </div>
    )
  }

  const pieData = data.categoryRates.map((r) => ({
    name: r.label,
    value: Math.round(r.rate * 100),
  }))

  const barData = data.popularCards.map((c) => ({
    name: c.title.length > 12 ? c.title.slice(0, 12) + '…' : c.title,
    fullName: c.title,
    選択: c.pickCount,
  }))

  return (
    <motion.div
      className="flex flex-col space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-indigo-600" />
        <h1 className="text-xl font-bold text-gray-900">{ANALYTICS_SCREEN.title}</h1>
      </div>
      <p className="text-sm text-gray-600">{ANALYTICS_SCREEN.description}</p>

      <section className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/90 p-4 shadow-lg">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">カテゴリ別人気率</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={64}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
              <Legend iconSize={10} wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/90 p-4 shadow-lg">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">地域貢献系の選択率</h2>
        <p className="text-2xl font-bold text-indigo-600 tabular-nums">
          {(data.communityPickRate * 100).toFixed(0)}%
        </p>
      </section>

      <section className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/90 p-4 shadow-lg">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">人気カードランキング</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ left: 0, right: 8 }}>
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number) => [`${v}回`, '選択数']} />
              <Bar dataKey="選択" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <Button variant="secondary" onClick={restartGame}>
        最初に戻る
      </Button>
    </motion.div>
  )
}
