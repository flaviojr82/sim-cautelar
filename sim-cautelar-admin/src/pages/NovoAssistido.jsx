import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate, useParams } from 'react-router-dom'; // useParams adicionado
import { 
  Search, MapPin, Save, Camera, FileText, 
  CornerDownRight, ArrowLeft, Edit3 
} from 'lucide-react';

// --- MAPA ---
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Webcam from 'react-webcam';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const RecenterMap = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(coords, map.getZoom());
    }, [coords, map]);
    return null;
};

const NovoAssistido = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL se existir
  const isEditMode = !!id; // Verdadeiro se estiver editando

  // -- ESTADOS --
  const [numProcessoBusca, setNumProcessoBusca] = useState('');
  const [dadosCarregados, setDadosCarregados] = useState(false);
  
  const [formData, setFormData] = useState({
      nome: '', cpf: '', nascimento: '', mae: '',
      cep: '', logradouro: '', numero: '', bairro: '', cidade: '',
      artigo: '', vara: '', comarca: '', processo: ''
  });

  const [originalData, setOriginalData] = useState({});
  const [justificativas, setJustificativas] = useState({});
  
  // Configuração Monitoramento
  const [pontoMonitoramento, setPontoMonitoramento] = useState('residencia');
  const [raioPerimetro, setRaioPerimetro] = useState(500);
  const [coords, setCoords] = useState([-7.1195, -34.8450]);

  // Câmera
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [cameraAtiva, setCameraAtiva] = useState(false);

  // -- EFEITO: CARREGAR DADOS SE FOR EDIÇÃO --
  useEffect(() => {
    if (isEditMode) {
        // SIMULAÇÃO: Buscar dados do backend pelo ID
        // Aqui mapeamos alguns IDs da lista anterior para exibir dados reais
        let dadosSimulados = {};

        if (id === '1') { // Carlos Eduardo
            dadosSimulados = {
                nome: 'Carlos Eduardo Silva', cpf: '098.112.334-12', nascimento: '1990-03-12', mae: 'Ana Silva',
                cep: '58000-100', logradouro: 'Rua das Acácias', numero: '400', bairro: 'Torre', cidade: 'João Pessoa - PB',
                artigo: 'Art. 157', vara: '2ª Vara Criminal', comarca: 'João Pessoa', processo: '0004321-88.2024.8.15.2001'
            };
            setImgSrc('https://ui-avatars.com/api/?name=Carlos+Silva&background=c7d2fe&color=3730a3'); // Foto existente
            setCoords([-7.1350, -34.8750]);
        } else if (id === '99') { // José (Rascunho)
             dadosSimulados = {
                nome: 'José da Silva Moura', cpf: '111.222.333-44', nascimento: '1985-05-20', mae: 'Maria da Silva Moura',
                cep: '58000-000', logradouro: 'Av. Epitácio Pessoa', numero: '1000', bairro: 'Estados', cidade: 'João Pessoa - PB',
                artigo: 'Art. 157', vara: '1ª Vara Criminal', comarca: 'João Pessoa', processo: '0012345-88.2025.8.15.2001'
            };
            setCoords([-7.1215, -34.8650]);
            // Sem foto (pois é rascunho)
        } else {
            // Genérico para outros IDs
            dadosSimulados = {
                nome: 'Assistido Genérico', cpf: '000.000.000-00', nascimento: '2000-01-01', mae: 'Mãe Genérica',
                cep: '58000-000', logradouro: 'Rua Exemplo', numero: '123', bairro: 'Centro', cidade: 'João Pessoa - PB',
                artigo: 'Art. 000', vara: '1ª Vara', comarca: 'João Pessoa', processo: '0000000-00.0000.0.00.0000'
            };
        }

        setFormData(dadosSimulados);
        setOriginalData(dadosSimulados); // Salva o estado inicial da edição
        setNumProcessoBusca(dadosSimulados.processo);
        setDadosCarregados(true);
    }
  }, [id, isEditMode]);


  // -- FUNÇÕES --
  const buscarPJe = () => {
    if (!numProcessoBusca) return alert("Digite um número de processo.");
    const dadosPJe = {
        nome: 'José da Silva Moura',
        cpf: '111.222.333-44',
        nascimento: '1985-05-20',
        mae: 'Maria da Silva Moura',
        cep: '58000-000',
        logradouro: 'Av. Epitácio Pessoa',
        numero: '1000',
        bairro: 'Estados',
        cidade: 'João Pessoa - PB',
        artigo: 'Art. 157 - Roubo Majorado',
        vara: '1ª Vara Criminal',
        comarca: 'João Pessoa',
        processo: numProcessoBusca // Usa o digitado
    };
    setFormData(dadosPJe);
    setOriginalData(dadosPJe);
    setDadosCarregados(true);
    setCoords([-7.1215, -34.8650]);
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleJustificativa = (campo, valor) => {
      setJustificativas(prev => ({ ...prev, [campo]: valor }));
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setCameraAtiva(false);
  }, [webcamRef]);

  const salvar = (tipo) => {
      if (!imgSrc && tipo === 'final') return alert("É obrigatório ter uma foto (capturada ou carregada) para finalizar.");
      
      const msg = isEditMode 
        ? "Alterações salvas com sucesso! Justificativas registradas." 
        : (tipo === 'draft' ? "Rascunho salvo com sucesso!" : "Cadastro finalizado e pronto para monitoramento!");
      
      alert(msg);
      navigate('/assistidos');
  };

  return (
    <Layout>
      <div className="page-title-group">
         <div className="title-pill"></div>
         {/* Título Dinâmico */}
         <h2 className="page-h1">{isEditMode ? 'Editar Cadastro' : 'Cadastrar Assistido'}</h2>
      </div>

      <div className="form-container">
        
        {/* BUSCA PROCESSUAL (Só exibe se NÃO for edição) */}
        {!isEditMode && (
            <div style={{ background: '#F0F9FF', padding: '24px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #BAE6FD' }}>
                <div className="form-section-title" style={{ marginBottom: '16px', color: '#0369A1', border: 'none' }}>
                    <Search size={20} />
                    Importar Dados do PJe
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                    <div className="input-group" style={{ flex: 1 }}>
                        <label>Número do Processo (CNJ)</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="0000000-00.0000.8.15.0000"
                            value={numProcessoBusca}
                            onChange={(e) => setNumProcessoBusca(e.target.value)}
                            disabled={dadosCarregados} 
                        />
                    </div>
                    <button 
                        className="btn-primary" 
                        onClick={buscarPJe} 
                        disabled={dadosCarregados}
                        style={{ height: '48px', opacity: dadosCarregados ? 0.6 : 1 }}
                    >
                        <Search size={18} />
                        Buscar no PJe
                    </button>
                    {dadosCarregados && (
                        <button 
                            className="btn-secondary"
                            onClick={() => { setDadosCarregados(false); setFormData({}); setNumProcessoBusca(''); }}
                        >
                            Limpar
                        </button>
                    )}
                </div>
            </div>
        )}

        {/* SE FOR EDIÇÃO, mostramos o nº do processo como Info fixa */}
        {isEditMode && (
            <div style={{ marginBottom: '24px', padding: '16px', background: '#F8FAFC', border: '1px solid #E2E7ED', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={20} color="#64748B" />
                <span style={{ fontWeight: '600', color: '#1E2939' }}>Processo Vinculado:</span>
                <span style={{ fontFamily: 'monospace', color: '#6A7282' }}>{formData.processo || 'Carregando...'}</span>
            </div>
        )}

        {(dadosCarregados || isEditMode) && (
            <>
                {/* 1. DADOS PESSOAIS */}
                <div className="form-section-title">
                    <FileText size={20} color="#0F99A8" />
                    Dados do Assistido {isEditMode ? '(Edição)' : '(PJe)'}
                </div>

                <div className="form-grid">
                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>Nome Completo</label>
                        <input name="nome" value={formData.nome} onChange={handleChange} type="text" className="form-control" />
                        {formData.nome !== originalData.nome && (
                            <div style={{ marginTop: '4px', padding: '8px', background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '6px' }}>
                                <label style={{ fontSize: '11px', color: '#B45309' }}>Justificativa Obrigatória:</label>
                                <input 
                                    type="text" placeholder="Por que o nome foi alterado?" className="form-control" 
                                    style={{ marginTop: '2px', height: '32px', fontSize: '12px', border: '1px solid #F59E0B' }}
                                    onChange={(e) => handleJustificativa('nome', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                    
                    <div className="input-group">
                        <label>CPF <span style={{fontSize:'10px', color:'#EF4444'}}>(Bloqueado)</span></label>
                        <input value={formData.cpf} disabled type="text" className="form-control" style={{ background: '#E2E7ED', color: '#64748B' }} />
                    </div>

                    <div className="input-group">
                        <label>Data de Nascimento</label>
                        <input name="nascimento" value={formData.nascimento} onChange={handleChange} type="date" className="form-control" />
                    </div>
                    
                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>Nome da Mãe</label>
                        <input name="mae" value={formData.mae} onChange={handleChange} type="text" className="form-control" />
                        {formData.mae !== originalData.mae && (
                            <div style={{ marginTop: '4px', padding: '8px', background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '6px' }}>
                                <label style={{ fontSize: '11px', color: '#B45309' }}>Justificativa Obrigatória:</label>
                                <input 
                                    type="text" placeholder="Motivo da alteração..." className="form-control" 
                                    style={{ marginTop: '2px', height: '32px', fontSize: '12px', border: '1px solid #F59E0B' }}
                                    onChange={(e) => handleJustificativa('mae', e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Endereço */}
                    <div className="input-group">
                        <label>CEP</label>
                        <input name="cep" value={formData.cep} onChange={handleChange} type="text" className="form-control" />
                    </div>
                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>Logradouro e Número</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input name="logradouro" value={formData.logradouro} onChange={handleChange} type="text" className="form-control" style={{ flex: 3 }} />
                            <input name="numero" value={formData.numero} onChange={handleChange} type="text" className="form-control" style={{ flex: 1 }} />
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Bairro</label>
                        <input name="bairro" value={formData.bairro} onChange={handleChange} type="text" className="form-control" />
                    </div>
                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>Cidade / UF</label>
                        <input name="cidade" value={formData.cidade} onChange={handleChange} type="text" className="form-control" />
                    </div>

                    <div className="input-group" style={{ gridColumn: 'span 3', marginTop: '16px', padding: '16px', background: '#F8FAFC', border: '1px solid #E2E7ED', borderRadius: '8px' }}>
                        <label style={{ marginBottom: '8px', display: 'block' }}>Origem Processual</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <span style={{ fontSize: '12px', color: '#6A7282' }}>Vara</span>
                                <div style={{ fontWeight: 'bold', color: '#1E2939' }}>{formData.vara}</div>
                            </div>
                            <div>
                                <span style={{ fontSize: '12px', color: '#6A7282' }}>Comarca</span>
                                <div style={{ fontWeight: 'bold', color: '#1E2939' }}>{formData.comarca}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. MAPA */}
                <div className="form-section-title">
                    <MapPin size={20} color="#0F99A8" />
                    Configuração de Perímetro
                </div>

                <div className="form-grid">
                    <div className="input-group">
                        <label>Ponto de Monitoramento</label>
                        <select 
                            className="form-control" value={pontoMonitoramento} 
                            onChange={(e) => {
                                setPontoMonitoramento(e.target.value);
                                if(e.target.value === 'forum') setCoords([-7.1150, -34.8630]); 
                                else setCoords([-7.1215, -34.8650]); 
                            }}
                        >
                            <option value="residencia">Residência do Assistido</option>
                            <option value="forum">Fórum Criminal / Vara</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Raio Permitido</label>
                        <select className="form-control" value={raioPerimetro} onChange={(e) => setRaioPerimetro(Number(e.target.value))}>
                            <option value={0}>Exatamente no local (0m)</option>
                            <option value={100}>100 metros</option>
                            <option value={500}>500 metros</option>
                            <option value={1000}>1 Km</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Endereço de Referência</label>
                        <input type="text" className="form-control" value={pontoMonitoramento === 'residencia' ? `${formData.logradouro}, ${formData.numero}` : 'Fórum Criminal'} disabled />
                    </div>
                </div>

                <div style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden', marginBottom: '32px', border: '1px solid #E2E7ED' }}>
                    <MapContainer center={coords} zoom={15} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                        <RecenterMap coords={coords} />
                        <Marker position={coords} />
                        <Circle center={coords} radius={raioPerimetro} pathOptions={{ color: '#0F99A8', fillColor: '#0F99A8', fillOpacity: 0.2 }} />
                    </MapContainer>
                </div>

                {/* 3. BIOMETRIA */}
                <div className="form-section-title">
                    <Camera size={20} color="#0F99A8" />
                    {isEditMode ? 'Atualizar Biometria (Opcional)' : 'Coleta Biométrica (Obrigatória)'}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E7ED' }}>
                    
                    {!imgSrc ? (
                        <>
                            {cameraAtiva ? (
                                <div style={{ position: 'relative', width: '320px', height: '240px', background: 'black', borderRadius: '8px', overflow: 'hidden' }}>
                                    <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={240} videoConstraints={{ facingMode: "user" }} />
                                </div>
                            ) : (
                                <div style={{ width: '320px', height: '240px', background: '#E2E7ED', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#6A7282' }}>
                                    <Camera size={48} style={{ marginBottom: '8px', opacity: 0.5 }} />
                                    <span>Câmera desligada</span>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '16px' }}>
                                {!cameraAtiva ? (
                                    <button className="btn-primary" onClick={() => setCameraAtiva(true)}>Ligar Câmera</button>
                                ) : (
                                    <button className="btn-primary" onClick={capture}>Capturar Foto</button>
                                )}
                            </div>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <img src={imgSrc} alt="Biometria" style={{ width: '320px', borderRadius: '8px', border: '2px solid #10B981' }} />
                            <div style={{ marginTop: '16px' }}>
                                <button className="btn-secondary" onClick={() => setImgSrc(null)}>
                                    <ArrowLeft size={16} /> Refazer Foto
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div className="form-actions">
                    <button className="btn-secondary" onClick={() => navigate('/assistidos')}>Cancelar</button>
                    {!isEditMode && (
                        <button className="btn-secondary" onClick={() => salvar('draft')}>
                            <CornerDownRight size={18} /> Salvar Rascunho
                        </button>
                    )}
                    <button className="btn-primary" onClick={() => salvar('final')}>
                        <Save size={18} /> {isEditMode ? 'Salvar Alterações' : 'Finalizar Cadastro'}
                    </button>
                </div>
            </>
        )}
      </div>
    </Layout>
  );
};

export default NovoAssistido;