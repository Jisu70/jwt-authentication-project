const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://sudiptajana70:jUUfi2EcwyjZGBqS@cluster0.ptmboso.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connected successfully to the database!');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

module.exports = connectDB;
