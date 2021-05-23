const wordService = require('../services/word.service');

exports.index = async (req, res, next) => {
  try {
    const words = await wordService.getAll();

    res.render('admin/word/index', { words });
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { query } = req.query;
    const words = await wordService.getAll(query);

    res.render('admin/word/index', { words });
  } catch (error) {
    next(error);
  }
}

exports.addNewWord = async (req, res, next) => {
  try {
    console.log(req.body);
    res.redirect('back');
  } catch (error) {
    next(error);
  }
}