module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  testMatch: ['**/spec/**/*-spec.js'],
  coverageThreshold: {
    global: {
      statements: 23.95,
      branches: 20.08,
      functions: 28.98,
      lines: 24.09,
    },
  },
}
