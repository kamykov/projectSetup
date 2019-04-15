const path =  require ('path')
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const Package = require("../package.json");
const ROOT_DIR = process.cwd();

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
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
          { loader: "style-loader"
          },
          {
            loader: "css-loader",
                         
                 options: {
                   modules: true,
                 },
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
      title: Package.description,
      inject: false,
      template: path.join(ROOT_DIR, 'src', 'index.ejs'),
      //template: require("html-webpack-template"),
      bodyHtmlSnippet: '<main class="main" id="app"></main>'
    })
  ]
});
