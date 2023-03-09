const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
        inject: "head",
        scriptLoading: "module",//webpack es module
        title: 'Development',
        template: 'index.html'
    }),
  ],
  //webpack es module
  experiments: {
    outputModule: true,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      //webpack es module
      // name: 'webpackNumbers',
      // type: 'umd',
      type: 'module',
    },
    publicPath: '/',
  },
};