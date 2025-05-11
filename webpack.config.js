const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development", // or 'production'
  entry: {
    index: "./index.js",
    watchlist: "./watchlist.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clean the dist folder before each build
  },
  devServer: {
    static: "./dist",
    port: 8080,
    open: true, // Automatically open the browser
    hot: true, // Enable Hot Module Replacement
  },
  plugins: [
    new Dotenv({ systemvars: true }), // Loads .env file
    new HtmlWebpackPlugin({
      template: "./index.html", // Source HTML file
      chunks: ["index"], // Which bundle to include
      filename: "index.html", // Output HTML file
    }),
    new HtmlWebpackPlugin({
      template: "./watchlist.html", // Source HTML file
      chunks: ["watchlist"], // Which bundle to include
      filename: "watchlist.html", // Output HTML file
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Process CSS files
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource", // Process image files
      },
    ],
  },
  devtool: "inline-source-map", // Helps with debugging
};
