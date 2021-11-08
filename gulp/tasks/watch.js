const gulp = require('gulp');

const { htmlDev } = require('./html');
const { cssDev } = require('./css');
const { jsDev } = require('./js');
const { imgDev, svg } = require('./img');
const { fonts } = require('./fonts');

const path = require('../path');

function watch() {
  gulp.watch([
    path.input + 'pug/**/*.pug',
    path.input + 'blocks/**/*.pug'
  ], gulp.series(htmlDev));

  gulp.watch([
    path.input + 'sass/**/*.scss',
    path.input + 'blocks/**/*.scss'
  ], gulp.series(cssDev));

  gulp.watch([
    path.input + 'js/**/*.js',
    path.input + 'blocks/**/*.js',
  ], gulp.series(jsDev));

  gulp.watch(path.input + 'img/**/*.*', gulp.parallel(imgDev, svg));

  gulp.watch(path.input + 'fonts/**/*.*', gulp.series(fonts))
}

exports.watch = watch;
