import { createContext, useState, useRef } from "react"
import data from "../data"
import { validateAndLogCartridge } from "../utils/validation"
import { useGameSounds } from "../hooks/useGameSounds"
import { useGameState } from "../hooks/useGameState"
import { useGameActions } from "../hooks/useGameActions"

export const GameContext = createContext()

export const GameProvider = ({ children }) => {
  // Validate the cartridge data only once at engine startup
  const hasValidated = useRef(false)
  if (!hasValidated.current) {
    validateAndLogCartridge(data)
    hasValidated.current = true
  }
  
  const { config, content } = data
  const { rooms, tasks } = content
  const { actions } = config

  // Game state management
  const gameState = useGameState(rooms, tasks, config.startingRoom)
  const { currentRoom, taskPercentage, clearVisitedRooms, navigateToRoom, isDeathRoom } = gameState

  const [currentDescription, setCurrentDescription] = useState(
    currentRoom.description
  )

  // sounds
  const sounds = useGameSounds()

  // action management
  const actionHandlers = useGameActions(
    actions, 
    sounds, 
    setCurrentDescription, 
    navigateToRoom, 
    isDeathRoom,
    config
  )
  const { 
    currentAction, 
    setCurrentAction, 
    handleSelectAction, 
    handleCancelAction, 
    handleInteraction, 
    handleLeaveAction 
  } = actionHandlers

  // movement
  const handleExit = (exit) => {
    navigateToRoom(exit.key)
    setCurrentDescription(exit.description)
    sounds.playMove()
  }

  return (
    <GameContext.Provider
      value={{
        rooms,
        currentDescription,
        setCurrentDescription,
        currentRoom,
        tasks,
        taskPercentage,
        actions,
        currentAction,
        setCurrentAction,
        handleSelectAction,
        handleCancelAction: () => handleCancelAction(currentRoom.description),
        handleLeaveAction: () => handleLeaveAction(taskPercentage, config.epilogueRoom, clearVisitedRooms),
        handleExit,
        handleInteraction,
        // Expose game state for components that need it
        ...gameState
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
