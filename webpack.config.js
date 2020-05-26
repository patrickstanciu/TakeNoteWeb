const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");

const env = process.env.WEBPACK_MODE || "development";
const outputPath = "dist";

module.exports = {
  entry: {
    bundle: ["./src/js/index.js", "./src/scss/styles.scss"]
  },
  output: {
    path: path.resolve(__dirname, outputPath)
  },
  module: {
    rules: [
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  debug: true
                }
              ]
            ]
          }
        }
      },
      {
        test: [/.scss$/],
        exclude: /(node_modules)/,
        use: [
          //'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: env,
              minimize: true
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "media/images/[name].[ext]"
        }
      },
      {
        test: [/.(woff|woff2|eot|ttf|otf)$/],
        loader: "file-loader",
        options: {
          name: "media/fonts/[name].[ext]"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              interpolate: true
            }
          }
        ]
      }
    ]
  },
  /***
   * Remove devServer
   * after migrating to Laravel
   */
  devServer: {
    contentBase: path.join(__dirname, outputPath),
    compress: false,
    port: 8080
  },
  plugins: [
    /***
     * Remove
     * WebpackNotifierPlugin
     * RemovePlugin
     * WriteFilePlugin
     * CopyPlugin
     * after migrating to Laravel
     */
    new WebpackNotifierPlugin(),
    new RemovePlugin({
      before: {
        include: [outputPath]
      },
      after: {}
    }),
    new WriteFilePlugin(),
    new CopyPlugin([
      { from: "media", to: "media" },
      { from: ".htaccess" },
      { from: "contact.php" }
    ]),
    new MinifyPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new OptimizeCSSAssetsPlugin({}),
    /***
     * Remove HtmlWebpackPlugin
     * after migrating to Laravel
     */
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: "./404.html",
      filename: "404.html",
      inject: false
    })
  ]
};
