import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Users, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  // Dados para o gráfico (Exemplo estático)
  const data = [
    { name: 'Seg', total: 45 }, { name: 'Ter', total: 52 },
    { name: 'Qua', total: 38 },
    { name: 'Qui', total: 65 }, { name: 'Sex', total: 48 },
    { name: 'Sáb', total: 20 }, { name: 'Dom', total: 15 },
  ];

  const handleCardClick = (tipo) => {
    switch(tipo) {
      case 'total':
        navigate('/assistidos?filtro=monitored'); 
        break;
      case 'hoje':
        navigate('/apresentacoes');
        break;
      case 'irregulares':
        navigate('/assistidos?filtro=alert');
        break;
      case 'analise':
        navigate('/assistidos?filtro=analysis');
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
         {/* 1. Total Monitorados: 7 (8 cadastros - 1 suspenso) */}
         <div onClick={() => handleCardClick('total')}>
            <KPICard title="Total Monitorados" value="07" icon={Users} />
         </div>

         {/* 2. Apresentações Hoje: 5 (Baseado na lista da tela de Apresentações) */}
         <div onClick={() => handleCardClick('hoje')}>
            <KPICard title="Apresentações Hoje" value="05" icon={CheckCircle} />
         </div>

         {/* 3. Irregulares: 1 (Ana Maria - Status Alert) */}
         <div onClick={() => handleCardClick('irregulares')}>
            <KPICard title="Irregulares" value="01" icon={AlertTriangle} />
         </div>

         {/* 4. Análises: 3 (Mariana, Marcos e Ricardo - Status Analysis) */}
         <div onClick={() => handleCardClick('analise')}>
            <KPICard title="Análises Pendentes" value="03" icon={Clock} />
         </div>
      </div>

      <div className="chart-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '400', color: '#1E2939' }}>Fluxo de Apresentações (Semanal)</h3>
            
            {/* CORREÇÃO AQUI: Substituído o quadrado pelo Ponto Pulsante */}
            <div className="live-indicator">
                <div className="status-dot"></div>
                <span style={{ fontSize: '13px', color: '#10B981', fontWeight: '600' }}>
                  Atualizado em tempo real
                </span>
            </div>
            
        </div>

        <div style={{ width: '100%', height: '300px' }}>
             {/* ... (O resto do gráfico permanece igual) */}
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