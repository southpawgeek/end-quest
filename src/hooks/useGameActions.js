import { useState, useCallback } from "react"
import { getUIText } from "../utils/text"

/**
 * Custom hook for managing game actions and interactions
 */
export const useGameActions = (actions, sounds, setCurrentDescription, navigateToRoom, isDeathRoom, config, clearVisitedRooms) => {
  const [currentAction, setCurrentAction] = useState("default")

  // Handle action selection
  const handleSelectAction = useCallback((action) => {
    setCurrentAction(action)
    const description = getUIText(config, 'actionPrompt', { action })
    setCurrentDescription([description])
    sounds.playBoop()
  }, [setCurrentAction, setCurrentDescription, sounds, config])

  // Handle action cancellation
  const handleCancelAction = useCallback((currentRoomDescription) => {
    setCurrentAction("default")
    setCurrentDescription(currentRoomDescription)
    sounds.playCancelBoop()
  }, [setCurrentAction, setCurrentDescription, sounds])

  // Handle interaction with objects
  const handleInteraction = useCallback((interactableActions) => {
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
  }, [currentAction, setCurrentDescription, setCurrentAction, navigateToRoom, isDeathRoom, sounds])

  // Handle leave action (special case)
  const handleLeaveAction = useCallback((taskPercentage, epilogueRoomKey, clearVisitedRooms) => {
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
  }, [navigateToRoom, setCurrentDescription, clearVisitedRooms, sounds, config])

  return {
    currentAction,
    setCurrentAction,
    handleSelectAction,
    handleCancelAction,
    handleInteraction,
    handleLeaveAction
  }
}
