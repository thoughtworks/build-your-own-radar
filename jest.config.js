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
      statements: 22.22,
      branches: 18.07,
      functions: 24.63,
      lines: 22.36,
    },
  },
}
