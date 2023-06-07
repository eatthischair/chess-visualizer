import React, { useState, useRef } from 'react';
import axios from 'axios';
var bcrypt = require('bcryptjs');


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const saltRounds = 10;

  // var salt = bcrypt.genSaltSync(10);
  // var hash = bcrypt.hashSync("B4c0/\/", salt);
  // bcrypt.genSalt(saltRounds, function(err, salt) {
  //   bcrypt.hash(password, salt, function(err, hash) {
  //   // returns hash
  //   console.log(hash);
  //   });
  // });

  const usernameHolder = (e) => {
  console.log('ee', e);
  setUsername(e)
  }

  const passwordHolder = (e) => {
    console.log('pw', e);
    setPassword(e);
  }

  const checkSubmit = (e) => {

    var salt = bcrypt.genSaltSync(10);

    var hash = bcrypt.hashSync(password, salt);

    let tru = bcrypt.compareSync(password, hash); // true
    let falmse = bcrypt.compareSync("not_bacon", hash);

    console.log('salt hash;', salt)
    e.preventDefault()
    let sendObj = {
      username: username,
      password: hash
    };
    console.log('im in signup boss', sendObj)

    axios.post('http://localhost:8000/signUp', sendObj)
    .then(results => {
      console.log('results', results);
    }).catch(err => {
      console.log('err in submit', err);
     })
    }


return (
  <div>
  <div class="container text-black">
  <label for="uname"><b>Username</b></label>
  <input onChange={(e) => {usernameHolder(e.target.value)}} type="text" placeholder="Choose Username" name="uname" required/>
  <label for="psw"><b>Password</b></label>
  <input onChange={(e) => {passwordHolder(e.target.value)}}type="password" placeholder="Choose Password" name="psw" required/>
  <button onClick={(e) => checkSubmit(e)} type="submit">Login</button>
  <label>
    <input  type="checkbox" checked="checked" name="remember"/> Remember me
  </label>
  </div>
    </div>
)

}


export default SignUp;