const browserSync = require('browser-sync');

module.exports = {
  deps: ['site:build'],
  fn: (gulp, callback) => {
    browserSync.get('site-server').reload();
    callback();
  },
};
