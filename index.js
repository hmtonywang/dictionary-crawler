'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const dictionaryCrawlers = require('./src');

const crawlers = {};

async function load (url) {
  const res = await axios.get(url);
  return cheerio.load(res.data);
}

function setCrawler (crawler) {
  async function crawl (str) {
    if (typeof str !== 'string') {
      throw new TypeError(`The 'crawl' function requires a string but got a ${typeof str}`);
    }
    const trim = str.replace(/\s/g, '');
    if (!trim) {
      throw new RangeError('The \'crawl\' function requires a non-empty string');
    }
    const src = `${crawler.URI}${str}`;
    const $ = await load(src);
    return crawler.crawl($);
  };
  return {
    crawl
  };
}

Object
  .keys(dictionaryCrawlers)
  .forEach(key => {
    const crawler = dictionaryCrawlers[key];
    if (typeof crawler.URI !== 'string' || !crawler.URI.replace(/\s/g, '')) {
      throw new TypeError(`Crawler '${key}' requires a non-empty constant string 'URI'`);
    }
    if (typeof crawler.crawl !== 'function') {
      throw new TypeError(`Crawler '${key}' requires a function 'crawl'`);
    }
    crawlers[key] = setCrawler(crawler);
  });

module.exports = crawlers;
