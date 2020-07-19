const dotenv = require('dotenv');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.SERVER_PORT || 8080;
const express = require('express');
const app = express();
const db =require('./models/index.js')

dotenv.config();

console.log(db);

// Express middleware
app.use(bodyParser.json());

// DB Connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Test Connection
connection.connect(error => {
  if(error) throw error;
  console.log('Database server running!');
});

// Route
app.get('/', (req, res) => {
  res.send('Welcome Whistler API');
});

// Serve
app.listen(PORT, () => {
  console.log('SERVER RUNNING ON PORT', PORT);
});


