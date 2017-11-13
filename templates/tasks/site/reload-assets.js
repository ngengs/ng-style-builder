const browserSync = require('browser-sync');

module.exports = {
  deps: ['site:assets'],
  fn: (gulp, callback) => {
    browserSync.get('site-server').reload();
    callback();
  },
};
