import { 
  safeExecute, 
  safeGet, 
  validateRoom, 
  validateInteractable, 
  createFallbackRoom, 
  createFallbackInteractable 
} from '../../utils/errorHandling'

describe('Error Handling Utils', () => {
  describe('safeExecute', () => {
    it('executes function successfully', () => {
      const fn = jest.fn().mockReturnValue('success')
      const result = safeExecute(fn, 'fallback', 'test')
      expect(result).toBe('success')
      expect(fn).toHaveBeenCalled()
    })

    it('returns fallback when function throws error', () => {
      const fn = jest.fn().mockImplementation(() => {
        throw new Error('test error')
      })
      const result = safeExecute(fn, 'fallback', 'test')
      expect(result).toBe('fallback')
    })

    it('returns null when no fallback provided', () => {
      const fn = jest.fn().mockImplementation(() => {
        throw new Error('test error')
      })
      const result = safeExecute(fn)
      expect(result).toBe(null)
    })

    it('logs error to console', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const fn = jest.fn().mockImplementation(() => {
        throw new Error('test error')
      })
      safeExecute(fn, 'fallback', 'test')
      expect(consoleSpy).toHaveBeenCalledWith('Error in test:', expect.any(Error))
      consoleSpy.mockRestore()
    })
  })

  describe('safeGet', () => {
    const testObj = {
      level1: {
        level2: {
          level3: 'value'
        }
      }
    }

    it('gets nested property successfully', () => {
      const result = safeGet(testObj, 'level1.level2.level3')
      expect(result).toBe('value')
    })

    it('returns fallback when path does not exist', () => {
      const result = safeGet(testObj, 'level1.nonexistent', 'fallback')
      expect(result).toBe('fallback')
    })

    it('returns null when no fallback provided', () => {
      const result = safeGet(testObj, 'level1.nonexistent')
      expect(result).toBe(null)
    })

    it('handles empty path', () => {
      const result = safeGet(testObj, '')
      expect(result).toBe(null)
    })

    it('handles null object', () => {
      const result = safeGet(null, 'level1.level2')
      expect(result).toBe(null)
    })
  })

  describe('validateRoom', () => {
    it('validates room with all required properties', () => {
      const validRoom = {
        key: 'test-room',
        name: 'Test Room',
        image: 'test.png',
        description: ['Test description']
      }
      expect(validateRoom(validRoom)).toBe(true)
    })

    it('returns false for null room', () => {
      expect(validateRoom(null)).toBe(false)
    })

    it('returns false for room missing properties', () => {
      const invalidRoom = {
        key: 'test-room',
        name: 'Test Room'
        // missing image and description
      }
      expect(validateRoom(invalidRoom)).toBe(false)
    })

    it('returns false for undefined room', () => {
      expect(validateRoom(undefined)).toBe(false)
    })
  })

  describe('validateInteractable', () => {
    it('validates interactable with all required properties', () => {
      const validInteractable = {
        name: 'test-object',
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        actions: { examine: {} }
      }
      expect(validateInteractable(validInteractable)).toBe(true)
    })

    it('returns false for null interactable', () => {
      expect(validateInteractable(null)).toBe(false)
    })

    it('returns false for interactable missing properties', () => {
      const invalidInteractable = {
        name: 'test-object',
        x: 100
        // missing other required properties
      }
      expect(validateInteractable(invalidInteractable)).toBe(false)
    })

    it('returns false for undefined interactable', () => {
      expect(validateInteractable(undefined)).toBe(false)
    })
  })

  describe('createFallbackRoom', () => {
    it('creates fallback room with provided key', () => {
      const fallbackRoom = createFallbackRoom('test-room')
      expect(fallbackRoom.key).toBe('test-room')
      expect(fallbackRoom.name).toBe('Error Room')
      expect(fallbackRoom.image).toBe('beginning.png')
      expect(fallbackRoom.description).toEqual(['Something went wrong loading this room.'])
      expect(fallbackRoom.exits).toEqual({})
      expect(fallbackRoom.interactables).toEqual([])
    })
  })

  describe('createFallbackInteractable', () => {
    it('creates fallback interactable with provided name', () => {
      const fallbackInteractable = createFallbackInteractable('test-object')
      expect(fallbackInteractable.name).toBe('test-object')
      expect(fallbackInteractable.x).toBe(0)
      expect(fallbackInteractable.y).toBe(0)
      expect(fallbackInteractable.width).toBe(50)
      expect(fallbackInteractable.height).toBe(50)
      expect(fallbackInteractable.actions.examine.description).toEqual(['This object seems to be malfunctioning.'])
    })

    it('creates fallback interactable with default name when none provided', () => {
      const fallbackInteractable = createFallbackInteractable()
      expect(fallbackInteractable.name).toBe('error')
    })
  })
})
