import React, { useState } from 'react';
import Sidebar from './Sidebar';
import brasaoTjpb from '../assets/brasao.png'; 

const Layout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Sidebar controla seu próprio tamanho */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      {/* Wrapper do Conteúdo (Direita) */}
      <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          /* A margem esquerda empurra o conteúdo quando a sidebar está fixa */
          marginLeft: isCollapsed ? '80px' : '280px', 
          transition: 'margin-left 0.3s ease',
          width: `calc(100% - ${isCollapsed ? '80px' : '280px'})` // Garante que não estoure a tela horizontalmente
      }}>
        
        {/* HEADER */}
        <header className="header-container">
            {/* Lado Esquerdo: Logo TJPB + Título */}
            <div className="header-left">
                <img 
                  src={brasaoTjpb} 
                  alt="Brasão TJPB"
                  className="header-logo"
                />
                <h1 className="header-title">Tribunal de Justiça da Paraíba</h1>
            </div>

            {/* Lado Direito: Notificação + Perfil */}
            <div className="header-right">
                {/* Botão Notificação */}
                <div className="notification-btn">
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                   </svg>
                   <div className="notification-badge"></div>
                </div>

                {/* Perfil */}
                <div className="user-profile">
                    <div className="user-text">
                        <div className="user-name">Dr. Juiz</div>
                        <div className="user-role">Magistrado</div>
                    </div>
                    <img 
                        src="https://ui-avatars.com/api/?name=Dr+Juiz&background=random&color=fff" 
                        alt="User"
                        className="user-avatar-img"
                    />
                </div>
            </div>
        </header>

        {/* CONTEÚDO DA PÁGINA */}
        <main className="main-content">
            {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;