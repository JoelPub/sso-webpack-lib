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
        scriptLoading: "blocking",
        title: 'Development',
        template: 'index.html'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      name: 'webpackNumbers',
      type: 'umd',
    },
    publicPath: '/',
  },
};