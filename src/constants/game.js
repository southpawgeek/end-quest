// Game constants and configuration
export const GAME_CONSTANTS = {
  VIEWPORT_SIZE: 495,
  GRID_SIZE: 3,
  GRID_COORDINATES: {
    A1: 'a1', A2: 'a2', A3: 'a3',
    B1: 'b1', B2: 'b2', B3: 'b3',
    C1: 'c1', C2: 'c2', C3: 'c3'
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
