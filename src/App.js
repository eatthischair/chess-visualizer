import { Routes, Route, Redirect } from 'react-router-dom';

import './App.css';
import Visualizer from './Visualizer.jsx';
import Login from './Login.jsx';

function App() {
  return (

    <div className="App">

      <header className="App-header">
      <button type="button">Login</button>
      <button type="button">Sign Up</button>

      {/* <nav>
      <a href="/login">login</a> |
      <a href="/css/">CSS</a> |
      <a href="/js/">JavaScript</a> |
      <a href="/python/">Python</a>
      </nav> */}
      {/* <Login/> */}
      <Visualizer/>

      </header>
    </div>
  );
}

export default App;
