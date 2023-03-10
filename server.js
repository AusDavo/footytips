const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
  const name = req.body.name;
  const game1 = req.body.game1;
  const game2 = req.body.game2;
  const game3 = req.body.game3;
  const game4 = req.body.game4;
  const game5 = req.body.game5;
  const game6 = req.body.game6;
  const game7 = req.body.game7;
  const game8 = req.body.game8;

  // Store the data in a file
  const data = `${name},${game1},${game2},${game3},${game4},${game5},${game6},${game7},${game8}\n`;
  fs.appendFile(path.join(__dirname, 'tips.csv'), data, (err) => {
    if (err) throw err;
    console.log('Tips saved to file.');
  });

  res.send('Tips submitted successfully!');
});

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Serve the file
  const filePath = path.join(__dirname, 'tips.csv');
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}...`);
});

server.listen(8001, () => {
  console.log(`HTTP server listening on port 8001...`);
});
