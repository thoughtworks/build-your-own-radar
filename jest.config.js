module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    // Same origin as urlUtils tests so `history.replaceState` can set location without SecurityError.
    url: 'https://thoughtworks.com/',
  },
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  // sanitize-html's htmlparser2 dependency chain ships ESM-only, so it needs babel transpilation too.
  transformIgnorePatterns: [
    '/node_modules/(?!.*(?:dom-serializer|domelementtype|domhandler|domutils|entities|htmlparser2)/)',
  ],
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
