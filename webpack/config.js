const path = require("path");

module.exports = {
  entry: ["./src/js/index.js", "./src/sass/main.scss"],
  output: {
    filename: "js/main.js",
    path: path.join(process.cwd(), "dist")
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
