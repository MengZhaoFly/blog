const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, '../dist/dll'),
    filename: '[name].dll.js', //打包文件的名字
    library: "_dll_[name]_[hash]" //可选 暴露出的全局变量名 var _dll_[name]_[hash] = {react, reactDom}
    // vendor.dll.js中暴露出的全局变量名。
  },
  plugins: [
    // path 指定manifest文件的输出路径 有哪些模块引用了 react react-dom
    new webpack.DllPlugin({
      path: path.join(__dirname, "../dist/dll", "[name]-manifest.json"),
      name: "_dll_[name]_[hash]"
    })
  ]
}