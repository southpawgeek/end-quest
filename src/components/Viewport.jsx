import { useGameProvider } from "./GameProvider"
import { Stage } from "@pixi/react"
import RoomSprite from "./RoomSprite"
import Interactable from "./Interactable"
import DeathRoom from "./DeathRoom"

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
        width={495}
        height={495}
        onPointerDown={handlePointerDown}
      >
        {currentRoom?.isDeath ? <DeathRoom currentRoom={currentRoom}/> : <RoomSprite currentRoom={currentRoom} />}
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
