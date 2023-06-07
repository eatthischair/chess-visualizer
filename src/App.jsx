import { Routes, Route } from "react-router-dom"
import './App.css';
import BigFunction from './BigFunction.jsx';
import Login from './LoginStuff/Login';
import SignUp from './LoginStuff/SignUp';
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";


function App() {
  const [cookies, setCookie] = useCookies(['name']);

  return (
  <div className="bg-slate-700 w-screen">
    <h1 class='flex place-content-center'>This be my website</h1>
    <h1 class='flex place-content-end'>
      <Link class="bg-inherit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" to="login">Login</Link>
      <Link class="bg-inherit hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" to="signUp">Sign Up</Link>
    </h1>
    <Routes>
      <Route path="/" element={ <BigFunction cookies={cookies}/>} />
      <Route path="login" element={ <Login setCookie={setCookie}/> } />
      <Route path="signUp" element={ <SignUp/> } />
    </Routes>

  </div>
  );
}

export default App;
