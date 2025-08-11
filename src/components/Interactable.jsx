import PropTypes from 'prop-types'
import { Sprite } from "@pixi/react"
import "@pixi/events"

/**
 * PIXI.js sprite component for clickable objects in rooms
 */
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

Interactable.propTypes = {
  interactable: PropTypes.shape({
    name: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    image: PropTypes.string
  }).isRequired,
  handler: PropTypes.func.isRequired
}

export default Interactable
