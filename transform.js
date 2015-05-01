'use strict';

var fs = require('fs');
var img = './tru256.bmp';
var img2 = './tweety78.bmp';


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


function readSize (filename) {
  var file = fs.readFileSync(filename);
  var size = file.readUInt32LE(2).toString(10);
  console.log('28: size: ' + size);
  return size;
}

function readImgWH (filename) {
  var file = fs.readFileSync(filename);
  var imgW = file.readUInt32LE(18).toString(10);
  var imgH = file.readUInt32LE(22).toString(10);
  console.log('Image WxH: ' + imgW + 'x' + imgH);
  return imgW + 'x' + imgH;
}

readImgWH(img2);

module.exports = {
  readBmp: readBmp,
  readSize: readSize,
  readImgWH: readImgWH
};
