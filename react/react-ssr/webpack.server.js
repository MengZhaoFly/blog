const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const config = require('./webpack.base.js')

const serverConfig = {
  // webpack帮我们打包服务器端的代码的时候
  // 我们要加添加 你要区分我们打包的是哪个端的代码 客户端所有都打进bundle.js 服务端不需要
  // 虽然这个地方我们使用的是mode 他不会把核心模块打包进去 实际上 在我们引入一些node_modules的包的时候，光用target_node还不行
  // 还要在介入一个组件 webpack-node-externals 比如我们引用express的时候 他不会吧node_modules里面的express打包进文件里面，还保留之前的引用形式
  target: 'node',
  // webpack4 要区分 你打包的是线上环境还是测试环境 需要配置mode
  mode: 'development',
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [{
      test: /\.css?$/,
      use: ['isomorphic-style-loader', {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]_[local]_[hash:base64:5]'
          }
        }
      }]
    }]
  },
  externals: [nodeExternals()]
}

module.exports = merge(config, serverConfig)
