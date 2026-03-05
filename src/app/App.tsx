/**
 * ルートコンポーネント（薄く保つ）
 * 状態は useGameState に寄せ、画面切り替えのみ行う
 */

import { useEffect } from 'react'
import { AppProviders } from './providers'
import { useGameState } from '../hooks/useGameState'
import { ScreenContainer } from '../components/common/ScreenContainer'
import { StartScreen } from '../screens/StartScreen'
import { AttributesScreen } from '../screens/AttributesScreen'
import { GameScreen } from '../screens/GameScreen'
import { ResultScreen } from '../screens/ResultScreen'
import { AnalyticsScreen } from '../screens/AnalyticsScreen'
import { CARDS } from '../data/cards'

function App() {
  const game = useGameState()
  const { currentScreen } = game

  useEffect(() => {
    const imageUrls = Array.from(
      new Set(CARDS.map((card) => card.imageUrl).filter((url): url is string => Boolean(url)))
    )

    imageUrls.forEach((url) => {
      const img = new Image()
      img.src = url
    })
  }, [])

  return (
    <AppProviders>
      <ScreenContainer>
        {currentScreen === 'start' && <StartScreen game={game} />}
        {currentScreen === 'attributes' && <AttributesScreen game={game} />}
        {currentScreen === 'game' && <GameScreen game={game} />}
        {currentScreen === 'result' && <ResultScreen game={game} />}
        {currentScreen === 'analytics' && <AnalyticsScreen game={game} />}
      </ScreenContainer>
    </AppProviders>
  )
}

export default App
