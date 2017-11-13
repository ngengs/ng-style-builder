const runSquence = require('run-sequence');

module.exports = {
  fn: (gulp, callback) => {
    runSquence(['js:core', 'js:app'], ['js:modernizr', 'js:lib'], callback);
  },
};
