const httpStatus = require('http-status');

const adminUserService = require('../admin/services/user.service');
const userService = require('../services/user.service');

exports.getUserInfor = async (req, res, next) => {
  try {
    const user = req.user;
    delete user.password;
    return res.status(httpStatus.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

exports.updateUserInfor = async (req, res, next) => {
  try {
    const user = req.user;

    await adminUserService.updateUser(user._id, req.body);

    return res.status(httpStatus.OK).end();
  } catch (error) {
    return next(error);
  }
};

exports.addWordToUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    await userService.addWord(user._id, id);

    return res.status(httpStatus.OK).end();
  } catch (error) {
    return next(error);
  }
}

exports.removeWordToUser = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    await userService.removeWord(user._id, id);
    return res.status(httpStatus.OK).end();
  } catch (error) {
    return next(error);
  }
}