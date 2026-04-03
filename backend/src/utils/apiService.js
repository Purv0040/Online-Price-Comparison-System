const axios = require('axios');
const helpers = require('./helpers');

// Load environment variables
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const AMAZON_HOST = process.env.AMAZON_API_HOST || 'real-time-amazon-data.p.rapidapi.com';
const FLIPKART_HOST = process.env.FLIPKART_API_HOST || 'real-time-flipkart-data2.p.rapidapi.com';
const MEESHO_HOST = process.env.MEESHO_API_HOST || 'meesho-price-history-tracker4.p.rapidapi.com';
const MYNTRA_HOST = process.env.MYNTRA_API_HOST || 'myntra-price-history-tracker1.p.rapidapi.com';

/**
 * Fetch products from Amazon via RapidAPI
 */
const fetchAmazonProducts = async (query) => {
    try {
        if (!RAPIDAPI_KEY) return [];
        const options = {
            method: 'GET',
            url: `https://${AMAZON_HOST}/search`,
            params: { query, country: 'IN', page: '1' },
            headers: { 'x-rapidapi-key': RAPIDAPI_KEY, 'x-rapidapi-host': AMAZON_HOST },
            timeout: 8000
        };
        const response = await axios.request(options);
        const products = response.data?.data?.products || response.data?.products || [];
        return products.slice(0, 10).map(p => ({
            id: p.asin || p.product_asin || `amz-${Date.now()}`,
            _id: p.asin || p.product_asin || `amz-${Date.now()}`,
            title: p.product_title || p.title || 'Amazon Product',
            brand: p.brand || 'Amazon',
            price: helpers.formatPrice(p.product_price || p.price),
            lowestPrice: helpers.formatPrice(p.product_price || p.price),
            originalPrice: helpers.formatPrice(p.product_original_price || p.original_price),
            image: p.product_photo || p.image,
            rating: parseFloat(p.product_star_rating || p.rating) || 4.2,
            url: p.product_url || p.url,
            platform: 'amazon'
        }));
    } catch (e) { return []; }
};

/**
 * Fetch products from Flipkart via RapidAPI (Real-time data v2)
 */
const fetchFlipkartProducts = async (query, page = 1) => {
    try {
        if (!RAPIDAPI_KEY) return [];
        const options = {
            method: 'GET',
            url: `https://${FLIPKART_HOST}/search`,
            params: { query, page },
            headers: { 'x-rapidapi-key': RAPIDAPI_KEY, 'x-rapidapi-host': FLIPKART_HOST },
            timeout: 8000
        };
        const response = await axios.request(options);
        const products = response.data?.data || response.data?.products || response.data?.product_results || [];
        return (Array.isArray(products) ? products : []).map(p => ({
            id: p.asin || p.pid || p.id || `fli-${Date.now()}`,
            _id: p.asin || p.pid || p.id || `fli-${Date.now()}`,
            title: p.product_title || p.title || 'Flipkart Product',
            brand: p.brand || 'Flipkart',
            price: helpers.formatPrice(p.product_price || p.sellingPrice || p.price),
            lowestPrice: helpers.formatPrice(p.product_price || p.sellingPrice || p.price),
            originalPrice: helpers.formatPrice(p.product_original_price || p.original_price || p.mrp),
            image: p.product_photo || p.productImage || p.image,
            rating: parseFloat(p.product_star_rating || p.rating) || 4.1,
            url: p.product_url || p.productPageUrl || p.url,
            platform: 'flipkart'
        }));
    } catch (e) { return []; }
};

/**
 * Fetch products from Meesho via RapidAPI
 */
