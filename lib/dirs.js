const mkdirp = require('mkdirp');
const fs = require('fs');
const logger = require('./logger');

const MODE_0755 = 0o0755;

exports.mkdir = path => new Promise((resolve) => {
  mkdirp(path, MODE_0755, (err) => {
    if (err) throw err;
    logger.logAlt('create dir ', ':', path);
    resolve();
  });
});

exports.empty = path => new Promise((resolve) => {
  fs.readdir(path, (err, files) => {
    if (err && err.code !== 'ENOENT') throw err;
    resolve(!files || !files.length);
  });
});
