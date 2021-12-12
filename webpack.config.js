
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin                = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  optimization: {
    // minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /styles\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /styles\.css$/,
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
      // {
      //   test: /\.(png|jpg|jpeg|gif|svg)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         esModule: false
      //       }
      //     }
      //   ]
      // },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: 'body', // En vez de insertarlo en el <head>
      scriptLoading: 'defer' // Opción por defecto
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: false
    }),
    new CopyPlugin({
        patterns: [
          {from: 'src/assets', to: 'assets/' }
        ],
      }
    ),
  ]
}