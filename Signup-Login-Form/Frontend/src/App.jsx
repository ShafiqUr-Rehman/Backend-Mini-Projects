import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute element={Home} />} />
    </Routes>
  );
};

export default App;
