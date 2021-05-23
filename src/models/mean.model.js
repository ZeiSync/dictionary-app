const { Schema, model } = require('mongoose');

const meanSchema = new Schema({
  mean: {
    type: String,
    require: true,
  },
  example: {
    type: String,
    require: true,
  },
  situation: {
    type: String,
    require: true,
  },
  word: { type: Schema.Types.ObjectId, ref: 'Word' }
})


module.exports = model('Mean', meanSchema);