const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const axios = require('axios');

class WebScraper {
  constructor(url) {
    this.url = url;
    this.data = {};
    this.error = null;

    this.scrape();
  }

  async scrape() {
    try {
      const response = await axios.get(this.url);
      const dom = new JSDOM(response.data);
      this.document = dom.window.document;

      this.data.page_info = this.extractPageInfo();
      this.data.page_structure = this.extractPageStructure();
      this.data.links = this.extractLinks();
      this.data.images = this.extractImages();
      this.data.heading_structure = this.extractHeadingStructure();
      this.data.form_fields = this.extractFormFields();

      this.saveToJson(this.data);
      console.log(JSON.stringify({ data: this.data }));
    } catch (error) {
      this.error = { type: error.name, message: error.message };
      console.log(JSON.stringify({ error: this.error }));
    }
  }

  extractPageInfo() {
    const pageInfo = {
      title: this.document.title,
      language: this.document.documentElement.lang || '',
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
        pageInfo[tag] = metaElement.content;
      }
    }

    return pageInfo;
  }

  extractPageStructure() {
    const pageStructure = {};
    const structureElements = ['header', 'footer', 'nav', 'main'];
    for (let element of structureElements) {
      pageStructure[element] =
        this.document.querySelector(element) !== null;
    }

    return pageStructure;
  }

  extractLinks() {
    const links = Array.from(this.document.querySelectorAll('a')).map(
      (link) => ({
        href: link.href || '',
        text: link.textContent.trim(),
      })
    );

    return links;
  }

  extractImages() {
    const images = Array.from(
      this.document.querySelectorAll('img')
    ).map((img) => ({
      src: img.src || '',
      alt: img.alt || '',
    }));

    return images;
  }

  extractHeadingStructure() {
    // This function is a bit complex to translate directly from Python to JavaScript,
    // as it involves a lot of BeautifulSoup-specific functionality.
    // Here's a simplified version that just gets the headings from the entire document:
    const headings = Array.from(
      this.document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    ).map((heading) => ({
      tag: heading.tagName,
      text: heading.textContent.trim(),
    }));

    return headings;
  }

  extractFormFields() {
    const formFields = Array.from(
      this.document.querySelectorAll('input')
    ).map((input) => ({
      name: input.name || input.id || input.type || '',
      label:
        this.document.querySelector(`label[for="${input.id}"]`)
          ?.textContent || '',
      type: input.type || '',
    }));

    return formFields;
  }

  saveToJson(data) {
    fs.writeFileSync('data.json', JSON.stringify(data));
  }
}

new WebScraper('https://www.google.com');
