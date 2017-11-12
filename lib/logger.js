const chalk = require('chalk');
const pkg = require('../package.json');

// noinspection JSUnresolvedFunction
const prefixPrimary = `[${chalk.blue(pkg.name_short)}]`;
// noinspection JSUnresolvedFunction
const prefixSecondary = `[${chalk.magenta(pkg.name_short)}]`;
// noinspection JSUnresolvedFunction
const prefixSuccess = `[${chalk.cyan(pkg.name_short)}]`;
// noinspection JSUnresolvedFunction
const prefixError = `[${chalk.red(pkg.name_short)}]`;

exports.log = (...args) => {
  console.log();
  if (args.length > 0) {
    const msg = args.join(' ');
    console.log(prefixPrimary, msg);
  }
};

exports.logAlt = (...args) => {
  if (args.length > 0) {
    if(args.length > 1) {
      // noinspection JSUnresolvedFunction
      args[0] = chalk.gray(args[0]);
    }
    const msg = args.join(' ');
    console.log(prefixSecondary, msg);
  } else {
    console.log();
  }
};

exports.success = (...args) => {
  if (args.length > 0) {
    const msg = args.join(' ');
    console.log(prefixSuccess, msg);
  } else {
    console.log();
  }
};

exports.error = (...args) => {
  if (args.length > 0) {
    const msg = args.join(' ');
    console.error(prefixError, msg);
  } else {
    console.error();
  }
  process.exit(1);
};

exports.separator = () => {
  console.log('================================');
};
