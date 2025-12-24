import React from 'react';
import Layout from '../components/Layout';
import { 
    AlertTriangle, CheckCircle, Clock, Users, 
    TrendingUp, TrendingDown, MoreHorizontal, Calendar 
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
    AreaChart, Area 
} from 'recharts';

const Dashboard = () => {
  // Dados Mockados
  const data = [
    { name: 'Seg', total: 45 },
    { name: 'Ter', total: 52 },
    { name: 'Qua', total: 38 },
    { name: 'Qui', total: 65 },
    { name: 'Sex', total: 48 },
    { name: 'Sáb', total: 20 },
    { name: 'Dom', total: 15 },
  ];

  const recentAlerts = [
    { id: 1, nome: 'João da Silva', processo: '0001234-88.2023', tipo: 'Fora do Perímetro', hora: '10:42', status: 'critical' },
    { id: 2, nome: 'Maria Oliveira', processo: '0005678-12.2023', tipo: 'Falha Biométrica', hora: '09:15', status: 'warning' },
    { id: 3, nome: 'Carlos Souza', processo: '0009988-77.2024', tipo: 'Tentativa Offline', hora: '08:30', status: 'info' },
  ];

  return (
    <Layout title="Visão Geral">
        
      {/* 1. KPIs de Alto Nível */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <KpiCard 
            title="Total Monitorados" 
            value="1.248" 
            trend="+12%" 
            icon={Users} 
            color="text-brand-secondary"
            trendUp={true}
        />
        <KpiCard 
            title="Apresentações Hoje" 
            value="142" 
            trend="+5%" 
            icon={CheckCircle} 
            color="text-brand-primary"
            trendUp={true}
        />
        <KpiCard 
            title="Irregularidades" 
            value="12" 
            trend="-2%" 
            icon={AlertTriangle} 
            color="text-brand-accent"
            trendUp={false} // Vermelho/Laranja pois é alerta
        />
        <KpiCard 
            title="Análises Pendentes" 
            value="8" 
            trend="Estável" 
            icon={Clock} 
            color="text-gray-500"
            trendUp={null}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. Gráfico Principal (Usando a cor Teal da Marca) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-gray-800 font-bold text-lg">Fluxo de Apresentações</h3>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-gray-50 text-xs font-medium text-gray-500 rounded-full border border-gray-200">Semanal</span>
                </div>
            </div>
            <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2A9D8F" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#2A9D8F" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <RechartsTooltip 
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                        />
                        <Area type="monotone" dataKey="total" stroke="#2A9D8F" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* 3. Lista de Alertas (Clean) */}
        <div className="bg-white p-0 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-50">
                <h3 className="text-gray-800 font-bold text-lg flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
                    Alertas Recentes
                </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {recentAlerts.map((alert) => (
                    <div key={alert.id} className="group p-4 rounded-lg border border-gray-100 hover:border-brand-primary/30 hover:bg-brand-primary/5 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                                ${alert.status === 'critical' ? 'bg-red-50 text-red-600' : 
                                  alert.status === 'warning' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                                {alert.tipo}
                            </span>
                            <span className="text-xs text-gray-400 font-mono">{alert.hora}</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-800">{alert.nome}</h4>
                        <p className="text-xs text-gray-500 mt-1">Proc: {alert.processo}</p>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-gray-50 bg-gray-50/50 rounded-b-xl">
                <button className="w-full text-center text-sm font-medium text-brand-primary hover:text-brand-secondary transition-colors">
                    Ver Central de Alertas
                </button>
            </div>
        </div>

      </div>
    </Layout>
  );
};

// Componente Auxiliar de Card (Para limpar o código principal)
const KpiCard = ({ title, value, trend, icon: Icon, color, trendUp }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
            </div>
            <div className={`p-2 rounded-lg bg-gray-50 ${color}`}>
                <Icon size={20} />
            </div>
        </div>
        {trendUp !== null && (
            <div className="flex items-center gap-1 mt-2">
                {trendUp ? <TrendingUp size={14} className="text-emerald-500"/> : <TrendingDown size={14} className="text-brand-accent"/>}
                <span className={`text-xs font-bold ${trendUp ? 'text-emerald-600' : 'text-brand-accent'}`}>
                    {trend}
                </span>
                <span className="text-xs text-gray-400 ml-1">vs mês anterior</span>
            </div>
        )}
    </div>
);

export default Dashboard;