const gulp = require('gulp');

const path = require('./gulp/path');

const { clear } = require('./gulp/tasks/clear');
const { htmlDev, htmlBuild } = require('./gulp/tasks/html');
const { cssDev, cssBuild } = require('./gulp/tasks/css');
const { jsDev, jsBuild } = require('./gulp/tasks/js');
const { imgDev, imgBuild, svg } = require('./gulp/tasks/img');
const { fonts } = require('./gulp/tasks/fonts');
const { assets } = require('./gulp/tasks/assets');
const { serve } = require('./gulp/tasks/serve');
const { watch } = require('./gulp/tasks/watch');

const dev = gulp.series(
  clear,
  gulp.parallel(
    htmlDev,
    cssDev,
    jsDev,
    imgDev,
    svg,
    fonts,
    assets,
  )
);

const build = gulp.series(
  clear,
  gulp.parallel(
    htmlBuild,
    cssBuild,
    jsBuild,
    imgBuild,
    svg,
    fonts,
    assets,
  )
);

exports.clear = clear;
exports.htmlBuild = htmlBuild;
exports.cssDev = cssDev;
exports.cssBuild = cssBuild;
exports.jsDev = jsDev;
exports.jsBuild = jsBuild;
exports.imgDev = imgDev;
exports.imgBuild = imgBuild;
exports.svg = svg;
exports.fonts = fonts;
exports.assets = assets;
exports.serve = serve;
exports.watch = watch;

exports.dev = dev;
exports.build = build;

exports.default = gulp.series(
  dev,
  gulp.parallel(serve, watch)
);
