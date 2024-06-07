const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('Metal Production Mode')
        }),
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        open: true,
        hot: true
    }
}