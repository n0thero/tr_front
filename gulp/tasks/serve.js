const browserSync = require('browser-sync');

const path = require('../path');

function serve() {
  browserSync.init({
    server: {
      baseDir: path.output
    }
  });
}

exports.serve = serve;