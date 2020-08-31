'use strict';

const copydir = require("copy-dir");
const path = require("path");
const fs = require("fs");

const replace = require('./replace');
const { resolve } = require("path");
const { rejects } = require("assert");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);


function copySrc(src, target) {
  return new Promise((resolve, reject) => {
    copydir.sync(
      resolveApp(src),
      resolveApp(target),
      {
        filter: function (stat, filepath, filename) {
          resolve();
          return true;
        },
      },
      function (err) {
        reject(err);
        if (err) throw err;
        console.log("done");
      }
    );
  });
}
copySrc("src", "dist")
  .then(() => copySrc("index.html", "dist/index.html"))
  .then(replace);
