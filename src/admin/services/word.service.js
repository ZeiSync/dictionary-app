const Word = require('../../models/word.model');
const Mean = require('../../models/mean.model');
const { getMp3Link } = require('../../utils/text-to-speech');

exports.getAll = async (option) => {
  try {
    if (option) {
      return await Word.find({ word: { $regex: option, $options: "i" } }).lean();
    } else {
      return await Word.find().lean();
    }
  } catch (error) {
    return error;
  }
};

exports.addNewWord = async (body) => {
  try {
    const { word, pronounce, type, category, mean, example, situation } = body;
    const audio = await getMp3Link(word);
    const newWord = await Word.create({
      word, pronounce, type, category, audio
    });

    await Promise.all(mean.map(async (m, idx) => {
      const newMean = await Mean.create({ mean: mean[idx], example: example[idx], situation: situation[idx], word: newWord._id })
      await Word.updateOne({ _id: newWord }, { $push: { means: newMean._id } })
    }));
  } catch (error) {
    return error;
  }
}


exports.delete = async (id) => {
  try {
    await Word.deleteOne({ _id: id });
    await Mean.deleteMany({ word: id });
  } catch (error) {
    return error;
  }
}

exports.getOne = async (id) => {
  try {
    return await Word.findById(id).populate('means').lean();
  } catch (error) {
    return error;
  }
}

exports.deleteMean = async (id, meanId) => {
  try {
    await Mean.deleteOne({ _id: id });
    await Word.updateOne({ _id: id }, { $pull: { means: meanId } });
  } catch (error) {
    return error;
  }
}

exports.updateWord = async (id, body) => {
  try {
    const { word, type, pronounce, category, meanId, mean, example, situation } = body;
    const audio = await getMp3Link(word);
    await Word.updateOne({ _id: id }, { word, type, pronounce, category, audio });

    await Promise.all(mean.map(async (m, idx) => {
      if (meanId[idx]) {
        await Mean.updateOne({ _id: meanId[idx], word: id, }, { mean: mean[idx], example: example[idx], situation: situation[idx] })
      } else {
        const newMean = await Mean.create({ mean: mean[idx], example: example[idx], situation: situation[idx], word: id })
        await Word.updateOne({ _id: id }, { $push: { means: newMean._id } })
      }
    }));
  } catch (error) {
    return error;
  }
}