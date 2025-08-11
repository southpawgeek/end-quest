import { useState, useMemo, useCallback } from "react"

/**
 * Custom hook for managing core game state
 */
export const useGameState = (rooms, tasks, startingRoom) => {
  const [currentRoom, setCurrentRoom] = useState(rooms[startingRoom])
  const [visitedRooms, setVisitedRooms] = useState([startingRoom])

  // Add a room to visited rooms (no duplicates)
  const addVisitedRoom = useCallback((roomKey) => {
    setVisitedRooms(prevRooms => {
      const index = prevRooms.indexOf(roomKey)
      if (index === -1) {
        return [...prevRooms, roomKey]
      }
      return prevRooms
    })
  }, [])

  // Clear visited rooms (for game reset)
  const clearVisitedRooms = useCallback(() => setVisitedRooms([]), [])

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
  const navigateToRoom = useCallback((roomKey) => {
    const newRoom = rooms[roomKey]
    if (newRoom) {
      setCurrentRoom(newRoom)
      addVisitedRoom(roomKey)
      return newRoom
    }
    return null
  }, [rooms, addVisitedRoom])

  // Check if a room is a death room
  const isDeathRoom = useCallback((room) => {
    return !!room.isDeath
  }, [])

  // Get room by key
  const getRoom = useCallback((roomKey) => {
    return rooms[roomKey] || null
  }, [rooms])

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
