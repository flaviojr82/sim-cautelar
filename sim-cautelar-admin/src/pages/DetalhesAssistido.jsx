import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Calendar, FileText, Activity, 
  CheckCircle, AlertTriangle, PlayCircle, PauseCircle, User, CalendarClock
} from 'lucide-react';

// Mapa
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

const DetalhesAssistido = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  
  // Controle de Abas
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'historico' ? 'historico' : 'dados');

  // Dados Mockados
  const assistido = {
      nome: 'Carlos Eduardo Silva',
      cpf: '098.112.334-12',
      processo: '0004321-88.2024.8.15.2001',
      nascimento: '12/03/1990',
      mae: 'Ana Silva',
      endereco: 'Rua das Acácias, 400 - Torre, João Pessoa - PB',
      vara: '2ª Vara Criminal',
      comarca: 'João Pessoa',
      foto: 'https://ui-avatars.com/api/?name=Carlos+Silva&background=c7d2fe&color=3730a3',
      status: 'Regular',
      
      // Configuração de Mapa
      pontoMonitoramento: 'Residência do Assistido', 
      raio: 500,
      coords: [-7.1350, -34.8750],

      // --- NOVOS DADOS DE FREQUÊNCIA (Adicionados) ---
      frequenciaTipo: 'Semanal',
      frequenciaDetalhe: 'Segunda, Quarta e Sexta',
      horarioTipo: 'Janela de Tempo',
      horarioDetalhe: 'Entre 08:00 e 18:00'
  };

  // Histórico Mockado
  const historico = [
      { id: 1, data: '15/01/2026 10:00', tipo: 'presencial', titulo: 'Apresentação Presencial', desc: 'Compareceu ao fórum. Atendido por Oficial João.', icon: CheckCircle, color: '#10B981' },
      { id: 2, data: '14/01/2026 08:30', tipo: 'app', titulo: 'Apresentação via App', desc: 'Reconhecimento Facial Válido (98%). Local: Residência.', icon: Activity, color: '#0F99A8' },
      { id: 3, data: '10/01/2026 19:45', tipo: 'alerta', titulo: 'Alerta de Horário', desc: 'Tentativa de check-in fora do horário permitido.', icon: AlertTriangle, color: '#F59E0B' },
      { id: 4, data: '01/01/2026 09:00', tipo: 'inicio', titulo: 'Início do Monitoramento', desc: 'Cadastro ativado pelo sistema.', icon: PlayCircle, color: '#3B82F6' },
      { id: 5, data: '01/01/2026 08:30', tipo: 'cadastro', titulo: 'Cadastro Realizado', desc: 'Usuário Admin criou o registro.', icon: User, color: '#64748B' },
      ];

  return (
    <Layout>
        {/* Cabeçalho */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <button onClick={() => navigate('/assistidos')} className="btn-icon" style={{ background: 'white', border: '1px solid #E2E7ED' }}>
                <ArrowLeft size={20} />
            </button>
            <div>
                <h2 className="page-h1" style={{ marginBottom: '4px' }}>{assistido.nome}</h2>
                <div style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#6A7282' }}>
                    <span>CPF: {assistido.cpf}</span>
                    <span>•</span>
                    <span>Processo: {assistido.processo}</span>
                </div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
                <span className="status-badge status-active">{assistido.status}</span>
            </div>
        </div>

        {/* Abas */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E2E7ED', marginBottom: '24px' }}>
            <button 
                onClick={() => setActiveTab('dados')}
                style={{ 
                    padding: '12px 24px', 
                    borderBottom: activeTab === 'dados' ? '2px solid #0F99A8' : 'none', 
                    color: activeTab === 'dados' ? '#0F99A8' : '#64748B', 
                    fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' 
                }}
            >
                Dados e Monitoramento
            </button>
            <button 
                onClick={() => setActiveTab('historico')}
                style={{ 
                    padding: '12px 24px', 
                    borderBottom: activeTab === 'historico' ? '2px solid #0F99A8' : 'none', 
                    color: activeTab === 'historico' ? '#0F99A8' : '#64748B', 
                    fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' 
                }}
            >
                Histórico de Eventos
            </button>
        </div>

        {/* CONTEÚDO DA ABA DADOS */}
        {activeTab === 'dados' && (
            <div className="form-container">
                {/* 1. Dados Pessoais */}
                <div className="form-section-title">
                    <FileText size={20} color="#0F99A8" /> Dados Pessoais e Endereço
                </div>
                <div className="form-grid" style={{ marginBottom: '32px' }}>
                    <div className="input-group"><label>Data Nascimento</label><div className="form-control" style={{ background: '#F8FAFC', border: 'none' }}>{assistido.nascimento}</div></div>
                    <div className="input-group" style={{ gridColumn: 'span 2' }}><label>Nome da Mãe</label><div className="form-control" style={{ background: '#F8FAFC', border: 'none' }}>{assistido.mae}</div></div>
                    <div className="input-group" style={{ gridColumn: 'span 3' }}><label>Endereço Completo</label><div className="form-control" style={{ background: '#F8FAFC', border: 'none' }}>{assistido.endereco}</div></div>
                    <div className="input-group"><label>Vara</label><div className="form-control" style={{ background: '#F8FAFC', border: 'none' }}>{assistido.vara}</div></div>
                    <div className="input-group"><label>Comarca</label><div className="form-control" style={{ background: '#F8FAFC', border: 'none' }}>{assistido.comarca}</div></div>
                </div>

                {/* 2. NOVA SEÇÃO: Regras de Frequência */}
                <div className="form-section-title">
                    <CalendarClock size={20} color="#0F99A8" /> Regras de Frequência e Agendamento
                </div>
                <div className="form-grid" style={{ marginBottom: '32px' }}>
                     <div className="input-group">
                        <label>Periodicidade</label>
                        <div className="form-control" style={{ background: '#F0FDFA', border: '1px solid #CCFBF1', color: '#0F766E', fontWeight: 'bold' }}>
                            {assistido.frequenciaTipo}
                        </div>
                     </div>
                     <div className="input-group">
                        <label>Dias de Apresentação</label>
                        <div className="form-control" style={{ background: '#F8FAFC', border: 'none' }}>
                            {assistido.frequenciaDetalhe}
                        </div>
                     </div>
                     <div className="input-group">
                        <label>Horário ({assistido.horarioTipo})</label>
                        <div className="form-control" style={{ background: '#F8FAFC', border: 'none' }}>
                            {assistido.horarioDetalhe}
                        </div>
                     </div>
                </div>

                {/* 3. Mapa */}
                <div className="form-section-title">
                    <MapPin size={20} color="#0F99A8" /> Perímetro Monitorado
                </div>
                <div className="form-grid" style={{ marginBottom: '16px' }}>
                     <div className="input-group">
                        <label>Ponto de Monitoramento</label>
                        <div className="form-control" style={{ background: '#F8FAFC', border: 'none', color: '#1E2939', fontWeight: '500' }}>
                            {assistido.pontoMonitoramento}
                        </div>
                     </div>
                     <div className="input-group">
                        <label>Raio Permitido</label>
                        <div className="form-control" style={{ background: '#F8FAFC', border: 'none', color: '#1E2939', fontWeight: '500' }}>
                            {assistido.raio} metros
                        </div>
                     </div>
                </div>

                <div style={{ height: '300px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E2E7ED' }}>
                    <MapContainer center={assistido.coords} zoom={15} style={{ height: '100%', width: '100%' }} dragging={false} scrollWheelZoom={false} doubleClickZoom={false} zoomControl={false}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={assistido.coords} />
                        <Circle center={assistido.coords} radius={assistido.raio} pathOptions={{ color: '#0F99A8', fillColor: '#0F99A8', fillOpacity: 0.2 }} />
                    </MapContainer>
                </div>
            </div>
        )}

        {/* CONTEÚDO DA ABA HISTÓRICO */}
        {activeTab === 'historico' && (
            <div className="form-container">
                <div className="form-section-title">
                    <Activity size={20} color="#0F99A8" /> Linha do Tempo
                </div>
                
                <div className="timeline">
                    {historico.map((item) => (
                        <div key={item.id} className="timeline-item">
                            <div className="timeline-dot" style={{ borderColor: item.color, background: item.color }}></div>
                            <div className="timeline-date">{item.data}</div>
                            <div className="timeline-content">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontWeight: 'bold', color: '#1E2939' }}>
                                    <item.icon size={16} color={item.color} />
                                    {item.titulo}
                                </div>
                                <div style={{ fontSize: '14px', color: '#64748B' }}>
                                    {item.desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </Layout>
  );
};

export default DetalhesAssistido;