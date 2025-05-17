const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
/* const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); */

// This is the production configuration for Webpack.

const prod = {
  mode: "production",
  output: {
    filename: "./js/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Clean the dist folder before each build
    assetModuleFilename: "img/[hash][ext][query]", // Output images with a hash in the filename
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Process CSS files, For Sass, use 'sass-loader' instead of 'css-loader'
      },
      {
        test: /\.(?:js|mjs|cjs)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // Transpile modern JavaScript to older versions
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].[contenthash].css", // Output CSS file with a hash in the filename
    }),
  ],

  optimization: {
    minimize: true, // Minify the output
    /*   minimizer: [
      new TerserPlugin(), // Minify JavaScript
      new CssMinimizerPlugin(), // Minify CSS
    ], */
    splitChunks: {
      chunks: "all", // Split code into separate chunks
    },
  },
};

module.exports = merge(common, prod);
