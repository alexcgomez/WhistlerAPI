const express = require('express');
require('dotenv').config({path: '../.env'});

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Server!');
});
