import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Pags/Login';
import Home from './Pags/Home';


function App() {
  return (

    <BrowserRouter>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />

          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
   
    </BrowserRouter>

  );
}

export default App;