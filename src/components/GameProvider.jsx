import { createContext, useState, useRef } from "react"
import data from "../data"
import { validateAndLogCartridge } from "../utils/validation"
import { useGameSounds } from "../hooks/useGameSounds"
import { useGameState } from "../hooks/useGameState"

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

  const [currentAction, setCurrentAction] = useState("default")

  // sounds
  const sounds = useGameSounds()

  // actions
  const handleSelectAction = (action) => {
    setCurrentAction(action)
    const description = `What would you like to ${action}?`
    setCurrentDescription([description])
    sounds.playBoop()
  }
  const handleCancelAction = () => {
    setCurrentAction("default")
    setCurrentDescription(currentRoom.description)
    sounds.playCancelBoop()
  }
  const handleLeaveAction = () => {
    if (taskPercentage === 100) {
      const epilogueRoom = navigateToRoom(config.epilogueRoom)
      setCurrentDescription(epilogueRoom.description)
      clearVisitedRooms()
      sounds.playDone()
    } else {
      setCurrentDescription([
        "You aren't sure how you would leave the house. Perhaps you have some unfinished business here?",
      ])
      sounds.playCancelBoop()
    }
  }
  // movement
  const handleExit = (exit) => {
    navigateToRoom(exit.key)
    setCurrentDescription(exit.description)
    sounds.playMove()
  }
  // viewport
  const handleInteraction = (actions) => {
    if (actions?.[currentAction]?.description) {
      setCurrentDescription(actions[currentAction].description)
      setCurrentAction("default")
    }

    if (actions?.[currentAction]?.nextRoom) {
      const nextRoom = navigateToRoom(actions[currentAction].nextRoom)

      setCurrentDescription(nextRoom.description)
      setCurrentAction("default")
      // if it's a death room, play the sound
      if (isDeathRoom(nextRoom)) {
        sounds.playDead()
      } else {
        sounds.playMoveWithVariation()
      }
    }
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
        handleCancelAction,
        handleLeaveAction,
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
