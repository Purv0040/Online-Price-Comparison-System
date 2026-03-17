// Default categories for fallback when API is unavailable
export const defaultCategories = [
  {
    id: 1,
    name: 'Electronics',
    icon: '📱',
    description: 'Smartphones, Laptops, Tablets and more',
    productCount: 1250,
    image: '/images/categories/electronics.jpg'
  },
  {
    id: 2,
    name: 'Fashion',
    icon: '👗',
    description: 'Clothing, Shoes, Accessories',
    productCount: 3420,
    image: '/images/categories/fashion.jpg'
  },
  {
    id: 3,
    name: 'Home & Garden',
    icon: '🏠',
    description: 'Furniture, Decor, Kitchen Appliances',
    productCount: 2150,
    image: '/images/categories/home.jpg'
  },
  {
    id: 4,
    name: 'Sports & Outdoors',
    icon: '⚽',
    description: 'Sports Equipment, Outdoor Gear',
    productCount: 980,
    image: '/images/categories/sports.jpg'
  },
  {
    id: 5,
    name: 'Health & Beauty',
    icon: '💄',
    description: 'Skincare, Cosmetics, Health Products',
    productCount: 1680,
    image: '/images/categories/beauty.jpg'
  },
  {
    id: 6,
    name: 'Books & Media',
    icon: '📚',
    description: 'Books, DVDs, Digital Content',
    productCount: 4200,
    image: '/images/categories/books.jpg'
  }
];

// Get category by ID
export const getCategoryById = (id) => {
  return defaultCategories.find(cat => cat.id === id);
};

// Get category by name
export const getCategoryByName = (name) => {
  return defaultCategories.find(cat => cat.name.toLowerCase() === name.toLowerCase());
};

// Search categories
export const searchCategories = (query) => {
  const lowerQuery = query.toLowerCase();
  return defaultCategories.filter(cat =>
    cat.name.toLowerCase().includes(lowerQuery) ||
    cat.description.toLowerCase().includes(lowerQuery)
  );
};

export default defaultCategories;
