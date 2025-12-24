import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#F5F5F5] font-arial overflow-x-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-[280px]">
        
        {/* HEADER (Exato conforme Spec) */}
        <header className="h-[110px] bg-white shadow-header relative z-40">
            {/* Logo e Título TJPB */}
            <div className="absolute left-[20px] top-[35px] flex items-center gap-[12px]">
                {/* Placeholder para logo do TJPB (quadrada) */}
                <div className="w-[40px] h-[52px] bg-gray-200" /> 
                <h1 className="font-segoe text-[36px] text-[#1E1E1E] leading-[27px]">
                    Tribunal de Justiça da Paraíba
                </h1>
            </div>

            {/* Ícones do Lado Direito */}
            <div className="absolute right-[40px] top-[31px] flex items-center gap-[30px]">
                {/* Notificações */}
                <button className="relative w-[36px] h-[36px] flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A5565" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    {/* Bolinha vermelha */}
                    <span className="absolute top-[4px] right-[6px] w-[8px] h-[8px] bg-[#FB2C36] rounded-full" />
                </button>

                {/* Perfil do Usuário */}
                <div className="flex items-center gap-[12px] bg-white border border-transparent rounded-[10px] px-2 py-1">
                     <div className="text-right">
                        <p className="text-[14px] font-bold text-[#1E1E1E]">Dr. Juiz</p>
                        <p className="text-[12px] text-gray-500">Magistrado</p>
                     </div>
                     <div className="w-[40px] h-[40px] rounded-full bg-gray-300 overflow-hidden ring-2 ring-[#E5E7EB]">
                        <img src="https://ui-avatars.com/api/?name=Juiz+TJPB&background=random" alt="User" />
                     </div>
                </div>
            </div>
        </header>

        {/* Conteúdo da Página */}
        <div className="p-[32px]">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;