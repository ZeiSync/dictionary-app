const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    city: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    phone: String,
    dob: String,
    avatar: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
    words: [{ type: Schema.Types.ObjectId, ref: 'Word' }]
  },
  {
    timestamps: true,
  },
);

module.exports = model('User', userSchema);