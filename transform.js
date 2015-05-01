'use strict';

var fs = require('fs');


function readBmp (filename) {
  var file = fs.readFileSync(filename);
  console.log(file.readUInt16BE(0).toString(16));
  return file.readUInt16BE(0).toString(16);
  // fs.readFile(filename, function(err, buf) {
  //   if(err) throw err;
  //   var bmpFile = {};
  //   var header = function fileDone(buf) {
  //     return buf.readUInt16BE(0).toString(16);
  //   };
  //
  //
  //   return header;
  // });
}

module.exports = {
  readBmp: readBmp
};
