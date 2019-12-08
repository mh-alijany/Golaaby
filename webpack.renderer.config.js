const rules = require('./webpack.rules');
const webpack = require('webpack');
const babelConfig = require('./babel.config.js');

rules.push({
  test: /\.css|.scss$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
});

rules.push({
  test: /\.(js|jsx)$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: babelConfig
  }
})

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new webpack.ProvidePlugin({
      "$": 'jquery',
      'React' : 'react'
    })
  ],
};
