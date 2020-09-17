const ModuleFederationPlugin = require('webpack').container
  .ModuleFederationPlugin;

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { join } = require('path');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: join(__dirname, 'dist'),
    port: 3001,
  },
  output: {
    publicPath: 'http://localhost:3001/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      library: { type: 'var', name: 'app1' },
      remotes: {
        app2: 'app2',
      },
      shared: {
        'react': {
          eager: true,
        },
        "react-dom": {
          eager: true,
        }
      }
      // 为了避免远程加载的模块和当前模块有相同的依赖而被重复打包和引用, 本质上其实是把依赖 external 掉了，然后映射到同一个 webpack 的模块 id 上
    }),
    new HTMLWebpackPlugin({ template: './public/index.html' }),
  ],
};
