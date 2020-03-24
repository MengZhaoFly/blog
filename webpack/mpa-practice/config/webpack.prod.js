const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const baseConfig = require('./webpack.base.js');
const templatePath = path.join(__dirname, '../public/index.html')

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, '../src/*/index.js'));

  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];
      // '/Users/cpselvis/my-project/src/index/index.js'

      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];

      entry[pageName] = entryFile;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(__dirname, `../src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ['commons', pageName]
        })
      );
    });

  return {
    entry,
    htmlWebpackPlugins
  }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  entry: entry,
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
    ...htmlWebpackPlugins
  ]
});