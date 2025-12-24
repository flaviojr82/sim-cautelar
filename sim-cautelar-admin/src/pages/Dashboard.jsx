import React from 'react';
import Layout from '../components/Layout';
import { 
    AlertTriangle, CheckCircle, Clock, Users, 
    TrendingUp, TrendingDown, MoreHorizontal 
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
    AreaChart, Area 
} from 'recharts';

const Dashboard = () => {
  // Dados Mockados
  const data = [
    { name: 'Seg', total: 45 }, { name: 'Ter', total: 52 },
    { name: 'Qua', total: 38 }, { name: 'Qui', total: 65 },
    { name: 'Sex', total: 48 }, { name: 'Sáb', total: 20 },
    { name: 'Dom', total: 15 },
  ];

  const recentAlerts = [
    { id: 1, nome: 'João da Silva', processo: '0001234-88.2023', tipo: 'Fora do Perímetro', hora: '10:42', status: 'critical' },
    { id: 2, nome: 'Maria Oliveira', processo: '0005678-12.2023', tipo: 'Falha Biométrica', hora: '09:15', status: 'warning' },
    { id: 3, nome: 'Carlos Souza', processo: '0009988-77.2024', tipo: 'Tentativa Offline', hora: '08:30', status: 'info' },
  ];

  return (
    <Layout title="Visão Geral">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
         <KpiCard title="Total Monitorados" value="1.248" trend="+12%" icon={Users} color="text-brand-secondary" />
         <KpiCard title="Apresentações Hoje" value="142" trend="+5%" icon={CheckCircle} color="text-brand-primary" />
         <KpiCard title="Irregularidades" value="12" trend="-2%" icon={AlertTriangle} color="text-brand-accent" isAlert />
         <KpiCard title="Análises Pendentes" value="8" trend="Estável" icon={Clock} color="text-slate-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico Principal */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
            <h3 className="text-slate-800 font-bold text-sm uppercase tracking-wider mb-6">Fluxo de Apresentações</h3>
            {/* ALTURA FIXA PARA O GRÁFICO NÃO QUEBRAR */}
            <div className="h-72 w-full">
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
                        <RechartsTooltip />
                        <Area type="monotone" dataKey="total" stroke="#2A9D8F" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Alertas Recentes */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
            <div className="p-6 border-b border-slate-50">
                <h3 className="text-slate-800 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                    Alertas Recentes
                    <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse"></span>
                </h3>
            </div>
            <div className="flex-1 overflow-auto p-2">
                {recentAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 mb-2 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                        <div className="flex justify-between items-start mb-1">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                                ${alert.status === 'critical' ? 'bg-red-50 text-red-600' : 
                                  alert.status === 'warning' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                                {alert.tipo}
                            </span>
                            <span className="text-xs text-slate-400">{alert.hora}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-700">{alert.nome}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </Layout>
  );
};

const KpiCard = ({ title, value, trend, icon: Icon, color, isAlert }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs font-semibold text-slate-400 uppercase">{title}</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
            </div>
            <div className={`p-2 rounded-lg bg-slate-50 ${color}`}>
                <Icon size={20} />
            </div>
        </div>
        <div className="mt-2 flex items-center gap-1">
            {isAlert ? <TrendingDown size={14} className="text-red-500"/> : <TrendingUp size={14} className="text-emerald-500"/>}
            <span className={`text-xs font-bold ${isAlert ? 'text-red-500' : 'text-emerald-500'}`}>{trend}</span>
            <span className="text-xs text-slate-400 ml-1">vs mês anterior</span>
        </div>
    </div>
);

export default Dashboard;