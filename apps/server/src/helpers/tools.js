const fs = require("fs");
const path = require("path");
const rootPath = path.dirname(require.main.filename) + "/src/";
const crypto = require("crypto");

function getFiles(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(rootPath + dir);
  for (var i in files) {
    var name = dir + "/" + files[i];
    if (fs.statSync("src/" + name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

function getDirs(dir, files_) {
  files_ = files_ || [];
  var files = fs.readdirSync(dir);
  for (var i in files) {
    files_.push(files[i]);
  }
  return files_;
}

const hashObject = (obj) =>
  crypto.createHash("sha1").update(JSON.stringify(obj)).digest("hex");

module.exports = {
  getFiles,
  getDirs,
  hashObject,
  rootPath,
};
