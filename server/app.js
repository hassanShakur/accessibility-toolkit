const fs = require('fs');
const express = require('express');
const setupApp = require('./appSetup');
const siteScraper = require('./helpers/scraper');

const app = express();
setupApp(app);

app.post('/api/scrape', (req, res) => {
  const { url } = req.body;
  const code = siteScraper(url);

  if (code !== 0)
    return res.status(500).json({
      status: 'error',
      message: 'something went wrong',
    });

  const scrappedData = fs.readFileSync('./pythoneer/data/data.json', 'utf8');
  const data = JSON.parse(scrappedData);

  return res.status(200).json({
    status: 'success',
    message: 'scraping complete',
    data,
  });
});

module.exports = app;
