const wordService = require('../services/word.service');

exports.index = async (req, res, next) => {
  try {
    const words = await wordService.getAll();

    return res.render('admin/word/index', { words });
  } catch (error) {
    return next(error);
  }
};