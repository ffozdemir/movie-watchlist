const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    index: "./src/index.js",
    watchlist: "./src/watchlist.js",
    /*  vendor: "./vendor.js", // Entry point for vendor libraries */
  },
  plugins: [
    new Dotenv({ systemvars: true }), // Loads .env file
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Source HTML file
      chunks: ["index"], // Which bundle to include
      filename: "index.html", // Output HTML file
      inject: "body", // Inject scripts into the body
    }),
    new HtmlWebpackPlugin({
      template: "./src/watchlist.html", // Source HTML file
      chunks: ["watchlist"], // Which bundle to include
      filename: "watchlist.html", // Output HTML file
      inject: "body", // Inject scripts into the body
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource", // Process image files
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
            options: {
              esModule: false, // Use CommonJS syntax for HTML files
            },
          },
        ], // Process HTML files
      },
    ],
  },
};
