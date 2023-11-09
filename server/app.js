const fs = require('fs');
const express = require('express');
const setupApp = require('./appSetup');
const siteScraper = require('./helpers/scraper');

const app = express();
setupApp(app);

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;
  console.log(url);

  try {
    const scrapeStatus = await siteScraper(url);
    console.log(scrapeStatus);

    const data = fs.readFileSync('./pythoneer/data/data.json');
    const siteData = JSON.parse(data);

    res.status(200).json({
      status: 'success',
      data: siteData,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err,
    });
  }
});

module.exports = app;
