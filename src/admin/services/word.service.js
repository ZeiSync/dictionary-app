const Word = require('../../models/word.model');

exports.getAll = async (option) => {
  try {
    if (option) {
      return await Word.find({ word: `/${option}/` }).lean();
    } else {
      return await Word.find().lean();

    }
  } catch (error) {
    return error;
  }
};