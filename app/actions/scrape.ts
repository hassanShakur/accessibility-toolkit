'use server';

import fs from 'fs';
import axios from 'axios';
import { JSDOM } from 'jsdom';

import ReportType from '@/types/report';

class WebScraper {
  private url: string;
  private data: any;
  private error: any;
  private document: Document = new JSDOM().window.document;

  constructor(url: string) {
    this.url = url;
    this.error = null;
  }

  async scrape() {
    try {
      const response = await axios.get(this.url);
      const dom = new JSDOM(response.data);
      this.document = dom.window.document;

      const siteData: ReportType = this.extractData();

      // this.saveToJson(this.data);

      return { data: siteData, error: null };
    } catch (error: any) {
      const { name, message } = error;
      this.error = { type: name, message };
      return { error: this.error, data: null };
    }
  }

  private extractData(): ReportType {
    const pageInfo = this.extractPageInfo();
    const pageStructure = this.extractPageStructure();
    const links = this.extractLinks();
    const images = this.extractImages();
    const headingStructure = this.extractHeadingStructure();
    const formFields = this.extractFormFields();

    return {
      pageInfo,
      pageStructure,
      links,
      images,
      headingStructure,
      formFields,
    };
  }

  private extractPageInfo(): ReportType['pageInfo'] {
    const { title, documentElement } = this.document;
    const pageInfo: ReportType['pageInfo'] = {
      title,
      language: documentElement?.lang || '',
      description: '',
      viewport: '',
    };

    const metaTags = ['description', 'viewport'];

    for (let tag of metaTags) {
      const metaElement = this.document.querySelector(
        `meta[name="${tag}"]`
      );
      if (metaElement) {
        pageInfo[tag as keyof ReportType['pageInfo']] =
          metaElement.getAttribute('content') || '';
      }
    }

    return pageInfo;
  }

  private extractPageStructure(): ReportType['pageStructure'] {
    const pageStructure: any = {};
    const structureElements = ['header', 'footer', 'nav', 'main'];
    for (let element of structureElements) {
      pageStructure[element] =
        this.document.querySelector(element) !== null;
    }

    return pageStructure;
  }

  private extractLinks(): ReportType['links'] {
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

  private extractImages(): ReportType['images'] {
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

  private extractHeadingStructure(): ReportType['headingStructure'] {
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

  private extractFormFields(): ReportType['formFields'] {
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

const scrapeSite = async (url: string) => {
  const scraper = new WebScraper(url);
  const siteData = await scraper.scrape();

  try {
    const { error } = siteData;

    if (!error) return { data: siteData.data, error: null };

    let customError = '';
    const errorMessage = error.message;
    const erroType = error.type;

    if (errorMessage === 'ConnectionError') {
      customError =
        'Failed to resolve the URL! Please check it and try again.';
    } else if (errorMessage?.includes('getaddrinfo ENOTFOUND')) {
      customError = `URL not found! Please check it and try again.`;
    } else if (errorMessage === 'TimeoutError') {
      customError = 'Request timed out! Please try again.';
    } else {
      customError = error.message || 'An error occurred';
    }

    throw new Error(customError);
    // return res.status(500).json({
    //   status: 'error',
    //   type: erroType || 'unknown',
    //   message: customError,
    // });
  } catch (err: any) {
    console.log({ err });
    // throw new Error(err.message || 'An unknown error occurred');
    return {
      error: err.message || 'An unknown error occurred',
      data: null,
    };
    // return { error: err.message || 'An unknown error occurred' };
    // console.log({ err });
    // res.status(500).json({
    //   status: 'error',
    //   type: err.type || 'unknown',
    //   message: err.message || 'An unknown error occurred',
    // });
  }
};

export default scrapeSite;
