module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': false,
        'optionalDependencies': false,
        'peerDependencies': false,
        'packageDir': './'
      }],
  }
}
