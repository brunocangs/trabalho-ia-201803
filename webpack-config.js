const path = require('path');

module.exports = {
    entry: {
        trabalho: path.resolve(__dirname, 'src', 'index.js')
    },
    output: {
        filename: 'trabalho.js',
        path: __dirname
    },
    target: 'node',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            }
        ]
    }
};