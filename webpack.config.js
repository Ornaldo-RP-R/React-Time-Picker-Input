const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/lib/index.js", // Entry point of your package
  output: {
    filename: "index.js",
    path: __dirname + "/dist",
    libraryTarget: "umd",
    library: "YourPackageName",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    chrome: "49", // Set Chrome 49 as the target
                  },
                  useBuiltIns: "usage",
                  corejs: "3.20.3",
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
};
