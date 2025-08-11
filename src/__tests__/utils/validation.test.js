import { validateCartridge } from '../../utils/validation'
import { mockGameData } from '../utils/test-utils'

describe('Validation Utils', () => {
  describe('validateCartridge', () => {
    it('validates a correct cartridge', () => {
      const errors = validateCartridge(mockGameData)
      expect(errors).toEqual([])
    })

    it('returns error for missing config', () => {
      const invalidCartridge = { content: mockGameData.content }
      const errors = validateCartridge(invalidCartridge)
      expect(errors).toContain('Cartridge.config must be an object')
    })

    it('returns error for missing content', () => {
      const invalidCartridge = { config: mockGameData.config }
      const errors = validateCartridge(invalidCartridge)
      expect(errors).toContain('Cartridge.content must be an object')
    })

    it('returns error for invalid actions array', () => {
      const invalidCartridge = {
        ...mockGameData,
        config: { ...mockGameData.config, actions: 'not-an-array' }
      }
      const errors = validateCartridge(invalidCartridge)
      expect(errors).toContain('Config.actions must be an array')
    })

    it('returns error for invalid starting room', () => {
      const invalidCartridge = {
        ...mockGameData,
        config: { ...mockGameData.config, startingRoom: 123 }
      }
      const errors = validateCartridge(invalidCartridge)
      expect(errors).toContain('Config.startingRoom must be a string')
    })

    it('returns error for invalid epilogue room', () => {
      const invalidCartridge = {
        ...mockGameData,
        config: { ...mockGameData.config, epilogueRoom: 123 }
      }
      const errors = validateCartridge(invalidCartridge)
      expect(errors).toContain('Config.epilogueRoom must be a string')
    })

    it('validates UI text if present', () => {
      const cartridgeWithUI = {
        ...mockGameData,
        config: {
          ...mockGameData.config,
          ui: {
            actionPrompt: 'What would you like to {action}?',
            cannotLeaveMessage: 'You cannot leave yet.'
          }
        }
      }
      const errors = validateCartridge(cartridgeWithUI)
      expect(errors).toEqual([])
    })

    it('returns error for invalid UI text', () => {
      const invalidCartridge = {
        ...mockGameData,
        config: {
          ...mockGameData.config,
          ui: {
            actionPrompt: 123, // Should be string
            cannotLeaveMessage: 'You cannot leave yet.'
          }
        }
      }
      const errors = validateCartridge(invalidCartridge)
      expect(errors).toContain('Config.ui.actionPrompt must be a string')
    })

    it('returns error for missing actionSets', () => {
      const invalidCartridge = {
        ...mockGameData,
        content: { ...mockGameData.content, actionSets: 'not-an-object' }
      }
      const errors = validateCartridge(invalidCartridge)
      expect(errors).toContain('Cartridge.content.actionSets must be an object')
    })

    it('returns error for missing rooms', () => {
      const invalidCartridge = {
        ...mockGameData,
        content: { ...mockGameData.content, rooms: 'not-an-object' }
      }
      const errors = validateCartridge(invalidCartridge)
      expect(errors).toContain('Cartridge.content.rooms must be an object')
    })

    it('returns error for missing tasks', () => {
      const invalidCartridge = {
        ...mockGameData,
        content: { ...mockGameData.content, tasks: 'not-an-array' }
      }
      const errors = validateCartridge(invalidCartridge)
      expect(errors).toContain('Cartridge.content.tasks must be an array')
    })
  })
})
