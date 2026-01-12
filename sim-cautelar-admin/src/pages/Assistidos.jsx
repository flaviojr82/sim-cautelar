import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Hooks de rota
import Layout from '../components/Layout';
import { Search, Plus, MoreVertical, AlertCircle, Eye, Edit3, FileText, Ban, X } from 'lucide-react';

const Assistidos = () => {
  const [busca, setBusca] = useState('');
  const [menuAberto, setMenuAberto] = useState(null);
  
  // Hooks para ler URL
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const filtroStatus = queryParams.get('filtro'); // 'alert' ou 'analysis' ou null

  // Fecha menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-container')) {
        setMenuAberto(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Base de Dados
  const baseDeDados = [
    { id: 1, nome: 'Carlos Eduardo Silva', cpf: '098.112.334-12', processo: '0004321-88.2024.8.15.2001', status: 'active', ultimaSinc: 'Há 5 min', foto: 'https://ui-avatars.com/api/?name=Carlos+Silva&background=c7d2fe&color=3730a3' },
    { id: 2, nome: 'Ana Maria de Souza', cpf: '123.456.789-45', processo: '0005566-11.2023.8.15.2001', status: 'alert', ultimaSinc: 'Há 2 horas', foto: 'https://ui-avatars.com/api/?name=Ana+Souza&background=fecaca&color=991b1b' },
    { id: 3, nome: 'Marcos Vinicius Dias', cpf: '999.888.777-66', processo: '0001234-55.2024.8.15.0001', status: 'analysis', ultimaSinc: 'Aguardando Aprovação', foto: 'https://ui-avatars.com/api/?name=Marcos+Dias&background=fef3c7&color=d97706' },
    { id: 4, nome: 'Roberto Alves', cpf: '456.789.012-78', processo: '0009988-22.2024.8.15.0001', status: 'active', ultimaSinc: 'Há 10 min', foto: 'https://ui-avatars.com/api/?name=Roberto+Alves&background=bbf7d0&color=166534' },
    { id: 5, nome: 'Fernanda Oliveira', cpf: '789.012.345-90', processo: '0001122-33.2023.8.15.2001', status: 'offline', ultimaSinc: 'Há 2 dias', foto: 'https://ui-avatars.com/api/?name=Fernanda+Oliveira&background=e5e7eb&color=374151' },
    { id: 6, nome: 'João Pedro Santos', cpf: '321.654.987-56', processo: '0007766-44.2024.8.15.2001', status: 'active', ultimaSinc: 'Há 1 min', foto: 'https://ui-avatars.com/api/?name=Joao+Santos&background=fed7aa&color=9a3412' },
    { id: 7, nome: 'Mariana Costa', cpf: '654.321.098-34', processo: '0003344-55.2023.8.15.0001', status: 'alert', ultimaSinc: 'Fora do perímetro', foto: 'https://ui-avatars.com/api/?name=Mariana+Costa&background=fecaca&color=991b1b' },
  ];

  // Lógica de Filtragem (Busca Texto + Filtro URL)
  const assistidosFiltrados = baseDeDados.filter((item) => {
    const termo = busca.toLowerCase();
    const matchTexto = 
      item.nome.toLowerCase().includes(termo) ||
      item.cpf.includes(termo) ||
      item.processo.includes(termo);

    const matchStatus = filtroStatus ? item.status === filtroStatus : true;

    return matchTexto && matchStatus;
  });

  const limparFiltroURL = () => {
    navigate('/assistidos'); // Remove o ?filtro=...
  };

  // Funções Auxiliares (RenderStatus e ToggleMenu) mantidas iguais...
  const renderStatus = (status) => {
      switch(status) {
        case 'active': return <span className="status-badge status-active">Regular</span>;
        case 'alert': return <span className="status-badge status-alert">Irregular</span>;
        case 'offline': return <span className="status-badge status-offline">Sem Sinal</span>;
        case 'analysis': return <span className="status-badge status-analysis">Em Análise</span>;
        default: return null;
      }
  };
  const toggleMenu = (id) => setMenuAberto(menuAberto === id ? null : id);

  return (
    <Layout>
      <div className="page-title-group">
         <div className="title-pill"></div>
         <h2 className="page-h1">Assistidos</h2>
         
         {/* Badge informativo se houver filtro ativo */}
         {filtroStatus && (
           <div className="active-filter-badge">
             <span>Filtro: {filtroStatus === 'alert' ? 'Irregulares' : 'Em Análise'}</span>
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
            Novo Cadastro
        </button>
      </div>

      <div className="table-container">
        <table className="custom-table">
            <thead>
                <tr>
                    <th style={{ width: '35%' }}>Nome / CPF</th>
                    <th style={{ width: '25%' }}>Processo</th>
                    <th style={{ width: '15%' }}>Status</th>
                    <th style={{ width: '20%' }}>Sincronização</th>
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
                                    <img src={item.foto} alt={item.nome} className="user-avatar" />
                                    <div className="user-info">
                                        <span className="user-name">{item.nome}</span>
                                        <span className="user-meta">{item.cpf}</span>
                                    </div>
                                </div>
                            </td>
                            <td style={{ fontFamily: 'monospace', color: '#6A7282', fontSize: '13px' }}>{item.processo}</td>
                            <td>{renderStatus(item.status)}</td>
                            <td style={{ color: '#6A7282', fontSize: '13px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.status === 'offline' ? '#9CA3AF' : (item.status === 'analysis' ? '#F59E0B' : '#10B981') }}></div>
                                    {item.ultimaSinc}
                                </div>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <div className="action-container">
                                  <button className="btn-icon" onClick={(e) => { e.stopPropagation(); toggleMenu(item.id); }} style={{ background: menuAberto === item.id ? '#F3F4F6' : 'transparent' }}>
                                      <MoreVertical size={18} />
                                  </button>
                                  {menuAberto === item.id && (
                                    <div className={`dropdown-menu ${isLastRow ? 'upwards' : ''}`}>
                                      <button className="dropdown-item"><Eye size={16} color="#64748B" /> Ver Detalhes</button>
                                      <button className="dropdown-item"><Edit3 size={16} color="#64748B" /> Editar Cadastro</button>
                                      <button className="dropdown-item"><FileText size={16} color="#64748B" /> Histórico</button>
                                      <div className="dropdown-divider"></div>
                                      <button className="dropdown-item danger"><Ban size={16} /> Suspender</button>
                                    </div>
                                  )}
                                </div>
                            </td>
                        </tr>
                      );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '60px 0', textAlign: 'center' }}>
                      {/* Estado Vazio igual ao anterior */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: '#6A7282' }}>
                        <div style={{ padding: '16px', background: '#F3F4F6', borderRadius: '50%' }}><AlertCircle size={32} color="#9CA3AF" /></div>
                        <div><p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1E2939' }}>Dados não encontrados</p><p style={{ fontSize: '14px' }}>Nenhum assistido corresponde à sua busca.</p></div>
                        <button onClick={() => { setBusca(''); limparFiltroURL(); }} style={{ marginTop: '8px', color: '#0F99A8', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Limpar filtros</button>
                      </div>
                    </td>
                  </tr>
                )}
            </tbody>
        </table>

        {/* --- TOTALIZADOR (NOVA FUNCIONALIDADE) --- */}
        <div className="table-footer-summary">
            <div>
                Total de registros: <strong>{assistidosFiltrados.length}</strong>
                {filtroStatus && <span style={{ marginLeft: '6px', fontWeight: 'normal' }}>(Filtrado por: {filtroStatus === 'alert' ? 'Irregulares' : 'Em Análise'})</span>}
            </div>
            {/* Mantemos a paginação à direita, dentro do footer */}
            {assistidosFiltrados.length > 0 && (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="page-btn">Anterior</button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">Próximo</button>
                </div>
            )}
        </div>
      </div>
    </Layout>
  );
};

export default Assistidos;