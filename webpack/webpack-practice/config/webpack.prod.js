const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.js');
const templatePath = path.join(__dirname, '../public/index.html')

module.exports = webpackMerge(baseConfig, {
  mode: 'none',
  // externals: {
  //   'react':  'React',   // main.js 没有 react , 让他去 window.React   CDN
  //   'react-dom': 'ReactDOM'   // 让他去 window.ReactDOM   // CDN
  // },
  // entry: [
  //   path.resolve(__dirname, '../src/pageEntry/index/index.js')
  // ],
  entry: {
    index: path.resolve(__dirname, '../src/pageEntry/index/index.js'),
    login: path.resolve(__dirname, '../src/pageEntry/login/login.js'),
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: 'vendors',   // 第三方
  //         test: /(react|react-dom)/,   // 需要分离的包
  //         chunks: 'all'      // import('react').then() /  import react fron 'react'
  //       }
  //     }
  //   }
  // },
  // devtool: '',  // dev    prod
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',   // import().then   import {} from 
          minChunks: 2,    // 最少引用次数  2
          minSize: 0       // 最小体积  0 === 只有引用了
        }
      }
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: templatePath
    }),
    // main.js -> dist  -> 
    // new webpack.DllReferencePlugin({
    //   /**
    //    * 在这里引入 manifest 文件
    //    */
    //   manifest: require('../dist/dll/vendor-manifest.json'),
    // })
  ]
});