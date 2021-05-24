const httpStatus = require('http-status');

const authService = require('../services/auth.service');

exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);

    return res.status(data.statusCode || httpStatus.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body, 'register');

    return res.status(data.statusCode || httpStatus.OK).json(data);
  } catch (error) {
    return next(error);
  }
};
