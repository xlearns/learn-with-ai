const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: "./main.js",
  mode: "development",
  output: {
    publicPath: "auto",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3001,
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
      name: "app_b",
      filename: "remoteEntry.js",
      remotes: {
        // 模块名@模块所在服务器/自定义名称.js
        app_a: "app_a@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: { singleton: true,eager: true },
      },
    }),
  ],
};

