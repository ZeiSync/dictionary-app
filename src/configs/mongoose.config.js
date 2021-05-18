const mongoose = require('mongoose');

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    if (nodeEnv !== 'production') {
      mongoose.set('debug', true);
    }
    console.info('🍣 Mongoose is connected');
    await initDefaultData();
  } catch (error) {
    console.error('DB Connection error: ', error);
    throw error;
  }
};