const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('⚠️  MONGO_URI not set in .env file');
      console.warn('ℹ️  Server will run without database connection');
      return null;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Error: ${error.message}`);
    console.warn('ℹ️  Server will continue to run without database connection');
    console.warn('📝 To fix this:');
    console.warn('   1. Go to https://www.mongodb.com/cloud/atlas');
    console.warn('   2. Create a cluster and database user');
    console.warn('   3. Add your IP to the whitelist');
    console.warn('   4. Update MONGO_URI in .env file');
    return null;
  }
};

module.exports = connectDB;
