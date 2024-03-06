'use server';

import fs from 'fs';
import axios from 'axios';
import { JSDOM } from 'jsdom';

class WebScraper {
  private url: string;
  private data: any;
  private error: any;
  private document: Document = new JSDOM().window.document;

  constructor(url: string) {
    this.url = url;
    this.data = {};
    this.error = null;
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

      return { data: this.data, error: null };
    } catch (error: any) {
      const { name, message } = error;
      this.error = { type: name, message };
      return { error: this.error, data: null };
    }
  }

  private extractPageInfo() {
    const { title, documentElement } = this.document;
    const pageInfo: any = {
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
        pageInfo[tag] = metaElement.getAttribute('content') || '';
      }
    }

    return pageInfo;
  }

  private extractPageStructure() {
    const pageStructure: any = {};
    const structureElements = ['header', 'footer', 'nav', 'main'];
    for (let element of structureElements) {
      pageStructure[element] =
        this.document.querySelector(element) !== null;
    }

    return pageStructure;
  }

  private extractLinks() {
    const links = Array.from(this.document.querySelectorAll('a')).map(
      (link: HTMLAnchorElement) => {
        const { href, textContent } = link;
        return {
          href: href || '',
          text: textContent?.trim() || '',
        };
      }
    );

    return links;
  }

  private extractImages() {
    const images = Array.from(
      this.document.querySelectorAll('img')
    ).map((img: HTMLImageElement) => {
      const { src, alt } = img;
      return {
        src: src || '',
        alt: alt || '',
      };
    });

    return images;
  }

  private extractHeadingStructure() {
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
    const elementsHeadingsDict: any = {};

    for (const element of blockElements) {
      const elementInstances = body?.querySelectorAll(element);
      const elementHeadingsArr: any[] = [];

      for (const instance of Array.from(elementInstances || [])) {
        const directChildren = instance.children;
        const headings = Array.from(directChildren).filter(
          ({ tagName }) => tagName[0] === 'H'
        );

        const headingLevels: number[] = [];
        for (const { tagName } of headings) {
          if (!/H\d/.test(tagName)) {
            continue;
          }
          const headingLevel = parseInt(tagName[1]);
          headingLevels.push(headingLevel);
        }

        elementHeadingsArr.push(headingLevels);
      }

      elementsHeadingsDict[element] = elementHeadingsArr;
    }

    return elementsHeadingsDict;
  }

  private extractFormFields() {
    const formFields = Array.from(
      this.document.querySelectorAll('input')
    ).map((input: HTMLInputElement) => {
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

  private saveToJson(data: any) {
    fs.writeFileSync('data.json', JSON.stringify(data));
  }
}

export default WebScraper;
