const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./config.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist/',
    port: 3501,
    hot: true,
    open: true,
    watchOptions: {
      ignored: /(node_modules|dist)/,
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __BASE__: JSON.stringify('GLOBAL VAR!!!'),
    }),
  ],
});
