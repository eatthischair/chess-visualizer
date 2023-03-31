require('dotenv').config();

const axios = require('axios');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const { checkUser, createUser } = require('../middleware/middleware.js');

// ----- Middleware ----- //

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../src')));
app.use(express.urlencoded({ extended: true }));

// ---- Routes ---- //

app.get('/logintest', (req, res) => {
console.log('req body', req.body)

checkUser('aids', (error, response) => {
  if (error) {
    console.log('err in index.js', error)
  } else {
    console.log('response from index.js', response)
    res.status(200);
    res.send(response);
    res.end();
  }

})

app.post('/signuptest', (req, res) => {
  console.log('req body', req)
  // createUser
})
// .then(({ data }) => {
//   res.status(200);
  res.send('success');
  res.end();
// })

})



app.listen(3000);
console.log('Listening at http://localhost:3000');
