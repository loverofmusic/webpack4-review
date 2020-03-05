const path = require("path");
// copy html 到 打包之后的目录，并注入打包之后的入口js文件
const HtmlWebpackPlugin = require("html-webpack-plugin");
//将css单独抽离出来
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devServer: {
    port: 3000,
    contentBase: "./build",
    progress: true,
    compress: true
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
      filename: main.css
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
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader", 
          "less-loader"
        ]
      }
    ]
  }
};