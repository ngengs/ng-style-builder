const pkgValidator = require('validate-npm-package-name');
const semver = require('semver');

exports.validateEmpty = (value) => {
  if (typeof value === 'undefined' || value.replace(/\s/g, '') === '') {
    return 'This value cant empty';
  }
  return true;
};

exports.validatePackageName = (value) => {
  const check = pkgValidator(value);
  // noinspection JSUnresolvedVariable
  if (check.validForNewPackages && check.validForOldPackages) {

  } else {
    let errorMsg = 'Wrong package name format';
    // noinspection JSUnresolvedVariable
    if (check.errors) {
      // noinspection JSUnresolvedVariable
      errorMsg = check.errors.join(', ');
    }
    return errorMsg;
  }
};

exports.validateVersion = (value) => {
  const check = semver.valid(value);
  if(check === null){
    return 'Version must follow Semantic Versioning, specification found at http://semver.org/';
  }
  return true;
};

exports.createPackageFromString = (value) => {
  return value
    .replace(/[^A-Za-z0-9.()!~*'-]+/g, '-')
    .replace(/^[-_.]+|-+$/g, '')
    .toLowerCase();
};

exports.cleanVersion = (value) => {
  return semver.clean(value);
};