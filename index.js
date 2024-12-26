import 'dotenv/config'
import { Router } from 'express';
import puppeteer from 'puppeteer-core';
import process from 'node:process';


const router = Router();

// Scraping logic using Puppeteer and BrightData
const scrapeData = async (searchTerm) => {
  const BROWSER_WS = process.env.BROWSER_WS;
  const URL = "https://www.amazon.com";

  const browser = await puppeteer.connect({
    browserWSEndpoint: BROWSER_WS,
  });

  console.log("Connected to browser...");
  console.log("testing:::", process.env.BROWSER_WS)

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(120000);

  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  console.log("Navigated to Amazon");

  await page.waitForSelector('#twotabsearchtextbox');
  await page.type('#twotabsearchtextbox', searchTerm);
  await page.keyboard.press('Enter');

  await page.waitForSelector('.s-card-container');

  const products = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.s-card-container')).map((el) => ({
      url: el.querySelector('a')?.getAttribute('href'),
      imageCover: el.querySelector('.a-section.s-image-fixed-height img')?.getAttribute('src'),
      title: el.querySelector('h2 span')?.innerText,
      price: el.querySelector('.a-price > .a-offscreen')?.innerText,
    }));
  });

  await browser.close();
  return products;
};

// Define the API route for scraping
router.get('/scrape', async (req, res) => {
  const { search_term } = req.query;

  if (!search_term) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  try {
    const data = await scrapeData(search_term);
    res.json(data);
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).json({ error: 'Failed to scrape data' });
  }
});

export default router;
