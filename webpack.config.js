// Require path.
const path = require('path');

/**
 * WordPress Dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');

// Configuration object.
const config = {
    ...defaultConfig,
    entry: {
        admin: './src/admin/settings.tsx',
        'block-payment': './src/block-payment/index.ts',
    },

    output: {
        // [name] will be replaced by the entry key above.
        filename: '[name]/index.js',
        // The path to the output files.
        path: path.resolve(__dirname, 'build'),
    },

    // module: {
    //     ...defaultConfig.module,
    //     rules: [
    //         ...defaultConfig.module.rules,
    //         {
    //             test: /\.scss$/,
    //             use: ['style-loader', 'css-loader', 'sass-loader']
    //         },
    //         {
    //             test: /\.css$/,
    //             use: ['style-loader', 'css-loader']
    //         },
    //     ]
    // },
    // resolve: {
    //     extensions: ['.ts', '.tsx', ...(defaultConfig.resolve ? defaultConfig.resolve.extensions || ['.js', '.jsx'] : [])]
    // },
};

// Export the config object.
module.exports = config;
