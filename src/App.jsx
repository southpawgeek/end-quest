import Wrapper from "./components/Wrapper"
import Viewport from "./components/Viewport"
import Sidebar from "./components/Sidebar"
import MoveGrid from "./components/MoveGrid"
import Description from "./components/Description"
import { GameProvider } from "./components/GameProvider"
import GameErrorBoundary from "./components/error/GameErrorBoundary"
import { useGameProvider } from "./hooks/useGameProvider"

function AppContent() {
  const { config } = useGameProvider()
  
  return (
    <GameErrorBoundary config={config}>
      <Wrapper>
        <Viewport />
        <Sidebar />
        <MoveGrid />
        <Description />
      </Wrapper>
    </GameErrorBoundary>
  )
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  )
}

export default App
