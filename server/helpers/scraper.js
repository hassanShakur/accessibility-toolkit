const { spawn } = require('child_process');
const { resolve } = require('path');

const siteScraper = async (url) => {
  try {
    const path = resolve(__dirname, '../pythoneer/scrape.py');
    const scraper = spawn('python', [path, url]);

    scraper.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    scraper.stderr.on('data', (data) => {
      console.log(data.toString());
    });

    scraper.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = siteScraper;
