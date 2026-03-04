/**
 * 画面上部の残高表示
 * app_definition: 現在の残高を常時表示、金額変化がわかる演出は後で追加可
 */

import { formatYen } from '../../utils/currency'

interface BalanceHeaderProps {
  balance: number
  className?: string
}

export function BalanceHeader({ balance, className = '' }: BalanceHeaderProps) {
  return (
    <header className={`text-center py-2 ${className}`}>
      <span className="text-sm text-gray-500">残高</span>
      <p className="text-xl font-bold tabular-nums">{formatYen(balance)}</p>
    </header>
  )
}
