const axios = require('axios');
require('dotenv').config();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const FLIPKART_HOST = 'real-time-flipkart-data2.p.rapidapi.com';

async function guessEndpoints() {
    const endpoints = ['/search', '/product-search', '/products', '/search-v2', '/v1/search'];
    for (const endpoint of endpoints) {
        console.log(`Trying ${endpoint}...`);
        try {
            const res = await axios.request({
                method: 'GET',
                url: `https://${FLIPKART_HOST}${endpoint}`,
                params: { query: 'iphone', q: 'iphone' },
                headers: { 'x-rapidapi-key': RAPIDAPI_KEY, 'x-rapidapi-host': FLIPKART_HOST },
                timeout: 5000
            });
            console.log(`Success ${endpoint}:`, res.status);
            return;
        } catch (e) {
            console.log(`Fail ${endpoint}:`, e.response?.status);
        }
    }
}

guessEndpoints();
