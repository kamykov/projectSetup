const path = require("path");
const webpack = require("webpack");

console.log(path.join(process.cwd(), "dist"));
console.log(path.join(__dirname, "dist"));

const params = require("yargs").options({
  ts: {
    default: "TS"
  }
}).argv;

console.log("yargs: (%s)", params.ts);
console.log("yargs._: ", params._);
//console.log("__BASE__" + __BASE__);

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
  plugins: []
};
