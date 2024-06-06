const { plugin } = require('postcss');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('Metal Production Mode')
        })
    ],
    devServer: {
        open: true,
        hot: true
    }
}