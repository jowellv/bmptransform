'use strict';
var expect = require('chai').expect;
var transform = require('../transform');

describe('transforms bmp files', function(){

  it('read file header 424d', function() {

    expect(transform.readBmp('./bitmap1.bmp').header).to.eql('424d');
  });
  it('read file size 11078', function() {
    expect(transform.readBmp('./bitmap1.bmp').fileSize).to.eql(11078);
  });
  it('read picture width 100px', function() {
    expect(transform.readBmp('./bitmap1.bmp').width).to.eql(100);
  });
  it('read picture height 100px', function() {
    expect(transform.readBmp('./bitmap1.bmp').height).to.eql(100);
  });
  it('read picture bits per pixel of 8', function() {
    expect(transform.readBmp('./bitmap1.bmp').bpp).to.eql(8);
  });
  it('transforms the file', function() {
    expect(transform.transformBmp(transform.readBmp('./bitmap1.bmp')).colorPal[28]).to.eql(16777215-14243683);
  });

  it('writes the file by checking the first bytes of the new file', function() {
    expect(transform.writeBmp(transform.transformBmp(transform.readBmp('./bitmap1.bmp')),'./bitmap1.bmp')).to.eql('424d'); //
  });

});
