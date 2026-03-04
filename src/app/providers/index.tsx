/**
 * アプリ全体の Provider をまとめてエクスポート
 * 現状はラップ不要のため子要素をそのまま返す雛形。必要になったら Theme/State 等を追加
 */

import type { ReactNode } from 'react'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return <>{children}</>
}
