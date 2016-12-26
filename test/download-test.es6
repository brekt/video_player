const https = require('https');
const fs = require('fs');

describe('video files from playlist data', function() {
  it('can be downloaded', function(done) {
    fs.readFile('./data/playlist.json', 'utf8', function(err, data) {
      if (err) {
        done(err);
      } else if (data) {
        let parsedData = JSON.parse(data);
        let randomIndex = Math.floor(Math.random() * parsedData.length);
        let url = parsedData[randomIndex]['renditions'][1]['url'];
        https.get(url, function(res) {
          let video;
          res.on('data', function(_data) {
            video = video + _data;
          });
          res.on('end', function() {
            done();
          });
        }).on('error', function(err) {
          done(err);
        });
      }
    });
  });
});
