const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = (theme) => {
    const entry = path.resolve(__dirname, 'bundles', `production.${theme}.js`);

    return {
        mode: 'production',
        entry: {
            'jui-grid': entry,
            'jui-grid.min': entry
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
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'env' ]
                    }
                }]
            }, {
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
                            limit: 1024 * 1024
                        }
                    }
                ]
            }]
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    include: /\.min\.js$/
                }),
                new ExtractTextPlugin({
                    filename: `[name].${theme}.css`
                })
            ]
        },
        plugins: [
            new OptimizeCssAssetsPlugin()
        ]
    }
}