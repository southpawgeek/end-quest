import React, { memo } from 'react'
import { ReactTyped } from "react-typed"
import { useGameProvider } from "../hooks/useGameProvider"

/**
 * Component that displays room descriptions with typing animation
 */
const Description = memo(() => {
  const { currentRoom, currentDescription } = useGameProvider()
  
  return (
    <div id="description">
      <h1>{currentRoom.name}</h1>
      <hr />
      <p>
        <ReactTyped
          strings={currentDescription}
          typeSpeed={1}
          showCursor={false}
        />
      </p>
    </div>
  )
})

Description.displayName = 'Description'

export default Description
