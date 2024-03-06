const express = require('express');
const setupApp = require('./appSetup');
// const siteScraper = require('./helpers/scraper');
const WebScraper = require('./pythoneer/scrape');

const app = express();
setupApp(app);

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;

  try {
    // const siteData = await siteScraper(url);
    const scrapper = new WebScraper(url);
    const siteData = await scrapper.scrape();

    const { error } = siteData;

    if (!error) {
      return res.status(200).json({
        status: 'success',
        url,
        data: siteData.data,
      });
    }

    let customError = '';
    const errorMessage = error.message;
    const erroType = error.type;

    if (errorMessage === 'ConnectionError') {
      customError =
        'Failed to resolve the URL! Please check it and try again.';
    } else if (errorMessage?.includes('getaddrinfo ENOTFOUND')) {
      customError = `URL not found! Please check it and try again.`;
    } else if (errorMessage === 'TimeoutError') {
      customError = 'Request timed out! Please try again.';
    } else {
      customError = error.message || 'An error occurred';
    }

    return res.status(500).json({
      status: 'error',
      type: erroType || 'unknown',
      message: customError,
    });
  } catch (err) {
    console.log({ err });
    res.status(500).json({
      status: 'error',
      type: err.type || 'unknown',
      message: err.message || 'An unknown error occurred',
    });
  }
});

module.exports = app;
