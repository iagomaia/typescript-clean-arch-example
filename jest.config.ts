export default {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.protocols.ts',
    '!<rootDir>/src/**/index.ts'
  ],
  coverageDirectory: 'coverage',
  roots: [
    '<rootDir>/src'
  ],
  presets: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
