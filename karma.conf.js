// Karma configuration
// Generated on Wed May 20 2015 15:45:04 GMT-0300 (BRT)

module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      'bower_components/chance/chance.js',
      'bower_components/lodash/lodash.js',
      'bower_components/d3/d3.min.js',
      'dist/d3-tip.js',
      'src/namespaces.js',
      'src/util/**/*.js',
      'src/models/**/*.js',
      'src/graphing/**/*.js',
      'test/**/*.js'
    ],
    exclude: [ ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    captureTimeout: 60000,
    singleRun: false
  });
};
