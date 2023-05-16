const {ModuleFederationPlugin} = webpack.container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "app_a",
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./Button",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
  ],
};