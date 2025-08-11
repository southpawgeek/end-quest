import { createContext, useState, useRef, useCallback, useMemo } from "react"
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
    config,
    clearVisitedRooms
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
  const handleExit = useCallback((exit) => {
    navigateToRoom(exit.key)
    setCurrentDescription(exit.description)
    sounds.playMove()
  }, [navigateToRoom, setCurrentDescription, sounds])

  // Create memoized wrapper functions for context
  const handleCancelActionWrapper = useCallback(() => {
    handleCancelAction(currentRoom.description)
  }, [handleCancelAction, currentRoom.description])

  const handleLeaveActionWrapper = useCallback(() => {
    handleLeaveAction(taskPercentage, config.epilogueRoom, clearVisitedRooms)
  }, [handleLeaveAction, taskPercentage, config.epilogueRoom, clearVisitedRooms])

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
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
    handleCancelAction: handleCancelActionWrapper,
    handleLeaveAction: handleLeaveActionWrapper,
    handleExit,
    handleInteraction,
    config,
    // Expose game state for components that need it
    ...gameState
  }), [
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
    handleCancelActionWrapper,
    handleLeaveActionWrapper,
    handleExit,
    handleInteraction,
    config,
    // Use specific gameState properties instead of the entire object
    currentRoom,
    taskPercentage,
    clearVisitedRooms,
    navigateToRoom,
    isDeathRoom
  ])

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  )
}
