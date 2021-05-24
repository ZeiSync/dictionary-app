const userService = require('../services/user.service');

exports.index = async (req, res, next) => {
  try {
    const { query } = req.query;
    const users = await userService.getAll(query);
    res.render('admin/user/index', { users, query });
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.delete(id);
    res.redirect('back');
  } catch (error) {
    next(error);
  }
}

exports.getDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getOne(id);

    res.render('admin/user/update', { user });
  } catch (error) {
    next(error);
  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.updateUser(id, req.body);
    res.redirect('back');
  } catch (error) {
    next(error);
  }
}

exports.removeWord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { wordId } = req.params;
    await userService.removeWord(id, wordId);
    res.redirect('back');
  } catch (error) {
    next(error);
  }
}