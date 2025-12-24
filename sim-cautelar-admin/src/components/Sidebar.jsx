import React from 'react';
import { LayoutDashboard, Users, Map, AlertTriangle, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Monitoramento', path: '/' },
    { icon: Users, label: 'Assistidos', path: '/assistidos' },
    { icon: Map, label: 'Regras & Perímetros', path: '/regras' },
    { icon: AlertTriangle, label: 'Alertas', path: '/alertas' },
    { icon: Settings, label: 'Configurações', path: '/config' },
  ];

  return (
    <aside className="w-64 bg-tjpb-primary text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl">
      {/* Área da Logo */}
      <div className="h-20 flex items-center justify-center border-b border-blue-800 bg-blue-900/50">
        <div className="flex items-center gap-3">
          {/* Aqui simulamos o SVG caso não tenha o arquivo ainda, ou use <img src={logo} /> */}
          <div className="w-8 h-8 rounded-full bg-tjpb-secondary flex items-center justify-center text-xs font-bold">SiM</div>
          <span className="font-bold text-lg tracking-wider">SiM CAUTELAR</span>
        </div>
      </div>

      {/* Menu de Navegação */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                    active 
                      ? 'bg-tjpb-secondary text-white font-medium border-r-4 border-white' 
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer do Menu */}
      <div className="p-4 border-t border-blue-800">
        <button className="flex items-center gap-3 text-blue-200 hover:text-white w-full px-2 py-2">
          <LogOut size={20} />
          <span>Sair do Sistema</span>
        </button>
        <div className="mt-4 text-xs text-center text-blue-400">
          Versão 1.0.0 (Beta)
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;