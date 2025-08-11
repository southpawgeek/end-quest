import { useGameProvider } from "../hooks/useGameProvider"
import GameStage from "./viewport/GameStage"
import RoomRenderer from "./viewport/RoomRenderer"
import InteractableList from "./viewport/InteractableList"

/**
 * Main Viewport component that manages the game rendering area
 */
const Viewport = () => {
  const { currentRoom, currentAction, handleInteraction } = useGameProvider()

  const handlePointerDown = (event) => {
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY
    console.log(x, y)
  }

  return (
    <GameStage
      currentAction={currentAction}
      onPointerDown={handlePointerDown}
    >
      <RoomRenderer currentRoom={currentRoom} />
      <InteractableList
        interactables={currentRoom?.interactables}
        onInteraction={handleInteraction}
      />
    </GameStage>
  )
}

export default Viewport
