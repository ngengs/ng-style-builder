const path = require('path');
const fs = require('fs');
const { mkdir } = require('./dirs');
const { write } = require('./files');

const copy = (from, to, relative = true) => new Promise((resolve) => {
  let origin = from;
  let destination = to;
  if (relative) {
    origin = path.join(__dirname, '..', 'templates', origin);
  }

  if (fs.existsSync(destination)) {
    if (fs.lstatSync(destination).isDirectory()) {
      destination = path.join(destination, path.basename(origin));
    }
  }

  write(destination, fs.readFileSync(origin, 'utf-8'));
  resolve(true);
});

const copyRecursive = (from, to, relative = true) => new Promise(async (resolve) => {
  let origin = from;
  let files = [];
  let result = false;
  if (relative) {
    origin = path.join(__dirname, '..', 'templates', origin);
  }

  // check if folder needs to be created or integrated
  const targetFolder = path.join(to, path.basename(origin));
  if (!fs.existsSync(targetFolder)) {
    await mkdir(targetFolder);
  }

  // copy
  if (fs.lstatSync(origin).isDirectory()) {
    files = await fs.readdirSync(origin);
    await Promise.all(files.map(async (file) => {
      const curSource = await path.join(origin, file);
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

exports.copy = copy;
exports.copyRecursive = copyRecursive;
