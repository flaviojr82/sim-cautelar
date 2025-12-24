import React from 'react';
import { LayoutDashboard, Users, Map, AlertTriangle, Settings, LogOut, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo-sim.png';

const Sidebar = () => {
  const location = useLocation();

  const menuGroups = [
    {
      title: 'OPERACIONAL',
      items: [
        { icon: LayoutDashboard, label: 'Visão Geral', path: '/' },
        { icon: AlertTriangle, label: 'Central de Alertas', path: '/alertas' },
      ]
    },
    {
      title: 'GESTÃO',
      items: [
        { icon: Users, label: 'Assistidos', path: '/assistidos' },
        { icon: Map, label: 'Regras & Perímetros', path: '/regras' },
        { icon: FileText, label: 'Relatórios', path: '/relatorios' },
      ]
    },
    {
      title: 'SISTEMA',
      items: [
        { icon: Settings, label: 'Configurações', path: '/config' },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-brand-dark text-slate-300 h-screen fixed left-0 top-0 flex flex-col border-r border-slate-800 shadow-xl z-50">
      
      {/* 1. Área da Logo (Controlada) */}
      <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
        <div className="flex items-center gap-3">
            {/* FORÇA a altura da imagem para 40px (h-10) */}
            <img 
                src={logoImg} 
                alt="SiM" 
                className="h-10 w-auto object-contain" 
            />
            <div className="flex flex-col">
                <span className="font-bold text-white text-base leading-none tracking-wide">SiM CAUTELAR</span>
                <span className="text-[9px] font-bold text-brand-primary tracking-[0.2em] mt-1">TJPB</span>
            </div>
        </div>
      </div>

      {/* 2. Menu Navegação */}
      <nav className="flex-1 py-6 px-3 space-y-6 overflow-y-auto">
        {menuGroups.map((group, idx) => (
            <div key={idx}>
                <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {group.title}
                </p>
                <div className="space-y-0.5">
                    {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                                    isActive 
                                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-500'} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        ))}
      </nav>

      {/* 3. Footer */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-brand-accent transition-colors w-full px-2 py-2">
            <LogOut size={16} />
            <span>Encerrar Sessão</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;