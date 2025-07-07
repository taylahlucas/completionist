import { defaults as tsjPreset } from 'ts-jest/presets';
import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  ...tsjPreset,
  verbose: true,
  preset: 'react-native',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
  setupFiles: [
    '<rootDir>/src/utils/testing/test-helper/setup-react-adapter.tsx',
    '<rootDir>/src/utils/testing/test-helper/__mocks__/react-native-google-signin.js',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@data/(.*)$': '<rootDir>/src/data/$1',
    '^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
    '^@redux/(.*)$': '<rootDir>/src/redux/$1',
    '^@screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  },
  modulePathIgnorePatterns: ['.*\\.spec\\*.(js|ts|tsx)$'],
  testEnvironment: 'jest-environment-node',
  globals: {
    window: {},
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-native|react-native-vector-icons|@react-native-community|@react-navigation/.*)',
  ],
};

export default jestConfig;
