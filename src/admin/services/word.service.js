const Word = require('../../models/word.model');

exports.getAll = async () => {
  try {
    return await Word.find().lean();
  } catch (error) {
    return error;
  }
}