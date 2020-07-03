'use strict';

const copydir = require("copy-dir");
const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);


copydir.sync(
  resolveApp("src"),
  resolveApp("dist"),
  {
    filter: function (stat, filepath, filename) {
        return true;
    },
  },
  function (err) {
    if (err) throw err;
    console.log("done");
  }
);
copydir.sync(resolveApp("index.html"), resolveApp("dist/index.html"));