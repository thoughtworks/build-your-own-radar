// Karma configuration
// Generated on Wed May 20 2015 15:45:04 GMT-0300 (BRT)

module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      'dist/chance.js',
      'dist/d3.min.js',
      'dist/tech-radar.min.js',
      'test/**/*.js'
    ],
    exclude: [ ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: false
  });
};
