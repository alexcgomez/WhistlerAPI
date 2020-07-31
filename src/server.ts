import { Request, Response } from 'express';
require('dotenv').config({path: '../.env'});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;

// Express configuration
app.set('port', PORT);

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Server!');
});

app.listen(PORT, () => {
  console.log('SERVER RUNNING ON PORT', PORT);
});
