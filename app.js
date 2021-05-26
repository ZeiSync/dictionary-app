require('dotenv').config()
const { mongoose, expressInstance } = require('./src/configs');

mongoose
  .connect()
  .then(() => {
    const port = process.env.PORT || 3002;
    const server = expressInstance.createApp();
    server.listen(port, () => {
      console.log('Server is running on:', `http://localhost:${port} 🚀`);
    });
  })
  .catch(console.error);