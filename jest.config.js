module.exports = {
  cacheDirectory: '.jest/cache',
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx'
  ],
  coveragePathIgnorePatterns: [
    '.*\\.d\\.ts',
    '<rootDir>/node_modules/',
    'src/const/',
    'src/i18n/',
    'src/realm/schemas/'
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx'
  ],
  moduleNameMapper: {
    "^src/(.+)": "<rootDir>/src/$1"
  },
  preset: 'react-native',
  testPathIgnorePatterns: [
    '\\.snap$',
    '<rootDir>/node_modules/'
  ],
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest'
  }
}
