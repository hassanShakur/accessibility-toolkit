const fs = require('fs');
const express = require('express');
const setupApp = require('./appSetup');
const siteScraper = require('./helpers/scraper');

const app = express();
setupApp(app);

app.post('/api/scrape', (req, res) => {
  const { url } = req.body;

  siteScraper(url)
    .then(() => {
      const data = fs.readFileSync('./pythoneer/data/data.json');
      const parsedData = JSON.parse(data);
      res.send(parsedData);
    })
    .catch((err) => {
      console.log('err');
      res.sendStatus(500);
    });
});

module.exports = app;
