import gameCartridge from '../data'

describe('Game Cartridge Data', () => {
  describe('config', () => {
    it('has required configuration properties', () => {
      expect(gameCartridge.config).toBeDefined()
      expect(gameCartridge.config.actions).toBeDefined()
      expect(gameCartridge.config.startingRoom).toBeDefined()
      expect(gameCartridge.config.epilogueRoom).toBeDefined()
      expect(gameCartridge.config.ui).toBeDefined()
    })

    describe('grid configuration', () => {
      it('has grid configuration', () => {
        expect(gameCartridge.config.grid).toBeDefined()
        expect(gameCartridge.config.grid.width).toBeDefined()
        expect(gameCartridge.config.grid.height).toBeDefined()
      })

      it('has default 3x3 grid dimensions', () => {
        expect(gameCartridge.config.grid.width).toBe(3)
        expect(gameCartridge.config.grid.height).toBe(3)
      })

      it('grid width and height are positive integers', () => {
        expect(typeof gameCartridge.config.grid.width).toBe('number')
        expect(typeof gameCartridge.config.grid.height).toBe('number')
        expect(gameCartridge.config.grid.width).toBeGreaterThan(0)
        expect(gameCartridge.config.grid.height).toBeGreaterThan(0)
        expect(Number.isInteger(gameCartridge.config.grid.width)).toBe(true)
        expect(Number.isInteger(gameCartridge.config.grid.height)).toBe(true)
      })

      it('grid dimensions are within valid range (1-26)', () => {
        expect(gameCartridge.config.grid.width).toBeLessThanOrEqual(26)
        expect(gameCartridge.config.grid.height).toBeLessThanOrEqual(26)
        expect(gameCartridge.config.grid.width).toBeGreaterThanOrEqual(1)
        expect(gameCartridge.config.grid.height).toBeGreaterThanOrEqual(1)
      })
    })

    describe('UI configuration', () => {
      it('has required UI text strings', () => {
        const ui = gameCartridge.config.ui
        expect(ui.actionsHeader).toBeDefined()
        expect(ui.tasksHeader).toBeDefined()
        expect(ui.exitsHeader).toBeDefined()
        expect(ui.movementGridLabel).toBeDefined()
        expect(ui.noExitAvailable).toBeDefined()
      })

      it('has movement-related UI strings', () => {
        const ui = gameCartridge.config.ui
        expect(ui.movementDescription).toBeDefined()
        expect(ui.exitToLabel).toBeDefined()
        expect(ui.exitDescription).toBeDefined()
      })
    })
  })

  describe('content', () => {
    it('has required content properties', () => {
      expect(gameCartridge.content).toBeDefined()
      expect(gameCartridge.content.rooms).toBeDefined()
      expect(gameCartridge.content.tasks).toBeDefined()
      expect(gameCartridge.content.actionSets).toBeDefined()
    })

    it('has rooms with valid structure', () => {
      const rooms = gameCartridge.content.rooms
      expect(Object.keys(rooms).length).toBeGreaterThan(0)
      
      // Check first room structure
      const firstRoomKey = Object.keys(rooms)[0]
      const firstRoom = rooms[firstRoomKey]
      expect(firstRoom.key).toBeDefined()
      expect(firstRoom.name).toBeDefined()
      expect(firstRoom.description).toBeDefined()
      expect(firstRoom.exits).toBeDefined()
    })

    it('has tasks with valid structure', () => {
      const tasks = gameCartridge.content.tasks
      expect(Array.isArray(tasks)).toBe(true)
      expect(tasks.length).toBeGreaterThan(0)
      
      // Check first task structure
      const firstTask = tasks[0]
      expect(firstTask.key).toBeDefined()
      expect(firstTask.name).toBeDefined()
    })

    it('has action sets with valid structure', () => {
      const actionSets = gameCartridge.content.actionSets
      expect(Object.keys(actionSets).length).toBeGreaterThan(0)
      
      // Check first action set structure
      const firstActionSetKey = Object.keys(actionSets)[0]
      const firstActionSet = actionSets[firstActionSetKey]
      expect(typeof firstActionSet).toBe('object')
    })
  })

  describe('cartridge structure', () => {
    it('has correct top-level structure', () => {
      expect(gameCartridge.config).toBeDefined()
      expect(gameCartridge.content).toBeDefined()
      expect(typeof gameCartridge.config).toBe('object')
      expect(typeof gameCartridge.content).toBe('object')
    })
  })
})
