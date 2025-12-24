import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children, title }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-500">Tribunal de Justiça da Paraíba - Painel Administrativo</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700">Dr. Servidor TJPB</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
            <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src="https://ui-avatars.com/api/?name=Servidor+Publico&background=1a3b5c&color=fff" alt="User" />
            </div>
          </div>
        </header>
        
        {/* Conteúdo da Página Injetado Aqui */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[calc(100vh-140px)]">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;