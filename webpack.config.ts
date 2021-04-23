import path from 'path';

module.exports = {
  entry: './index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
    fallback: {
      http: false,
      querystring: false,
    },
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
  },
};
