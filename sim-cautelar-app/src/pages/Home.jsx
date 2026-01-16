import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, LogOut, CheckCircle } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nome: 'Carregando...',
    cpf: '',
    status: '',
    proximaApresentacao: '',
    janela: '',
    initials: ''
  });

  useEffect(() => {
    const storedCpf = localStorage.getItem('userCpf');
    
    if (storedCpf === '111.222.333-44') {
        // PERFIL: José da Silva (Alerta)
        setUser({
            nome: 'José da Silva', cpf: '111.222.333-44', status: 'Em Análise', proximaApresentacao: 'Pendente', janela: '08:00 às 18:00', initials: 'JS'
        });
    } else if (storedCpf === '123.456.789-00') {
        // PERFIL: Ana Maria (Duplicado)
        setUser({
            nome: 'Ana Maria de Souza', cpf: '123.456.789-00', status: 'Concluído', proximaApresentacao: 'Amanhã', janela: '08:00 às 18:00', initials: 'AM'
        });
    } else {
        // PERFIL: Carlos Eduardo (Padrão)
        setUser({
            nome: 'Carlos Eduardo Silva', cpf: '098.112.334-12', status: 'Regular', proximaApresentacao: 'Hoje', janela: '08:00 às 18:00', initials: 'CE'
        });
    }
  }, []);

  const handleLogout = () => { localStorage.removeItem('userCpf'); navigate('/login'); };
  const handleStartCheckIn = () => navigate('/checkin');

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="user-info">
          <div className="avatar-circle">{user.initials}</div>
          <div className="user-text"><h2>{user.nome}</h2><p>CPF: {user.cpf}</p></div>
        </div>
        <button onClick={handleLogout} className="btn-icon-light"><LogOut size={24} /></button>
      </div>
      <div className="home-content">
        <div className="status-card">
            <div className="status-header">
                <span>Situação Atual</span>
                {user.status === 'Em Análise' ? <span className="badge-warning">{user.status}</span> : <span className="badge-success">{user.status}</span>}
            </div>
            <div className="status-body">
                <div className="info-row"><Calendar size={18} /> <span>Próxima Apresentação: <strong>{user.proximaApresentacao}</strong></span></div>
                <div className="info-row"><Clock size={18} /> <span>Janela: <strong>{user.janela}</strong></span></div>
            </div>
        </div>
        <div className="action-area">
            <button onClick={handleStartCheckIn} className="btn-primary btn-large pulse-animation">
            <MapPin size={24} /> <span>REALIZAR APRESENTAÇÃO</span>
            </button>
            <p className="hint-text">Certifique-se de estar em um local iluminado.</p>
        </div>
        <div className="history-section">
            <h3>Últimas Atividades</h3>
            <div className="history-item"><CheckCircle size={20} color="#10B981" /><div className="history-text"><strong>Apresentação Realizada</strong><span>15/01/2026 às 09:15 • Via App</span></div></div>
        </div>
      </div>
      <style>{`
        .home-container { min-height: 100vh; background: #F8FAFC; display: flex; flex-direction: column; }
        .home-header { background: var(--primary); color: white; padding: 24px; padding-top: 32px; display: flex; justify-content: space-between; align-items: center; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; box-shadow: 0 4px 10px rgba(15, 153, 168, 0.15); flex-shrink: 0; z-index: 10; }
        .user-info { display: flex; align-items: center; gap: 12px; }
        .avatar-circle { width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; border: 2px solid rgba(255,255,255,0.3); }
        .user-text h2 { font-size: 18px; font-weight: 600; margin: 0; line-height: 1.2; }
        .user-text p { font-size: 12px; opacity: 0.9; margin: 0; }
        .btn-icon-light { background: none; border: none; color: white; cursor: pointer; opacity: 0.8; padding: 8px; }
        .home-content { flex: 1; padding: 24px; overflow-y: auto; }
        .status-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #E2E7ED; margin-bottom: 32px; }
        .status-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #F1F5F9; padding-bottom: 12px; font-size: 14px; font-weight: 600; color: #64748B; }
        .badge-success { background: #ECFDF5; color: #059669; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .badge-warning { background: #FFFBEB; color: #D97706; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .info-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: #334155; font-size: 14px; }
        .action-area { margin-bottom: 32px; text-align: center; }
        .btn-large { height: 64px; font-size: 16px; letter-spacing: 0.5px; border-radius: 16px; font-weight: 700; box-shadow: 0 8px 20px rgba(15, 153, 168, 0.25); }
        .pulse-animation { animation: pulse-shadow 2s infinite; }
        @keyframes pulse-shadow { 0% { transform: scale(1); } 50% { transform: scale(1.02); } 100% { transform: scale(1); } }
        .hint-text { font-size: 12px; color: #94A3B8; margin-top: 12px; }
        .history-section h3 { font-size: 16px; color: #1E2939; margin-bottom: 16px; font-weight: 600; }
        .history-item { display: flex; gap: 12px; background: white; padding: 16px; border-radius: 12px; margin-bottom: 12px; border: 1px solid #E2E7ED; align-items: center; }
        .history-text { display: flex; flex-direction: column; }
        .history-text strong { font-size: 14px; color: #1E2939; }
        .history-text span { font-size: 12px; color: #64748B; margin-top: 2px; }
      `}</style>
    </div>
  );
};

export default Home;