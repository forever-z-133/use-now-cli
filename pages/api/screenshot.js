const puppeteer = require('puppeteer');
const { getQuery } = require('./utils/index.js');
const { uploadFile } = require('../../utils/ali-oss.js');

module.exports = async (req, res) => {
  const url = getQuery('url', req);

  const browser = await puppeteer.launch();
  const [page] = await browser.pages();
  await page.goto(url || 'https://example.com');
  const x = await page.screenshot({ path: 'example.png' });
  await browser.close();
  const reseult = await uploadFile(undefined, x);

  res.json(reseult);
};
