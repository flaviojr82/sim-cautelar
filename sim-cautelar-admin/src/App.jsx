import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assistidos" element={<Dashboard />} /> {/* Placeholder por enquanto */}
        <Route path="/regras" element={<Dashboard />} /> {/* Placeholder por enquanto */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;