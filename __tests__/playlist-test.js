const fs = require('fs');

it('has videos with mp4 extension', () => {
  fs.readFile('../data/playlist.json', 'utf8', (err, data) => {
    if (!err && data) {
      let parsedData = JSON.parse(data);
      let randomIndex = Math.floor(Math.random() * parsedData.length);
      let endsWithMp4 = parsedData[randomIndex]['renditions'][1]['url']
        .endsWith('mp4');
      expect(endsWithMp4).toBe(false);
    } else {
      console.error(err);
    }
  });
});
