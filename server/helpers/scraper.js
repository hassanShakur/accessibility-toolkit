const { spawn } = require('child_process');
const { resolve } = require('path');

const siteScraper = (url) => {
  const pyScriptPath = resolve(__dirname, '../pythoneer/scraper.py');
  return new Promise((resolve, reject) => {
    const pythoneer = spawn('python', [pyScriptPath, url]);

    let responseData = '';

    pythoneer.stdout.on('data', (data) => {
      responseData += data.toString();
    });

    pythoneer.stderr.on('data', (data) => {
      // Handle error output, if needed
      console.error(`Error from pythoneer: ${data}`);
    });

    pythoneer.on('close', (code) => {
      if (code !== 0) {
        console.log(`pythoneer process exited with code ${code}`);
        return reject(`Failed with code ${code}`);
      }

      try {
        const parsedData = JSON.parse(responseData);
        console.log('Scraping success');
        if (parsedData.error) {
          console.error(`Error scraping: ${parsedData.error}`);
          return reject(parsedData.error);
        }
        resolve(parsedData.data);
      } catch (error) {
        console.error(`Error parsing JSON: ${error}`);
        reject('Error parsing JSON');
      }
    });

    pythoneer.on('error', (err) => {
      console.error(`Error starting pythoneer: ${err}`);
      reject('Error starting pythoneer');
    });
  });
};

module.exports = siteScraper;
