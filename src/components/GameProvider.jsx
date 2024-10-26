import { createContext, useState } from "react"
import data from "../data"
import useSound from "use-sound"
import soundBoop from "../sounds/boop.wav"
import soundExit from "../sounds/exit.wav"
import soundMove from "../sounds/move.wav"
import soundDead from "../sounds/dead.wav"

export const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const { actions, rooms, tasks } = data

  const [currentRoom, setCurrentRoom] = useState(rooms.start)
  const [currentDescription, setCurrentDescription] = useState(
    currentRoom.description
  )

  const [visitedRooms, setVisitedRooms] = useState(["start"])
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
  const [playbackRate, setPlaybackRate] = useState(Math.random() * (2 - 1) + 1)
  const [boop] = useSound(soundBoop)
  const [cancelBoop] = useSound(soundBoop, { playbackRate: 0.5 })
  const [done] = useSound(soundExit)
  const [move] = useSound(soundMove, { playbackRate })
  const [dead] = useSound(soundDead, { playbackRate })

  // actions
  const handleSelectAction = (action) => {
    setCurrentAction(action)
    const description = `What would you like to ${action}?`
    setCurrentDescription([description])
    boop()
  }
  const handleCancelAction = () => {
    setCurrentAction("default")
    setCurrentDescription(currentRoom.description)
    cancelBoop()
  }
  const handleLeaveAction = () => {
    if (taskPercentage === 100) {
      setCurrentRoom(rooms.epilogue)
      setCurrentDescription(rooms.epilogue.description)
      clearVisitedRooms()
      done()
    } else {
      setCurrentDescription([
        "You aren't sure how you would leave the house. Perhaps you have some unfinished business here?",
      ])
      cancelBoop()
    }
  }
  // movement
  const handleExit = (exit) => {
    setCurrentRoom(exit)
    setCurrentDescription(exit.description)
    addVisitedRoom(exit.key)
    move()
    setPlaybackRate(Math.random() * (2 - 1) + 1)
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
        dead()
        // have a little fun with it :)
        setPlaybackRate(Math.random() * (1.3 - 0.7) + 0.7)
      } else {
        move()
        setPlaybackRate(Math.random() * (1.3 - 0.7) + 0.7)
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
