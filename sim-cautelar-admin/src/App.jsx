import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Assistidos from './pages/Assistidos';
import Apresentacoes from './pages/Apresentacoes';
import NovoAssistido from './pages/NovoAssistido'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/assistidos" element={<Assistidos />} />
        
        {/* Rota para Criar Novo */}
        <Route path="/assistidos/novo" element={<NovoAssistido />} />
        
        {/* NOVA ROTA: Rota para Editar (Usa o mesmo componente, mas com parâmetro :id) */}
        <Route path="/assistidos/editar/:id" element={<NovoAssistido />} />
        
        <Route path="/apresentacoes" element={<Apresentacoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;