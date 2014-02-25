var gulp = require('gulp')
  , gutil = require('gulp-util')
  , gkarma = require('gulp-karma')
  , files;

files = {
  LIB: 'bower_components/d3/*.min.js',
  NS: 'src/namespaces.js',
  SOURCE: 'src/**/*.js',
  SPEC: 'test/**/*-spec.js'
};

gulp.task('test', function (){
  var karma;

  karma = gkarma({
    configFile: 'karma.conf.js',
    action: 'run'
  });

  return gulp.src(
    [files.LIB, files.NS, files.SOURCE, files.SPEC]
  ).pipe(karma);
});
