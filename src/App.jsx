import Wrapper from "./components/Wrapper"
import Viewport from "./components/Viewport"
import Sidebar from "./components/Sidebar"
import MoveGrid from "./components/MoveGrid"
import Description from "./components/Description"
import { GameProvider } from "./components/GameProvider"
import GameErrorBoundary from "./components/error/GameErrorBoundary"

function App() {
  return (
    <GameErrorBoundary>
      <GameProvider>
        <Wrapper>
          <Viewport />
          <Sidebar />
          <MoveGrid />
          <Description />
        </Wrapper>
      </GameProvider>
    </GameErrorBoundary>
  )
}

export default App
