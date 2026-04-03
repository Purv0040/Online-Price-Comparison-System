const axios = require('axios');
require('dotenv').config();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

async function testNewApis() {
    console.log('Testing Flipkart v2...');
    try {
        const options1 = {
            method: 'GET',
            url: 'https://real-time-flipkart-data2.p.rapidapi.com/search',
            params: { query: 't-shirt', page: '1' },
            headers: { 'x-rapidapi-key': RAPIDAPI_KEY, 'x-rapidapi-host': 'real-time-flipkart-data2.p.rapidapi.com' }
        };
        const res1 = await axios.request(options1);
        console.log('Flipkart v2 status:', res1.status);
    } catch (e) {
        console.log('Flipkart v2 Error:', e.response?.status, e.response?.data?.message || e.message);
    }

    console.log('Testing Myntra...');
    try {
        const options2 = {
            method: 'POST',
            url: 'https://myntra-price-history-tracker1.p.rapidapi.com/myntra.php',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': 'myntra-price-history-tracker1.p.rapidapi.com',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: new URLSearchParams({ url: 'https://www.myntra.com/tshirts/roadster/roadster-men-black-solid-round-neck-t-shirt/1996777/buy' }).toString()
        };
        const res2 = await axios.request(options2);
        console.log('Myntra status:', res2.status);
    } catch (e) {
        console.log('Myntra Error:', e.response?.status, e.response?.data?.message || e.message);
    }
}

testNewApis();
