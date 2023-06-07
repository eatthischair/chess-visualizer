import React, { useState, useRef } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';

const bcrypt = require('bcryptjs');

// const bcrypt = require ('bcrypt');

function Login() {
  // var axios = require('axios');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['user']);

  const usernameHolder = (e) => {
  console.log('ee', e);
  setUsername(e)

  }
  const passwordHolder = (e) => {
    console.log('pw', e);
    setPassword(e);
  }

  const checkSubmit = (e) => {
    e.preventDefault()
    let sendObj = {
      username: username,
      password: password
    };
    console.log('im in checksubmit boss', sendObj)

    axios.get(`http://localhost:8000/getLogin?username=${username}&password=${password}`)
    .then(results => {
      let DbPassword = results.data.password;
      let passwordIsCorrect = bcrypt.compareSync(password, DbPassword);
      console.log('results', results.data, password, DbPassword, passwordIsCorrect)
      if (passwordIsCorrect) {
        alert('Login successful!!!!!!!')
        setCookie('name', username, { path: '/' })
      } else {
        alert('please check your fuckin password or username')
      }
    }).catch(err => {
      console.log('err in submit', err);
     })
    }




  return (
    <div>
  <div class="container">
  <label for="uname"><b>Username</b></label>
  <input onChange={(e) => {usernameHolder(e.target.value)}} type="text" placeholder="Enter Username" name="uname" required/>

  <label for="psw"><b>Password</b></label>
  <input onChange={(e) => {passwordHolder(e.target.value)}} type="password" placeholder="Enter Password" name="psw" required/>

  <button onClick={(e) => {checkSubmit(e)}} type="submit">Login</button>
  <label>
    <input type="checkbox" checked="checked" name="remember"/> Remember me
  </label>
  </div>

    </div>
  )
};

export default Login;