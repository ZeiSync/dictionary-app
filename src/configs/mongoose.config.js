const { mongoUri, nodeEnv } = require('./var');
const mongoose = require('mongoose');

exports.connect = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    if (nodeEnv !== 'production') {
      mongoose.set('debug', true);
    }
    console.info('🍣 Mongoose is connected');
  } catch (error) {
    console.error('DB Connection error: ', error);
    throw error;
  }
};