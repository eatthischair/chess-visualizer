require('dotenv').config();
const { checkUser } = require('../middleware/middleware.js');

const axios = require('axios');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const { getQuestions, getAnswers } = require('../middleware/middleware.js');

// ----- Middleware ----- //

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));

// ---- Routes ---- //

app.use('/logintest', (req, res) => {
console.log('req body', req.body)

checkUser('aids', (error, response) => {
  if (error) {
    console.log('err in index.js', error)
  } else {
    console.log('response from index.js', response)
  }

})
.then(({ data }) => {
  res.status(200);
  res.send('success');
  res.end();
})

})



app.listen(3000);
console.log('Listening at http://localhost:3000');
