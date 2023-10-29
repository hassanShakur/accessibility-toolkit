const { spawn } = require('child_process');
const { resolve } = require('path');

const siteScraper = (url) => {
  let exitCode = 0;

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
      exitCode = code;
    });
  } catch (err) {
    console.log(err);
    exitCode = 1;
  }

  return exitCode;
};

module.exports = siteScraper;
