const rules = require('./webpack.rules');
const webpack = require('webpack');

rules.push({
  test: /\.css|.scss$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new webpack.ProvidePlugin({
      "$": 'jquery',
    })
  ],
};
