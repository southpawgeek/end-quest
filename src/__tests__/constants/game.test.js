import { 
  GAME_CONSTANTS, 
  GAME_ACTIONS, 
  DEFAULT_ACTIONS, 
  GAME_STATES, 
  ROOM_TYPES 
} from '../../constants/game'

describe('Game Constants', () => {
  describe('GAME_CONSTANTS', () => {
    it('has correct viewport size', () => {
      expect(GAME_CONSTANTS.VIEWPORT_SIZE).toBe(495)
    })

    it('has correct grid size', () => {
      expect(GAME_CONSTANTS.GRID_SIZE).toBe(3)
    })

    it('has all grid coordinates', () => {
      const expectedCoordinates = {
        A1: 'a1', A2: 'a2', A3: 'a3',
        B1: 'b1', B2: 'b2', B3: 'b3',
        C1: 'c1', C2: 'c2', C3: 'c3'
      }
      expect(GAME_CONSTANTS.GRID_COORDINATES).toEqual(expectedCoordinates)
    })

    it('has 9 grid coordinates total', () => {
      const coordinates = Object.values(GAME_CONSTANTS.GRID_COORDINATES)
      expect(coordinates).toHaveLength(9)
    })
  })

  describe('GAME_ACTIONS', () => {
    it('has examine action', () => {
      expect(GAME_ACTIONS.EXAMINE).toBe('examine')
    })

    it('has use action', () => {
      expect(GAME_ACTIONS.USE).toBe('use')
    })

    it('has hit action', () => {
      expect(GAME_ACTIONS.HIT).toBe('hit')
    })

    it('has 3 actions total', () => {
      const actions = Object.values(GAME_ACTIONS)
      expect(actions).toHaveLength(3)
    })
  })

  describe('DEFAULT_ACTIONS', () => {
    it('contains all game actions', () => {
      expect(DEFAULT_ACTIONS).toContain('examine')
      expect(DEFAULT_ACTIONS).toContain('use')
      expect(DEFAULT_ACTIONS).toContain('hit')
    })

    it('has 3 default actions', () => {
      expect(DEFAULT_ACTIONS).toHaveLength(3)
    })

    it('matches GAME_ACTIONS values', () => {
      const actionValues = Object.values(GAME_ACTIONS)
      expect(DEFAULT_ACTIONS).toEqual(actionValues)
    })
  })

  describe('GAME_STATES', () => {
    it('has default state', () => {
      expect(GAME_STATES.DEFAULT).toBe('default')
    })

    it('has epilogue state', () => {
      expect(GAME_STATES.EPILOGUE).toBe('epilogue')
    })

    it('has 2 states total', () => {
      const states = Object.values(GAME_STATES)
      expect(states).toHaveLength(2)
    })
  })

  describe('ROOM_TYPES', () => {
    it('has normal room type', () => {
      expect(ROOM_TYPES.NORMAL).toBe('normal')
    })

    it('has death room type', () => {
      expect(ROOM_TYPES.DEATH).toBe('death')
    })

    it('has 2 room types total', () => {
      const roomTypes = Object.values(ROOM_TYPES)
      expect(roomTypes).toHaveLength(2)
    })
  })
})
