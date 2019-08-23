const webpack = require("webpack");
const merge = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const reporter = require("./scripts/reporter");

const devConfig = require("./dev.js.js");

const compiler = webpack(
  merge(devConfig, {
    plugins: [new BundleAnalyzerPlugin()]
  })
);

compiler.run(reporter);
