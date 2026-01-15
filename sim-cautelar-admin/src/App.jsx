import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Assistidos from './pages/Assistidos';
import NovoAssistido from './pages/NovoAssistido';
import DetalhesAssistido from './pages/DetalhesAssistido';
import Apresentacoes from './pages/Apresentacoes';
import Relatorios from './pages/Relatorios'; // Importar nova página

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assistidos" element={<Assistidos />} />
        <Route path="/assistidos/novo" element={<NovoAssistido />} />
        <Route path="/assistidos/editar/:id" element={<NovoAssistido />} />
        <Route path="/assistidos/detalhes/:id" element={<DetalhesAssistido />} />
        <Route path="/apresentacoes" element={<Apresentacoes />} />
        
        {/* Nova Rota */}
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;