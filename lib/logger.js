const chalk = require('chalk');
const pkg = require('../package.json');
const format = require('util').format;

// noinspection JSUnresolvedFunction
const prefixPrimary = chalk.blue(pkg.name_short);
// noinspection JSUnresolvedFunction
const prefixSecondary = chalk.magenta(pkg.name_short);
// noinspection JSUnresolvedFunction
const prefixSuccess = chalk.cyan(pkg.name_short);
// noinspection JSUnresolvedFunction
const prefixError = chalk.red(pkg.name_short);

exports.log = (...args) => {
  console.log();
  if (args.length > 0) {
    const msg = format.apply(format, args);
    console.log(format('[%s] %s', prefixPrimary, msg));
  }
};

exports.logAlt = (...args) => {
  if (args.length > 0) {
    if (args.length > 1) {
      // noinspection JSUnresolvedFunction
      args[0] = chalk.gray(args[0]);
    }
    const msg = format.apply(format, args);
    console.log(format('[%s] %s', prefixSecondary, msg));
  } else {
    console.log();
  }
};

exports.success = (...args) => {
  if (args.length > 0) {
    const msg = format.apply(format, args);
    console.log(format('[%s] %s', prefixSuccess, msg));
  } else {
    console.log();
  }
};

exports.error = (...args) => {
  if (args.length > 0) {
    const msg = format.apply(format, args);
    console.error(format('[%s] %s', prefixError, msg));
  } else {
    console.error();
  }
  process.exit(1);
};

exports.separator = () => {
  console.log('================================');
};
