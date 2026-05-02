const axios = require('axios');
require('dotenv').config();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const hosts = [
    'real-time-flipkart-search.p.rapidapi.com',
    'flipkart-search.p.rapidapi.com',
    'flipkart-data-scrapper.p.rapidapi.com',
    'real-time-flipkart-data.p.rapidapi.com'
];

async function findSearchApi() {
    for (const host of hosts) {
        console.log(`Testing host ${host}...`);
        try {
            const res = await axios.request({
                method: 'GET',
                url: `https://${host}/search`,
                params: { q: 'iphone 15' },
                headers: { 'x-rapidapi-key': RAPIDAPI_KEY, 'x-rapidapi-host': host },
                timeout: 5000
            });
            console.log(`Success ${host}!`);
            return;
        } catch (e) {
            console.log(`Fail ${host}:`, e.response?.status);
        }
    }
}

findSearchApi();
