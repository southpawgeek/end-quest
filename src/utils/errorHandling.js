/**
 * Error handling utilities for the game engine
 */

/**
 * Safely executes a function and returns a fallback value if it fails
 * @param {Function} fn - Function to execute
 * @param {*} fallback - Fallback value if function fails
 * @param {string} context - Context for error logging
 * @returns {*} Result of function or fallback value
 */
export const safeExecute = (fn, fallback = null, context = 'Unknown') => {
  try {
    return fn()
  } catch (error) {
    console.error(`Error in ${context}:`, error)
    return fallback
  }
}

/**
 * Safely accesses nested object properties
 * @param {Object} obj - Object to access
 * @param {string} path - Dot-separated path to property
 * @param {*} fallback - Fallback value if path doesn't exist
 * @returns {*} Property value or fallback
 */
export const safeGet = (obj, path, fallback = null) => {
  try {
    return path.split('.').reduce((current, key) => current?.[key], obj) ?? fallback
  } catch (error) {
    console.error(`Error accessing path "${path}":`, error)
    return fallback
  }
}

/**
 * Validates that a room has all required properties
 * @param {Object} room - Room object to validate
 * @returns {boolean} True if room is valid
 */
export const validateRoom = (room) => {
  if (!room) return false
  
  const requiredProps = ['key', 'name', 'image', 'description']
  return requiredProps.every(prop => room.hasOwnProperty(prop))
}

/**
 * Validates that an interactable has all required properties
 * @param {Object} interactable - Interactable object to validate
 * @returns {boolean} True if interactable is valid
 */
export const validateInteractable = (interactable) => {
  if (!interactable) return false
  
  const requiredProps = ['name', 'x', 'y', 'width', 'height', 'actions']
  return requiredProps.every(prop => interactable.hasOwnProperty(prop))
}

/**
 * Creates a fallback room for error cases
 * @param {string} roomKey - Key of the failed room
 * @returns {Object} Fallback room object
 */
export const createFallbackRoom = (roomKey) => ({
  key: roomKey,
  name: 'Error Room',
  image: 'beginning.png', // Use a safe default image
  description: ['Something went wrong loading this room.'],
  exits: {},
  interactables: []
})

/**
 * Creates a fallback interactable for error cases
 * @param {string} name - Name of the failed interactable
 * @returns {Object} Fallback interactable object
 */
export const createFallbackInteractable = (name) => ({
  name: name || 'error',
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  actions: {
    examine: {
      description: ['This object seems to be malfunctioning.']
    }
  }
})
