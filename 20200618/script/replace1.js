"use strict";
const path = require("path");
const fs = require("fs");


const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

function repew(filePath) {
  fs.readFile(filePath, function (err, data) {
    if (err) return err;
    let str = data.toString();
    str = str.replace(/.\/src/g, '.').replace(/index.(js|css)/gi, function ($1, $2) {
      return "index.min." + $2;
    });
    fs.writeFile(filePath, str, function (err) {
      if (err) return err;
      console.log('repew done');
    });
  });
}

fs.readdir('./dist', function(err, files) {
    if(err) return err;

    files.forEach(item => {
        const filePath = resolveApp('./dist/'+item);
        fs.stat(filePath, function (err, status) {
          if (err) return err;
          const isFile = status.isFile();
          if (isFile && path.extname(item) === ".html") {
            repew(filePath);
          }
        });
        
    })
})
