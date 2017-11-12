module.exports = {
  deps: ['site:build'],
  fn: (gulp, callback) => {
    const browserSync = require('browser-sync').get('site-server');
    browserSync.reload();
    callback();
  }
};
