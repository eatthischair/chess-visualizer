import { Routes, Route } from "react-router-dom"
import './App.css';
import BigFunction from './BigFunction.jsx';

function App() {
  return (
  <div className="bg-gradient-to-b from-black to-gray-800 w-screen h-screen">
    {/* <Routes> */}
      {/* <Route path="/" element={ <BigFunction/>} /> */}
    {/* </Routes> */}
    <BigFunction/>
  </div>
  );
}

export default App;
