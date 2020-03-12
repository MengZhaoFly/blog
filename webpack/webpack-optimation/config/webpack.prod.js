const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.js');
const templatePath = path.join(__dirname, '../public/index.html')

module.exports = webpackMerge(baseConfig, {
  mode: 'none',
  entry: [
    path.resolve(__dirname, '../src/pageEntry/index/index.js')
  ],
  // entry: {
  //   app1: path.resolve(__dirname, '../src/pageEntry/index/index.js'),
  //   app2: path.resolve(__dirname, '../src/pageEntry/login/login.js')
  // },
  // externals: {
  //   react: 'React'
  // },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendors',
  //         test: /(react|react-dom)/,
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: 'commons',
  //         chunks: 'all',
  //         minChunks: 2,
  //         minSize: 0
  //       }
  //     }
  //   }
  // },
  // devtool: 'eval',
  plugins: [
    new HtmlWebPackPlugin({
      template: templatePath
    }),
    // 当我们需要使用动态链接库时 首先会找到manifest文件 得到name值记录的全局变量名称 然后找到动态链接库文件 进行加载
    // new webpack.DllReferencePlugin({
    //   /**
    //    * 在这里引入 manifest 文件
    //    */
    //   manifest: require('../dist/dll/vendor-manifest.json'),
    // })
  ]
});