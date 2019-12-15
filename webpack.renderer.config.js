const rules = require('./webpack.rules');
const webpack = require('webpack');
const babelConfig = require('./babel.config.js');

const TerserPlugin = require('terser-webpack-plugin');


// const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin'); .webpack/renderer

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

rules.push({
  test: /\.(woff|woff2|ttf|otf)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        // outputPath: '/assets/fonts',
        name: '[name].[ext]'
      }
    },
  ],
})

rules.push({
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: 'url-loader'
    },
  ],
})

module.exports = {
  mode: 'production',
  devtool: false,
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'src/assets'),
    //     to: path.resolve(__dirname, '.webpack/renderer')
    //   }
    // ]),
    new webpack.ProvidePlugin({
      // "$": 'jquery',
      'React': 'react'
    })
  ],
  optimization: {
    mangleWasmImports: true,
    removeAvailableModules: true,
    mergeDuplicateChunks: true,
    usedExports: true,
    minimizer: [
      new TerserPlugin()
    ]
  }
};
