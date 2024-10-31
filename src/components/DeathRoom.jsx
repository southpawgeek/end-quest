import { Sprite, useTick } from "@pixi/react"
import { useEffect, useState } from "react"

const DeathRoom = ({ currentRoom }) => {
  let i = 0
  const [roomAlpha, setRoomAlpha] = useState(0)
  const [rotation, setRotation] = useState(0)

  useTick((dt) => {
    i += 0.05 * dt
    if (roomAlpha < 1) {
      const newAlpha = roomAlpha + i
      setRoomAlpha(newAlpha)
    }
    const newRotation = rotation + i / 2
    setRotation(newRotation)
  })

  useEffect(
    function resetAlphaOnNewRoom() {
      setRoomAlpha(0)
    },
    [currentRoom]
  )

  return (
    <>
      <Sprite
        image="./images/interactable.png"
        width={512}
        height={512}
        tint={0x990000}
      />
      <Sprite
        image="./images/deathSpiral.png"
        pivot={1024}
        x={270}
        y={300}
        scale={0.5}
        rotation={rotation}
      />
      <Sprite
        image={`./images/${currentRoom?.image}`}
        alpha={roomAlpha}
      />
    </>
  )
}

export default DeathRoom
