const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os'); // node 提供的系统操作模块

const devMode = process.env.NODE_ENV !== 'production';
// 根据我的系统的内核数量 指定线程池个数 也可以其他数量
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = {
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.css'],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							"presets":[
								"@babel/preset-env", 
								"@babel/preset-react",
								"@babel/preset-flow"
							],
							"plugins": [
								"@babel/plugin-syntax-dynamic-import"
							]
						}
					}
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							hmr: devMode,
						},
					},
					'css-loader',
					{
						loader: 'postcss-loader'
					}
				],
			},
			{
				test: /\.(jpg|png|jpeg)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: '[name].[contenthash].[ext]'
					}
				}
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: '[name].css',
			chunkFilename: '[id].css',
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
		new webpack.DefinePlugin({
			__DEV__: true,
			__PROFILE__: true,
			__UMD__: true
		})
	]
};