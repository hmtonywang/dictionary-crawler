# dictionary-crawler

A dictionary crawler based on [cheerio](https://www.npmjs.com/package/cheerio), which returns definition and explanation of words by crawling online dictionaries.

[![Node Version](https://img.shields.io/badge/nodejs-18-green.svg?logo=node.js&style=flat)](https://nodejs.org)

## Installation

```shell
git clone git@github.com:hmtonywang/dictionary-crawler.git
cd dictionary-crawler
yarn install
```

## Usage

- To look up words, run:

```javascript
const crawler = require('dictionary-crawler');

const data = await crawler.yahoo.crawl('beautiful');
```

## License

MIT
