import React, { useState } from 'react';
//import logo from './logo.svg';
import './App.css';
//import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/login';
import Home from './components/Home';
// import Signup from './components/Signup'


function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    );
  }
  

export default App;