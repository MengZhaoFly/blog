const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const baseConfig = require('./webpack.base.js');
const templatePath = path.join(__dirname, '../public/index.html')


module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, '../src/entry1/index.js')
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: templatePath
    }),
  ]
});