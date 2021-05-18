require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { expressInstance } = require('./configs');

mongoose
	.connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
	.then(() => {
		const server = expressInstance.createApp();

		server.listen(5000, () => {
			console.log("Server has started!")
		})
	})
  .catch(console.error);;