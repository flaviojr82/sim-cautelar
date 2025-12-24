import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Map, FileText, LogOut } from 'lucide-react'; // Ícones similares
import logoImg from '../assets/logo-sim.png';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Início', path: '/', icon: LayoutDashboard },
    { label: 'Assistidos', path: '/assistidos', icon: Users },
    { label: 'Regras e Perímetro', path: '/regras', icon: Map },
    { label: 'Relatórios', path: '/relatorios', icon: FileText },
  ];

  return (
    <aside 
      className="fixed left-0 top-0 h-full w-[280px] z-50 flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #3F6F74 0%, #0F99A8 100%)',
      }}
    >
      {/* Imagem de Fundo (Simulada com overlay, pois não temos o arquivo jpg exato) */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-overlay" />

      {/* Área da Logo (Caixa Branca com Borda) */}
      <div className="relative mx-auto mt-0 w-[280px] h-[222px] bg-white border border-[#FFE1C9] flex items-center justify-center">
        <img 
            src={logoImg} 
            alt="SiM Cautelar" 
            className="w-[205px] h-[206px] object-contain"
        />
        {/* Botão de minimizar simulado */}
        <div className="absolute top-[10px] right-[10px] w-[26px] h-[26px] bg-[#307C84] rounded-[10px] flex items-center justify-center cursor-pointer">
            <div className="w-[12px] h-[8px] border-l border-b border-white transform rotate-45 -mt-1 ml-1" />
        </div>
      </div>

      {/* Menu de Navegação */}
      <nav className="relative flex-1 px-[20px] pt-[30px] space-y-[15px]">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-[12px] px-[16px] h-[44px] rounded-[10px] transition-all
                ${isActive 
                  ? 'bg-white/15 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] border border-white/20' 
                  : 'hover:bg-white/10'
                }`}
            >
              <Icon size={20} className="text-white" />
              <span className="font-arial text-[14px] text-white">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer (Versão) */}
      <div className="relative p-[20px] border-t border-[#FFE1C9]/50 mt-auto mb-4">
        <div className="flex justify-between items-center text-[#FFE1C9]/80 text-[14px] font-arial">
            <span>SiM Cautelar</span>
            <span>v0.1</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;