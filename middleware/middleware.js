const { Client } = require("pg")
const dotenv = require('dotenv');
dotenv.config()


const client = new Client({
  // user: process.env.PGUSER,
  // host: process.env.PGHOST,
  // database: process.env.PGDATABASE,
  // password: 'platypus1',
  // port: process.env.PGPORT
  user: 'postgres',
  host: 'localhost',
  database: 'chessvisualizer',
  password: 'platypus1',
  port: 5432
  })
  client.connect();


const createUser = (username, password, callback) => {
client.query('INSERT INTO users(username, password) VALUES ?, ?', [username, password], (err, res) => {
  if (err) {
    console.log('err in createuser', err)
    callback(err, null)
  } else {
    console.log('success in createuser', res)
    callback(null, err)
  }
})



}

const checkUser = (username, callback) => {

  client.query('select * from users', (err, res) => {
    if (err) {
      console.log('err in check user', err)
      callback(err, null)
    } else {
      console.log('succ in check user', res)
      callback(null, res);
    }
  })
}
// client.query('select * from users', (err, res) => {
//   if (err) {
//     console.log('err son', err)
//   } else {
//     console.log('results son', res);
//   }
// });


module.exports.checkUser = checkUser;
module.exports.createUser = createUser;

