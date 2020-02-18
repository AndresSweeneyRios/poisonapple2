const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

module.exports = {
    // chainWebpack (config) {
    //     config.plugin('html').tap(
    //         args => {
    //             Object.assign(args[0], {
    //                 inlineSource: '.(js|css)$'
    //             })

    //             return args
    //         }
    //     )
    // },

    // configureWebpack: {
    //     plugins: [
    //         new HtmlWebpackInlineSourcePlugin()
    //     ]
    // }
}