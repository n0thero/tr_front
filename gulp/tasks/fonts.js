const gulp = require('gulp');
const browserSync = require('browser-sync');

const path = require('../path');

function fonts() {
  return gulp.src(path.input + 'fonts/**/*.*')
    .pipe(gulp.dest(path.output + 'fonts'))
    .pipe(browserSync.stream({once: true}));
}

exports.fonts = fonts;