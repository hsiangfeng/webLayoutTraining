const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    path.join(__dirname, 'app/main.js'),
    path.join(__dirname, 'app/assets/scss/all.scss'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.pug$/,
        use: [
          'pug-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '../images',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './app/template/index.pug'),
        title: '第三週-RWD',
        filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './app/template/q&a.pug'),
      title: '第三週-RWD',
      filename: 'q&a.html',
    }),
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, 'dist'),
      filename: 'css/all.css',
    }),
  ],
};
