const puppeteer = require('puppeteer');
const { getQuery } = require('./utils/index.js');

module.exports = async (req, res) => {
  const url = getQuery('url', req);

  const browser = await puppeteer.launch();
  const [page] = await browser.pages();
  await page.goto(url || 'https://www.example.com');
  const x = await page.screenshot();
  await browser.close();
  res.json(x.toString('base64'));
};
