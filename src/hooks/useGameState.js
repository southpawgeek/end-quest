import { useState, useMemo } from "react"

/**
 * Custom hook for managing core game state
 */
export const useGameState = (rooms, tasks, startingRoom) => {
  const [currentRoom, setCurrentRoom] = useState(rooms[startingRoom])
  const [visitedRooms, setVisitedRooms] = useState([startingRoom])

  // Add a room to visited rooms (no duplicates)
  const addVisitedRoom = (roomKey) => {
    const index = visitedRooms.indexOf(roomKey)
    if (index === -1) {
      let updatedRooms = [...visitedRooms]
      updatedRooms.push(roomKey)
      setVisitedRooms(updatedRooms)
    }
  }

  // Clear visited rooms (for game reset)
  const clearVisitedRooms = () => setVisitedRooms([])

  // Calculate task completion
  const completedTasks = useMemo(() => 
    tasks.filter((task) => visitedRooms.includes(task.key)), 
    [tasks, visitedRooms]
  )

  const taskPercentage = useMemo(() => 
    (completedTasks.length / tasks.length) * 100, 
    [completedTasks.length, tasks.length]
  )

  // Navigate to a new room
  const navigateToRoom = (roomKey) => {
    const newRoom = rooms[roomKey]
    if (newRoom) {
      setCurrentRoom(newRoom)
      addVisitedRoom(roomKey)
      return newRoom
    }
    return null
  }

  // Check if a room is a death room
  const isDeathRoom = (room) => {
    return room.key.includes("death")
  }

  // Get room by key
  const getRoom = (roomKey) => {
    return rooms[roomKey] || null
  }

  return {
    // State
    currentRoom,
    visitedRooms,
    completedTasks,
    taskPercentage,
    
    // Actions
    setCurrentRoom,
    addVisitedRoom,
    clearVisitedRooms,
    navigateToRoom,
    
    // Utilities
    isDeathRoom,
    getRoom
  }
}
