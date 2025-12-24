import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Map, FileText, ChevronLeft } from 'lucide-react';
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
    <aside className="sidebar-container">
      
      {/* Área da Logo (Caixa Branca) */}
      <div className="logo-box">
        <img 
          src={logoImg} 
          alt="SiM Cautelar" 
          style={{ width: '205px', height: '206px', objectFit: 'contain' }}
        />
        {/* Botão Flutuante (Simulado do Design) */}
        <button style={{
          position: 'absolute', top: '10px', right: '10px',
          width: '26px', height: '26px', background: '#307C84',
          border: 'none', borderRadius: '10px', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
        }}>
           <ChevronLeft size={16} />
        </button>
      </div>

      {/* Navegação */}
      <nav style={{ padding: '30px 0', flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
              {isActive && <div style={{ marginLeft: 'auto', width: '2px', height: '12px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }} />}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Versão */}
      <div style={{ 
        height: '52px', borderTop: '1px solid rgba(255,225,201,0.5)', 
        margin: '0 20px', display: 'flex', alignItems: 'center', 
        justifyContent: 'space-between', color: 'rgba(255,225,201,0.8)', fontSize: '14px' 
      }}>
        <span>SiM Cautelar</span>
        <span>v0.1</span>
      </div>
    </aside>
  );
};

export default Sidebar;