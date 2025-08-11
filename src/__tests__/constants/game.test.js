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

    it('has deprecated grid size note', () => {
      // Grid size is now configured in cartridge data, not constants
      expect(GAME_CONSTANTS.VIEWPORT_SIZE).toBe(495)
    })

    describe('generateGridCoordinates', () => {
      it('generates 3x3 grid coordinates correctly', () => {
        const coordinates = GAME_CONSTANTS.generateGridCoordinates(3, 3)
        const expectedCoordinates = {
          A1: 'a1', A2: 'a2', A3: 'a3',
          B1: 'b1', B2: 'b2', B3: 'b3',
          C1: 'c1', C2: 'c2', C3: 'c3'
        }
        expect(coordinates).toEqual(expectedCoordinates)
      })

      it('generates 5x5 grid coordinates correctly', () => {
        const coordinates = GAME_CONSTANTS.generateGridCoordinates(5, 5)
        expect(coordinates.A1).toBe('a1')
        expect(coordinates.A5).toBe('a5')
        expect(coordinates.E1).toBe('e1')
        expect(coordinates.E5).toBe('e5')
        expect(Object.keys(coordinates)).toHaveLength(25)
      })

      it('generates 4x3 grid coordinates correctly', () => {
        const coordinates = GAME_CONSTANTS.generateGridCoordinates(4, 3)
        expect(coordinates.A1).toBe('a1')
        expect(coordinates.A4).toBe('a4')
        expect(coordinates.C1).toBe('c1')
        expect(coordinates.C4).toBe('c4')
        expect(Object.keys(coordinates)).toHaveLength(12)
      })

      it('uses default 3x3 when no parameters provided', () => {
        const coordinates = GAME_CONSTANTS.generateGridCoordinates()
        expect(Object.keys(coordinates)).toHaveLength(9)
        expect(coordinates.A1).toBe('a1')
        expect(coordinates.C3).toBe('c3')
      })

      it('handles large grid sizes', () => {
        const coordinates = GAME_CONSTANTS.generateGridCoordinates(10, 10)
        expect(coordinates.A1).toBe('a1')
        expect(coordinates.A10).toBe('a10')
        expect(coordinates.J1).toBe('j1')
        expect(coordinates.J10).toBe('j10')
        expect(Object.keys(coordinates)).toHaveLength(100)
      })
    })

    describe('generateGridLayout', () => {
      it('generates 3x3 grid layout correctly', () => {
        const layout = GAME_CONSTANTS.generateGridLayout(3, 3)
        expect(layout).toHaveLength(3)
        expect(layout[0]).toEqual(['a1', 'a2', 'a3'])
        expect(layout[1]).toEqual(['b1', 'b2', 'b3'])
        expect(layout[2]).toEqual(['c1', 'c2', 'c3'])
      })

      it('generates 5x5 grid layout correctly', () => {
        const layout = GAME_CONSTANTS.generateGridLayout(5, 5)
        expect(layout).toHaveLength(5)
        expect(layout[0]).toEqual(['a1', 'a2', 'a3', 'a4', 'a5'])
        expect(layout[4]).toEqual(['e1', 'e2', 'e3', 'e4', 'e5'])
      })

      it('generates 4x3 grid layout correctly', () => {
        const layout = GAME_CONSTANTS.generateGridLayout(4, 3)
        expect(layout).toHaveLength(3)
        expect(layout[0]).toEqual(['a1', 'a2', 'a3', 'a4'])
        expect(layout[2]).toEqual(['c1', 'c2', 'c3', 'c4'])
      })

      it('uses default 3x3 when no parameters provided', () => {
        const layout = GAME_CONSTANTS.generateGridLayout()
        expect(layout).toHaveLength(3)
        expect(layout[0]).toEqual(['a1', 'a2', 'a3'])
      })
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
