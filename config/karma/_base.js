import webpack from '../webpack/development';

const KARMA_ENTRY_FILE = 'karma.entry.js';

export default config => {
  config.set({
    browsers: ['Chrome'],
    files: [
      'spec/*.js',
    ],
    preprocessors: {
      'spec/*.js': ['webpack', 'sourcemap'],
    },
    frameworks: ['jasmine'],
    plugins: [
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-jasmine',
      'karma-coverage',
      'karma-chrome-launcher',
    ],
    colors: true,
    autoWatch: false,
    logLevel: config.LOG_INFO,
    webpack: {
      devtool: 'inline-source-map',
      node : {
        fs: 'empty'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            query: {
              presets: ['es2015'],
            },
          }
        ],
        preLoaders: [{
          test: /\.js$/,
          exclude: /(spec|node_modules|bower_components)\//,
          loader: 'isparta-instrumenter-loader',
        }]
      }
    },
    webpackMiddleware: {
      ...webpack.devServer,
      quiet: true,
    },
    coverageReporter: {
     type: 'html', //produces a html document after code is run
     dir: 'coverage/' //path to created html doc
    }
  });

  return config;
};
