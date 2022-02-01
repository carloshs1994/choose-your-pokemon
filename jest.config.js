const { defaults } = require('jest-config');

module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // ...
  moduleNameMapper: {
    '^.+\\.svg$': '<rootDir>/src/scripts/modules/__mocks__/svgMock.js',
  },
};