'use strict';

var fs = require('fs');
var img = './tru256.bmp';
var img2 = './tweety78.bmp';


function readBmp (filename) {
  var file = fs.readFileSync(filename);
  var bmpFile = {};
  // header is 14 bytes long
  bmpFile.header = file.readUInt16BE(0).toString(16);
  bmpFile.fileSize = file.readUInt32LE(2).toString(10);
  bmpFile.width = file.readUInt32LE(18).toString(10);
  bmpFile.height = file.readUInt32LE(22).toString(10);
  bmpFile.bpp = file.readUInt32LE(28).toString(10);

  var pixelStart = file.readUInt32LE(10).toString(10);

  bmpFile.px1 = file.readUInt8LE(pixelStart).toString(16);
  bmpFile.px2 = file.readUInt8LE(pixelStart+1).toString(16);
  bmpFile.px3 = file.readUInt8LE(pixelStart+2).toString(16);

  return bmpFile;
}

function processBmp (fileObject) {
  // body...
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

function readImgOffSet (filename) {
  var file = fs.readFileSync(filename);
  var off = file.readUInt32LE(10).toString(10);
  console.log('off: ' + off);
}

readImgOffSet(img);

module.exports = {
  readBmp: readBmp,
  readSize: readSize,
  readImgWH: readImgWH,
  readImgOffSet: readImgOffSet
};
