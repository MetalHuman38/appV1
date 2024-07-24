const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Metal Production Mode'),
    }),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    open: true,
    hot: true,
  },
  optimization: {
    minimize: true,
    checkWasmTypes: false,
    concatenateModules: true,
    flagIncludedChunks: true,
    mangleExports: 'size',
    mergeDuplicateChunks: true,
    moduleIds: 'size',
    providedExports: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    sideEffects: true,
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      maxSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      name: false,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map',
      }),
      new webpack.ids.DeterministicChunkIdsPlugin({
        maxLength: 5,
      })
    ],
  },
};
