'use strict';

var fs = require('fs');


function readBmp (filename) {
  var file = fs.readFileSync(filename);
  var bmpFile = {};
  bmpFile.header = file.readUInt16BE(0).toString(16);
  bmpFile.fileSize = file.readUInt32LE(2).toString(10);
  return bmpFile;
}

module.exports = {
  readBmp: readBmp
};
