import { css } from "@emotion/css"
import { useGameProvider } from "./GameProvider"
import { Stage } from "@pixi/react"
import RoomSprite from "./RoomSprite"
import Interactable from "./Interactable"

const Viewport = () => {
  const { currentRoom, currentAction, handleInteraction } = useGameProvider()

  let currentCursor = "default"

  if (currentAction === "examine") {
    currentCursor = "help"
  }
  if (currentAction === "use") {
    currentCursor = "pointer"
  }
  if (currentAction === "take") {
    currentCursor = "grab"
  }
  if (currentAction === "hit") {
    currentCursor = "grabbing"
  }

  const handlePointerDown = (event) => {
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY
    console.log(x, y)
  }

  const interactables = currentRoom?.interactables

  return (
    <div
      id="viewport"
      className={css`
        cursor: ${currentCursor};
      `}
    >
      <Stage
        width={495}
        height={495}
        onPointerDown={handlePointerDown}
      >
        <RoomSprite currentRoom={currentRoom} />
        {interactables.map((interactable) => (
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
