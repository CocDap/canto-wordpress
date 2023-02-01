// Require path.
const path = require('path');

/**
 * WordPress Dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');

// Configuration object.
const config = {
    ...defaultConfig,
    // Create the entry points.
    // One for frontend and one for the admin area.
    entry: {
        // frontend and admin will replace the [name] portion of the output config below.
        // frontend: './src/front/front-index.js',
        admin: './src/admin/settings.js',
        "block-payment": "./src/block-payment/index.js"
    },

    // Create the output files.
    // One for each of our entry points.
    output: {
        // [name] will be replaced by the entry key above.
        filename: '[name]/index.js',
        // The path to the output files.
        path: path.resolve(__dirname, 'build'),
    },
}

// Export the config object.
module.exports = config;
