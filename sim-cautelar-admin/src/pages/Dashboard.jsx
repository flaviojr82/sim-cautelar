import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import Layout from '../components/Layout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Users, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate(); // Hook de navegação

  const data = [
    { name: 'Seg', total: 45 }, { name: 'Ter', total: 52 },
    { name: 'Qua', total: 38 },
    { name: 'Qui', total: 65 }, { name: 'Sex', total: 48 },
    { name: 'Sáb', total: 20 }, { name: 'Dom', total: 15 },
  ];

  // Função de navegação centralizada
  const handleCardClick = (tipo) => {
    switch(tipo) {
      case 'total':
        navigate('/assistidos'); // Mostra todos
        break;
      case 'hoje':
        navigate('/apresentacoes'); // Nova tela
        break;
      case 'irregulares':
        navigate('/assistidos?filtro=alert'); // Filtra por status 'alert'
        break;
      case 'analise':
        navigate('/assistidos?filtro=analysis'); // Filtra por status 'analysis'
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="page-title-group">
         <div className="title-pill"></div>
         <h2 className="page-h1">Início</h2>
      </div>

      <div className="kpi-grid">
         {/* Adicionado onClick em cada card */}
         <div onClick={() => handleCardClick('total')}>
            <KPICard title="Total Monitorados" value="1.248" icon={Users} />
         </div>
         <div onClick={() => handleCardClick('hoje')}>
            <KPICard title="Apresentações Hoje" value="142" icon={CheckCircle} />
         </div>
         <div onClick={() => handleCardClick('irregulares')}>
            <KPICard title="Irregulares" value="12" icon={AlertTriangle} />
         </div>
         <div onClick={() => handleCardClick('analise')}>
            <KPICard title="Análises Pendentes" value="08" icon={Clock} />
         </div>
      </div>

      {/* ... (Gráfico permanece igual) ... */}
      <div className="chart-container">
        {/* ... código do gráfico ... */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '400', color: '#1E2939' }}>Dashboard</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '16px', border: '1px solid #6A7282', borderRadius: '2px' }}></div>
                <span style={{ fontSize: '14px', color: '#6A7282' }}>Atualizado em tempo real</span>
            </div>
        </div>

        <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#42969F" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#42969F" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E7ED" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="total" stroke="#42969F" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
};

const KPICard = ({ title, value, icon: Icon }) => {
    return (
        <div className="kpi-card">
            <div className="kpi-header">
                <div className="icon-box">
                    <Icon size={18} color="white" />
                </div>
                <div className="label-pill">{title}</div>
            </div>
            <div className="kpi-value">{value}</div>
            <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', opacity: 0.1, pointerEvents: 'none' }}>
                <Icon size={140} color="white" />
            </div>
        </div>
    );
};

export default Dashboard;