import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* HEADER */}
        <header className="header-container">
            {/* Lado Esquerdo: Logo TJPB + Título */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '52px', background: '#E2E2E2' }}>
                  {/* Placeholder da Logo TJPB */}
                </div>
                <h1 className="header-title">Tribunal de Justiça da Paraíba</h1>
            </div>

            {/* Lado Direito: Notificação + Perfil */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                {/* Botão Notificação */}
                <div style={{ position: 'relative', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                   </svg>
                   <div style={{ position: 'absolute', top: '2px', right: '4px', width: '8px', height: '8px', background: '#FB2C36', borderRadius: '50%', border: '1px solid white' }}></div>
                </div>

                {/* Perfil */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Dr. Juiz</div>
                        <div style={{ fontSize: '12px', color: '#6A7282' }}>Magistrado</div>
                    </div>
                    <img 
                        src="https://ui-avatars.com/api/?name=Dr+Juiz&background=random" 
                        alt="User"
                        style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #E5E7EB' }} 
                    />
                </div>
            </div>
        </header>

        {/* CONTEÚDO */}
        <main className="main-content">
            {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;