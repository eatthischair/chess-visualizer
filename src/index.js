import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import Login from './Login.jsx';
// import Navigation from './Navigation.jsx';
// import Visualizer from './Visualizer.jsx';
// import SignUp from './SignUp.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <Router>
  //   <Navigation />
  //   <Routes>
  //     <Route path="/" element={<Visualizer />} />
  //     <Route path="/Login" element={<Login />} />
  //     <Route path="/SignUp" element={<SignUp />} />

  //   </Routes>
  // </Router>,
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
