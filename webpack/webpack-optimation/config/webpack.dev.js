const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


const templatePath = path.join(__dirname, '../public/index.html')
const baseConfig = require('./webpack.base.js');



module.exports = webpackMerge(baseConfig, {
  entry: [
		'react-hot-loader/patch',
		path.resolve(__dirname, '../src/pageEntry/index/index.js')
  ],
  devServer: {
		hot: true,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebPackPlugin({
			template: templatePath
		}),
    new webpack.HotModuleReplacementPlugin()
  ]
});