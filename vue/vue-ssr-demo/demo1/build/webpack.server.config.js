const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');

module.exports = merge(base, {
  target: 'node',
  entry: {
    server: path.resolve(__dirname, '../src/entry-server.js')
  },
  output: {
    libraryTarget: 'commonjs2' //构建一个可以被其他模块引入的模块，该模块通过commonJS2规范导出
  }
});