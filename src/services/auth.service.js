const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const User = require('../models/user.model');
const { sendMail } = require('../utils/sendmail');

const generateRandomString = (length = 8) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const generateAccessToken = (userId) => jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return {
        message: 'Incorrect email or password',
        statusCode: httpStatus.UNAUTHORIZED,
      };
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return {
        message: 'Incorrect email or password',
        statusCode: httpStatus.UNAUTHORIZED,
      };
    }
    const accessToken = generateAccessToken(user._id);
    delete user.password;
    return {
      token: {
        tokenType: 'Bearer',
        accessToken,
        expiresIn: moment().add(1, 'days').toDate(),
      },
      user,
    };
  } catch (error) {
    throw error;
  }
};

exports.register = async ({ name, email, phone, city }, template) => {
  try {
    const duplicateEmail = await User.findOne({ email }).lean();
    if (duplicateEmail) {
      return {
        message: 'This email has been taken',
        statusCode: httpStatus.BAD_REQUEST,
      };
    }
    const password = generateRandomString();
    await sendMail({ name, email, password, template });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, phone, city, password: hashPassword });

    const accessToken = generateAccessToken(newUser._id);
    delete newUser._doc.password;
    return {
      token: {
        tokenType: 'Bearer',
        accessToken,
        expiresIn: moment().add(1, 'days').toDate(),
      },
      newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error,
      statusCode: 500
    }
  }

}