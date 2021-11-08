const gulp = require('gulp');
const browserSync = require('browser-sync');
const webpack = require('webpack-stream');
const pathSrc = require('path');

const path = require('../path');

function jsDev() {
  return gulp.src(path.input + 'js/*.js')
    .pipe(webpack({
      mode: 'development',
      devtool: 'inline-source-map',
      context: pathSrc.resolve(__dirname, '../../src/js/'),
      entry: {
        script: './script.js',
        admin: './admin.js',
        contacts: './contacts.js',
        'header-main': './header-main.js',
      },
      output: {
        filename: '[name].js',
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(path.output + 'js'))
    .pipe(browserSync.stream({once: true}));
}

function jsBuild() {
  return gulp.src(path.input + 'js/*.js')
    .pipe(webpack({
      mode: 'production',
      context: pathSrc.resolve(__dirname, '../../src/js/'),
      entry: {
        script: './script.js',
        admin: './admin.js',
        contacts: './contacts.js',
        'header-main': './header-main.js',
      },
      output: {
        filename: '[name].js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
    }))
    .pipe(gulp.dest(path.output + 'js'));
}

exports.jsDev = jsDev;
exports.jsBuild = jsBuild;
