import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Sprite } from "@pixi/react"
import "@pixi/events"

/**
 * PIXI.js sprite component for clickable objects in rooms
 */
const Interactable = memo(({ interactable, handler }) => {
  const { x, y, width, height, actions, image } = interactable

  const handlePointerDown = useCallback(() => {
    handler(actions)
  }, [handler, actions])

  return (
    <Sprite
      alpha={0}
      image={`./images/${image || 'interactable.png'}`}
      x={x}
      y={y}
      width={width}
      height={height}
      eventMode="static"
      onpointerdown={handlePointerDown}
    />
  )
})

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
