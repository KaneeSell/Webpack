const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require("path");

module.exports = {
    mode: modoDev ? 'development': 'production',
    entry: "./src/principal.js",
    output: {
        filename: "principal.js",
        path: __dirname + "/public"
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "public")
        },
        port: 9000
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6,
                },
            }),
            new CssMinimizerPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "estilo.css"
        })
    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                //'style-loader', //Adiciona CSS a DOM injetando a tag <styles>
                'css-loader', //Interpreta @import, url()...
                'sass-loader'
            ]
        }],
    }
}