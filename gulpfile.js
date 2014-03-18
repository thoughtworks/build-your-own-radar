var gulp = require('gulp')
  , pkg = require('./package.json')
  , gutil = require('gulp-util')
  , gkarma = require('gulp-karma')
  , sass = require('gulp-sass')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , clean = require('gulp-clean')
  , header = require('gulp-header')
  , files;


banner = [
  '/**',
  ' * <%= pkg.name %>',
  ' * @version v<%= pkg.version %>',
  ' */',
  ''
].join('\n');

files = {
  LIB: 'bower_components/d3/*.min.js',
  NS: 'src/namespaces.js',
  SOURCE: 'src/**/*.js',
  SPEC: 'test/**/*-spec.js',
  STYLESHEETS: 'src/stylesheets/**/*.scss'
};

gulp.task('sass', function () {
  gulp.src(files.STYLESHEETS)
    .pipe(sass())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('concat', function () {
  gulp.src([files.NS, files.SOURCE])
    .pipe(concat('tech-radar.js'))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./dist/'));
});
var clean = require('gulp-clean');

gulp.task('clean', function() {
  gulp.src('./dist/', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('compress', function() {
  gulp.src([files.NS, files.SOURCE])
    .pipe(concat('tech-radar.min.js'))
    .pipe(uglify({outSourceMap: true}))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('dist', ['clean', 'concat', 'compress', 'sass']);

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
