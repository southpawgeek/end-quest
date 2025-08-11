import { useGameProvider } from "../hooks/useGameProvider"
import { Stage } from "@pixi/react"
import RoomSprite from "./RoomSprite"
import Interactable from "./Interactable"
import DeathRoom from "./DeathRoom"
import { GAME_CONSTANTS } from "../constants/game"

const Viewport = () => {
  const { currentRoom, currentAction, handleInteraction } = useGameProvider()

  const handlePointerDown = (event) => {
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY
    console.log(x, y)
  }

  return (
    <div
      id="viewport"
      className={`cursor-${currentAction}`}
    >
      <Stage
        width={GAME_CONSTANTS.VIEWPORT_SIZE}
        height={GAME_CONSTANTS.VIEWPORT_SIZE}
        onPointerDown={handlePointerDown}
      >
        {currentRoom?.isDeath ? (
          <DeathRoom currentRoom={currentRoom} />
        ) : (
          <RoomSprite currentRoom={currentRoom} />
        )}
        {currentRoom?.interactables?.map((interactable) => (
          <Interactable
            key={interactable.name}
            interactable={interactable}
            handler={handleInteraction}
          />
        ))}
      </Stage>
    </div>
  )
}

export default Viewport
