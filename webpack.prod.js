const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (theme) => {
    return {
        mode: 'production',
        entry: {
            'jui-grid': path.resolve(__dirname, 'bundles', `production.${theme}.js`)
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js'
        },
        externals: {
            jquery: 'jQuery',
            'juijs': 'jui'
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
            minimizer: [
                new UglifyJsPlugin(),
                new ExtractTextPlugin({
                    filename: `[name].${theme}.css`
                })
            ]
        },
        plugins: [
            new OptimizeCssAssetsPlugin(),
            new BundleAnalyzerPlugin()
        ]
    }
}