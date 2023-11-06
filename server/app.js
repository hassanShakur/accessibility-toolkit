const fs = require('fs');
const express = require('express');
const setupApp = require('./appSetup');
const siteScraper = require('./helpers/scraper');
// const scrapeSite = require('./helpers/scrape');

const app = express();
setupApp(app);

app.post('/api/scrape', (req, res) => {
  const { url } = req.body;
  console.log(url);
  // scrapeSite(url)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     console.log('err');
  //     res.sendStatus(500);
  //   });

  siteScraper(url)
    .then(() => {
      const data = fs.readFileSync('./pythoneer/data/data.json');
      const parsedData = JSON.parse(data);
      res.send(parsedData);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = app;
