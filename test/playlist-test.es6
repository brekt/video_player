const assert = require('assert');
const fs = require('fs');

// mocha advises against using arrow functions
describe('video files from playlist data', function() {
  it('have the expected file extension', function(done) {
    fs.readFile('./data/playlist.json', 'utf8', function(err, data) {
      if (err) {
        done(err);
      } else if (data) {
        let parsedData = JSON.parse(data);
        let randomIndex = Math.floor(Math.random() * parsedData.length);
        let extension = parsedData[randomIndex]['renditions'][1]['url']
          .split('.').pop();
        assert.equal(extension, 'mp4');
        done();
      }
    });
  });
});
