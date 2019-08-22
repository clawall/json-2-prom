module.exports = {
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.js$',
  automock: false,
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/test'
  ],
  globals: {
    __DEV__: true
  }
}
