//https://webpack.js.org/configuration/
var webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const path = require("path");

const isDevelopment = process.env.NODE_ENV !== "production";

//const outputFolder = ../../portal_frontend/assets/uids";
const outputFolder = "site/build";

module.exports = {
  entry: {
    uids: "./src/uids/uids.js",
    navbar: "./src/uids/navbar.js",
    vendor: "./src/vendor/bootstrap/vendor.js",
    custom: "./src/custom/custom.js"
  },
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: false,
              sourceMap: isDevelopment
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff2?|otf|svg|png|jpg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WebpackAssetsManifest(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].css"
     // filename: isDevelopment ? "[name].css" : "[name].[hash].css",
     // chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css"
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".vue", "json", "scss"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve("src")
    }
  },
  output: {
    //filename: isDevelopment ? "[name].js" : "[name].[hash].js",
    filename: isDevelopment ? "[name].js" : "[name].js",
    path: path.resolve(__dirname, outputFolder)
  }
};
