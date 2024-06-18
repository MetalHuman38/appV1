const webpack = require('webpack');
const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Metal Brain'),
    }),
    new RefreshWebpackPlugin(),
  ],
  devServer: {
    compress: true,
    open: true,
    hot: true,
    port: 8080,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:8081',
        secure: true,
      },
    ],
    historyApiFallback: true,
  },
};
