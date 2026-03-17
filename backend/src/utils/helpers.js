const extractAmazonASIN = (url) => {
  const match = url.match(/dp\/([A-Z0-9]{10})/);
  return match ? match[1] : null;
};

const formatPrice = (price) => {
  if (!price) return 0;
  const cleaned = price.toString().replace(/[^\d.]/g, '');
  return parseFloat(cleaned) || 0;
};

const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice) return 0;
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
};

module.exports = {
  extractAmazonASIN,
  formatPrice,
  calculateDiscount,
};
