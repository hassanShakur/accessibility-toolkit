const { JSDOM } = require('jsdom');
const fs = require('fs');

class WebScraper {
  constructor(url) {
    try {
      const dom = new JSDOM(fs.readFileSync(url, 'utf-8'));
      this.data = {};
      this.error = null;
      this.extractData(dom);
      console.log(JSON.stringify({ data: this.data }));
    } catch (e) {
      this.error = { type: e.name, message: e.message };
      console.log(JSON.stringify({ error: this.error }));
    }
  }

  extractData(dom) {
    this.page_info = this.extractPageInfo(dom);
    this.page_structure = this.extractPageStructure(dom);
    this.links = this.extractLinks(dom);
    this.images = this.extractImages(dom);
    this.heading_structure = this.extractHeadingStructure(dom);
    this.form_fields = this.extractFormFields(dom);
    this.data = {
      page_info: this.page_info,
      page_structure: this.page_structure,
      links: this.links,
      images: this.images,
      heading_structure: this.heading_structure,
      form_fields: this.form_fields,
    };
    this.saveToJson(this.data);
  }

  extractPageInfo(dom) {
    const page_info = {
      title: dom.window.document.title,
      language: dom.window.document.documentElement.lang || '',
    };
    const meta_tags = [
      'description',
      'keywords',
      'author',
      'viewport',
    ];
    meta_tags.forEach((tag) => {
      const tag_data = dom.window.document.querySelector(
        `meta[name="${tag}"]`
      );
      if (tag_data) {
        page_info[tag] = tag_data.getAttribute('content') || '';
      }
    });
    return page_info;
  }

  extractPageStructure(dom) {
    const page_structure = {};
    const structure_elements = ['header', 'footer', 'nav', 'main'];
    structure_elements.forEach((element) => {
      page_structure[element] =
        dom.window.document.querySelector(element) !== null;
    });
    return page_structure;
  }

  extractLinks(dom) {
    const links = Array.from(
      dom.window.document.querySelectorAll('a')
    ).map((link) => ({
      href: link.getAttribute('href') || '',
      text: link.textContent.trim(),
    }));
    return links;
  }

  extractImages(dom) {
    const images = Array.from(
      dom.window.document.querySelectorAll('img')
    ).map((image) => ({
      src: image.getAttribute('src') || '',
      alt: image.getAttribute('alt') || '',
    }));
    return images;
  }

  extractHeadingStructure(dom) {
    const body = dom.window.document.body;
    const block_elements = [
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
    const elements_headings_dict = {};
    block_elements.forEach((element) => {
      const element_instances = Array.from(
        body.querySelectorAll(element)
      );
      const element_headings_arr = [];
      element_instances.forEach((instance) => {
        const headings = Array.from(
          instance.querySelectorAll('h1, h2, h3, h4, h5, h6')
        );
        const heading_levels = headings.map((heading) =>
          parseInt(heading.tagName[1])
        );
        element_headings_arr.push(heading_levels);
      });
      elements_headings_dict[element] = element_headings_arr;
    });
    return elements_headings_dict;
  }

  extractFormFields(dom) {
    const form_fields = Array.from(
      dom.window.document.querySelectorAll('input')
    );
    const form_fields_arr = [];
    form_fields.forEach((field) => {
      const label = field.previousElementSibling;
      const label_text = label ? label.textContent : '';
      const field_name =
        field.getAttribute('name') ||
        field.getAttribute('id') ||
        field.getAttribute('type') ||
        '';
      form_fields_arr.push({
        name: field_name,
        label: label_text,
        type: field.getAttribute('type') || '',
      });
    });
    return form_fields_arr;
  }

  saveToJson(data) {
    const path = this.buildFilePath('data');
    fs.writeFileSync(`${path}/data.json`, JSON.stringify(data));
  }

  logDetails(url, start_time) {
    const path = this.buildFilePath('logs');
    fs.appendFileSync(
      `${path}/log.txt`,
      `${new Date().toString()} ${url} ${Date.now() - start_time}ms\n`
    );
  }

  buildFilePath(directory) {
    const path = `./pythoneer/${directory}`;
    fs.mkdirSync(path, { recursive: true });
    return path;
  }
}

// Usage
const url = process.argv[2];
if (!url) {
  console.log('Please provide a URL as a command line argument.');
  process.exit(1);
}

const start_time = Date.now();
const scraper = new WebScraper(url);
scraper.logDetails(url, start_time);
