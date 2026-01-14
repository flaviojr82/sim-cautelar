import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  Search, Plus, MoreVertical, AlertCircle, 
  Eye, Edit3, FileText, Ban, X, UserCheck, PauseCircle, PlayCircle, Trash2 
} from 'lucide-react';

const Assistidos = () => {
  const [busca, setBusca] = useState('');
  const [menuAberto, setMenuAberto] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const filtroStatus = queryParams.get('filtro');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-container')) {
        setMenuAberto(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // --- DADOS MOCKADOS (Lista completa com 10 itens para bater com os contadores) ---
  const baseDeDados = [
    // 1. RASCUNHO (Não conta no total monitorado)
    { 
      id: 99, 
      nome: 'José da Silva Moura', 
      cpf: '111.222.333-44', 
      processo: '0012345-88.2025.8.15.2001', 
      status: 'draft', 
      ultimaSinc: 'Cadastro Incompleto (Rascunho)', 
      foto: 'https://ui-avatars.com/api/?name=Jose+Moura&background=e2e8f0&color=64748b' 
    },

    // 2. AGUARDANDO INÍCIO / CADASTRADO (Não conta no total monitorado)
    { 
      id: 100, 
      nome: 'Amanda Ribeiro Dias', 
      cpf: '555.444.333-22', 
      processo: '0099887-11.2025.8.15.2001', 
      status: 'ready', 
      ultimaSinc: 'Aguardando Início da Vigência', 
      foto: 'https://ui-avatars.com/api/?name=Amanda+Ribeiro&background=e0f2fe&color=0369a1' 
    },

    // 3. REGULAR (Conta)
    { 
      id: 1, 
      nome: 'Carlos Eduardo Silva', 
      cpf: '098.112.334-12', 
      processo: '0004321-88.2024.8.15.2001', 
      status: 'active', 
      ultimaSinc: 'Há 5 min (Dentro do Perímetro)', 
      foto: 'https://ui-avatars.com/api/?name=Carlos+Silva&background=c7d2fe&color=3730a3' 
    },
    
    // 4. IRREGULAR (Conta - Alert)
    { 
      id: 2, 
      nome: 'Ana Maria de Souza', 
      cpf: '123.456.789-45', 
      processo: '0005566-11.2023.8.15.2001', 
      status: 'alert', 
      ultimaSinc: 'Ausente há 24h (Não apresentou)', 
      foto: 'https://ui-avatars.com/api/?name=Ana+Souza&background=fecaca&color=991b1b' 
    },
    
    // 5. EM ANÁLISE 1 (Conta - Analysis)
    { 
      id: 3, 
      nome: 'Mariana Costa', 
      cpf: '654.321.098-34', 
      processo: '0003344-55.2023.8.15.0001', 
      status: 'analysis', 
      ultimaSinc: 'Fora do Perímetro Permitido', 
      foto: 'https://ui-avatars.com/api/?name=Mariana+Costa&background=fef3c7&color=d97706' 
    },

    // 6. EM ANÁLISE 2 (Conta - Analysis)
    { 
      id: 4, 
      nome: 'Marcos Vinicius Dias', 
      cpf: '999.888.777-66', 
      processo: '0001234-55.2024.8.15.0001', 
      status: 'analysis', 
      ultimaSinc: 'Atraso (Fora do Horário Estipulado)', 
      foto: 'https://ui-avatars.com/api/?name=Marcos+Dias&background=fef3c7&color=d97706' 
    },

    // 7. REGULAR (Conta)
    { 
      id: 5, 
      nome: 'João Pedro Santos', 
      cpf: '321.654.987-56', 
      processo: '0007766-44.2024.8.15.2001', 
      status: 'active', 
      ultimaSinc: 'Há 1 min (Reconhecimento Facial)', 
      foto: 'https://ui-avatars.com/api/?name=Joao+Santos&background=fed7aa&color=9a3412' 
    },

    // 8. EM ANÁLISE 3 (Conta - Analysis - FALTAVA ESTE)
    { 
      id: 6, 
      nome: 'Ricardo Oliveira', 
      cpf: '444.555.666-77', 
      processo: '0002233-44.2024.8.15.0001', 
      status: 'analysis', 
      ultimaSinc: 'Biometria Inconclusiva (Score Baixo)', 
      foto: 'https://ui-avatars.com/api/?name=Ricardo+Oliveira&background=fef3c7&color=d97706' 
    },

    // 9. SUSPENSO (Não conta)
    { 
      id: 7, 
      nome: 'Paulo Ricardo Gomes', 
      cpf: '111.222.333-44', 
      processo: '0008899-77.2022.8.15.2001', 
      status: 'suspended', 
      ultimaSinc: 'Monitoramento Encerrado (Alvará)', 
      foto: 'https://ui-avatars.com/api/?name=Paulo+Gomes&background=f1f5f9&color=64748b' 
    },

    // 10. REGULAR (Conta)
    { 
      id: 8, 
      nome: 'Julia Mendes', 
      cpf: '222.333.444-55', 
      processo: '0006655-22.2023.8.15.2001', 
      status: 'active', 
      ultimaSinc: 'Apresentação Presencial (Fórum)', 
      foto: 'https://ui-avatars.com/api/?name=Julia+Mendes&background=bbf7d0&color=166534' 
    },
  ];

  const assistidosFiltrados = baseDeDados.filter((item) => {
    const termo = busca.toLowerCase();
    const matchTexto = 
      item.nome.toLowerCase().includes(termo) ||
      item.cpf.includes(termo) ||
      item.processo.includes(termo);

    let matchStatus = true;
    
    // Lógica Corrigida: Filtro "Monitored" exclui Suspensos, Rascunhos E Cadastrados (Ready)
    if (filtroStatus === 'monitored') {
      matchStatus = 
        item.status !== 'suspended' && 
        item.status !== 'draft' && 
        item.status !== 'ready';
    } else if (filtroStatus) {
      matchStatus = item.status === filtroStatus;
    }

    return matchTexto && matchStatus;
  });

  const limparFiltroURL = () => { navigate('/assistidos'); };

  const renderStatus = (status) => {
      switch(status) {
        case 'active': return <span className="status-badge status-active">Regular</span>;
        case 'alert': return <span className="status-badge status-alert">Irregular</span>;
        case 'analysis': return <span className="status-badge status-analysis">Em Análise</span>;
        case 'suspended': return <span className="status-badge status-suspended">Suspenso</span>;
        case 'draft': return <span className="status-badge" style={{ background: '#F1F5F9', color: '#64748B', border: '1px solid #E2E8F0' }}>Rascunho</span>;
        case 'ready': return <span className="status-badge" style={{ background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD' }}>Cadastrado</span>;
        default: return null;
      }
  };

  const getFiltroLabel = () => {
    if (filtroStatus === 'monitored') return 'Apenas Monitorados (Ativos)';
    if (filtroStatus === 'alert') return 'Irregulares';
    if (filtroStatus === 'analysis') return 'Em Análise';
    return '';
  };

  const toggleMenu = (id) => setMenuAberto(menuAberto === id ? null : id);

  return (
    <Layout>
      <div className="page-title-group">
         <div className="title-pill"></div>
         <h2 className="page-h1">Assistidos</h2>
         
         {filtroStatus && (
           <div className="active-filter-badge">
             <span>Filtro: {getFiltroLabel()}</span>
             <button onClick={limparFiltroURL} style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex' }}>
               <X size={14} color="#0284C7" />
             </button>
           </div>
         )}
      </div>

      <div className="action-bar">
        <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar por nome, CPF ou nº do processo..." 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />
        </div>
        <button className="btn-primary" onClick={() => navigate('/assistidos/novo')}>
            <Plus size={20} />
            Cadastrar Assistido
        </button>
      </div>

      <div className="table-container">
        <table className="custom-table">
            <thead>
                <tr>
                    <th style={{ width: '35%' }}>Nome / CPF</th>
                    <th style={{ width: '25%' }}>Processo</th>
                    <th style={{ width: '15%' }}>Status</th>
                    <th style={{ width: '20%' }}>Motivo / Sincronização</th>
                    <th style={{ width: '5%', textAlign: 'right' }}>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {assistidosFiltrados.length > 0 ? (
                  assistidosFiltrados.map((item, index) => {
                      const isLastRow = index >= assistidosFiltrados.length - 2;
                      return (
                        <tr key={item.id}>
                            <td>
                                <div className="user-cell">
                                    <img 
                                      src={item.foto} alt={item.nome} className="user-avatar" 
                                      style={{ 
                                        filter: (item.status === 'suspended' || item.status === 'draft') ? 'grayscale(100%)' : 'none', 
                                        opacity: (item.status === 'suspended' || item.status === 'draft') ? 0.7 : 1 
                                      }}
                                    />
                                    <div className="user-info">
                                        <span className="user-name" style={{ color: item.status === 'suspended' ? '#94A3B8' : 'inherit' }}>{item.nome}</span>
                                        <span className="user-meta">{item.cpf}</span>
                                    </div>
                                </div>
                            </td>
                            <td style={{ fontFamily: 'monospace', color: '#6A7282', fontSize: '13px' }}>{item.processo}</td>
                            <td>{renderStatus(item.status)}</td>
                            
                            <td style={{ fontSize: '13px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {/* Indicador visual (sem bolinha para Rascunho) */}
                                    {item.status !== 'draft' && (
                                      <div style={{ 
                                        width: '8px', height: '8px', borderRadius: '50%', 
                                        background: item.status === 'analysis' ? '#F59E0B' : 
                                                   (item.status === 'alert' ? '#EF4444' : 
                                                   (item.status === 'suspended' ? '#CBD5E1' : 
                                                   (item.status === 'ready' ? '#3B82F6' : '#10B981'))) 
                                      }}></div>
                                    )}
                                    
                                    <span style={{ 
                                        color: item.status === 'alert' ? '#B91C1C' : 
                                               (item.status === 'analysis' ? '#B45309' : 
                                               (item.status === 'suspended' ? '#94A3B8' : 
                                               (item.status === 'draft' ? '#64748B' : '#6A7282'))),
                                        fontWeight: (item.status === 'alert' || item.status === 'analysis' || item.status === 'ready') ? '600' : '400',
                                        fontStyle: item.status === 'suspended' ? 'italic' : 'normal'
                                    }}>
                                        {item.ultimaSinc}
                                    </span>
                                </div>
                            </td>
                            
                            <td style={{ textAlign: 'right' }}>
                                <div className="action-container">
                                  <button className="btn-icon" onClick={(e) => { e.stopPropagation(); toggleMenu(item.id); }} style={{ background: menuAberto === item.id ? '#F3F4F6' : 'transparent' }}>
                                      <MoreVertical size={18} />
                                  </button>
                                  
                                  {menuAberto === item.id && (
                                    <div className={`dropdown-menu ${isLastRow ? 'upwards' : ''}`}>
                                      {/* MENU DE AÇÕES */}
                                      {item.status === 'ready' && (
                                        <button className="dropdown-item" style={{ color: '#0F99A8', fontWeight: 'bold' }} onClick={() => alert("Monitoramento Iniciado!")}>
                                          <PlayCircle size={16} /> Iniciar Monitoramento
                                        </button>
                                      )}

                                      {item.status === 'draft' ? (
                                        <>
                                            {/* Opção para Rascunho */}
                                            <button className="dropdown-item" onClick={() => navigate(`/assistidos/editar/${item.id}`)}>
                                                <Edit3 size={16} color="#64748B" /> 
                                                Continuar Editando
                                            </button>
                                            <div className="dropdown-divider"></div>
                                            <button className="dropdown-item danger"><Trash2 size={16} /> Excluir Rascunho</button>
                                        </>
                                      ) : (
                                        <>
                                            <button className="dropdown-item"><Eye size={16} color="#64748B" /> Ver Detalhes</button>
                                            {item.status !== 'suspended' && item.status !== 'ready' && (
                                                <button className="dropdown-item" onClick={() => alert("Check-in Presencial")}>
                                                <UserCheck size={16} color="#0F99A8" /> Apresentação Presencial
                                                </button>
                                            )}

                                            {/* Opção para Cadastro Ativo */}
                                            <button className="dropdown-item" onClick={() => navigate(`/assistidos/editar/${item.id}`)}>
                                                <Edit3 size={16} color="#64748B" /> 
                                                  Editar Cadastro
                                                  </button>
                                            <button className="dropdown-item"><FileText size={16} color="#64748B" /> Histórico</button>

                                            {item.status !== 'ready' && (
                                                <>
                                                    <div className="dropdown-divider"></div>
                                                    {item.status === 'suspended' ? (
                                                        <button className="dropdown-item" style={{ color: '#10B981' }}><PauseCircle size={16} /> Reativar Monitoramento</button>
                                                    ) : (
                                                        <button className="dropdown-item danger"><Ban size={16} /> Suspender</button>
                                                    )}
                                                </>
                                            )}
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                            </td>
                        </tr>
                      );
                  })
                ) : (
                  <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center' }}>Nenhum registro.</td></tr>
                )}
            </tbody>
        </table>
        
        <div className="table-footer-summary">
            <div>Total de registros: <strong>{assistidosFiltrados.length}</strong> {filtroStatus && <span>({getFiltroLabel()})</span>}</div>
            {assistidosFiltrados.length > 0 && (
                <div style={{ display: 'flex', gap: '8px' }}><button className="page-btn">Anterior</button><button className="page-btn active">1</button><button className="page-btn">Próximo</button></div>
            )}
        </div>
      </div>
    </Layout>
  );
};

export default Assistidos;