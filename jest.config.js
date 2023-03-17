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
      statements: 21.9,
      branches: 18.07,
      functions: 24.16,
      lines: 22,
    },
  },
}
