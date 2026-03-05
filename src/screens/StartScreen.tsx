/**
 * 開始画面
 * app_definition: タイトル、残高100億円、開始ボタン、短い説明文
 */

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import type { GameState } from '../hooks/useGameState'
import { Button } from '../components/common/Button'
import { START_SCREEN } from '../constants/copy'

interface StartScreenProps {
  game: GameState
}

export function StartScreen({ game }: StartScreenProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="rounded-2xl bg-white/80 backdrop-blur-sm border border-white/90 shadow-xl shadow-indigo-100/60 p-8 max-w-sm w-full"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.35 }}
      >
        <Sparkles className="w-10 h-10 mx-auto text-amber-500 mb-3" aria-hidden />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
          {START_SCREEN.title}
        </h1>
        <p className="mt-3 text-lg font-semibold text-indigo-600 tabular-nums">
          {START_SCREEN.balanceLabel}
        </p>
        <p className="mt-4 text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
          {START_SCREEN.description}
        </p>
        <Button className="mt-8 w-full rounded-xl py-3" onClick={game.startGame}>
          {START_SCREEN.startButton}
        </Button>
      </motion.div>
    </motion.div>
  )
}
