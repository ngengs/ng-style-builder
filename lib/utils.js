const pkgValidator = require('validate-npm-package-name');
const semver = require('semver');
const exec = require('child_process').execSync;
const logger = require('./logger');

exports.validateEmpty = (value) => {
  if (typeof value === 'undefined' || value.replace(/\s/g, '') === '') {
    return 'This value cant empty';
  }
  return true;
};

exports.validatePackageName = (value) => {
  const check = pkgValidator(value);
  let returnData = true;
  // noinspection JSUnresolvedVariable
  if (!check.validForNewPackages && !check.validForOldPackages) {
    let errorMsg = 'Wrong package name format';
    // noinspection JSUnresolvedVariable
    if (check.errors) {
      // noinspection JSUnresolvedVariable
      errorMsg = check.errors.join(', ');
    }
    returnData = errorMsg;
  }
  return returnData;
};

exports.validateVersion = (value) => {
  const check = semver.valid(value);
  if (check === null) {
    return 'Version must follow Semantic Versioning, specification found at http://semver.org/';
  }
  return true;
};

exports.createPackageFromString = value => value
  .replace(/[^A-Za-z0-9.()!~*'-]+/g, '-')
  .replace(/^[-_.]+|-+$/g, '')
  .toLowerCase();

exports.cleanVersion = value => semver.clean(value);

exports.exec = (command) => {
  logger.logAlt('Execute command', ':', command);
  try {
    exec(command);
  } catch (e) {
    logger.logAlt('Failed execute command', ':', command);
    logger.logAlt('Error', ':', e);
  }
};
