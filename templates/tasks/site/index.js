const runSquence = require('run-sequence');

module.exports = {
  deps: ['dist'],
  fn: (gulp, callback) => {
    runSquence(['site:serve'], ['watch:site'], callback);
  },
};
