const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

function setDevTool() {
  switch (mode) {
    case 'development':
      return 'cheap-module-source-map';
    case 'production':
      return false;
    default:
      return 'cheap-module-source-map';
  }
}

module.exports = {
  entry: './src/index.js',
  mode: mode,
  devtool: setDevTool(),
  output: {
    filename: '[contenthash].js',
    assetModuleFilename: 'assets/[name][query]',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 9000,
    open: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/icons/favicon/favicon.png',
      prefix: './assets/favicons/',
    }),
  ],
  module: {
    rules: [
      {
        test: /(js?$|jsx?$)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        exclude: /imgs/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: /fonts/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/imgs/[name][ext]',
        },
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: [0.65, 0.9],
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@components': path.resolve('src/components'),
      '@styles': path.resolve('src/assets/styles'),
      '@imgs': path.resolve('src/assets/imgs'),
      '@icons': path.resolve('src/assets/icons'),
      '@fonts': path.resolve('src/assets/fonts'),
    },
    extensions: ['', '.js', '.jsx'],
  },
};
