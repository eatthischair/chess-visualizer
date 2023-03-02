const { Client } = require("pg")
const dotenv = require('dotenv');
dotenv.config()

console.log('process', process.env.PGUSER);

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: 'platypus1',
  port: process.env.PGPORT
  })
  client.connect();


const createUser = () => {




}

const checkUser = (username, callback) => {

  client.query('select * from users where username = ?', username, (err, res) => {
    if (err) {
      console.log('err in check user', err)
      callback(err, null)
    } else {
      console.log('succ in check user', res)
      callback(null, err);
    }
  })
}

client.query('select * from users', (err, res) => {
  if (err) {
    console.log('err son', err)
  } else {
    console.log('results son', res);
  }
});

checkUser();
module.exports.checkUser = checkUser;


