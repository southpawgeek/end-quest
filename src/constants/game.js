// Game constants and configuration
export const GAME_CONSTANTS = {
  VIEWPORT_SIZE: 495,
  // Grid size is now configured in the cartridge data
  // GRID_SIZE is deprecated - use cartridge.config.grid instead
  /**
   * Generate grid coordinates dynamically based on dimensions
   * @param {number} width - Number of columns (default: 3)
   * @param {number} height - Number of rows (default: 3)
   * @returns {Object} Object with coordinate keys (e.g., 'A1': 'a1')
   * @example
   * // 3x3 grid: { A1: 'a1', A2: 'a2', A3: 'a3', B1: 'b1', ... }
   * // 5x5 grid: { A1: 'a1', A2: 'a2', ..., A5: 'a5', B1: 'b1', ..., E5: 'e5' }
   */
  generateGridCoordinates: (width = 3, height = 3) => {
    const coordinates = {}
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    
    for (let row = 0; row < height; row++) {
      const letter = letters[row]
      for (let col = 1; col <= width; col++) {
        const key = `${letter}${col}`
        coordinates[key] = key.toLowerCase()
      }
    }
    
    return coordinates
  },
  
  /**
   * Generate grid layout as 2D array for easier rendering
   * @param {number} width - Number of columns (default: 3)
   * @param {number} height - Number of rows (default: 3)
   * @returns {Array<Array<string>>} 2D array of coordinate strings
   * @example
   * // 3x3 grid: [['a1', 'a2', 'a3'], ['b1', 'b2', 'b3'], ['c1', 'c2', 'c3']]
   * // 5x5 grid: [['a1', 'a2', 'a3', 'a4', 'a5'], ['b1', 'b2', ...], ...]
   */
  generateGridLayout: (width = 3, height = 3) => {
    const coordinates = GAME_CONSTANTS.generateGridCoordinates(width, height)
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    
    return Array.from({ length: height }, (_, rowIndex) => {
      const letter = letters[rowIndex]
      return Array.from({ length: width }, (_, colIndex) => {
        const key = `${letter}${colIndex + 1}`
        return coordinates[key]
      })
    })
  }
}

// Available game actions
export const GAME_ACTIONS = {
  EXAMINE: 'examine',
  USE: 'use',
  HIT: 'hit'
}

// Default action list
export const DEFAULT_ACTIONS = [
  GAME_ACTIONS.EXAMINE,
  GAME_ACTIONS.USE,
  GAME_ACTIONS.HIT
]

// Game states
export const GAME_STATES = {
  DEFAULT: 'default',
  EPILOGUE: 'epilogue'
}

// Room types
export const ROOM_TYPES = {
  NORMAL: 'normal',
  DEATH: 'death'
}
