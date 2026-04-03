const axios = require('axios');
require('dotenv').config();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const MEESHO_HOST = process.env.MEESHO_API_HOST || 'meesho-price-history-tracker4.p.rapidapi.com';

async function testMeesho() {
    console.log('Testing Meesho Search...');
    try {
        const options = {
            method: 'GET',
            url: `https://${MEESHO_HOST}/search.php`,
            params: { query: 't-shirt' },
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': MEESHO_HOST
            },
            timeout: 10000
        };

        const response = await axios.request(options);
        console.log(`Status: ${response.status}`);
        console.log('Data:', JSON.stringify(response.data).substring(0, 500));
    } catch (error) {
        console.error('Error:', error.response?.status, error.response?.data || error.message);
    }
}

testMeesho();
