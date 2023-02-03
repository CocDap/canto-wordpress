// Require path.
const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * WordPress Dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');

// Configuration object.
const config = {
    ...defaultConfig,
    // entry: {
    //     ...defaultConfig.entry,
    //     // admin: './src/admin/admin.js',
    //     // 'block-payment': './src/block-payment/index.jsx',
    // },
    // output: {
    //     // [name] will be replaced by the entry key above.
    //     filename: '[name]/index.js',

    //     // The path to the output files.
    //     path: path.resolve(__dirname, 'build'),
    // },
    plugins: [
        ...defaultConfig.plugins,
        // clear out build directories on each build
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                './js/build/*',
                './css/build/*'
            ]
        }),

    ],
    // module: {
    //     ...defaultConfig.module,
    //     rules: [
    //         ...defaultConfig.module.rules,
    //         // {
    //         //     test: /\.(js|jsx)$/,
    //         //     exclude: /node_modules/,
    //         //     use: ['babel-loader']
    //         // },
    //         // {
    //         //     test: /\.s[ac]ss$/i,
    //         //     use: [
    //         //         // Creates `style` nodes from JS strings
    //         //         "style-loader",
    //         //         // Translates CSS into CommonJS
    //         //         "css-loader",
    //         //         // Compiles Sass to CSS
    //         //         "sass-loader",
    //         //     ],

    //         // },
    //     ]
    // },
};

// Export the config object.
module.exports = config;
