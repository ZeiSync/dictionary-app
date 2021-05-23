const User = require('../../models/user.model');

exports.getAll = async (option) => {
  try {
    if (option) {
      return await User.find({ name: { $regex: option, $options: "i" } }).lean();
    } else {
      return await User.find().lean();
    }
  } catch (error) {
    return error;
  }
};


exports.delete = async (id) => {
  try {
    await User.deleteOne({ _id: id });
  } catch (error) {
    return error;
  }
}

exports.getOne = async (id) => {
  try {
    return await User.findById(id).populate('words').lean();
  } catch (error) {
    return error;
  }
}

exports.updateUser = async (id, body) => {
  try {
    console.log(id);
    console.log(body);
  } catch (error) {
    return error;
  }
}