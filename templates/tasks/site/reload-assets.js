module.exports = {
  deps: ['site:assets'],
  fn: (gulp, callback) => {
    const browserSync = require('browser-sync').get('site-server');
    browserSync.reload();
    callback();
  }
};
