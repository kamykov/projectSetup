const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const Package = require("../package.json");
const ROOT_DIR = process.cwd();

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: "./dist/",
    port: 3501,
    hot: true,
    open: true,
    watchOptions: {
      ignored: /(node_modules|dist)/
    },
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
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
    new webpack.BannerPlugin({ banner: "Think Studio" }),
    new HtmlWebpackPlugin({
      title: Package.description,
      inject: false,
      template: path.join(ROOT_DIR, "src", "templates", "index.ejs")
      //template: require("html-webpack-template")
    }),
    new webpack.DefinePlugin({
      __BASE__: JSON.stringify("GLOBAL VAR!!!")
    })
  ]
});
