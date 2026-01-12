import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Assistidos from './pages/Assistidos';
import Apresentacoes from './pages/Apresentacoes';
import NovoAssistido from './pages/NovoAssistido'; // Importar nova página

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assistidos" element={<Assistidos />} />
        <Route path="/assistidos/novo" element={<NovoAssistido />} /> {/* Nova Rota */}
        <Route path="/apresentacoes" element={<Apresentacoes />} />
        
        {/* Placeholders */}
        <Route path="/regras" element={<Dashboard />} />
        <Route path="/relatorios" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;