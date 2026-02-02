import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Map, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import logoImg from '../assets/logo-sim.png';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { label: 'Início', path: '/', icon: LayoutDashboard },
    { label: 'Assistidos', path: '/assistidos', icon: Users },
  ];

  return (
    <aside className={`sidebar-container ${isCollapsed ? 'collapsed' : ''}`}>
      
      {/* Área da Logo */}
      <div className="logo-box">
        {/* Se estiver colapsado, esconde a imagem grande e pode mostrar algo menor ou nada */}
        <img 
          src={logoImg} 
          alt="SiM Cautelar" 
          style={{ 
            width: isCollapsed ? '40px' : '205px', 
            height: isCollapsed ? '40px' : '206px', 
            objectFit: 'contain',
            transition: 'all 0.3s ease'
          }}
        />
        
        {/* Botão de Controle (Toggle) */}
        <button 
          onClick={toggleSidebar}
          style={{
            position: 'absolute', 
            top: '10px', 
            right: isCollapsed ? '50%' : '10px', // Centraliza se fechado
            transform: isCollapsed ? 'translateX(50%)' : 'none',
            width: '26px', height: '26px', background: '#307C84',
            border: 'none', borderRadius: '10px', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            zIndex: 10,
            transition: 'right 0.3s ease'
          }}
        >
           {/* Muda o ícone dependendo do estado */}
           {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navegação */}
      <nav style={{ padding: '30px 0', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-link ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : ''} // Tooltip nativo quando fechado
            >
              <Icon size={20} style={{ minWidth: '20px' }} />
              {/* O texto é oculto via CSS quando .collapsed está ativo */}
              <span>{item.label}</span>
              
              {isActive && (
                 <div className="active-indicator" style={{ marginLeft: 'auto', width: '2px', height: '12px', background: 'rgba(255,255,255,0.5)', borderRadius: '2px' }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Versão */}
      {/* Escondemos o footer se estiver fechado para não quebrar layout */}
      {!isCollapsed && (
        <div style={{ 
            height: '52px', borderTop: '1px solid rgba(255,225,201,0.5)', 
            margin: '0 20px', display: 'flex', alignItems: 'center', 
            justifyContent: 'space-between', color: 'rgba(255,225,201,0.8)', fontSize: '14px',
            animation: 'fadeIn 0.5s'
        }}>
            <span>SiM Cautelar</span>
            <span>v0.1</span>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;