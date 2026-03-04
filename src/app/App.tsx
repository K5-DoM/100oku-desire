/**
 * ルートコンポーネント（薄く保つ）
 * 状態は useGameState に寄せ、画面切り替えのみ行う
 */

import { AppProviders } from './providers'
import { useGameState } from '../hooks/useGameState'
import { ScreenContainer } from '../components/common/ScreenContainer'
import { StartScreen } from '../screens/StartScreen'
import { GameScreen } from '../screens/GameScreen'
import { ResultScreen } from '../screens/ResultScreen'
import { AnalyticsScreen } from '../screens/AnalyticsScreen'

function App() {
  const game = useGameState()
  const { currentScreen } = game

  return (
    <AppProviders>
      <ScreenContainer>
        {currentScreen === 'start' && <StartScreen game={game} />}
        {currentScreen === 'game' && <GameScreen game={game} />}
        {currentScreen === 'result' && <ResultScreen game={game} />}
        {currentScreen === 'analytics' && <AnalyticsScreen game={game} />}
      </ScreenContainer>
    </AppProviders>
  )
}

export default App
