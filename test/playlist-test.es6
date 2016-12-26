const assert = require('assert');
const fs = require('fs');

describe('video files from playlist data', () => {
  it('have the expected file extension', (done) => {
    fs.readFile('./data/playlist.json', 'utf8', (err, data) => {
      if (err) {
        done(err);
      } else if (data) {
        let parsedData = JSON.parse(data);
        let randomIndex = Math.floor(Math.random() * parsedData.length);
        let extension = parsedData[randomIndex]['renditions'][1]['url']
          .split('.').pop();
        console.log(extension);
        assert.equal(extension, 'mp4');
        done();
      }
    });
  });
});
