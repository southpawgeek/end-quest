import { Sprite } from "@pixi/react"
import "@pixi/events"

const Interactable = ({ interactable, handler }) => {
  const { x, y, width, height, actions, image } = interactable

  return (
    <Sprite
      alpha={0}
      image={`./images/${image || 'interactable.png'}`}
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
