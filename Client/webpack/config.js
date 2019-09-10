const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const banner = require("./scripts/banner");
const Package = require("../package.json");
const ROOT_DIR = process.cwd();

const params = require("yargs").options({
  ts: {
    default: "TS"
  }
}).argv;

module.exports = {
  entry: ["./src/js/index.js", "./src/sass/main.scss"],
  output: {
    filename: "js/main.js",
    path: path.join(process.cwd(), "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "./fonts/[name].[ext]", // Output below ./fonts
          publicPath: "../" // Take the directory into account
        }
      },
      {
        test: /\.(ico)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: "./[name].[ext]", // Output below ./fonts
          publicPath: "../" // Take the directory into account
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({ banner }),
    new HtmlWebpackPlugin({
      title: Package.description,
      // inject: false,
      template: path.join(ROOT_DIR, "src", "templates", "index.ejs"),
      //template: require("html-webpack-template"),
      favicon: path.resolve(ROOT_DIR, "src", "img", "favicon.ico"),
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, shrink-to-fit=no"
        }
      ],
      googleAnalytics: {
        trackingId: "UA-61042044-1",
        pageViewOnLoad: true
      }
    })
  ]
};
