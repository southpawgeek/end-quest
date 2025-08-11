import { useGameProvider } from "../hooks/useGameProvider"
import MovementGrid from "./movement/MovementGrid"

/**
 * Main MoveGrid component that manages the movement interface
 */
const MoveGrid = () => {
  const { rooms, currentRoom, handleExit } = useGameProvider()
  const exits = currentRoom.exits

  return (
    <div id="move-grid">
      <h2>Exits</h2>
      <MovementGrid
        exits={exits}
        rooms={rooms}
        onExitClick={handleExit}
      />
    </div>
  )
}

export default MoveGrid
