import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

module.exports = {
  context: `${__dirname}/src`,
  entry: './index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'game-[hash].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /(pixi|phaser).js/, loader: 'script-loader' },
      { test: /\.css$/, loader: 'style!css' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin([
      // {output}/path/to/build/directory/file.txt
      { from: 'assets/' },
    ], {
      ignore: [
        // Doesn't copy any files with a txt extension
        '*.txt',
      ],
    }),
  ],
}
