const Word = require('../models/word.model');
const User = require('../models/user.model');
const httpStatus = require('http-status');

exports.addWord = async (id, wordId) => {
  try {
    const word = await Word.findById(wordId).lean();
    if (!word) {
      return {
        message: 'Word not found',
        statusCode: httpStatus.NOT_FOUND,
      };
    }
    await User.updateOne({ _id: id }, { $push: { words: word._id } })
  } catch (error) {
    return error;
  }
};
