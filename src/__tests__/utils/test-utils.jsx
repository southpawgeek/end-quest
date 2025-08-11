import React from 'react'
import { render } from '@testing-library/react'
import { GameProvider } from '../../components/GameProvider'

/**
 * Custom render function that includes the GameProvider
 */
export const renderWithGameProvider = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <GameProvider>
      {children}
    </GameProvider>
  )
  return render(ui, { wrapper: Wrapper, ...options })
}

/**
 * Mock game data for testing
 */
export const mockGameData = {
  config: {
    actions: ['examine', 'use', 'hit'],
    startingRoom: 'test-room',
    epilogueRoom: 'epilogue',
    ui: {
      actionPrompt: 'What would you like to {action}?',
      cannotLeaveMessage: 'You cannot leave yet.'
    }
  },
  content: {
    actionSets: {
      testInteractable: {
        examine: {
          description: ['This is a test object.']
        }
      }
    },
    rooms: {
      'test-room': {
        key: 'test-room',
        name: 'Test Room',
        image: 'test.png',
        description: ['This is a test room.'],
        exits: {},
        interactables: []
      }
    },
    tasks: [
      {
        key: 'test-task',
        name: 'Test Task'
      }
    ]
  }
}

/**
 * Mock room data for testing
 */
export const mockRoom = {
  key: 'test-room',
  name: 'Test Room',
  image: 'test.png',
  description: ['This is a test room.'],
  exits: { a2: 'other-room' },
  interactables: [
    {
      name: 'test-object',
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      actions: {
        examine: {
          description: ['This is a test object.']
        }
      }
    }
  ]
}

/**
 * Mock interactable data for testing
 */
export const mockInteractable = {
  name: 'test-object',
  x: 100,
  y: 100,
  width: 50,
  height: 50,
  actions: {
    examine: {
      description: ['This is a test object.']
    },
    use: {
      nextRoom: 'other-room'
    }
  }
}

/**
 * Utility to wait for async operations
 */
export const waitFor = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Utility to simulate user interactions
 */
export const userEvent = {
  click: (element) => {
    element.click()
  },
  keyDown: (element, key) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key }))
  }
}
