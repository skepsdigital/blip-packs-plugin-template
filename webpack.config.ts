import webpack from 'webpack';
import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin  from 'tsconfig-paths-webpack-plugin';

const mode = process.env.NODE_ENV || 'development';
const config = {
  mode,
  devtool: (mode === 'development') ? 'inline-source-map' : false,
  target: 'web',
  output: {
    publicPath: '/dist',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        type: 'asset/inline'
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    serveIndex: false,
    contentBase: path.join(__dirname, 'src'),
    open: true,
    compress: true,
    watchContentBase: true,
  },
};

export default config;
