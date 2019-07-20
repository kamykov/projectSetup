const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./config.js");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    new CleanWebpackPlugin({ dry: true }),
    new webpack.BannerPlugin(banner),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    })
  ]
});
