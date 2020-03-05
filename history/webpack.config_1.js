//webpack 是 node 写出来的， 要遵循 node的语模块化规范commonJS

//这个文件名为啥叫 webpack.config.js => 看 
// node_modules => webpack-cli => bin => config => config-yargs.js
//  => defaultDescription: "webpack.config.js or webpackfile.js",

const path = require("path");
// copy html 到 打包之后的目录，并注入打包之后的入口js文件
const HtmlWebpackPlugin = require("html-webpack-plugin")

// console.log(path.join(__dirname, "dist"))
// path: path.resolve(__dirname, "dist")
// console.log(path.resolve(__dirname))
// console.log(path.resolve("dist"))

module.exports = {
  devServer: {
    port: 3000,
    contentBase: "./build",
    progress: true,
    compress: true,
  },
  mode: "production",
  entry: "./src/index.js",//入口
  output: {
    filename: "bundle.[hash].js",//可以省略.js 吗?
    path: path.resolve("build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
      },
      hash: false
    })
  ]
}