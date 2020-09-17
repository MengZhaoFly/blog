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
    port: 3002,
  },
  output: {
    publicPath: 'http://localhost:3002/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',   // 唯一
      library: { type: 'var', name: 'app2' },
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
      },
      shared: {
        'react': {
          eager: true,
        },
        "react-dom": {
          eager: true,
        }
      }
    }),
    new HTMLWebpackPlugin({ template: './public/index.html' }),
  ],
};
