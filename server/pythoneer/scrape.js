const fs = require('fs');

const jsdom = require('jsdom');
const axios = require('axios');

const { JSDOM } = jsdom;

class WebScraper {
  constructor(url) {
    this.url = url;
    this.data = {};
    this.error = null;
  }

  async scrape() {
    try {
      // Fetch the page
      const response = await axios.get(this.url);
      const dom = new JSDOM(response.data);
      this.document = dom.window.document;

      // Extract the data
      this.data.page_info = this.extractPageInfo();
      this.data.page_structure = this.extractPageStructure();
      this.data.links = this.extractLinks();
      this.data.images = this.extractImages();
      this.data.heading_structure = this.extractHeadingStructure();
      this.data.form_fields = this.extractFormFields();

      this.saveToJson(this.data);
      // console.log(JSON.stringify({ data: this.data }));
      return { data: this.data, error: null };
    } catch (error) {
      const { name, message } = error;
      this.error = { type: name, message };
      console.log(JSON.stringify({ error: this.error }));
      return { error: this.error, data: null };
    }
  }

  // Extract metadata from the head of the document
  extractPageInfo() {
    const { title, documentElement } = this.document;
    const pageInfo = {
      title,
      language: documentElement?.lang || '',
    };

    const metaTags = [
      'description',
      'keywords',
      'author',
      'viewport',
    ];
    for (let tag of metaTags) {
      const metaElement = this.document.querySelector(
        `meta[name="${tag}"]`
      );
      if (metaElement) {
        pageInfo[tag] = metaElement.content || '';
      }
    }

    return pageInfo;
  }

  // Check for the presence of common structural elements
  extractPageStructure() {
    const pageStructure = {};
    const structureElements = ['header', 'footer', 'nav', 'main'];
    for (let element of structureElements) {
      pageStructure[element] =
        this.document.querySelector(element) !== null;
    }

    return pageStructure;
  }

  // Extract all the links from the page
  extractLinks() {
    const links = Array.from(this.document.querySelectorAll('a')).map(
      (link) => {
        const { href, textContent } = link;
        return {
          href: href || '',
          text: textContent.trim(),
        };
      }
    );

    return links;
  }

  // Extract all the image sources and alt text from the page
  extractImages() {
    const images = Array.from(
      this.document.querySelectorAll('img')
    ).map((img) => {
      // Use object destructuring to access properties of img
      const { src, alt } = img;
      return {
        src: src || '',
        alt: alt || '',
      };
    });

    return images;
  }

  extractHeadingStructure() {
    const body = this.document.querySelector('body');
    const blockElements = [
      'article',
      'aside',
      'div',
      'footer',
      'form',
      'header',
      'li',
      'main',
      'nav',
      'ol',
      'p',
      'pre',
      'section',
      'table',
      'ul',
    ];
    const elementsHeadingsDict = {};

    for (const element of blockElements) {
      const elementInstances = body.querySelectorAll(element);
      const elementHeadingsArr = [];

      for (const instance of elementInstances) {
        // Use the .children property to get only direct children elements
        const directChildren = instance.children;
        const headings = Array.from(directChildren).filter(
          ({ tagName }) => tagName[0] === 'H'
        );

        // Use array destructuring to assign values from headings
        const headingLevels = [];
        for (const { tagName } of headings) {
          // discard the element if it tagname is not in the format H1, H2, H3, etc
          if (!/H\d/.test(tagName)) {
            continue;
          }
          // Use the parseInt function to extract the heading level from tagName
          const headingLevel = parseInt(tagName[1]);
          headingLevels.push(headingLevel);
        }

        elementHeadingsArr.push(headingLevels);
      }

      elementsHeadingsDict[element] = elementHeadingsArr;
    }

    return elementsHeadingsDict;
  }

  extractFormFields() {
    const formFields = Array.from(
      this.document.querySelectorAll('input')
    ).map((input) => {
      const { name, id, type } = input;
      return {
        name: name || id || type || '',
        label:
          this.document.querySelector(`label[for="${id}"]`)
            ?.textContent || '',
        type: type || '',
      };
    });

    return formFields;
  }

  saveToJson(data) {
    fs.writeFileSync('data.json', JSON.stringify(data));
  }
}

// new WebScraper('http://127.0.0.1:5500/index.html');
// new WebScraper('https://www.google.com');
// new WebScraper('https://hassanshakur.vercel.app');
module.exports = WebScraper;
