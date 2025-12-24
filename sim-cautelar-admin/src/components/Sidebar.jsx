import React from 'react';
import { LayoutDashboard, Users, Map, AlertTriangle, Settings, LogOut, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo-sim.png';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { section: 'OPERACIONAL', items: [
        { icon: LayoutDashboard, label: 'Visão Geral', path: '/' },
        { icon: AlertTriangle, label: 'Central de Alertas', path: '/alertas' },
    ]},
    { section: 'GESTÃO', items: [
        { icon: Users, label: 'Assistidos', path: '/assistidos' },
        { icon: Map, label: 'Regras & Perímetros', path: '/regras' },
    ]},
    { section: 'SISTEMA', items: [
        { icon: Settings, label: 'Configurações', path: '/config' },
    ]}
  ];

  return (
    <aside className="w-64 bg-brand-dark text-gray-300 h-screen fixed left-0 top-0 flex flex-col border-r border-gray-800 shadow-2xl z-50">
      
      {/* 1. Área da Logo (Proporção Ajustada) */}
      <div className="h-20 flex items-center px-6 bg-brand-dark/50 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center gap-3">
            {/* Controle rígido de tamanho da imagem */}
            <img 
                src={logoImg} 
                alt="SiM Cautelar" 
                className="h-9 w-auto object-contain" 
            />
            <div className="flex flex-col">
                <span className="font-bold text-base text-white tracking-wide leading-none">SiM CAUTELAR</span>
                <span className="text-[10px] font-medium text-brand-primary tracking-widest mt-1 opacity-90">TJPB OPERACIONAL</span>
            </div>
        </div>
      </div>

      {/* 2. Navegação Hierárquica */}
      <nav className="flex-1 py-6 px-3 space-y-6 overflow-y-auto custom-scrollbar">
        {menuItems.map((group, idx) => (
            <div key={idx}>
                <p className="px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    {group.section}
                </p>
                <div className="space-y-1">
                    {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`group flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                                    isActive 
                                    ? 'bg-brand-primary/10 text-brand-primary' 
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} className={isActive ? 'text-brand-primary' : 'text-gray-500 group-hover:text-white'} />
                                    <span>{item.label}</span>
                                </div>
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(42,157,143,0.6)]" />}
                            </Link>
                        );
                    })}
                </div>
            </div>
        ))}
      </nav>

      {/* 3. Perfil do Usuário (Footer Minimalista) */}
      <div className="p-4 border-t border-gray-800 bg-gray-900/50">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary p-[2px]">
                <div className="w-full h-full rounded-full bg-brand-dark flex items-center justify-center border border-transparent">
                    <span className="text-xs font-bold text-white">SP</span>
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Servidor Público</p>
                <p className="text-xs text-gray-500 truncate">Analista Judiciário</p>
            </div>
        </div>
        <button className="flex items-center justify-center gap-2 text-xs font-medium text-gray-400 hover:text-brand-accent transition-colors w-full py-2 border border-gray-700 rounded-md hover:bg-brand-accent/5">
            <LogOut size={14} />
            <span>Sair com segurança</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;