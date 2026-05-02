const axios = require('axios');
require('dotenv').config();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const AMAZON_HOST = process.env.AMAZON_API_HOST || 'real-time-amazon-data.p.rapidapi.com';

async function testAmazon() {
    console.log('Testing Amazon API...');
    console.log(`Key length: ${RAPIDAPI_KEY ? RAPIDAPI_KEY.length : 0}`);
    console.log(`Host: ${AMAZON_HOST}`);

    try {
        const options = {
            method: 'GET',
            url: `https://${AMAZON_HOST}/search`,
            params: { query: 'iPhone 15', country: 'IN', page: '1' },
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': AMAZON_HOST
            }
        };

        const response = await axios.request(options);
        console.log(`Status: ${response.status}`);
        console.log('Data Structure Keys:', Object.keys(response.data));
        
        if (response.data.data) {
            console.log('Data sub-keys:', Object.keys(response.data.data));
            if (response.data.data.products) {
                console.log(`Products count: ${response.data.data.products.length}`);
            }
        } else if (response.data.products) {
            console.log(`Products count (root): ${response.data.products.length}`);
        } else {
            console.log('Full Data Sample:', JSON.stringify(response.data).substring(0, 500));
        }

    } catch (error) {
        console.error('Error Status:', error.response?.status);
        console.error('Error Data:', JSON.stringify(error.response?.data));
        console.error('Error Message:', error.message);
    }
}

testAmazon();
