const axios = require('axios');
const cheerio = require('cheerio');

const scrapeSite = async (url) => {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const title = $('title').text();
    const description = $('meta[name="description"]').attr('content');

    console.log(title, description);
    return {
      title,
      description,
    };
  } catch (error) {
    console.log(error);
  }
};

const extractEmptyLinks = async ($) => {
  const links = $('a');
  const emptyLinks = [];

  links.each((i, link) => {
    const href = $(link).attr('href');

    if (!href) {
      emptyLinks.push(link);
    }
  });

  return emptyLinks;
};

scrapeSite('https://www.mmu.ac.ke');

module.exports = scrapeSite;
