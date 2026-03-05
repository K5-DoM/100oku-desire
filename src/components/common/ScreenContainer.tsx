/**
 * 全画面共通のラップ（スマホ縦長・中央寄せ・余白）
 * app_definition: スマホ風Webアプリ、情報が一瞬で伝わるレイアウト
 */

import type { ReactNode } from 'react'

interface ScreenContainerProps {
  children: ReactNode
  className?: string
}

export function ScreenContainer({ children, className = '' }: ScreenContainerProps) {
  return (
    <div
      className={`min-h-screen w-full max-w-md mx-auto flex flex-col p-4 box-border bg-white/60 backdrop-blur-md shadow-lg shadow-indigo-100/50 ${className}`}
      role="main"
    >
      {children}
    </div>
  )
}
