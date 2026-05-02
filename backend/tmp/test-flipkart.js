const axios = require('axios');
require('dotenv').config();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const FLIPKART_HOST = process.env.FLIPKART_API_HOST || 'flipkart-apis.p.rapidapi.com';

async function testFlipkart() {
    console.log('Testing Flipkart API...');
    console.log(`Key length: ${RAPIDAPI_KEY ? RAPIDAPI_KEY.length : 0}`);
    console.log(`Host: ${FLIPKART_HOST}`);

    try {
        const options = {
            method: 'GET',
            url: `https://${FLIPKART_HOST}/backend/rapidapi/category-products-list`,
            params: { categoryID: 'axc', page: '1' },
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': FLIPKART_HOST
            },
            timeout: 10000
        };

        const response = await axios.request(options);
        console.log(`Status: ${response.status}`);
        console.log('Full response keys:', Object.keys(response.data));
        
        if (response.data.products) {
            console.log(`Products: ${response.data.products.length}`);
        } else {
            console.log('Data found:', JSON.stringify(response.data).substring(0, 500));
        }

    } catch (error) {
        console.error('Error Status:', error.response?.status);
        console.error('Error Data:', JSON.stringify(error.response?.data));
    }
}

testFlipkart();
