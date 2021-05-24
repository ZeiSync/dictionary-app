const httpStatus = require('http-status');

const wordService = require('../services/word.service');
const adminUserService = require('../admin/services/user.service');

exports.getAll = async (req, res, next) => {
  try {
    const { query, category, limit } = req.query;
    if (category && category !== 'secure' && category !== 'it') {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: 'category must be secure or it',
        statusCode: httpStatus.BAD_REQUEST
      });
    } else {

    }

    const options = {};
    if (query) options.word = { $regex: query, $options: "i" }
    if (category === 'secure' || category === 'it') options.category = category;
    const data = await wordService.getAll(options, +limit);

    return res.status(data.statusCode || httpStatus.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

exports.getUserWord = async (req, res, next) => {
  try {
    const user = req.user;
    const userData = await adminUserService.getOne(user._id);
    res.status(httpStatus.OK).json(userData.words);
  } catch (error) {
    return next(error);
  }
};

