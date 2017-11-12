const mkdirp = require('mkdirp');
const fs = require('fs');
const logger = require('./logger');

const MODE_0755 = parseInt('0755', 8);

exports.mkdir = (path) => {
  return new Promise(resolve => {
    mkdirp(path, MODE_0755, function (err) {
      if (err) throw err;
      logger.logAlt('create dir ', ':', path);
      resolve();
    });
  });
};

exports.empty = (path) => {
  return new Promise(resolve => {
    fs.readdir(path, function (err, files) {
      if (err && err.code !== 'ENOENT') throw err;
      resolve(!files || !files.length);
    })
  });
};