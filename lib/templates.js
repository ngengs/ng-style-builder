const path = require('path');
const fs = require('fs');
const mkdir = require('./dirs').mkdir;
const write = require('./files').write;

const copy = (from, to, relative = true) => {
  return new Promise(resolve => {
    if (relative) {
      from = path.join(__dirname, '..', 'templates', from);
    }

    if (fs.existsSync(to)) {
      if (fs.lstatSync(to).isDirectory()) {
        to = path.join(to, path.basename(from));
      }
    }

    write(to, fs.readFileSync(from, 'utf-8'));
    resolve(true);
  });
};

const copyRecursive = (from, to, relative = true) => {
  return new Promise(async resolve => {
    let files = [];
    let result = false;
    if (relative) {
      from = path.join(__dirname, '..', 'templates', from);
    }

    //check if folder needs to be created or integrated
    const targetFolder = path.join(to, path.basename(from));
    if (!fs.existsSync(targetFolder)) {
      await mkdir(targetFolder);
    }

    //copy
    if (fs.lstatSync(from).isDirectory()) {
      files = await fs.readdirSync(from);
      await Promise.all(files.map(async (file) => {
        const curSource = await path.join(from, file);
        if (await fs.lstatSync(curSource).isDirectory()) {
          await copyRecursive(curSource, targetFolder, false);
        } else {
          await copy(curSource, targetFolder, false);
        }

        result = true;
      }));
    }

    resolve(result);
  });
};

exports.copy = copy;
exports.copyRecursive = copyRecursive;