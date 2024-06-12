const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const customErrorFormatter = require('./errorFormatter');

module.exports = {
  mode: 'development',
  entry: [path.resolve(__dirname, '..', 'src/server/server.ts')],
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Server Development',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts'],
    },
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          errorFormatter: customErrorFormatter,
        },
      },
    ],
  },
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
};

// module.exports = config;
