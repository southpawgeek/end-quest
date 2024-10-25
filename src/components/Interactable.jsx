import { Sprite } from "@pixi/react"
import "@pixi/events"

const Interactable = ({ interactable, handler }) => {
  const { x, y, width, height, actions } = interactable

  return (
    <Sprite
      alpha={0.25}
      tint={0x00ffff}
      image="./images/interactable.png"
      x={x}
      y={y}
      width={width}
      height={height}
      eventMode="static"
      onpointerdown={() => handler(actions)}
    />
  )
}

export default Interactable
