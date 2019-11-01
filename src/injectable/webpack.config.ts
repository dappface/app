import path from 'path'
import {JsonifyWebpackPlugin} from 'jsonify-webpack-plugin'

export default {
  mode: 'development',
  entry: './src/injectable/index.ts',
  output: {
    filename: 'injectable.js',
    path: path.resolve(__dirname, '../../lib'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [new JsonifyWebpackPlugin(['injectable.js'])],
  resolve: {
    extensions: ['.ts', '.json'],
  },
}
