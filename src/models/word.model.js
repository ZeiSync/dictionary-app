const { Schema, model } = require('mongoose');

const wordSchema = new Schema(
  {
    word: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['nouns', 'pronouns', 'verbs', 'adjectives', 'adverbs', 'prepositions', 'conjunctions', 'interjections'],
      require: true
    },
    category: {
      type: String,
      enum: ['secure', 'it'],
      default: 'secure'
    },
    pronounce: {
      type: String,
      required: true
    },
    audio: {
      type: String,
    },
    means: [{ type: Schema.Types.ObjectId, ref: 'Mean' }]
  },
  {
    timestamps: true,
  }
);

module.exports = model('Word', wordSchema);