import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Calendar, Clock, LogOut, CheckCircle, FileText, 
  ChevronRight, Wallet, X, QrCode 
} from 'lucide-react';
import brasao from '../assets/brasao.png'; // Importando para usar na carteira

const Home = () => {
  const navigate = useNavigate();
  const [showWallet, setShowWallet] = useState(false);
  const [user, setUser] = useState({
    nome: 'Carregando...',
    cpf: '',
    status: '',
    proximaApresentacao: '',
    janela: '',
    initials: '',
    processo: '0000000-00.2024.8.15.0000' // Mock de processo
  });

  useEffect(() => {
    const storedCpf = localStorage.getItem('userCpf');
    
    if (storedCpf === '111.222.333-44') {
        setUser({
            nome: 'José da Silva', cpf: '111.222.333-44', status: 'Em Análise', 
            proximaApresentacao: 'Pendente', janela: '08:00 às 18:00', initials: 'JS', processo: '0801234-55.2023.8.15.2001'
        });
    } else if (storedCpf === '123.456.789-00') {
        setUser({
            nome: 'Ana Maria de Souza', cpf: '123.456.789-00', status: 'Concluído', 
            proximaApresentacao: 'Amanhã', janela: '08:00 às 18:00', initials: 'AM', processo: '0809876-11.2024.8.15.2001'
        });
    } else {
        setUser({
            nome: 'Carlos Eduardo Silva', cpf: '098.112.334-12', status: 'Regular', 
            proximaApresentacao: 'Hoje', janela: '08:00 às 18:00', initials: 'CE', processo: '0004321-88.2024.8.15.2001'
        });
    }
  }, []);

  const handleLogout = () => { localStorage.removeItem('userCpf'); navigate('/login'); };
  const handleStartCheckIn = () => navigate('/checkin');
  const handleJustify = () => navigate('/justificativa');
  const handleHistory = () => navigate('/historico');

  // Função para definir a cor do status na carteira
  const getStatusColor = () => {
      if (user.status === 'Regular' || user.status === 'Concluído') return '#10B981'; // Verde
      if (user.status === 'Em Análise') return '#D97706'; // Laranja
      return '#EF4444'; // Vermelho
  };

  return (
    <div className="home-container">
      {/* Header com Perfil */}
      <div className="home-header">
        <div className="user-info">
          <div className="avatar-circle">{user.initials}</div>
          <div className="user-text">
            <h2>{user.nome}</h2>
            <p>CPF: {user.cpf}</p>
          </div>
        </div>
        
        <div className="header-actions">
            {/* Botão da Carteira Virtual */}
            <button onClick={() => setShowWallet(true)} className="btn-icon-light wallet-btn">
                <Wallet size={24} />
                <span className="wallet-label">Carteira</span>
            </button>
            
            <button onClick={handleLogout} className="btn-icon-light">
                <LogOut size={24} />
            </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="home-content">
        <div className="status-card">
            <div className="status-header">
                <span>Situação Atual</span>
                {user.status === 'Em Análise' ? ( <span className="badge-warning">{user.status}</span> ) : user.status === 'Concluído' ? ( <span className="badge-success" style={{background: '#ECFDF5', color: '#059669'}}>Regular</span> ) : ( <span className="badge-success">{user.status}</span> )}
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
            <button onClick={handleJustify} className="btn-secondary-action" style={{marginTop: '16px'}}>
                <FileText size={18} /> <span>Enviar Justificativa / Atestado</span>
            </button>
            <p className="hint-text">Certifique-se de estar em um local iluminado.</p>
        </div>

        <div className="history-section">
            <div className="section-header">
                <h3>Últimas Atividades</h3>
                <button onClick={handleHistory} className="btn-view-all">Ver todos <ChevronRight size={16} /></button>
            </div>
            <div className="history-item" onClick={handleHistory}>
                <CheckCircle size={20} color="#10B981" />
                <div className="history-text"><strong>Apresentação Realizada</strong><span>15/01/2026 às 09:15 • Via App</span></div>
                <div className="chevron-icon"><ChevronRight size={18} color="#CBD5E1" /></div>
            </div>
        </div>
      </div>

      {/* --- MODAL DA CARTEIRA VIRTUAL --- */}
      {showWallet && (
          <div className="wallet-overlay fade-in">
              <div className="wallet-card">
                  <button className="close-wallet" onClick={() => setShowWallet(false)}>
                      <X size={24} />
                  </button>
                  
                  {/* Cabeçalho da Carteira */}
                  <div className="wallet-header">
                      <img src={brasao} alt="Brasão" />
                      <div>
                          <h3>Poder Judiciário</h3>
                          <h4>Tribunal de Justiça da Paraíba</h4>
                      </div>
                  </div>

                  <div className="wallet-title">MEDIDA CAUTELAR DIGITAL</div>

                  {/* Foto e Dados */}
                  <div className="wallet-body">
                      <div className="wallet-avatar">{user.initials}</div>
                      <div className="wallet-info">
                          <label>Nome do Assistido</label>
                          <div className="value">{user.nome}</div>
                          
                          <label>CPF</label>
                          <div className="value">{user.cpf}</div>

                          <label>Processo Vinculado</label>
                          <div className="value monospace">{user.processo}</div>
                      </div>
                  </div>

                  {/* Faixa de Status */}
                  <div className="wallet-status" style={{backgroundColor: getStatusColor()}}>
                      <span>SITUAÇÃO: {user.status.toUpperCase() === 'CONCLUÍDO' ? 'REGULAR' : user.status.toUpperCase()}</span>
                  </div>

                  {/* QR Code de Validação */}
                  <div className="wallet-footer">
                      <div className="qr-placeholder">
                          <QrCode size={64} color="#1E2939" />
                      </div>
                      <div className="validation-text">
                          <p>Documento assinado digitalmente.</p>
                          <p>Válido em: {new Date().toLocaleDateString()} às {new Date().toLocaleTimeString()}</p>
                      </div>
                  </div>
              </div>
          </div>
      )}

      <style>{`
        .home-container { min-height: 100vh; background: #F8FAFC; display: flex; flex-direction: column; }
        
        .home-header { background: var(--primary); color: white; padding: 24px; padding-top: 32px; display: flex; justify-content: space-between; align-items: center; border-bottom-left-radius: 24px; border-bottom-right-radius: 24px; box-shadow: 0 4px 10px rgba(15, 153, 168, 0.15); flex-shrink: 0; z-index: 10; }
        .user-info { display: flex; align-items: center; gap: 12px; }
        .avatar-circle { width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; border: 2px solid rgba(255,255,255,0.3); }
        .user-text h2 { font-size: 18px; font-weight: 600; margin: 0; line-height: 1.2; }
        .user-text p { font-size: 12px; opacity: 0.9; margin: 0; }
        
        .header-actions { display: flex; align-items: center; gap: 8px; }
        .btn-icon-light { background: none; border: none; color: white; cursor: pointer; opacity: 0.9; padding: 8px; border-radius: 8px; transition: background 0.2s; }
        .btn-icon-light:hover { background: rgba(255,255,255,0.1); }
        
        .wallet-btn { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 4px 12px; background: rgba(0,0,0,0.1); }
        .wallet-label { font-size: 9px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; }

        .home-content { flex: 1; padding: 24px; overflow-y: auto; }
        .status-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border: 1px solid #E2E7ED; margin-bottom: 32px; }
        .status-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #F1F5F9; padding-bottom: 12px; font-size: 14px; font-weight: 600; color: #64748B; }
        .badge-success { background: #ECFDF5; color: #059669; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .badge-warning { background: #FFFBEB; color: #D97706; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .info-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: #334155; font-size: 14px; }
        
        .action-area { margin-bottom: 32px; text-align: center; }
        .btn-large { height: 64px; font-size: 16px; letter-spacing: 0.5px; border-radius: 16px; font-weight: 700; box-shadow: 0 8px 20px rgba(15, 153, 168, 0.25); }
        .btn-secondary-action { width: 100%; height: 48px; background: white; border: 1px solid #E2E7ED; border-radius: 12px; color: #64748B; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: all 0.2s; }
        .btn-secondary-action:hover { background: #F1F5F9; color: #1E2939; border-color: #CBD5E1; }
        .pulse-animation { animation: pulse-shadow 2s infinite; }
        @keyframes pulse-shadow { 0% { transform: scale(1); } 50% { transform: scale(1.02); } 100% { transform: scale(1); } }
        .hint-text { font-size: 12px; color: #94A3B8; margin-top: 12px; }
        
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .history-section h3 { font-size: 16px; color: #1E2939; margin: 0; font-weight: 600; }
        .btn-view-all { background: none; border: none; color: var(--primary); font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 2px; cursor: pointer; }
        .history-item { display: flex; gap: 12px; background: white; padding: 16px; border-radius: 12px; margin-bottom: 12px; border: 1px solid #E2E7ED; align-items: center; cursor: pointer; transition: background 0.2s; }
        .history-item:hover { background: #F8FAFC; border-color: #CBD5E1; }
        .history-text { display: flex; flex-direction: column; flex: 1; }
        .history-text strong { font-size: 14px; color: #1E2939; }
        .history-text span { font-size: 12px; color: #64748B; margin-top: 2px; }

        /* --- STYLES DA CARTEIRA VIRTUAL (MODAL) --- */
        .wallet-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(5px); }
        .wallet-card { background: #F8FAFC; width: 100%; max-width: 360px; border-radius: 20px; overflow: hidden; position: relative; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #E2E8F0; }
        .close-wallet { position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.1); border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #475569; z-index: 10; }
        
        .wallet-header { background: white; padding: 24px; padding-bottom: 16px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #F1F5F9; }
        .wallet-header img { height: 40px; }
        .wallet-header h3 { font-size: 12px; color: #64748B; margin: 0; text-transform: uppercase; font-weight: 600; }
        .wallet-header h4 { font-size: 14px; color: #1E2939; margin: 0; font-weight: 700; text-transform: uppercase; }
        
        .wallet-title { background: #F1F5F9; color: #64748B; font-size: 10px; font-weight: 700; text-align: center; padding: 6px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #E2E8F0; }
        
        .wallet-body { padding: 24px; background: white; display: flex; gap: 20px; align-items: center; }
        .wallet-avatar { width: 80px; height: 80px; background: #E2E8F0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 700; color: #64748B; border: 2px solid #CBD5E1; }
        .wallet-info { flex: 1; display: flex; flex-direction: column; }
        .wallet-info label { font-size: 10px; color: #94A3B8; text-transform: uppercase; margin-bottom: 2px; font-weight: 600; }
        .wallet-info .value { font-size: 14px; color: #1E2939; font-weight: 600; margin-bottom: 12px; }
        .wallet-info .value.monospace { font-family: monospace; letter-spacing: -0.5px; font-size: 13px; }
        
        .wallet-status { padding: 16px; text-align: center; color: white; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; font-size: 18px; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        
        .wallet-footer { padding: 24px; background: white; display: flex; align-items: center; gap: 16px; border-top: 1px solid #F1F5F9; }
        .qr-placeholder { padding: 8px; border: 2px solid #1E2939; border-radius: 8px; }
        .validation-text { flex: 1; }
        .validation-text p { font-size: 10px; color: #64748B; margin: 0; line-height: 1.4; }
        
        .fade-in { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Home;