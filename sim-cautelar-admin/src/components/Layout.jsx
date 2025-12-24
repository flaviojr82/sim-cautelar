import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-brand-surface font-sans">
      {/* Menu Fixo */}
      <Sidebar />

      {/* Área de Conteúdo (Padding Left igual a largura da Sidebar) */}
      <main className="flex-1 pl-64 transition-all duration-300">
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header da Página */}
          <header className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
              <p className="text-sm text-slate-500 mt-1">Tribunal de Justiça da Paraíba • SiM Cautelar</p>
            </div>
            
            {/* User Widget */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-700">Dr. Servidor</p>
                <p className="text-[10px] uppercase font-bold text-brand-primary tracking-wider">Administrador</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden border-2 border-white ring-1 ring-slate-100">
                 {/* Placeholder de Avatar */}
                 <img src="https://ui-avatars.com/api/?name=Servidor+Publico&background=0f172a&color=fff" alt="User" />
              </div>
            </div>
          </header>
          
          {/* Conteúdo Injetado */}
          <div className="fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;