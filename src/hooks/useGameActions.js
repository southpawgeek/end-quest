import { useState } from "react"
import { getUIText } from "../utils/text"

/**
 * Custom hook for managing game actions and interactions
 */
export const useGameActions = (actions, sounds, setCurrentDescription, navigateToRoom, isDeathRoom, config) => {
  const [currentAction, setCurrentAction] = useState("default")

  // Handle action selection
  const handleSelectAction = (action) => {
    setCurrentAction(action)
    const description = getUIText(config, 'actionPrompt', { action })
    setCurrentDescription([description])
    sounds.playBoop()
  }

  // Handle action cancellation
  const handleCancelAction = (currentRoomDescription) => {
    setCurrentAction("default")
    setCurrentDescription(currentRoomDescription)
    sounds.playCancelBoop()
  }

  // Handle interaction with objects
  const handleInteraction = (interactableActions) => {
    if (interactableActions?.[currentAction]?.description) {
      setCurrentDescription(interactableActions[currentAction].description)
      setCurrentAction("default")
    }

    if (interactableActions?.[currentAction]?.nextRoom) {
      const nextRoom = navigateToRoom(interactableActions[currentAction].nextRoom)

      setCurrentDescription(nextRoom.description)
      setCurrentAction("default")
      
      // Play appropriate sound based on room type
      if (isDeathRoom(nextRoom)) {
        sounds.playDead()
      } else {
        sounds.playMoveWithVariation()
      }
    }
  }

  // Handle leave action (special case)
  const handleLeaveAction = (taskPercentage, epilogueRoomKey, clearVisitedRooms) => {
    if (taskPercentage === 100) {
      const epilogueRoom = navigateToRoom(epilogueRoomKey)
      setCurrentDescription(epilogueRoom.description)
      clearVisitedRooms()
      sounds.playDone()
    } else {
      setCurrentDescription([
        getUIText(config, 'cannotLeaveMessage')
      ])
      sounds.playCancelBoop()
    }
  }

  return {
    // State
    currentAction,
    
    // Actions
    setCurrentAction,
    handleSelectAction,
    handleCancelAction,
    handleInteraction,
    handleLeaveAction
  }
}
