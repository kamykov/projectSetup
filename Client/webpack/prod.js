const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./config.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Package = require("../package.json");
const path = require("path");
const ROOT_DIR = process.cwd();

const banner = require("./scripts/banner");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin(banner),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new HtmlWebpackPlugin({
      title: Package.description,
      inject: false,
      template: path.join(ROOT_DIR, "src", "templates", "index.ejs")
    })
  ]
});
