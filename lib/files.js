const fs = require('fs');
const logger = require('./logger');

const MODE_0666 = 0o0666;

exports.write = (path, str, mode) => {
  fs.writeFileSync(path, str, { mode: mode || MODE_0666 });
  logger.logAlt('create file', ':', path);
};
