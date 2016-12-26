'use strict';

var assert = require('assert');
var fs = require('fs');

describe('video files from playlist data', function () {
  it('have the expected file extension', function (done) {
    fs.readFile('./data/playlist.json', 'utf8', function (err, data) {
      if (err) {
        done(err);
      } else if (data) {
        var parsedData = JSON.parse(data);
        var randomIndex = Math.floor(Math.random() * parsedData.length);
        var extension = parsedData[randomIndex]['renditions'][1]['url'].split('.').pop();
        console.log(extension);
        assert.equal(extension, 'mp4');
        done();
      }
    });
  });
});