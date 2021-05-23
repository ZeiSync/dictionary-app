const axios = require('axios');

exports.getMp3Link = async (word) => {
  const config = {
    method: 'GET',
    url: 'https://voicerss-text-to-speech.p.rapidapi.com/',
    params: {
      key: '1898801a5cc74119acabe54a5d8b1d9d',
      hl: 'en-us',
      src: word,
      f: '8khz_8bit_mono',
      c: 'mp3',
      r: '0',
      b64: 'true'
    },
    headers: {
      'x-rapidapi-key': '7211e1c4a1msh9f565f2fb0243c9p13e4f6jsn7f9a288f97f9',
      'x-rapidapi-host': 'voicerss-text-to-speech.p.rapidapi.com'
    }
  };
  try {
    const result = await axios.request(config);
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    return error;
  }
}

