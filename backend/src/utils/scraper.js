const axios = require('axios');
const cheerio = require('cheerio');

// Scrape Amazon product
const scrapeAmazon = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const $ = cheerio.load(response.data);
    const title = $('#productTitle')?.text()?.trim() || 'Product';
    const priceText = $('.a-price-whole')?.text() || '$0';
    const image = $('#landingImage')?.attr('src') || 'N/A';

    return {
      title,
      price: priceText,
      image,
      rating: '4.5',
      sellerName: 'Amazon',
    };
  } catch (error) {
    console.log('Error scraping Amazon:', error.message);
    return null;
  }
};

// Scrape Flipkart product
const scrapeFlipkart = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const $ = cheerio.load(response.data);
    const title = $('span.B_NuCI')?.text() || 'Product';
    const price = $('.Nx9bqj._373yYp')?.text() || '$0';
    const image = $('img.DII5mw')?.attr('src') || 'N/A';

    return {
      title,
      price,
      image,
      rating: '4.0',
      sellerName: 'Flipkart',
    };
  } catch (error) {
    console.log('Error scraping Flipkart:', error.message);
    return null;
  }
};

// Scrape Snapdeal product
const scrapeSnapdeal = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const $ = cheerio.load(response.data);
    const title = $('.productTitle')?.text() || 'Product';
    const price = $('.discountedPriceText')?.text() || '$0';
    const image = $('.productImageHolder img')?.attr('src') || 'N/A';

    return {
      title,
      price,
      image,
      rating: '4.2',
      sellerName: 'Snapdeal',
    };
  } catch (error) {
    console.log('Error scraping Snapdeal:', error.message);
    return null;
  }
};

// Determine platform from URL
const getPlatformFromUrl = (url) => {
  const urlLower = url.toLowerCase();

  if (urlLower.includes('amazon')) return 'amazon';
  if (urlLower.includes('flipkart')) return 'flipkart';
  if (urlLower.includes('snapdeal')) return 'snapdeal';
  if (urlLower.includes('paytm')) return 'paytm';
  if (urlLower.includes('myntra')) return 'myntra';
  if (urlLower.includes('ajio')) return 'ajio';
  if (urlLower.includes('ebay')) return 'ebay';

  return 'other';
};

// Scrape product based on platform
const scrapeProduct = async (url, platform) => {
  const detectedPlatform = platform || getPlatformFromUrl(url);

  switch (detectedPlatform) {
    case 'amazon':
      return await scrapeAmazon(url);
    case 'flipkart':
      return await scrapeFlipkart(url);
    case 'snapdeal':
      return await scrapeSnapdeal(url);
    default:
      return null;
  }
};

module.exports = {
  scrapeProduct,
  scrapeAmazon,
  scrapeFlipkart,
  scrapeSnapdeal,
  getPlatformFromUrl,
};
