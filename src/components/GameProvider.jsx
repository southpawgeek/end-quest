import { createContext, useState, useRef } from "react"
import data from "../data"
import { validateAndLogCartridge } from "../utils/validation"
import { useGameSounds } from "../hooks/useGameSounds"

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

  const [currentRoom, setCurrentRoom] = useState(rooms[config.startingRoom])
  const [currentDescription, setCurrentDescription] = useState(
    currentRoom.description
  )

  const [visitedRooms, setVisitedRooms] = useState([config.startingRoom])
  const addVisitedRoom = (roomKey) => {
    const index = visitedRooms.indexOf(roomKey)
    if (index === -1) {
      let updatedRooms = [...visitedRooms]
      updatedRooms.push(roomKey)
      setVisitedRooms(updatedRooms)
    }
  }
  const clearVisitedRooms = () => setVisitedRooms([])

  const completedTasks = tasks.filter((task) => visitedRooms.includes(task.key))
  const taskPercentage = (completedTasks.length / tasks.length) * 100

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
      setCurrentRoom(rooms[config.epilogueRoom])
      setCurrentDescription(rooms[config.epilogueRoom].description)
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
    setCurrentRoom(exit)
    setCurrentDescription(exit.description)
    addVisitedRoom(exit.key)
    sounds.playMove()
  }
  // viewport
  const handleInteraction = (actions) => {
    if (actions?.[currentAction]?.description) {
      setCurrentDescription(actions[currentAction].description)
      setCurrentAction("default")
    }

    if (actions?.[currentAction]?.nextRoom) {
      const nextRoom = rooms[actions[currentAction].nextRoom]

      setCurrentRoom(nextRoom)
      addVisitedRoom(nextRoom.key)
      setCurrentDescription(nextRoom.description)
      setCurrentAction("default")
      // if it's a death room, play the sound
      if (nextRoom.key.includes("death")) {
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
        setCurrentRoom,
        clearVisitedRooms,
        tasks,
        taskPercentage,
        visitedRooms,
        addVisitedRoom,
        actions,
        currentAction,
        setCurrentAction,
        handleSelectAction,
        handleCancelAction,
        handleLeaveAction,
        handleExit,
        handleInteraction,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}