const fetchMeeshoProducts = async (query) => {
    try {
        if (!RAPIDAPI_KEY) return [];
        const options = {
            method: 'GET',
            url: `https://${MEESHO_HOST}/search.php`,
            params: { query },
            headers: { 'x-rapidapi-key': RAPIDAPI_KEY, 'x-rapidapi-host': MEESHO_HOST },
            timeout: 8000
        };
        const response = await axios.request(options);
        const products = response.data?.products || [];
        return products.map(p => ({
            id: p.product_id || `mee-${Date.now()}`,
            _id: p.product_id || `mee-${Date.now()}`,
            title: p.product_name || p.title,
            brand: 'Meesho',
            price: helpers.formatPrice(p.current_price || p.price),
            lowestPrice: helpers.formatPrice(p.current_price || p.price),
            originalPrice: helpers.formatPrice(p.original_price),
            image: p.image_url || p.image,
            rating: p.rating || 4.0,
            url: p.url || `https://meesho.com/products/${p.product_id}`,
            platform: 'meesho'
        }));
    } catch (e) { return []; }
};

/**
 * Enhanced Product Details
 */
const fetchAmazonDetails = async (asin) => {
    try {
        if (!RAPIDAPI_KEY) return null;
        const options = {
            method: 'GET',
            url: `https://${AMAZON_HOST}/product-details`,
            params: { asin, country: 'IN' },
            headers: { 'x-rapidapi-key': RAPIDAPI_KEY, 'x-rapidapi-host': AMAZON_HOST },
            timeout: 10000
        };
        const response = await axios.request(options);
        const data = response.data?.data || response.data;
        if (!data) return null;
        const price = helpers.formatPrice(data.product_price || data.price);
        return {
            id: asin, _id: asin,
            title: data.product_title || data.title,
            description: data.product_description || data.description,
            price, lowestPrice: price,
            originalPrice: helpers.formatPrice(data.product_original_price || data.original_price),
            images: data.product_photos || (data.product_photo ? [data.product_photo] : []),
            image: data.product_photo || data.image,
            brand: data.brand || 'Amazon',
            rating: parseFloat(data.product_star_rating || data.rating) || 4.5,
            url: data.product_url || `https://amazon.in/dp/${asin}`,
            platform: 'amazon'
        };
    } catch (e) { return null; }
};

const fetchMeeshoDetails = async (productUrl) => {
    try {
        if (!RAPIDAPI_KEY) return null;
        const options = {
            method: 'POST',
            url: `https://${MEESHO_HOST}/meesho.php`,
            headers: { 'x-rapidapi-key': RAPIDAPI_KEY, 'x-rapidapi-host': MEESHO_HOST, 'Content-Type': 'application/x-www-form-urlencoded' },
            data: new URLSearchParams({ url: productUrl }).toString(),
            timeout: 8000
        };
        const response = await axios.request(options);
        const price = helpers.formatPrice(response.data.current_price);
        return {
            title: response.data.product_name,
            price, lowestPrice: price,
            image: response.data.image_url,
            platform: 'meesho',
            url: productUrl
        };
    } catch (error) { return null; }
};

const fetchMyntraDetails = async (productUrl) => {
    try {
        if (!RAPIDAPI_KEY) return null;
        const options = {
            method: 'POST',
            url: `https://${MYNTRA_HOST}/myntra.php`,
            headers: { 'x-rapidapi-key': RAPIDAPI_KEY, 'x-rapidapi-host': MYNTRA_HOST, 'Content-Type': 'application/x-www-form-urlencoded' },
            data: new URLSearchParams({ url: productUrl }).toString(),
            timeout: 8000
        };
        const response = await axios.request(options);
        const price = helpers.formatPrice(response.data.current_price);
        if (!response.data.product_name) return null;
        return {
            title: response.data.product_name,
            price, lowestPrice: price,
            image: response.data.image_url,
            platform: 'myntra',
            url: productUrl
        };
    } catch (error) { return null; }
};

module.exports = {
    fetchAmazonProducts,
    fetchAmazonDetails,
    fetchFlipkartProducts,
    fetchMeeshoProducts,
    fetchMeeshoDetails,
    fetchMyntraDetails
};
