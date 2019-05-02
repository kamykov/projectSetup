const path = require("path");

console.log(path.join(process.cwd(), "dist"));
console.log(path.join(__dirname, "dist"));

module.exports = {
  entry: ["./src/js/index.js", "./src/sass/main.scss"],
  output: {
    filename: "js/main.js",
    path: path.join(process.cwd(), "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: ['babel-loader','eslint-loader']
      // },
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
      }
    ]
  }
};
