const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: { app: './src/index.js', makeFormOffline: './src/makeFormOffline' },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'assign',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'flow'],
          },
        },
      },
    ],
  },
  plugins: [new CopyWebpackPlugin([{ from: 'src/Code.js' }]), new CleanWebpackPlugin(['build'])],
};
