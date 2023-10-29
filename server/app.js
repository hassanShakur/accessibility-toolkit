const express = require('express')
const setupApp = require('./appSetup')

const app = express()
setupApp(app)

// Receive a url from the client and send it to the scraper
app.post('/api/scrape', (req, res) => {
  const url = req.body.url

//   Execute the scraper here (./pythoneer/scrape.py)
  console.log('url', url)
  res.send('ok')
})

module.exports = app;

