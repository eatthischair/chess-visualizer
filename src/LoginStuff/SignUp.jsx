import React, { useState, useRef } from 'react';
import axios from 'axios';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

    axios.post('/signuptest', sendObj)
    .then(results => {
      console.log('results', results)
    }).catch(err => {
      console.log('err in submit', err);
     })
    }


return (
  <div>
  <div class="container">
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