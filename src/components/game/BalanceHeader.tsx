/**
 * 画面上部の残高表示
 * app_definition: 現在の残高を常時表示、金額変化がわかる演出
 */

import { motion } from 'framer-motion'
import { Wallet } from 'lucide-react'
import { formatYen } from '../../utils/currency'

interface BalanceHeaderProps {
  balance: number
  className?: string
}

export function BalanceHeader({ balance, className = '' }: BalanceHeaderProps) {
  return (
    <header className={`text-center py-3 px-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm ${className}`}>
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1">
        <Wallet className="w-3.5 h-3.5" />
        残高
      </span>
      <motion.p
        key={balance}
        className="text-xl font-bold tabular-nums text-indigo-700 mt-0.5"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {formatYen(balance)}
      </motion.p>
    </header>
  )
}
