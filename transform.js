'use strict';

var fs = require('fs');


function readBmp (filename) {
  var file = fs.readFileSync(filename);
  var bmpFile = {};
  // header is 14 bytes long
  bmpFile.header = file.readUInt16BE(0).toString(16);
  bmpFile.fileSize = file.readUInt32LE(2).toString(10);
  bmpFile.width = file.readUInt32LE(18).toString(10);
  bmpFile.height = file.readUInt32LE(22).toString(10);
  bmpFile.bpp = file.readUInt32LE(28).toString(10);
  console.log("bpp: " + bmpFile.bpp);
  var pixelStart = +file.readUInt32LE(10).toString(10);
  console.log("pixelStart : " + pixelStart);
  console.log("fileLength: " + file.length);
  // bmpFile.px = file.readUInt32LE(pixelStart).toString(16);
  //
  // bmpFile.px2 = file.readUInt32LE(pixelStart+4).toString(16);
  // bmpFile.px3 = file.readUInt32LE(pixelStart+8).toString(16);
  // bmpFile.px4 = file.readUInt32LE(pixelStart+12).toString(16);

  console.log(bmpFile.px);
  console.log(bmpFile.px2);
  // bmpFile.px2 = file.readUInt8(pixelStart+1).toString(16);
  // bmpFile.px3 = file.readUInt8(pixelStart+2).toString(16);
  //
  // console.log(bmpFile.bpp + "bpp");
  // console.log('0: ' + bmpFile.px1);
  // console.log('1: ' + bmpFile.px2);
  // console.log('2: ' + bmpFile.px3);
  return bmpFile;
}

function processBmp (fileObject) {
  // body...
}
module.exports = {
  readBmp: readBmp
};
