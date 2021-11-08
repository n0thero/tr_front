const gulp = require('gulp');
const browserSync = require('browser-sync');

const path = require('../path');

function assets() {
  return gulp.src(path.input + 'assets/**/*.*')
    .pipe(gulp.dest(path.output + 'assets'))
    .pipe(browserSync.stream({once: true}));
}

exports.assets = assets;
