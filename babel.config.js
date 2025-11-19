const path = require('path');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  sourceMaps: true,
  env: {
    node: true,
  },
  plugins: [
    'react-native-reanimated/plugin',
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['babel-plugin-styled-components', { pure: true }],
    [
      'module:react-native-dotenv',
      {
        envName: 'completionist',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname, './')],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.js',
          '.jsx',
          '.json',
        ],
        alias: {
          '@components': path.resolve(__dirname, 'src/components/'),
          '@features': path.resolve(__dirname, 'src/features/'),
          '@data': path.resolve(__dirname, 'src/data/'),
          '@redux': path.resolve(__dirname, 'src/redux/'),
          '@navigation': path.resolve(__dirname, 'src/navigation/'),
          '@screens': path.resolve(__dirname, 'src/screens/'),
          '@animations': path.resolve(__dirname, 'src/animations/'),
          '@styles': path.resolve(__dirname, 'src/styles/'),
          '@utils': path.resolve(__dirname, 'src/utils/'),
        },
      },
    ],
  ],
};
