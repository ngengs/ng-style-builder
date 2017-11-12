const runSquence = require('run-sequence');

module.exports = {
  fn: (gulp, callback) => {
    runSquence(['banner', 'clean'], ['css', 'js', 'images', 'fonts'], ['site:build'], callback);
  }
};
