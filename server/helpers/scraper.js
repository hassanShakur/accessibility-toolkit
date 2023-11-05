const { spawn } = require('child_process');
const { resolve } = require('path');

const siteScraper = (url) => {
  const pythoneer = spawn('python', [
    resolve(__dirname, '../pythoneer/scrape.py'),
    url,
  ]);

  return new Promise((resolve, reject) => {
    pythoneer.on('close', (code) => {
      if (code !== 0) {
        console.log(`pythoneer process exited with code ${code}`);
        return reject(code);
      }

      console.log('pythoneer process exited with code 0');
      return resolve(code);
    });
  });
};

module.exports = siteScraper;
