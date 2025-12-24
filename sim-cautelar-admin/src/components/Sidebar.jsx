import React from 'react';
import { LayoutDashboard, Users, Map, AlertTriangle, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo-sim.png';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Visão Geral', path: '/' },
    { icon: Users, label: 'Assistidos', path: '/assistidos' },
    { icon: Map, label: 'Regras & Perímetros', path: '/regras' },
    { icon: AlertTriangle, label: 'Central de Alertas', path: '/alertas' },
    { icon: Settings, label: 'Configurações', path: '/config' },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-tjpb-primary to-[#0f253a] text-white h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-50 font-sans">
      {/* Cabeçalho da Sidebar (Logo Ajustada) */}
      <div className="h-20 flex items-center px-6 border-b border-blue-800/50 bg-blue-900/20 backdrop-blur-sm">
        <img 
            src={logoImg} 
            alt="Logo SiM" 
            className="h-10 w-auto object-contain mr-3" 
        />
        <div className="flex flex-col justify-center">
            <span className="font-bold text-lg leading-none tracking-wide text-white">SiM CAUTELAR</span>
            <span className="text-[10px] text-blue-300 uppercase tracking-widest mt-1">Tribunal de Justiça PB</span>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 py-8 px-3 space-y-1 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Menu Principal</p>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-tjpb-secondary text-white shadow-lg shadow-teal-900/20 font-medium' 
                  : 'text-blue-100 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'} />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight size={16} className="text-white/80" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 m-4 rounded-xl bg-blue-900/30 border border-blue-800/30">
        <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-tjpb-secondary flex items-center justify-center text-xs font-bold">
                SP
            </div>
            <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">Servidor Público</p>
                <p className="text-xs text-blue-300 truncate">admin@tjpb.jus.br</p>
            </div>
        </div>
        <button className="flex items-center justify-center gap-2 text-sm text-red-300 hover:text-red-200 hover:bg-red-500/10 w-full py-2 rounded-lg transition-colors">
          <LogOut size={16} />
          <span>Encerrar Sessão</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;