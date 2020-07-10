/* eslint-disable import/no-unresolved */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const banner = require('./scripts/banner');
const Package = require('../../package.json');

const ROOT_DIR = process.cwd();

module.exports = {
  entry: [
    `${path.resolve(ROOT_DIR, 'Client/src/js/index.js')}`,
    `${path.resolve(ROOT_DIR, 'Client/src/sass/main.scss')}`,
  ],
  output: {
    filename: 'js/main.js',
    path: path.join(ROOT_DIR, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader', 'eslint-loader'] },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[ext]', // Output below ./fonts
          publicPath: '../', // Take the directory into account
        },
      },
      {
        test: /\.(ico)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: './[name].[ext]', // Output below ./fonts
          publicPath: '../', // Take the directory into account
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', path.resolve(__dirname, 'Client/src/js')],
    alias: {
      components: path.resolve(ROOT_DIR, 'Client/src/js/components'),
      utils: path.resolve(ROOT_DIR, 'Client/src/js/utils'),
      context: path.resolve(ROOT_DIR, 'Client/src/js/context'),
      actions: path.resolve(ROOT_DIR, 'Client/src/js/actions'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({ banner }),
    new HtmlWebpackPlugin({
      title: Package.author,
      // inject: false,
      template: path.join(ROOT_DIR, 'Client', 'src', 'templates', 'index.ejs'),
      // template: require("html-webpack-template"),
      favicon: path.resolve(ROOT_DIR, 'Client', 'src', 'img', 'favicon.ico'),
      meta: {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      googleAnalytics: {
        trackingId: 'UA-61042044-1',
        pageViewOnLoad: true,
      },
    }),
    new FaviconsWebpackPlugin({
      logo: './Client/src/img/logo.svg',
      favicons: {
        appName: 'Think Studio',
        appShortName: 'TS',
        appDescription: 'Krzysztof Kamieniecki webdeveloper',
        developerName: 'Krzysztof Kamieniecki',
        lang: 'en-US',
        background: '#f9f8f0',
        theme_color: '#ec450b',
        display: 'standalone',
        appleStatusBarStyle: 'black-translucent',
        orientation: 'any',
        start_url: '/',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          windows: true,
          yandex: true,
        },
      },
    }),
  ],
};
