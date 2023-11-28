const express = require('express');
const setupApp = require('./appSetup');
const siteScraper = require('./helpers/scraper');

const app = express();
setupApp(app);

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;

  try {
    const siteData = await siteScraper(url);

    res.status(200).json({
      status: 'success',
      url,
      data: siteData,
    });
  } catch (err) {
    console.log({err});
    res.status(500).json({
      status: 'error',
      type: err.type || 'unknown',
      message: err.message || 'Unknown error',
    });
  }
});

module.exports = app;
