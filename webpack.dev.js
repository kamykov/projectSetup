const path =  require ('path')
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT_DIR = process.cwd();

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    port: 3501,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Setup Project",
      inject: false,
      template: path.join(ROOT_DIR, 'src', 'index.ejs'),
      //template: require("html-webpack-template"),
      bodyHtmlSnippet: '<main class="main" id="app"></main>'
    })
  ]
});
