const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/lib/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    libraryTarget: "umd",
    library: "MyLibrary",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      react: path.resolve(__dirname, "node_modules/react@{desired_version}"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom@{desired_version}"),
    },
  },
  optimization: {
    minimize: true, // Enable code minification
  },
};
