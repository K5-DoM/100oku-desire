/**
 * プレイ前入力（属性）画面
 * BACKEND_DESIGN: 年齢・性別・所在地を入力。スキップ可能。
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserCircle } from 'lucide-react'
import type { GameState } from '../hooks/useGameState'
import type { PlayAttributes, AgeGroup, Gender } from '../types/game'
import { Button } from '../components/common/Button'
import { ATTRIBUTES_SCREEN } from '../constants/copy'
import { AGE_GROUPS, GENDERS, LOCATION_OPTIONS } from '../constants/attributes'

interface AttributesScreenProps {
  game: GameState
}

function toAttributes(
  age: AgeGroup | '',
  gender: Gender | '',
  location: string
): PlayAttributes {
  return {
    ageGroup: age === '' ? null : age,
    gender: gender === '' ? null : gender,
    location: location === '' || location === '未回答' ? null : location,
  }
}

export function AttributesScreen({ game }: AttributesScreenProps) {
  const [ageGroup, setAgeGroup] = useState<AgeGroup | ''>('未回答')
  const [gender, setGender] = useState<Gender | ''>('未回答')
  const [location, setLocation] = useState('')

  const handleStart = () => {
    game.startGame(toAttributes(ageGroup, gender, location))
  }

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
        <UserCircle className="w-10 h-10 mx-auto text-indigo-500 mb-3" aria-hidden />
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
          {ATTRIBUTES_SCREEN.title}
        </h1>
        <p className="mt-2 text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
          {ATTRIBUTES_SCREEN.description}
        </p>

        <div className="mt-6 space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {ATTRIBUTES_SCREEN.ageLabel}
            </label>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup((e.target.value || '') as AgeGroup | '')}
              className="w-full rounded-xl border border-gray-200 bg-white/90 px-3 py-2.5 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              aria-label={ATTRIBUTES_SCREEN.ageLabel}
            >
              {AGE_GROUPS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {ATTRIBUTES_SCREEN.genderLabel}
            </label>
            <select
              value={gender}
              onChange={(e) => setGender((e.target.value || '') as Gender | '')}
              className="w-full rounded-xl border border-gray-200 bg-white/90 px-3 py-2.5 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              aria-label={ATTRIBUTES_SCREEN.genderLabel}
            >
              {GENDERS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {ATTRIBUTES_SCREEN.locationLabel}
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white/90 px-3 py-2.5 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              aria-label={ATTRIBUTES_SCREEN.locationLabel}
            >
              {LOCATION_OPTIONS.map(({ value, label }) => (
                <option key={value || 'none'} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button className="w-full rounded-xl py-3" onClick={handleStart}>
            {ATTRIBUTES_SCREEN.startButton}
          </Button>
          <Button variant="secondary" className="w-full rounded-xl py-3" onClick={() => game.startGame(null)}>
            {ATTRIBUTES_SCREEN.skipButton}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
