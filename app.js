const express = require('express');
const app = express();
// const path = require('path');

// middleware
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/views/index.html`);
});

app.listen(3333, () => {
  console.log('App listening on port 3333.');
});
