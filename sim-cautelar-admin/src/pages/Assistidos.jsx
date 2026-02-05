import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  Search, Plus, MoreVertical, AlertCircle, 
  Eye, Edit3, Ban, X, UserCheck, PauseCircle, PlayCircle, Trash2, 
  Camera, CheckCircle, AlertTriangle, Hash, MapPin, Clock, XCircle,
  AlertOctagon, CarFront, Gavel, ArrowLeft
} from 'lucide-react';
import Webcam from 'react-webcam';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Assistidos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filtroStatus = queryParams.get('filtro');
  
  // -- ESTADOS GERAIS --
  // Inicializa mostrarInativos como true se o filtro da URL for um status inativo
  const [mostrarInativos, setMostrarInativos] = useState(() => {
    return ['draft', 'ready', 'suspended'].includes(filtroStatus);
  });

  const [busca, setBusca] = useState('');
  const [menuAberto, setMenuAberto] = useState(null);
  
  // -- ESTADOS DOS MODAIS --
  const [modalType, setModalType] = useState(null); 
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Estados Internos
  const [motivoSusp, setMotivoSusp] = useState('');
  const [obsModal, setObsModal] = useState('');
  const [metodoValidacao, setMetodoValidacao] = useState('visual');
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  
  // Estados para o Fluxo de Análise/Punição
  const [stepAnalise, setStepAnalise] = useState(1); // 1 = Fatos, 2 = Penalidade
  const [acaoPenalidade, setAcaoPenalidade] = useState('advertencia'); // advertencia, diligencia, juizo

  const webcamRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.action-container')) setMenuAberto(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // -- FUNÇÕES --
  const openModal = (type, user) => {
    setModalType(type);
    setSelectedUser(user);
    setMenuAberto(null);
    
    // Reset de todos os estados
    setMotivoSusp('');
    setObsModal('');
    setMetodoValidacao('visual');
    setCameraAtiva(false);
    setImgSrc(null);
    setStepAnalise(1);
    setAcaoPenalidade('advertencia');
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedUser(null);
    setCameraAtiva(false);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setCameraAtiva(false);
  }, [webcamRef]);

  const handleConfirmAction = (decision = null) => {
    let msg = "";
    
    if (modalType === 'presencial') {
        if (metodoValidacao === 'facial' && !imgSrc) return alert("Capture a foto para validar.");
        msg = `Apresentação Presencial registrada com sucesso!`;
    } 
    else if (modalType === 'suspender') msg = `Checagem SUSPENSA! Motivo: ${motivoSusp}`;
    else if (modalType === 'reativar') msg = `Checagem REATIVADA!`;
    
    // Lógica do Modal de Análise
    else if (modalType === 'analisar') {
        if (decision === 'validar') {
            msg = `Justificativa aceita. Status alterado para REGULAR.`;
        } else if (decision === 'aplicar_penalidade') {
            const tipos = {
                'advertencia': 'Advertência registrada no histórico.',
                'diligencia': 'Solicitação de Diligência encaminhada à Central de Mandados.',
                'juizo': 'Relatório de Violação gerado para envio ao Juízo.'
            };
            msg = `Irregularidade Confirmada. ${tipos[acaoPenalidade]}`;
        }
    }
    
    alert(msg);
    closeModal();
  };

  // --- DADOS MOCKADOS ---
  const baseDeDados = [
    { id: 99, nome: 'José da Silva Moura', cpf: '111.222.333-44', processo: '0012345-88.2025.8.15.2001', status: 'draft', ultimaSinc: 'Cadastro Incompleto (Rascunho)', foto: 'https://ui-avatars.com/api/?name=Jose+Moura&background=e2e8f0&color=64748b' },
    { id: 100, nome: 'Amanda Ribeiro Dias', cpf: '555.444.333-22', processo: '0099887-11.2025.8.15.2001', status: 'ready', ultimaSinc: 'Aguardando Início da Vigência', foto: 'https://ui-avatars.com/api/?name=Amanda+Ribeiro&background=e0f2fe&color=0369a1' },
    { id: 1, nome: 'Carlos Eduardo Silva', cpf: '098.112.334-12', processo: '0004321-88.2024.8.15.2001', status: 'active', ultimaSinc: 'Há 5 min (Dentro do Perímetro)', foto: 'https://ui-avatars.com/api/?name=Carlos+Silva&background=c7d2fe&color=3730a3' },
    { id: 2, nome: 'Ana Maria de Souza', cpf: '123.456.789-45', processo: '0005566-11.2023.8.15.2001', status: 'alert', ultimaSinc: 'Ausente há 24h (Não apresentou)', foto: 'https://ui-avatars.com/api/?name=Ana+Souza&background=fecaca&color=991b1b' },
    { id: 3, nome: 'Mariana Costa', cpf: '654.321.098-34', processo: '0003344-55.2023.8.15.0001', status: 'analysis', ultimaSinc: 'Fora do Perímetro Permitido', foto: 'https://ui-avatars.com/api/?name=Mariana+Costa&background=fef3c7&color=d97706', analiseTipo: 'geo', analiseDetalhe: 'Localização registrada a 800m do perímetro permitido.', coords: [-7.1300, -34.8500] },
    { id: 4, nome: 'Marcos Vinicius Dias', cpf: '999.888.777-66', processo: '0001234-55.2024.8.15.0001', status: 'analysis', ultimaSinc: 'Atraso (Fora do Horário)', foto: 'https://ui-avatars.com/api/?name=Marcos+Dias&background=fef3c7&color=d97706', analiseTipo: 'time', analiseDetalhe: 'Apresentação realizada às 20:45. Limite era 19:00.' },
    { id: 5, nome: 'João Pedro Santos', cpf: '321.654.987-56', processo: '0007766-44.2024.8.15.2001', status: 'active', ultimaSinc: 'Há 1 min (Reconhecimento Facial)', foto: 'https://ui-avatars.com/api/?name=Joao+Santos&background=fed7aa&color=9a3412' },
    { id: 6, nome: 'Ricardo Oliveira', cpf: '444.555.666-77', processo: '0002233-44.2024.8.15.0001', status: 'analysis', ultimaSinc: 'Biometria Inconclusiva (Score Baixo)', foto: 'https://ui-avatars.com/api/?name=Ricardo+Oliveira&background=fef3c7&color=d97706', analiseTipo: 'bio', analiseDetalhe: 'Score de similaridade: 52% (Mínimo exigido: 90%).', fotoCheckin: 'https://ui-avatars.com/api/?name=Desconhecido&background=000&color=fff' },
    { id: 7, nome: 'Paulo Ricardo Gomes', cpf: '111.222.333-44', processo: '0008899-77.2022.8.15.2001', status: 'suspended', ultimaSinc: 'Checagem Encerrado (Alvará)', foto: 'https://ui-avatars.com/api/?name=Paulo+Gomes&background=f1f5f9&color=64748b' },
    { id: 8, nome: 'Julia Mendes', cpf: '222.333.444-55', processo: '0006655-22.2023.8.15.2001', status: 'active', ultimaSinc: 'Apresentação Presencial (Fórum)', foto: 'https://ui-avatars.com/api/?name=Julia+Mendes&background=bbf7d0&color=166534' },
  ];

  const assistidosFiltrados = baseDeDados.filter((item) => {
    const termo = busca.toLowerCase();
    const matchTexto = item.nome.toLowerCase().includes(termo) || item.cpf.includes(termo) || item.processo.includes(termo);
    
    // Lógica de Filtro por Status
    const statusInativos = ['draft', 'ready', 'suspended'];
    const isInactive = statusInativos.includes(item.status);

    // Se a opção de mostrar inativos estiver desmarcada, e o item for inativo, remove.
    if (!mostrarInativos && isInactive) return false;

    let matchStatus = true;
    if (filtroStatus === 'monitored') {
        // Se filtro for 'monitored', remove inativos (já tratado acima, mas reforça)
        matchStatus = !isInactive;
    } else if (filtroStatus) {
        matchStatus = item.status === filtroStatus;
    }

    return matchTexto && matchStatus;
  });

  const limparFiltroURL = () => navigate('/assistidos');

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
    if (filtroStatus === 'monitored') return 'Apenas Checado (Ativos)';
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
             <button onClick={limparFiltroURL} style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex' }}><X size={14} color="#0284C7" /></button>
           </div>
         )}
      </div>

      <div className="action-bar" style={{ alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="search-wrapper">
                <Search className="search-icon" size={20} />
                <input type="text" className="search-input" placeholder="Buscar por nome, CPF ou nº do processo..." value={busca} onChange={(e) => setBusca(e.target.value)} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#64748B', cursor: 'pointer', marginLeft: '2px' }}>
                <input 
                    type="checkbox" 
                    checked={mostrarInativos} 
                    onChange={(e) => setMostrarInativos(e.target.checked)} 
                    style={{ accentColor: '#0F99A8', width: '16px', height: '16px', cursor: 'pointer' }}
                />
                Mostrar assistidos inativos (Rascunho, Cadastrado, Suspenso)
            </label>
        </div>
        
        <button className="btn-primary" onClick={() => navigate('/assistidos/novo')}>
            <Plus size={20} /> Cadastrar Assistido
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
                                    <img src={item.foto} alt={item.nome} className="user-avatar" style={{ filter: (item.status === 'suspended' || item.status === 'draft') ? 'grayscale(100%)' : 'none', opacity: (item.status === 'suspended' || item.status === 'draft') ? 0.7 : 1 }} />
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
                                    {item.status !== 'draft' && (
                                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.status === 'analysis' ? '#F59E0B' : (item.status === 'alert' ? '#EF4444' : (item.status === 'suspended' ? '#CBD5E1' : (item.status === 'ready' ? '#3B82F6' : '#10B981'))) }}></div>
                                    )}
                                    <span style={{ color: item.status === 'alert' ? '#B91C1C' : (item.status === 'analysis' ? '#B45309' : (item.status === 'suspended' ? '#94A3B8' : (item.status === 'draft' ? '#64748B' : '#6A7282'))), fontWeight: (item.status === 'alert' || item.status === 'analysis' || item.status === 'ready') ? '600' : '400', fontStyle: item.status === 'suspended' ? 'italic' : 'normal' }}>{item.ultimaSinc}</span>
                                </div>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                <div className="action-container">
                                  <button className="btn-icon" onClick={(e) => { e.stopPropagation(); toggleMenu(item.id); }} style={{ background: menuAberto === item.id ? '#F3F4F6' : 'transparent' }}><MoreVertical size={18} /></button>
                                  {menuAberto === item.id && (
                                    <div className={`dropdown-menu ${isLastRow ? 'upwards' : ''}`}>
                                      {item.status === 'ready' && (
                                        <button className="dropdown-item" style={{ color: '#0F99A8', fontWeight: 'bold' }} onClick={() => alert("Checagem Iniciada!")}><PlayCircle size={16} /> Iniciar Checagem</button>
                                      )}
                                      
                                      {(item.status === 'analysis' || item.status === 'alert') && (
                                        <>
                                            <button className="dropdown-item" style={{ color: '#D97706', fontWeight: 'bold' }} onClick={() => openModal('analisar', item)}>
                                                <AlertTriangle size={16} /> Resolver Pendência
                                            </button>
                                            <div className="dropdown-divider"></div>
                                        </>
                                      )}
                                
                                      {item.status === 'draft' ? (
                                        <>
                                            <button className="dropdown-item" onClick={() => navigate(`/assistidos/editar/${item.id}`)}><Edit3 size={16} color="#64748B" /> Continuar Editando</button>
                                            <button className="dropdown-item" onClick={() => navigate(`/assistidos/editar/${item.id}?mode=migration`)}><Hash size={16} color="#64748B" /> Migrar Número de Processo</button>
                                            <div className="dropdown-divider"></div>
                                            <button className="dropdown-item danger"><Trash2 size={16} /> Excluir Rascunho</button>
                                        </>
                                      ) : (
                                        <>
                                            <button className="dropdown-item" onClick={() => navigate(`/assistidos/detalhes/${item.id}`)}><Eye size={16} color="#64748B" /> Ver Detalhes</button>
                                      {item.status !== 'suspended' && item.status !== 'ready' && (
                                            <button className="dropdown-item" onClick={() => openModal('presencial', item)}>
                                                <UserCheck size={16} color="#0F99A8" /> 
                                                Apresentação Presencial
                                                {/* --- ALTERAÇÃO 1: Ícone indicador de foto --- */}
                                                <Camera size={14} style={{ marginLeft: 'auto', color: '#94A3B8' }} />
                                            </button>
                                      )}
                                            <button className="dropdown-item" onClick={() => navigate(`/assistidos/editar/${item.id}`)}><Edit3 size={16} color="#64748B" /> Editar Cadastro</button>
                                            <button className="dropdown-item" onClick={() => navigate(`/assistidos/editar/${item.id}?mode=migration`)}><Hash size={16} color="#64748B" /> Migrar Número de Processo</button>
                                            {item.status !== 'ready' && (
                                                <>
                                                    <div className="dropdown-divider"></div>
                                                    {item.status === 'suspended' ? (
                                                        <button className="dropdown-item" style={{ color: '#10B981' }} onClick={() => openModal('reativar', item)}><PauseCircle size={16} /> Reativar Checagem</button>
                                                    ) : (
                                                        <button className="dropdown-item danger" onClick={() => openModal('suspender', item)}><Ban size={16} /> Suspender Checagem</button>
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
                  <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center' }}>Nenhum registro encontrado.</td></tr>
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

      {/* --- MODAIS DE AÇÃO --- */}
      {modalType && (
        <div className="modal-overlay">
            <div className="modal-content" style={(modalType === 'presencial' || modalType === 'analisar') ? { maxWidth: '600px' } : {}}>
                <div className="modal-header">
                    <div className="modal-title">
                        {modalType === 'suspender' && <><Ban size={24} color="#EF4444" /> Suspender Checagem</>}
                        {modalType === 'reativar' && <><PlayCircle size={24} color="#10B981" /> Reativar Checagem</>}
                        {modalType === 'presencial' && <><UserCheck size={24} color="#0F99A8" /> Check-in Presencial</>}
                        {modalType === 'analisar' && (stepAnalise === 1 ? <><AlertTriangle size={24} color="#D97706" /> Analisar Ocorrência</> : <><Gavel size={24} color="#EF4444" /> Definir Medida Disciplinar</>)}
                    </div>
                    <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="#64748B" /></button>
                </div>

                <div className="modal-body">
                    <p style={{ marginBottom: '16px', color: '#64748B' }}>
                        Ação para: <strong>{selectedUser?.nome}</strong>
                    </p>

                    {/* === ANALISAR OCORRÊNCIA === */}
                    {modalType === 'analisar' && (
                        <>
                            {stepAnalise === 1 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ background: '#FFF7ED', padding: '16px', borderRadius: '8px', border: '1px solid #FED7AA', display: 'flex', gap: '12px' }}>
                                        <AlertCircle size={24} color="#D97706" style={{ flexShrink: 0 }} />
                                        <div><strong style={{ color: '#9A3412' }}>Motivo da Pendência:</strong><p style={{ margin: '4px 0 0', fontSize: '14px', color: '#9A3412' }}>{selectedUser?.analiseDetalhe || 'Infração detectada pelo sistema.'}</p></div>
                                    </div>

                                    {selectedUser?.analiseTipo === 'geo' && (
                                        <div style={{ height: '200px', width: '100%', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E2E7ED' }}>
                                            <MapContainer center={selectedUser.coords} zoom={14} style={{ height: '100%', width: '100%' }} zoomControl={false}><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><Marker position={selectedUser.coords} /><Circle center={[-7.1350, -34.8750]} radius={500} pathOptions={{ color: '#10B981', fillColor: '#10B981', fillOpacity: 0.2 }} /></MapContainer>
                                        </div>
                                    )}

                                    {selectedUser?.analiseTipo === 'bio' && (
                                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                                            <div style={{ textAlign: 'center' }}><img src={selectedUser.foto} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #10B981' }} alt="Ref" /><p style={{ fontSize: '12px', marginTop: '4px', fontWeight: '600' }}>Referência</p></div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}><XCircle color="#EF4444" /></div>
                                            <div style={{ textAlign: 'center' }}><img src={selectedUser.fotoCheckin} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #EF4444' }} alt="Check" /><p style={{ fontSize: '12px', marginTop: '4px', fontWeight: '600', color: '#EF4444' }}>Captura (52%)</p></div>
                                        </div>
                                    )}

                                    {selectedUser?.analiseTipo === 'time' && (
                                        <div style={{ padding: '24px', background: '#F8FAFC', borderRadius: '8px', textAlign: 'center', border: '1px solid #E2E7ED' }}>
                                            <Clock size={40} color="#EF4444" style={{ marginBottom: '8px' }} />
                                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E2939' }}>Atraso de 1h 45min</div>
                                            <p style={{ fontSize: '13px', color: '#64748B' }}>Horário Limite: 19:00 • Check-in: 20:45</p>
                                        </div>
                                    )}

                                    <div className="input-group"><label>Observação da Análise</label><textarea className="form-control" rows="2" placeholder="Observações do oficial..." value={obsModal} onChange={(e) => setObsModal(e.target.value)}></textarea></div>
                                </div>
                            )}

                            {stepAnalise === 2 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ padding: '12px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#991B1B', fontSize: '14px' }}><strong>Atenção:</strong> Você optou por confirmar a irregularidade. Selecione a medida administrativa.</div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1E2939' }}>Medida Aplicável</label>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <div onClick={() => setAcaoPenalidade('advertencia')} style={{ padding: '16px', borderRadius: '8px', border: acaoPenalidade === 'advertencia' ? '2px solid #F59E0B' : '1px solid #E2E7ED', background: acaoPenalidade === 'advertencia' ? '#FFFBEB' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <AlertOctagon size={24} color="#D97706" /><div><div style={{ fontWeight: '600', color: '#1E2939' }}>Registrar Advertência</div><div style={{ fontSize: '12px', color: '#64748B' }}>Registra infração leve no histórico e notifica o assistido.</div></div>
                                            </div>
                                            <div onClick={() => setAcaoPenalidade('diligencia')} style={{ padding: '16px', borderRadius: '8px', border: acaoPenalidade === 'diligencia' ? '2px solid #3B82F6' : '1px solid #E2E7ED', background: acaoPenalidade === 'diligencia' ? '#EFF6FF' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <CarFront size={24} color="#2563EB" /><div><div style={{ fontWeight: '600', color: '#1E2939' }}>Solicitar Diligência</div><div style={{ fontSize: '12px', color: '#64748B' }}>Solicita visita de Oficial de Justiça à residência.</div></div>
                                            </div>
                                            <div onClick={() => setAcaoPenalidade('juizo')} style={{ padding: '16px', borderRadius: '8px', border: acaoPenalidade === 'juizo' ? '2px solid #EF4444' : '1px solid #E2E7ED', background: acaoPenalidade === 'juizo' ? '#FEF2F2' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <Gavel size={24} color="#EF4444" /><div><div style={{ fontWeight: '600', color: '#1E2939' }}>Relatar ao Juízo</div><div style={{ fontSize: '12px', color: '#64748B' }}>Envia relatório de violação para o processo judicial.</div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* === SUSPENDER / REATIVAR / PRESENCIAL === */}
                    {(modalType === 'suspender' || modalType === 'reativar' || modalType === 'presencial') && (
                        <>
                            {modalType === 'presencial' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    
                                    {/* --- ALTERAÇÃO 2: Visualização da Foto de Cadastro --- */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                                        <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #F1F5F9', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
                                            {selectedUser?.foto ? (
                                                <img src={selectedUser.foto} alt="Cadastro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                                            ) : (
                                                <Camera size={40} color="#CBD5E1" />
                                            )}
                                        </div>
                                        <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>Foto de Cadastro</span>
                                    </div>

                                    <div><label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600' }}>Método de Validação</label><div style={{ display: 'flex', gap: '10px' }}><button onClick={() => setMetodoValidacao('visual')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: metodoValidacao === 'visual' ? '2px solid #0F99A8' : '1px solid #E2E7ED', background: metodoValidacao === 'visual' ? '#ECFEFF' : 'white', fontWeight: '600', color: metodoValidacao === 'visual' ? '#0F99A8' : '#64748B', cursor: 'pointer' }}>Conferência Visual</button><button onClick={() => setMetodoValidacao('facial')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: metodoValidacao === 'facial' ? '2px solid #0F99A8' : '1px solid #E2E7ED', background: metodoValidacao === 'facial' ? '#ECFEFF' : 'white', fontWeight: '600', color: metodoValidacao === 'facial' ? '#0F99A8' : '#64748B', cursor: 'pointer' }}>Biometria Facial</button></div></div>
                                    {metodoValidacao === 'facial' && (
                                        <div style={{ textAlign: 'center', border: '1px solid #E2E7ED', borderRadius: '8px', padding: '16px', background: '#F8FAFC' }}>
                                            {!cameraAtiva && !imgSrc && <button onClick={() => setCameraAtiva(true)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}><Camera size={18} /> Abrir Câmera</button>}
                                            {cameraAtiva && <div style={{ position: 'relative' }}><Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width="100%" videoConstraints={{ facingMode: "user" }} /><button onClick={capture} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', background: '#EF4444', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}>Capturar</button></div>}
                                            {imgSrc && <div style={{ position: 'relative' }}><img src={imgSrc} alt="Capture" style={{ width: '100%', borderRadius: '8px' }} /><button onClick={() => { setImgSrc(null); setCameraAtiva(true); }} style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', padding: '8px', borderRadius: '50%', cursor: 'pointer' }}><X size={16} /></button></div>}
                                        </div>
                                    )}
                                </div>
                            )}

                            {modalType === 'suspender' && (
                                <div className="input-group"><label>Motivo da Suspensão</label><textarea className="form-control" rows="3" placeholder="Ex: Alvará de soltura, Transferência, Óbito..." value={motivoSusp} onChange={(e) => setMotivoSusp(e.target.value)}></textarea></div>
                            )}

                            {modalType === 'reativar' && (
                                <div style={{ padding: '16px', background: '#F0FDFA', borderRadius: '8px', color: '#0F766E', fontSize: '14px' }}>Confirmar a reativação fará com que o assistido volte a ser checado pelas regras vigentes.</div>
                            )}
                        </>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={closeModal}>Cancelar</button>
                    {modalType === 'analisar' && stepAnalise === 1 ? (
                        <>
                            <button className="btn-primary" style={{ background: '#10B981' }} onClick={() => handleConfirmAction('validar')}>Aceitar</button>
                            <button className="btn-primary" style={{ background: '#EF4444' }} onClick={() => setStepAnalise(2)}>Comunicar ao PJe</button>
                        </>
                    ) : (
                        <button className="btn-primary" onClick={() => handleConfirmAction()} disabled={modalType === 'suspender' && !motivoSusp}>
                            {modalType === 'analisar' ? 'Confirmar Decisão' : 'Confirmar'}
                        </button>
                    )}
                </div>
            </div>
        </div>
      )}
    </Layout>
  );
};

export default Assistidos;