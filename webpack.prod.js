const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (theme) => {
    return {
        mode: 'production',
        entry: {
            vendors: [ 'jquery', 'juijs' ],
            'jui-grid': path.resolve(__dirname, 'src/bundles', `production.${theme}.js`)
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        },
        module: {
            rules: [{
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    fallback: "style-loader"
                })
            }, {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10
                        }
                    }
                ]
            }]
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        enforce: true,
                        chunks: 'all'
                    }
                }
            },
            minimizer: [
                new UglifyJsPlugin(),
                new ExtractTextPlugin({
                    filename: `[name].${theme}.css`
                })
            ]
        }
    }
}