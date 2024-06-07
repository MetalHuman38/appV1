const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, '..', 'src/server/server.ts'),
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
};
