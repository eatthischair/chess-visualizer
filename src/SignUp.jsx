import React, { useState, useRef } from 'react';


const SignUp = () => {
return (
  <div>
  <div class="container">
  <label for="uname"><b>Username</b></label>
  <input type="text" placeholder="Choose Username" name="uname" required/>
  <label for="psw"><b>Password</b></label>
  <input type="password" placeholder="Choose Password" name="psw" required/>
  <button type="submit">Login</button>
  <label>
    <input type="checkbox" checked="checked" name="remember"/> Remember me
  </label>
  </div>
    </div>

)


}


export default SignUp;