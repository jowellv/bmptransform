'use strict';

var fs = require('fs');

function readBmp (filename, transform) {
  var file = fs.readFileSync(filename);
  var bmpFile = {};

  // header is 14 bytes long
  bmpFile.header = file.readUInt16BE(0).toString(16);
  bmpFile.fileSize = file.readUInt32LE(2);
  bmpFile.width = file.readUInt32LE(18);
  bmpFile.height = file.readUInt32LE(22);
  bmpFile.bpp = file.readUInt32LE(28);
  var pixelStart = +file.readUInt32LE(10);

  var startOfcp = 14 + file.readUInt32LE(14);
  var sizeOfcp = file.readUInt32LE(46);
  // console.log("start of pix" + file.readUInt8(pixelStart));
  // console.log("start of cp: " + file.readUInt32LE(startOfcp + 8).toString(16));
  // console.log(file.readUInt32LE(startOfcp + 4 * 28).toString(16));

  // console.log('pixelStart: ' + pixelStart);
  // console.log('startOfcp: ' + startOfcp);
  // console.log('sizeOfcp: ' + sizeOfcp);


  if(bmpFile.bpp === 8) {
    bmpFile.colorPal = [];
    for(var i = 0; i < sizeOfcp; i++) {
      bmpFile.colorPal.push(file.readUInt32LE(startOfcp + 4 * i)); //color table index is 4 bytes (A,R,G,B)
    }
  } else {  // bpp = 24; process non-palette bmp file
    bmpFile.pixelLength = file.readUInt32LE(34);
    bmpFile.pixels = [];
    for( var j = 0 ; j < bmpFile.pixelLength / 3; j++) {
      bmpFile.pixels.push(file.readUInt8(54 + j * 3));
    }
  }
  return transform(bmpFile);
}


function transformBmp (bmpFile) {
  if(bmpFile.pixels) {
    bmpFile.pixels.forEach(function(pixel, i, arr) {
      arr[i] = 256-pixel;
    });
  } else {
    bmpFile.colorPal.forEach(function(colorRow, i, arr) {
      arr[i] = 16777215 - colorRow;
    });
  }
  return bmpFile;
}


function writeBmp (bmpFile, filename) {
  var file = fs.readFileSync(filename);

  if(bmpFile.bpp === 8) { //process 8bpp file
    var startOfcp = 14 + file.readUInt32LE(14);

    bmpFile.colorPal.forEach(function(colorRow, i, arr) {
      file.writeUInt32LE(colorRow, startOfcp + 4 * i);
    });
    fs.writeFileSync('newbmp.bmp', file);
    var outFile = fs.readFileSync('./newbmp.bmp');
    return outFile.readUInt16BE(0).toString(16);
  } else { // process non-pallette file
    var pixelStart = +file.readUInt32LE(10);

    bmpFile.pixels.forEach(function(pixel, i, arr) {
      file.writeUInt32LE(pixel, pixelStart + (i * 3) - 2); // -1=red, -2=grn, -3=blu
    });
    fs.writeFileSync('newbmp24.bmp', file);
    var out24File = fs.readFileSync('./newbmp24.bmp');
    return out24File.readUInt16BE(0).toString(16);
  }
}

module.exports = {
  readBmp: readBmp,
  transformBmp: transformBmp,
  writeBmp: writeBmp
};
