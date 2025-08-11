import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Stage } from "@pixi/react"
import { GAME_CONSTANTS } from "../../constants/game"

/**
 * PIXI.js stage wrapper with cursor management
 */
const GameStage = memo(({ 
  currentAction, 
  onPointerDown, 
  children,
  className = "" 
}) => {
  const cursorClass = currentAction !== "default" ? `cursor-${currentAction}` : ""
  const finalClass = `${cursorClass} ${className}`.trim()
  
  return (
    <div
      id="viewport"
      className={finalClass}
    >
      <Stage
        width={GAME_CONSTANTS.VIEWPORT_SIZE}
        height={GAME_CONSTANTS.VIEWPORT_SIZE}
        onPointerDown={onPointerDown}
      >
        {children}
      </Stage>
    </div>
  )
})

GameStage.propTypes = {
  currentAction: PropTypes.string.isRequired,
  onPointerDown: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default GameStage
