// Require path.
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

/**
 * WordPress Dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');

// Configuration object.
const config = {
    ...defaultConfig,
    entry: {
        admin: './src/admin/index.js',
        'block-payment': './src/block-payment/index.js',
    },
    output: {
        // [name] will be replaced by the entry key above.
        filename: '[name]/index.js',

        // The path to the output files.
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        ...defaultConfig.plugins,
        // clear out build directories on each build
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                './js/build/*',
                './css/build/*'
            ]
        }),
        // css extraction into dedicated file
        new MiniCssExtractPlugin({
            filename: './css/build/main.min.[fullhash].css'
        }),
    ],
    module: {
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            // sass compilation
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                generator: {
                    filename: './css/build/[name][ext]',
                }
            },
            // loader for webfonts (only required if loading custom fonts)
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: './css/build/font/[name][ext]',
                }
            },
            // loader for images and icons (only required if css references image files)
            {
                test: /\.(png|jpg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: './css/build/img/[name][ext]',
                }
            },
            // // load for block.json files
            // {
            //     test: /block\.json$/,
            //     type: 'javascript/auto',
            //     use: [
            //         {
            //             loader: '@wordpress/block-json-loader',
            //             options: {
            //                 context: __dirname,
            //             },
            //         },
            //     ],
            //     generator: {
            //         filename: './[name]/block.json',
            //     }
            // },
        ]
    },
    optimization: {
        // minification - only performed when mode = production
        minimizer: [
            // css minification
            new CssMinimizerPlugin(),
        ]
    },
};

// Export the config object.
module.exports = config;
