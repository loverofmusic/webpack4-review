const path = require("path");
// copy html 到 打包之后的目录，并注入打包之后的入口js文件 插入html的body标签下面
const HtmlWebpackPlugin = require("html-webpack-plugin");
//将css单独抽离出来, 并插入head标签下面
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//压缩js
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
  devServer: {
    port: 3000,
    contentBase: "./build",
    progress: true,
    compress: true
  },
  optimization: {//优化项
    minimizer: [//压缩
      new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})
    ]
  },
  mode: "development",
  entry: "./src/index.js", //入口
  output: {
    filename: "bundle.js", //可以省略.js 吗?
    path: path.resolve("build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false
      },
      hash: false
    }),
    new MiniCssExtractPlugin({
      filename: "main.css"
    })
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          // {
          //   loader: "style-loader"
          //   // options: {
          //   //   insert: "top"
          //   // }
          // },
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader", 
          "postcss-loader",
          "less-loader"
        ]
      }
    ]
  }
};