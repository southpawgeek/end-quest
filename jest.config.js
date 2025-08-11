export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__tests__/__mocks__/fileMock.js',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{test,spec}.{js,jsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx}'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.d.ts',
    '!src/main.jsx',
    '!src/App.jsx',
    '!src/data.js'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/src/__tests__/setup.js',
    '/src/__tests__/__mocks__/'
  ]
}
