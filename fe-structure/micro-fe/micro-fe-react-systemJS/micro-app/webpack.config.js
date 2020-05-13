
const WebpackSystemRegister = require('webpack-system-register');
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
  plugins: [
    new WebpackSystemRegister({
      // registerName: 'test-module',
    }),
  ]
};
