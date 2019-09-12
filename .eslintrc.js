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
