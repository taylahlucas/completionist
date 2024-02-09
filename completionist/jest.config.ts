// module.exports = {
//   preset: 'react-native',
//   testEnvironment: 'node',
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	// moduleNameMapper: {
	// 	'^@components/(.*)$': '<rootDir>/src/components/$1',
	// 	'^@data/(.*)$': '<rootDir>/src/data/$1',
	// 	'^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
	// 	'^@redux/(.*)$': '<rootDir>/src/redux/$1',
	// 	'^@screens/(.*)$': '<rootDir>/src/screens/$1',
	// 	'^@styles/(.*)$': '<rootDir>/src/styles/$1',
	// 	'^@utils/(.*)$': '<rootDir>/src/utils/$1',
	// },
//   transform: {
//     "^.+\\.js$": "babel-jest",
// 		'\\.(ts|tsx)$': 'ts-jest'
//   },  
// 	setupFiles: ['<rootDir>/src/utils/test-helper/setupReactAdapter.native.tsx'],
// 	testPathIgnorePatterns: ['node_modules'],
//   setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
// 	testEnvironment: 'jest-environment-node',
	// transformIgnorePatterns: [
	// 	'/node_modules/(?!(@react-native|react-native)/).*/',
  //   'node_modules/(?!(jest-)?@react-native|react-native|@react-native-community|@react-navigation/.*)'
  // ],
// };

import { defaults as tsjPreset } from 'ts-jest/presets'
import type { JestConfigWithTsJest } from 'ts-jest'

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
	setupFiles: ['<rootDir>/src/utils/test-helper/setupReactAdapter.native.tsx'],
	setupFilesAfterEnv: ['<rootDir>/src/utils/test-helper/setupTests.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
	moduleNameMapper: {
		'^@components/(.*)$': '<rootDir>/src/components/$1',
		'^@data/(.*)$': '<rootDir>/src/data/$1',
		'^@navigation/(.*)$': '<rootDir>/src/navigation/$1',
		'^@redux/(.*)$': '<rootDir>/src/redux/$1',
		'^@screens/(.*)$': '<rootDir>/src/screens/$1',
		'^@styles/(.*)$': '<rootDir>/src/styles/$1',
		'^@utils/(.*)$': '<rootDir>/src/utils/$1',
	},
	modulePathIgnorePatterns: ['.*\\.spec\\.(js|ts|tsx)$'],
	testEnvironment: 'jest-environment-node',
	globals: {
    window: {}
  },
	transformIgnorePatterns: [
		'/node_modules/(?!(@react-native|react-native)/).*/',
    'node_modules/(?!(jest-)?@react-native|react-native|@react-native-community|@react-navigation/.*)'
  ]
}

export default jestConfig