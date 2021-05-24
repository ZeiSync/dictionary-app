const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');

const JWTHelper = require('../utils/jwt');
const User = require('../models/user.model');

class AuthMiddleware {
  static auth() {
    return async (req, res, next) => {
      try {
        const token = JWTHelper.getToken(req);
        if (!token) {
          return res.status(httpStatus.UNAUTHORIZED).json({
            message: 'authentication_is_failure',
            status: httpStatus.UNAUTHORIZED,
          });
        }
        const user = await AuthMiddleware.verifyToken(token);
        if (user.status && user.status === httpStatus.FORBIDDEN) {
          return res.status(httpStatus.FORBIDDEN).json({
            message: 'Forbidden',
            status: httpStatus.FORBIDDEN,
          });
        }
        req.user = user;
        return next();
      } catch (error) {
        return next(error);
      }
    };
  }

  static async verifyToken(token) {
    try {
      return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if (err) {
          return {
            message: 'Forbidden',
            status: httpStatus.FORBIDDEN,
          }
        } else {
          return await User.findOne({ _id: data.userId }).lean();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}


module.exports = AuthMiddleware;
