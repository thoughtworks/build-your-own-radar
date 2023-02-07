module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['**/src/**/*.js'],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  testMatch: ['**/spec/**/*-spec.js'],
}
