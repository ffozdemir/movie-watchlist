const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

// This is the development configuration for Webpack.

const dev = {
  mode: "development",
  output: {
    filename: "./js/[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "./dist",
    port: 8080,
    open: true, // Automatically open the browser
    hot: true, // Enable Hot Module Replacement
  },
  devtool: "eval-source-map", // Helps with debugging#
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Process CSS files
      },
    ],
  },
};

module.exports = merge(common, dev);
