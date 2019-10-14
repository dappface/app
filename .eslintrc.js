module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    '@typescript-eslint/no-use-before-define': 'off',
    'consistent-return': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: false,
        peerDependencies: false,
        packageDir: './',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
          '__schema',
          '__typename',
        ],
      },
    ],
    'no-use-before-define': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./'],
      },
    },
  },
}
