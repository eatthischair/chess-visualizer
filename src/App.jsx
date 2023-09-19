import { Routes, Route } from "react-router-dom"
import './App.css';
import BigFunction from './BigFunction.jsx';

function App() {
  return (
  <div className="bg-slate-700 w-screen">
    <Routes>
      <Route path="/" element={ <BigFunction/>} />
    </Routes>
  </div>
  );
}

export default App;
