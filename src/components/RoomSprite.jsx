import { Sprite, useTick } from "@pixi/react"
import { useEffect, useState } from "react"

const RoomSprite = ({ currentRoom }) => {
  let i = 0
  const [roomAlpha, setRoomAlpha] = useState(0)

  useTick((dt) => {
    if (roomAlpha < 1) {
      i += 0.1 * dt
      const newAlpha = roomAlpha + i
      setRoomAlpha(newAlpha)
    }
  })

  useEffect(
    function resetAlphaOnNewRoom() {
      setRoomAlpha(0)
    },
    [currentRoom]
  )

  return (
    <Sprite
      image={`./images/${currentRoom?.image}`}
      alpha={roomAlpha}
    />
  )
}

export default RoomSprite
