module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['<rootDir>/src/graphing/components/'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  testMatch: ['**/spec/**/*-spec.js'],
  coverageThreshold: {
    global: {
      statements: 19.88,
      branches: 11.5,
      lines: 20.01,
      functions: 22.04,
    },
  },
}
