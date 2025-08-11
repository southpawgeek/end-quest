import { interpolateText, getUIText } from '../../utils/text'

describe('Text Utils', () => {
  describe('interpolateText', () => {
    it('interpolates variables into template', () => {
      const template = 'Hello {name}, you are {age} years old'
      const variables = { name: 'John', age: '25' }
      const result = interpolateText(template, variables)
      expect(result).toBe('Hello John, you are 25 years old')
    })

    it('handles missing variables', () => {
      const template = 'Hello {name}, you are {age} years old'
      const variables = { name: 'John' }
      const result = interpolateText(template, variables)
      expect(result).toBe('Hello John, you are {age} years old')
    })

    it('handles empty variables object', () => {
      const template = 'Hello {name}, you are {age} years old'
      const variables = {}
      const result = interpolateText(template, variables)
      expect(result).toBe('Hello {name}, you are {age} years old')
    })

    it('handles template with no variables', () => {
      const template = 'Hello world'
      const variables = { name: 'John' }
      const result = interpolateText(template, variables)
      expect(result).toBe('Hello world')
    })

    it('handles empty template', () => {
      const template = ''
      const variables = { name: 'John' }
      const result = interpolateText(template, variables)
      expect(result).toBe('')
    })
  })

  describe('getUIText', () => {
    const mockConfig = {
      ui: {
        actionPrompt: 'What would you like to {action}?',
        cannotLeaveMessage: 'You cannot leave yet.'
      }
    }

    it('returns interpolated text for valid key', () => {
      const result = getUIText(mockConfig, 'actionPrompt', { action: 'examine' })
      expect(result).toBe('What would you like to examine?')
    })

    it('returns text without variables when no variables provided', () => {
      const result = getUIText(mockConfig, 'cannotLeaveMessage')
      expect(result).toBe('You cannot leave yet.')
    })

    it('returns key when text not found', () => {
      const result = getUIText(mockConfig, 'nonexistentKey')
      expect(result).toBe('nonexistentKey')
    })

    it('returns key when config has no ui property', () => {
      const configWithoutUI = {}
      const result = getUIText(configWithoutUI, 'actionPrompt')
      expect(result).toBe('actionPrompt')
    })

    it('returns key when ui property is null', () => {
      const configWithNullUI = { ui: null }
      const result = getUIText(configWithNullUI, 'actionPrompt')
      expect(result).toBe('actionPrompt')
    })

    it('handles empty variables object', () => {
      const result = getUIText(mockConfig, 'actionPrompt', {})
      expect(result).toBe('What would you like to {action}?')
    })
  })
})
