'use strict';
var expect = require('chai').expect;
var transform = require('../transform');

describe('transforms bmp files', function(){

  it('should bmp file header correctly', function() {
    expect(transform.readBmp('./tru256.bmp')).to.eql('424d');
  });

  it('should read bmp file size', function() {
    expect(transform.readSize('./tru256.bmp')).to.eql('49206');
  });

  it('should read Width x Heigth', function() {
    expect(transform.readImgWH('./tru256.bmp')).to.eql('256x64');
  });

});
