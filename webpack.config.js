const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const JS_PATH = './src/js/';
const SCSS_PATH = './src/scss/';

let entry = {
  main: ['./src/js/main.js', './src/scss/main.scss']
};

module.exports = {
  entry: entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.json$/, // To load the json files
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
};