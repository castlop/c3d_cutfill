
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'development',
  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          // Disables attributes processing
          sources: false,
          minimize: false
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: 'body',
      scriptLoading: 'defer'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/uploader.html',
      filename: './templates/uploader.html',
      inject: 'body',
      scriptLoading: 'defer'
    }),
    new MiniCssExtractPlugin({
      filename: './main.css',
      ignoreOrder: false
    }),
  ]
}