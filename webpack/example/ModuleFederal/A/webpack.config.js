const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: "./main.js",
  mode: "development",
  output: {
    publicPath: "auto",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3002,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new ModuleFederationPlugin({
      name: "app_a",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./Button",
      },
      shared: {
        react: { singleton: true,eager: true },
      },
    }),
  ],
};