/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       webpack开发环境配置
 * */

const webpack = require("webpack");
const HappyPack = require("happypack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./config");

const proxy = process.env.DEV_PROXY || "192.168.32.101";

module.exports = {
  mode: "development",
  entry: ["babel-polyfill", config.path.entry],
  devServer: {
    hot: true,
    contentBase: config.root,
    port: config.webpack.dev.devServer.port,
    host: "0.0.0.0",
    publicPath: "/",
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      "/novel": {
        target: `http://juhe.im`,
        changeOrigin: true,
      },
      "/chapter": {
        target: `http://chapterup.zhuishushenqi.com`,
        changeOrigin: true,
      },
    },
  },
  output: {
    path: config.path.distPath,
    publicPath: config.webpack.publicPath,
    filename: "app.[hash].js",
  },
  devtool: "eval",
  resolve: {
    modules: [config.path.nodeModulesPath],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "happypack/loader?id=babel",
      },
      {
        test: /\.less|css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "px2rem-loader",
            options: {
              remUnit: config.webpack.remUnit,
            },
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: config.modifyVars,
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    // 多进程
    new HappyPack({
      id: "babel",
      loaders: ["babel-loader"],
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // html模板
    new HtmlWebpackPlugin({ hash: false, template: config.path.indexHtml }),
  ],
};
