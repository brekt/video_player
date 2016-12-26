const fs = require('fs');
const https = require('https');
let videoDownloaded = false;

it('can successfully download a video', () => {
  fs.readFile('../data/playlist.json', 'utf8', (err, data) => {
    let parsedData = JSON.parse(data);
    let randomIndex = Math.floor(Math.random() * parsedData.length);
    let videoUrl = parsedData[randomIndex]['renditions'][1]['url'];
    request(videoUrl)
      .then(
        expect(videoDownloaded).toBe(true)
      );
  });
});

/**
* async http request
* @param {string} url - the url from which to get data
* @return {object}
*/
function request(url) {
  return new Promise((resolve) => {
    https.get({url}, (response) => {
      let data = '';
      response.on('data', (_data) => {
        data += (_data);
      });
      response.on('end', () => {
        resolve(data);
        videoDownloaded = true;
      });
    });
  });
}
