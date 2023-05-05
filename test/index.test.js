/* eslint-disable no-unused-expressions */
'use strict';

const sandbox = require('sinon').createSandbox();
const { expect } = require('chai');
const cheerio = require('cheerio');
const axios = require('axios');
const crawlers = require('../');

describe('index', () => {
  it('should have yahoo crawler which has a crawl function', () => {
    expect(crawlers).to.have.own.property('yahoo');
    expect(crawlers.yahoo).to.have.own.property('crawl');
    expect(crawlers.yahoo.crawl).to.be.a('function');
  });

  it('should throw an error', async () => {
    let error;
    try {
      await crawlers.yahoo.crawl();
    } catch (e) {
      error = e;
    }
    expect(error).to.be.instanceOf(Error);
  });

  it('should throw an error', async () => {
    let error;
    try {
      await crawlers.yahoo.crawl({ key: 'value' });
    } catch (e) {
      error = e;
    }
    expect(error).to.be.instanceOf(Error);
  });

  it('should throw an error', async () => {
    let error;
    try {
      await crawlers.yahoo.crawl('');
    } catch (e) {
      error = e;
    }
    expect(error).to.be.instanceOf(Error);
  });

  it('should throw an error', async () => {
    let error;
    try {
      await crawlers.yahoo.crawl('  ');
    } catch (e) {
      error = e;
    }
    expect(error).to.be.instanceOf(Error);
  });

  it('should throw an error', async () => {
    let error;
    try {
      await crawlers.yahoo.crawl(null);
    } catch (e) {
      error = e;
    }
    expect(error).to.be.instanceOf(Error);
  });

  it('should throw an error', async () => {
    const stub = sandbox.stub(cheerio, 'load').throws();
    let error;
    try {
      await crawlers.yahoo.crawl('test');
    } catch (e) {
      error = e;
    }
    expect(error).to.be.instanceOf(Error);
    expect(stub.calledOnce);
    stub.restore();
  });

  it('should throw an error', async () => {
    const stub = sandbox.stub(axios, 'get').throws();
    let error;
    try {
      await crawlers.yahoo.crawl('test');
    } catch (e) {
      error = e;
    }
    expect(error).to.be.instanceOf(Error);
    expect(stub.calledOnce);
    stub.restore();
  });

  it('should return data', async () => {
    let error;
    try {
      await crawlers.yahoo.crawl('test');
    } catch (e) {
      error = e;
    }
    expect(error).to.be.a('undefined');
  });
});
