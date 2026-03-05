/**
 * 簡易バックエンド API クライアント
 * BACKEND_DESIGN: ベースURL未設定時は送信・取得を行わず、分析は固定データ表示
 */

import type { PlayPayload } from '../types/game'
import type { CategoryRate, PopularCard } from '../data/analyticsMock'

const BASE_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL
  ? String(import.meta.env.VITE_API_BASE_URL).replace(/\/$/, '')
  : ''

export interface AnalyticsResponse {
  categoryRates: CategoryRate[]
  communityPickRate: number
  popularCards: PopularCard[]
}

export function hasApiBase(): boolean {
  return BASE_URL.length > 0
}

/**
 * 1プレイ分のデータを送信。ベースURL未設定時は何もしない。
 */
export async function submitPlay(payload: PlayPayload): Promise<{ ok: boolean; error?: string }> {
  if (!BASE_URL) return { ok: true }

  try {
    const res = await fetch(`${BASE_URL}/api/play`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const text = await res.text()
      return { ok: false, error: text || `HTTP ${res.status}` }
    }
    return { ok: true }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return { ok: false, error: message }
  }
}

/**
 * 集計データを取得。失敗時は null を返し、呼び出し側で analyticsMock にフォールバックする。
 */
export async function fetchAnalytics(): Promise<AnalyticsResponse | null> {
  if (!BASE_URL) return null

  try {
    const res = await fetch(`${BASE_URL}/api/analytics`)
    if (!res.ok) return null
    const data: AnalyticsResponse = await res.json()
    if (!data.categoryRates || !Array.isArray(data.popularCards)) return null
    return data
  } catch {
    return null
  }
}
