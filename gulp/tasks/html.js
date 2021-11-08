const gulp = require('gulp');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');
const prettier = require('gulp-prettier'); 

const path = require('../path');
const prettierrc = require('../../.prettierrc');

function htmlDev() {
  return gulp.src(path.input + 'pug/pages/*.pug')
    .pipe(pug())
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.stream({once: true}));
}

function htmlBuild() {
  return gulp.src(path.input + 'pug/pages/*.pug')
    .pipe(pug())
    .pipe(prettier(Object.assign({ editorconfig: true }, prettierrc)))
    .pipe(gulp.dest(path.output));
}

exports.htmlDev = htmlDev;
exports.htmlBuild = htmlBuild;
