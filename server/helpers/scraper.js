const { spawn } = require('child_process');
const { resolve } = require('path');

const siteScraper = (url) => {
  const pythoneer = spawn('python', [
    resolve(__dirname, '../pythoneer/scraper.py'),
    url,
  ]);

  return new Promise((resolve, reject) => {
    pythoneer.on('close', (code) => {
      if (code !== 0) {
        console.log(`pythoneer process exited with code ${code}`);
        return reject(`failed with code ${code}`);
      }

      console.log('pythoneer process exited with code 0');
      return resolve('success');
    });
  });
};

module.exports = siteScraper;
