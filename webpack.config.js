const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./client",
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, "client")],
        loaders: "babel-loader"
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    port: 3000,
    host: "localhost"
  }
};
