const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ProgressWebpackPlugin = require("progress-webpack-plugin")
const path = require("path")



module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/build",
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.resolve("build"),
    compress: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new FaviconsWebpackPlugin({ logo: "./src/images/favicon.svg" }),
    new ProgressWebpackPlugin({}),
    new HtmlWebpackPlugin({
      appMountId: "app",
      files: { manifest: "manifest.json" },
      inject: false,
      links: ["https://fonts.googleapis.com/css?family=Montserrat:300,700"],
      mobile: true,
      template: require("html-webpack-template"),
      title: "Merry Christmas, Kidlets!",
    }),
  ]
};
