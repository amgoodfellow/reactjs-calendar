const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  //input
  entry: "./src/App.js",

  //output
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
    libraryTarget: "umd",
    library: "reactjs-calendar"
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Project",
      template: "./src/index.ejs"
    })
  ]
}
