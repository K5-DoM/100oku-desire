/**
 * localStorage 用ユーティリティ（雛形）
 * app_definition: 選択カードID・残高・カテゴリスコア・診断結果を保存
 */

import { STORAGE_KEY_GAME } from '../constants/game'
import type { GameStateData } from '../types/game'

export function loadGameState(): GameStateData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_GAME)
    if (!raw) return null
    return JSON.parse(raw) as GameStateData
  } catch {
    return null
  }
}

export function saveGameState(state: GameStateData): void {
  try {
    localStorage.setItem(STORAGE_KEY_GAME, JSON.stringify(state))
  } catch {
    // 保存失敗時は握りつぶす（QuotaExceeded 等）
  }
}

export function clearGameState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_GAME)
  } catch {
    // no-op
  }
}
