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
    library: "_dll_[name]_[hash]" //可选 暴露出的全局变量名 这里 以 var _dll_vendor_b19a33e7638ec587bce4 | this.x | window.xx
    // vendor.dll.js中暴露出的全局变量名。
  },
  plugins: [
    // path 指定manifest文件的输出路径
    new webpack.DllPlugin({
      path: path.join(__dirname, "../dist/dll", "[name]-manifest.json"),
      name: "_dll_[name]_[hash]"
    })
  ]
}