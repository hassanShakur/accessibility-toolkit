const express = require('express');
const setupApp = require('./appSetup');

const siteScraper = require('./helpers/scraper');

const app = express();
setupApp(app);

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;

  siteScraper(url);

  res.send('ok');
});

module.exports = app;
