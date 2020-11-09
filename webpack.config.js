const path = require("path");
module.exports = {
  mode: 'production',

  entry: './src/main.tsx',
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,

        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: '0.0.0.0',
    hot: true,
    open: true,
    port: 9000,
  },
  performance: {
    maxEntrypointSize: 500000,
    maxAssetSize: 500000,
    hints: false
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};
