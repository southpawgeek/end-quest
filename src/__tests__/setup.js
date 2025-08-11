import '@testing-library/jest-dom'

/**
 * Test setup configuration for the game engine
 */

// Mock PIXI.js for testing
jest.mock('@pixi/react', () => ({
  Stage: ({ children, ...props }) => (
    <div data-testid="pixi-stage" {...props}>
      {children}
    </div>
  ),
  Sprite: ({ ...props }) => (
    <div data-testid="pixi-sprite" {...props} />
  )
}))

// Mock use-sound for testing
jest.mock('use-sound', () => ({
  __esModule: true,
  default: () => [jest.fn(), { sound: { play: jest.fn() } }]
}))

// Mock react-typed for testing
jest.mock('react-typed', () => ({
  ReactTyped: ({ strings, ...props }) => (
    <div data-testid="react-typed" {...props}>
      {Array.isArray(strings) ? strings[0] : strings}
    </div>
  )
}))

// Global test utilities
global.console = {
  ...console,
  // Suppress console.error in tests unless explicitly needed
  error: jest.fn(),
  warn: jest.fn()
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
