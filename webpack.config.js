const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts|\.tsx$/, use: 'ts-loader',
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/env",
                            "@babel/preset-typescript",
                        ]
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [
            '.tsx', '.ts', '.js',
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
    ],
}

const indexConfig = Object.assign({}, config, {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            minify: true,
        }),
    ],
});

const authConfig = Object.assign({}, config, {
    entry: './src/auth.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/auth'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/auth.html',
            filename: 'index.html',
            minify: true,
        }),
    ],
});

module.exports = [indexConfig, authConfig];
/*
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.ts',
        auth: './src/auth.ts',
    },
    module: {
        rules: [
            {
                test: /\.ts|\.tsx$/, use: 'ts-loader',
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/env",
                            "@babel/preset-typescript",
                        ]
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [
            '.tsx', '.ts', '.js',
        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            // favicon: './public/favicon.png',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './public/auth.html',
            // favicon: './public/favicon.png',
            inject: true,
            chunks: ['auth'],
            filename: 'auth.html'
        }),
        new CleanWebpackPlugin(),
    ]
};
*/