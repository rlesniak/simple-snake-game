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
      'karma-chrome-launcher',
    ],
    colors: true,
    autoWatch: false,
    logLevel: config.LOG_INFO,
    webpack: {
      ...webpack,
       devtool: 'inline-source-map'
    },
    webpackMiddleware: {
      ...webpack.devServer,
      quiet: true,
    },
  });

  return config;
};
