var WebpackNotifierPlugin = require('webpack-notifier');
var webpack = require('webpack');

var RELEASE = JSON.parse(process.env.RELEASE || '0');

module.exports = {
  entry: {
    index: "./src/index.tsx",
    analyzer: "./src/analyzerEntry.tsx",
    analyzer_worker: "./src/components/analyzer/worker.ts"
  },
  output: {
    path: "./dist/",
    filename: "[name].bundle.js"
  },

  // Enable sourcemaps for debugging webpack's output.
  // devtool: "source-map",
  devtool: "source-map",

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
      loaders: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
          { test: /\.tsx?$/, loader: "ts-loader" }
      ],

      preLoaders: [
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          { test: /\.js$/, loader: "source-map-loader" }
      ]
  },
  plugins: RELEASE ? [
    // Set up the notifier plugin - you can remove this (or set alwaysNotify false) if desired
    // new WebpackNotifierPlugin({ alwaysNotify: true }),
    // new webpack.DefinePlugin({
    //     'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //     }
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  ] : [],
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  },
};
