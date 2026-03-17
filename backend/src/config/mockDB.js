// Mock in-memory database for development
const mockDB = {
  users: [],
  products: [],
  wishlist: [],
  priceAlerts: [],
  bulkOrders: [],
};

// Simple ID generator
let idCounter = {
  users: 1,
  products: 1,
  wishlist: 1,
  priceAlerts: 1,
  bulkOrders: 1,
};

module.exports = {
  mockDB,
  idCounter,
  findUser: (email) => {
    return mockDB.users.find(u => u.email === email);
  },
  createUser: (userData) => {
    const newUser = {
      _id: idCounter.users++,
      ...userData,
      createdAt: new Date(),
    };
    mockDB.users.push(newUser);
    return newUser;
  },
  getAllUsers: () => mockDB.users,
};
