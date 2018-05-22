/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       webpack开发环境配置
 * */

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./config");

const proxy = process.env.DEV_PROXY || "192.168.32.101";

module.exports = {
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
  devtool: "eval-source-map",
  resolve: {
    modules: [config.path.nodeModulesPath],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
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
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=[hash].[ext]",
          {
            loader: "image-webpack-loader",
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: "65-90",
                speed: 4,
              },
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
    // 配置的全局常量
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(config.webpack.dev.env.NODE_ENV),
      },
    }),
    // 显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ hash: false, template: config.path.indexHtml }),
  ],
};
