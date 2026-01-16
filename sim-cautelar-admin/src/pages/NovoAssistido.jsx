import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Search, MapPin, Save, Camera, FileText, 
  CornerDownRight, ArrowLeft, Edit3, Calendar, Clock, Mail
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
  const { id } = useParams();
  const isEditMode = !!id; 

  // -- ESTADOS GERAIS --
  const [numProcessoBusca, setNumProcessoBusca] = useState('');
  const [dadosCarregados, setDadosCarregados] = useState(false);
  
  // Adicionado o campo 'email' ao estado inicial
  const [formData, setFormData] = useState({
      nome: '', cpf: '', nascimento: '', mae: '', email: '',
      cep: '', logradouro: '', numero: '', bairro: '', cidade: '',
      artigo: '', vara: '', comarca: '', processo: ''
  });

  const [originalData, setOriginalData] = useState({});
  const [justificativas, setJustificativas] = useState({});
  
  // -- MAPA --
  const [pontoMonitoramento, setPontoMonitoramento] = useState('residencia');
  const [raioPerimetro, setRaioPerimetro] = useState(500);
  const [coords, setCoords] = useState([-7.1195, -34.8450]);

  // -- AGENDAMENTO / FREQUÊNCIA --
  const [frequencia, setFrequencia] = useState('diario');
  const [tipoHorario, setTipoHorario] = useState('janela');
  
  const [horaCheckin, setHoraCheckin] = useState('08:00');
  const [janelaInicio, setJanelaInicio] = useState('08:00');
  const [janelaFim, setJanelaFim] = useState('18:00');
  const [diasSemana, setDiasSemana] = useState(['seg', 'ter', 'qua', 'qui', 'sex']);
  const [tipoMensal, setTipoMensal] = useState('dia_fixo');
  const [diaMes, setDiaMes] = useState(10);
  const [diaMesInicio, setDiaMesInicio] = useState(1);
  const [diaMesFim, setDiaMesFim] = useState(5);

  // -- BIOMETRIA --
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [cameraAtiva, setCameraAtiva] = useState(false);

  // -- CARREGAR DADOS (SIMULAÇÃO) --
  useEffect(() => {
    if (isEditMode) {
        let dadosSimulados = {};
        if (id === '1') { 
            dadosSimulados = {
                nome: 'Carlos Eduardo Silva', cpf: '098.112.334-12', nascimento: '1990-03-12', mae: 'Ana Silva', 
                email: 'carlos.silva@email.com', // Mock de email
                cep: '58000-100', logradouro: 'Rua das Acácias', numero: '400', bairro: 'Torre', cidade: 'João Pessoa - PB',
                artigo: 'Art. 157', vara: '2ª Vara Criminal', comarca: 'João Pessoa', processo: '0004321-88.2024.8.15.2001'
            };
            setCoords([-7.1350, -34.8750]);
        } else {
            dadosSimulados = {
                nome: 'Assistido Genérico', cpf: '000.000.000-00', nascimento: '2000-01-01', mae: 'Mãe Genérica',
                email: 'generico@email.com',
                cep: '58000-000', logradouro: 'Rua Exemplo', numero: '123', bairro: 'Centro', cidade: 'João Pessoa - PB',
                artigo: 'Art. 000', vara: '1ª Vara', comarca: 'João Pessoa', processo: '0000000-00.0000.0.00.0000'
            };
        }
        setFormData(dadosSimulados);
        setOriginalData(dadosSimulados);
        setNumProcessoBusca(dadosSimulados.processo);
        setDadosCarregados(true);
    }
  }, [id, isEditMode]);

  const buscarPJe = () => {
    if (!numProcessoBusca) return alert("Digite um número de processo.");
    const dadosPJe = {
        nome: 'José da Silva Moura', cpf: '111.222.333-44', nascimento: '1985-05-20', mae: 'Maria da Silva Moura',
        email: 'jose.moura@email.com',
        cep: '58000-000', logradouro: 'Av. Epitácio Pessoa', numero: '1000', bairro: 'Estados', cidade: 'João Pessoa - PB',
        artigo: 'Art. 157 - Roubo Majorado', vara: '1ª Vara Criminal', comarca: 'João Pessoa', processo: numProcessoBusca
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

  const toggleDiaSemana = (dia) => {
      if (diasSemana.includes(dia)) setDiasSemana(diasSemana.filter(d => d !== dia));
      else setDiasSemana([...diasSemana, dia]);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setCameraAtiva(false);
  }, [webcamRef]);

  const salvar = (tipo) => {
      if (!isEditMode && tipo === 'final' && !imgSrc) return alert("É obrigatório capturar a foto para finalizar o cadastro inicial.");
      
      const msg = isEditMode 
        ? "Alterações salvas com sucesso! (Dados atualizados)" 
        : (tipo === 'draft' ? "Rascunho salvo com sucesso!" : "Cadastro finalizado e pronto para monitoramento!");
      
      alert(msg);
      navigate('/assistidos');
  };

  return (
    <Layout>
      <div className="page-title-group">
         <div className="title-pill"></div>
         <h2 className="page-h1">{isEditMode ? 'Editar Cadastro' : 'Cadastrar Assistido'}</h2>
      </div>

      <div className="form-container">
        
        {!isEditMode && (
            <div style={{ background: '#F0F9FF', padding: '24px', borderRadius: '12px', marginBottom: '32px', border: '1px solid #BAE6FD' }}>
                <div className="form-section-title" style={{ marginBottom: '16px', color: '#0369A1', border: 'none' }}>
                    <Search size={20} /> Importar Dados do PJe
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                    <div className="input-group" style={{ flex: 1 }}>
                        <label>Número do Processo (CNJ)</label>
                        <input type="text" className="form-control" placeholder="0000000-00.0000.8.15.0000" value={numProcessoBusca} onChange={(e) => setNumProcessoBusca(e.target.value)} disabled={dadosCarregados} />
                    </div>
                    <button className="btn-primary" onClick={buscarPJe} disabled={dadosCarregados} style={{ height: '48px', opacity: dadosCarregados ? 0.6 : 1 }}>
                        <Search size={18} /> Buscar no PJe
                    </button>
                    {dadosCarregados && <button className="btn-secondary" onClick={() => { setDadosCarregados(false); setFormData({}); setNumProcessoBusca(''); }}>Limpar</button>}
                </div>
            </div>
        )}

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
                <div className="form-section-title"><FileText size={20} color="#0F99A8" /> Dados do Assistido {isEditMode ? '(Edição)' : '(PJe)'}</div>
                <div className="form-grid">
                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>Nome Completo</label>
                        <input name="nome" value={formData.nome} onChange={handleChange} type="text" className="form-control" />
                        {formData.nome !== originalData.nome && <div style={{ marginTop: '4px', padding: '8px', background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '6px' }}><label style={{ fontSize: '11px', color: '#B45309' }}>Justificativa:</label><input type="text" className="form-control" style={{ marginTop: '2px', height: '32px', fontSize: '12px', border: '1px solid #F59E0B' }} onChange={(e) => handleJustificativa('nome', e.target.value)} /></div>}
                    </div>
                    
                    <div className="input-group">
                        <label>CPF <span style={{fontSize:'10px', color:'#EF4444'}}>(Bloqueado)</span></label>
                        <input value={formData.cpf} disabled type="text" className="form-control" style={{ background: '#E2E7ED', color: '#64748B' }} />
                    </div>
                    
                    <div className="input-group">
                        <label>Data de Nascimento</label>
                        <input name="nascimento" value={formData.nascimento} onChange={handleChange} type="date" className="form-control" />
                    </div>

                    {/* Novo Campo de E-mail */}
                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>E-mail para Contato</label>
                        <input name="email" value={formData.email} onChange={handleChange} type="email" className="form-control" placeholder="exemplo@email.com" />
                    </div>
                    
                    {/* Nome da Mãe agora ocupa a linha inteira (span 3) */}
                    <div className="input-group" style={{ gridColumn: 'span 3' }}>
                        <label>Nome da Mãe</label>
                        <input name="mae" value={formData.mae} onChange={handleChange} type="text" className="form-control" />
                        {formData.mae !== originalData.mae && <div style={{ marginTop: '4px', padding: '8px', background: '#FFFBEB', border: '1px solid #FCD34D', borderRadius: '6px' }}><label style={{ fontSize: '11px', color: '#B45309' }}>Justificativa:</label><input type="text" className="form-control" style={{ marginTop: '2px', height: '32px', fontSize: '12px', border: '1px solid #F59E0B' }} onChange={(e) => handleJustificativa('mae', e.target.value)} /></div>}
                    </div>

                    <div className="input-group"><label>CEP</label><input name="cep" value={formData.cep} onChange={handleChange} type="text" className="form-control" /></div>
                    <div className="input-group" style={{ gridColumn: 'span 2' }}><label>Logradouro e Número</label><div style={{ display: 'flex', gap: '8px' }}><input name="logradouro" value={formData.logradouro} onChange={handleChange} type="text" className="form-control" style={{ flex: 3 }} /><input name="numero" value={formData.numero} onChange={handleChange} type="text" className="form-control" style={{ flex: 1 }} /></div></div>
                    <div className="input-group"><label>Bairro</label><input name="bairro" value={formData.bairro} onChange={handleChange} type="text" className="form-control" /></div>
                    <div className="input-group" style={{ gridColumn: 'span 2' }}><label>Cidade / UF</label><input name="cidade" value={formData.cidade} onChange={handleChange} type="text" className="form-control" /></div>
                    
                    <div className="input-group" style={{ gridColumn: 'span 3', marginTop: '16px', padding: '16px', background: '#F8FAFC', border: '1px solid #E2E7ED', borderRadius: '8px' }}>
                        <label style={{ marginBottom: '8px', display: 'block' }}>Origem Processual</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div><span style={{ fontSize: '12px', color: '#6A7282' }}>Vara</span><div style={{ fontWeight: 'bold', color: '#1E2939' }}>{formData.vara}</div></div>
                            <div><span style={{ fontSize: '12px', color: '#6A7282' }}>Comarca</span><div style={{ fontWeight: 'bold', color: '#1E2939' }}>{formData.comarca}</div></div>
                        </div>
                    </div>
                </div>

                {/* 2. MAPA */}
                <div className="form-section-title"><MapPin size={20} color="#0F99A8" /> Configuração de Perímetro</div>
                <div className="form-grid">
                    <div className="input-group"><label>Ponto de Monitoramento</label><select className="form-control" value={pontoMonitoramento} onChange={(e) => { setPontoMonitoramento(e.target.value); if(e.target.value === 'forum') setCoords([-7.1150, -34.8630]); else setCoords([-7.1215, -34.8650]); }}><option value="residencia">Residência do Assistido</option><option value="forum">Fórum Criminal / Vara</option></select></div>
                    <div className="input-group"><label>Raio Permitido</label><select className="form-control" value={raioPerimetro} onChange={(e) => setRaioPerimetro(Number(e.target.value))}><option value={0}>Exatamente no local (0m)</option><option value={100}>100 metros</option><option value={500}>500 metros</option><option value={1000}>1 Km</option></select></div>
                    <div className="input-group"><label>Endereço de Referência</label><input type="text" className="form-control" value={pontoMonitoramento === 'residencia' ? `${formData.logradouro}, ${formData.numero}` : 'Fórum Criminal'} disabled /></div>
                </div>
                <div style={{ height: '300px', width: '100%', borderRadius: '12px', overflow: 'hidden', marginBottom: '32px', border: '1px solid #E2E7ED' }}>
                    <MapContainer center={coords} zoom={15} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
                        <RecenterMap coords={coords} />
                        <Marker position={coords} />
                        <Circle center={coords} radius={raioPerimetro} pathOptions={{ color: '#0F99A8', fillColor: '#0F99A8', fillOpacity: 0.2 }} />
                    </MapContainer>
                </div>

                {/* 3. REGRAS DE FREQUÊNCIA */}
                <div className="form-section-title"><Calendar size={20} color="#0F99A8" /> Regras de Frequência e Agendamento</div>
                <div className="form-container" style={{ padding: '24px', background: '#F8FAFC', border: '1px solid #E2E7ED', borderRadius: '12px', marginBottom: '32px' }}>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid #E2E7ED', paddingBottom: '16px' }}>
                        <button onClick={() => setFrequencia('diario')} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: frequencia === 'diario' ? '#0F99A8' : 'white', color: frequencia === 'diario' ? 'white' : '#64748B', cursor: 'pointer', fontWeight: '600' }}>Diário</button>
                        <button onClick={() => setFrequencia('semanal')} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: frequencia === 'semanal' ? '#0F99A8' : 'white', color: frequencia === 'semanal' ? 'white' : '#64748B', cursor: 'pointer', fontWeight: '600' }}>Semanal</button>
                        <button onClick={() => setFrequencia('mensal')} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: frequencia === 'mensal' ? '#0F99A8' : 'white', color: frequencia === 'mensal' ? 'white' : '#64748B', cursor: 'pointer', fontWeight: '600' }}>Mensal</button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#1E2939' }}>{frequencia === 'diario' && 'Todos os dias'}{frequencia === 'semanal' && 'Dias da Semana'}{frequencia === 'mensal' && 'Dia ou Período do Mês'}</label>
                            {frequencia === 'diario' && <div style={{ fontSize: '14px', color: '#64748B' }}>O assistido deverá realizar o check-in diariamente.</div>}
                            {frequencia === 'semanal' && (<div style={{ display: 'flex', gap: '8px' }}>{['dom','seg','ter','qua','qui','sex','sab'].map(d => (<button key={d} onClick={() => toggleDiaSemana(d)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E2E7ED', background: diasSemana.includes(d) ? '#0F99A8' : 'white', color: diasSemana.includes(d) ? 'white' : '#64748B', cursor: 'pointer', textTransform: 'uppercase', fontSize: '12px', fontWeight: 'bold' }}>{d.charAt(0)}</button>))}</div>)}
                            {frequencia === 'mensal' && (<div><div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}><label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}><input type="radio" checked={tipoMensal === 'dia_fixo'} onChange={() => setTipoMensal('dia_fixo')} /> Dia Fixo</label><label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}><input type="radio" checked={tipoMensal === 'periodo'} onChange={() => setTipoMensal('periodo')} /> Período</label></div>{tipoMensal === 'dia_fixo' ? (<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Todo dia <input type="number" min="1" max="31" value={diaMes} onChange={(e) => setDiaMes(e.target.value)} className="form-control" style={{ width: '70px' }} /></div>) : (<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Entre dia <input type="number" min="1" max="31" value={diaMesInicio} onChange={(e) => setDiaMesInicio(e.target.value)} className="form-control" style={{ width: '60px' }} /> e <input type="number" min="1" max="31" value={diaMesFim} onChange={(e) => setDiaMesFim(e.target.value)} className="form-control" style={{ width: '60px' }} /></div>)}</div>)}
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '12px', fontWeight: '600', color: '#1E2939' }}>Horário do Check-in</label>
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}><label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}><input type="radio" checked={tipoHorario === 'fixo'} onChange={() => setTipoHorario('fixo')} /> Hora Fixa</label><label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}><input type="radio" checked={tipoHorario === 'janela'} onChange={() => setTipoHorario('janela')} /> Janela de Tempo</label></div>
                            {tipoHorario === 'fixo' ? (<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16} color="#64748B" /><input type="time" value={horaCheckin} onChange={(e) => setHoraCheckin(e.target.value)} className="form-control" style={{ width: '120px' }} /><span style={{ fontSize: '12px', color: '#64748B' }}>(Tol. 15 min)</span></div>) : (<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span>De</span><input type="time" value={janelaInicio} onChange={(e) => setJanelaInicio(e.target.value)} className="form-control" style={{ width: '100px' }} /><span>até</span><input type="time" value={janelaFim} onChange={(e) => setJanelaFim(e.target.value)} className="form-control" style={{ width: '100px' }} /></div>)}
                        </div>
                    </div>
                </div>

                {/* 4. BIOMETRIA */}
                <div className="form-section-title"><Camera size={20} color="#0F99A8" /> {isEditMode ? 'Atualizar Biometria (Opcional)' : 'Coleta Biométrica (Obrigatória)'}</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E7ED' }}>
                    {!imgSrc ? (
                        <>
                            {cameraAtiva ? <div style={{ width: '320px', height: '240px', background: 'black', borderRadius: '8px', overflow: 'hidden' }}><Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={240} videoConstraints={{ facingMode: "user" }} /></div> : <div style={{ width: '320px', height: '240px', background: '#E2E7ED', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#6A7282' }}><Camera size={48} style={{ opacity: 0.5 }} /><span>Câmera desligada</span></div>}
                            <div style={{ display: 'flex', gap: '16px' }}>{!cameraAtiva ? <button className="btn-primary" onClick={() => setCameraAtiva(true)}>Ligar Câmera</button> : <button className="btn-primary" onClick={capture}>Capturar Foto</button>}</div>
                        </>
                    ) : (
                        <div style={{ textAlign: 'center' }}><img src={imgSrc} alt="Biometria" style={{ width: '320px', borderRadius: '8px', border: '2px solid #10B981' }} /><div style={{ marginTop: '16px' }}><button className="btn-secondary" onClick={() => setImgSrc(null)}><ArrowLeft size={16} /> Refazer Foto</button></div></div>
                    )}
                </div>

                <div className="form-actions">
                    <button className="btn-secondary" onClick={() => navigate('/assistidos')}>Cancelar</button>
                    {!isEditMode && <button className="btn-secondary" onClick={() => salvar('draft')}><CornerDownRight size={18} /> Salvar Rascunho</button>}
                    <button className="btn-primary" onClick={() => salvar('final')}><Save size={18} /> {isEditMode ? 'Salvar Alterações' : 'Finalizar Cadastro'}</button>
                </div>
            </>
        )}
      </div>
    </Layout>
  );
};

export default NovoAssistido;