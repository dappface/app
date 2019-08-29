const extraNodeModules = require('node-libs-browser')
const blacklist = require('metro-config/src/defaults/blacklist')

module.exports = {
  resolver: {
    extraNodeModules,
    getBlacklistRE: blacklist(['lib/*', 'dist/injected.js'])
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-typescript-transformer'),
  },
  sourceExts: ['ts', 'tsx']
}
