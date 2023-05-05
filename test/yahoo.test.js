/* eslint-disable no-unused-expressions */
'use strict';

const { expect } = require('chai');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const yahoo = require('../src/yahoo');
const ydHTML = fs.readFileSync(
  path.resolve(__dirname, './test_data/yahoo_dictionary.html')
);
const ydNotFoundHTML = fs.readFileSync(
  path.resolve(__dirname, './test_data/yahoo_dictionary_not_found.html')
);
const googleHTML = fs.readFileSync(
  path.resolve(__dirname, './test_data/google.html')
);

describe('yahoo', () => {
  it('should export a URI constant and a crawl function', () => {
    expect(yahoo).to.have.own.property('URI');
    expect(yahoo.URI).to.be.a('string');
    expect(yahoo).to.have.own.property('crawl');
    expect(yahoo.crawl).to.be.a('function');
  });

  it('should throw an error', () => {
    expect(() => yahoo.crawl()).to.throw();
    expect(() => yahoo.crawl({ key: 'value' })).to.throw();
    expect(() => yahoo.crawl('')).to.throw();
    expect(() => yahoo.crawl(null)).to.throw();
  });

  it('should return data', () => {
    const data = yahoo.crawl(cheerio.load(ydHTML));
    expect(data).to.have.own.property('main');
    expect(data.main).to.have.own.property('title');
    expect(data.main).to.have.own.property('phonetic');
    expect(data.main).to.have.own.property('pronunciations');
    expect(data.main).to.have.own.property('explanations');
    expect(data).to.have.own.property('notes');
    expect(data).to.have.own.property('secondary');
    expect(data).to.have.own.property('more');
  });

  it('should return \'Not Found\'', async () => {
    const data = yahoo.crawl(cheerio.load(ydNotFoundHTML));
    expect(data).to.be.equal('Not Found');
  });

  it('should return \'Not Found\'', async () => {
    const data = yahoo.crawl(cheerio.load(googleHTML));
    expect(data).to.be.equal('Not Found');
  });
});
