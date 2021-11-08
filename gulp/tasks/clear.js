const del = require('del');

const path = require('../path');

function clear() {
  return del(path.output);
}

exports.clear = clear;