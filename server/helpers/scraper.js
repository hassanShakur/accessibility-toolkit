import { spawn } from 'child_process';
import { resolve } from 'path';

const scrapeSite = (url) => {
  return new Promise((resolve, reject) => {
    const path = resolve(__dirname, '../pythoneer/scrape.py');
    const scraper = spawn('python3', [path, url]);

    scraper.stdout.on('data', (data) => {
      resolve(data.toString());
    });

    scraper.stderr.on('data', (data) => {
      reject(data.toString());
    });

    scraper.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
};

export default scrapeSite;
