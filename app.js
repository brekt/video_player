const express = require('express');
const app = express();
const fs = require('fs');

// middleware

app.use(express.static('public'));

// routes

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/views/index.html`);
});

app.get('/data', (req, res) => {
  let obj;
  fs.readFile('./data/playlist.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      obj = JSON.parse(data);
      res.json(obj);
    }
  });
});

app.listen(3333, () => {
  console.log('Navigate your browser to localhost:3333.');
});
