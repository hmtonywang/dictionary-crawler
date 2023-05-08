/* eslint-disable no-unused-expressions */
'use strict';

const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const cheerio = require('cheerio');
const crawlers = require('../');

describe('index', () => {
  it('should have a crawl function in each crawler', () => {
    Object
      .keys(crawlers)
      .forEach((key) => {
        const crawler = crawlers[key];
        expect(crawler).to.have.own.property('crawl');
        expect(crawler.crawl).to.be.a('function');
      });
  });

  it('should throw an error', () => {
    Object
      .keys(crawlers)
      .forEach(async (key) => {
        const crawler = crawlers[key];
        let error;
        try {
          await crawler.crawl();
        } catch (e) {
          error = e;
        }
        expect(error).to.be.instanceOf(Error);
      });
  });

  it('should throw an error', () => {
    Object
      .keys(crawlers)
      .forEach(async (key) => {
        const crawler = crawlers[key];
        let error;
        try {
          await crawler.crawl({ key: 'value' });
        } catch (e) {
          error = e;
        }
        expect(error).to.be.instanceOf(Error);
      });
  });

  it('should throw an error', () => {
    Object
      .keys(crawlers)
      .forEach(async (key) => {
        const crawler = crawlers[key];
        let error;
        try {
          await crawler.crawl('');
        } catch (e) {
          error = e;
        }
        expect(error).to.be.instanceOf(Error);
      });
  });

  it('should throw an error', () => {
    Object
      .keys(crawlers)
      .forEach(async (key) => {
        const crawler = crawlers[key];
        let error;
        try {
          await crawler.crawl('  ');
        } catch (e) {
          error = e;
        }
        expect(error).to.be.instanceOf(Error);
      });
  });

  it('should throw an error', () => {
    Object
      .keys(crawlers)
      .forEach(async (key) => {
        const crawler = crawlers[key];
        let error;
        try {
          await crawler.crawl(null);
        } catch (e) {
          error = e;
        }
        expect(error).to.be.instanceOf(Error);
      });
  });

  it('should return data', async () => {
    const tasks = Object
      .keys(crawlers)
      .map(async (key) => {
        const crawler = crawlers[key];
        let error;
        try {
          await crawler.crawl('test');
        } catch (e) {
          error = e;
        }
        expect(error).to.be.a('undefined');
      });
    await Promise.all(tasks);
  });

  it('should throw an error', async () => {
    const stub = sandbox.stub(cheerio, 'load').throws();
    const tasks = Object
      .keys(crawlers)
      .map(async (key) => {
        const crawler = crawlers[key];
        let error;
        try {
          await crawler.crawl('test');
        } catch (e) {
          error = e;
        }
        expect(error).to.be.instanceOf(Error);
      });
    await Promise.all(tasks);
    stub.restore();
  });
});
