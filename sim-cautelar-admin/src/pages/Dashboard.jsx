import React from 'react';
import Layout from '../components/Layout';
import { 
    AlertTriangle, CheckCircle, Clock, MapPin, 
    TrendingUp, TrendingDown, MoreVertical, Filter 
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend 
} from 'recharts';

const Dashboard = () => {
  // --- DADOS PARA OS GRÁFICOS ---
  const dataAttendance = [
    { name: 'Seg', comparecimentos: 45, faltas: 2 },
    { name: 'Ter', comparecimentos: 52, faltas: 5 },
    { name: 'Qua', comparecimentos: 38, faltas: 1 },
    { name: 'Qui', comparecimentos: 65, faltas: 4 },
    { name: 'Sex', comparecimentos: 48, faltas: 3 },
    { name: 'Sáb', comparecimentos: 20, faltas: 8 },
    { name: 'Dom', comparecimentos: 15, faltas: 10 },
  ];

  const dataStatus = [
    { name: 'Em dia', value: 850, color: '#2A9D8F' }, // Teal
    { name: 'Atrasados', value: 120, color: '#E9C46A' }, // Yellow
    { name: 'Irregulares', value: 45, color: '#E76F51' }, // Orange/Red
  ];

  // --- DADOS DOS CARDS (KPIs) ---
  const kpis = [
    { 
        label: 'Total de Assistidos', 
        value: '1.248', 
        trend: '+12%', 
        trendUp: true, 
        icon: UsersIcon, 
        color: 'text-blue-600', 
        bg: 'bg-blue-50' 
    },
    { 
        label: 'Apresentações Hoje', 
        value: '142', 
        trend: '+5%', 
        trendUp: true, 
        icon: CheckCircle, 
        color: 'text-teal-600', 
        bg: 'bg-teal-50' 
    },
    { 
        label: 'Taxa de Inadimplência', 
        value: '3.4%', 
        trend: '-0.5%', 
        trendUp: false, // Negativo é bom neste caso, mas visualmente seta pra baixo
        icon: AlertTriangle, 
        color: 'text-orange-600', 
        bg: 'bg-orange-50' 
    },
    { 
        label: 'Aguardando Análise', 
        value: '8', 
        trend: 'Estável', 
        trendUp: null, 
        icon: Clock, 
        color: 'text-purple-600', 
        bg: 'bg-purple-50' 
    },
  ];

  const recentAlerts = [
    { id: 1, nome: 'João da Silva', processo: '0001234-88.2023', tipo: 'Fora do Perímetro', hora: '10:42', status: 'Crítico' },
    { id: 2, nome: 'Maria Oliveira', processo: '0005678-12.2023', tipo: 'Falha Biométrica', hora: '09:15', status: 'Atenção' },
    { id: 3, nome: 'Carlos Souza', processo: '0009988-77.2024', tipo: 'Tentativa Offline', hora: '08:30', status: 'Info' },
    { id: 4, nome: 'Ana Pereira', processo: '0004433-22.2023', tipo: 'Bateria Baixa (<5%)', hora: '08:15', status: 'Info' },
  ];

  return (
    <Layout title="Dashboard Operacional">
      
      {/* 1. SEÇÃO DE KPIs (Cartões de Topo) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
                <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${kpi.bg}`}>
                            <Icon size={24} className={kpi.color} />
                        </div>
                        {kpi.trendUp !== null && (
                            <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${kpi.trendUp ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
                                {kpi.trendUp ? <TrendingUp size={14} className="mr-1"/> : <TrendingDown size={14} className="mr-1"/>}
                                {kpi.trend}
                            </span>
                        )}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">{kpi.value}</h3>
                        <p className="text-sm text-gray-500 font-medium">{kpi.label}</p>
                    </div>
                </div>
            );
        })}
      </div>

      {/* 2. SEÇÃO GRÁFICA (BI) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Gráfico de Barras: Comparecimentos Semanais */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Fluxo de Apresentações (7 dias)</h3>
                <button className="text-sm text-gray-500 hover:text-tjpb-primary flex items-center gap-1">
                    <Filter size={14}/> Filtrar
                </button>
            </div>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dataAttendance}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                        <RechartsTooltip 
                            cursor={{fill: '#f3f4f6'}}
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                        />
                        <Bar dataKey="comparecimentos" name="Sucesso" fill="#2A9D8F" radius={[4, 4, 0, 0]} barSize={30} />
                        <Bar dataKey="faltas" name="Falhas/Ausências" fill="#E76F51" radius={[4, 4, 0, 0]} barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Gráfico de Pizza: Status Geral */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Status da Base</h3>
            <div className="h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={dataStatus}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {dataStatus.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Legend verticalAlign="bottom" height={36} iconType="circle"/>
                        <RechartsTooltip />
                    </PieChart>
                </ResponsiveContainer>
                {/* Texto Central do Gráfico */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -mt-4">
                    <span className="block text-2xl font-bold text-gray-800">1.015</span>
                    <span className="text-xs text-gray-500">Total Ativos</span>
                </div>
            </div>
        </div>
      </div>

      {/* 3. SEÇÃO DE ALERTAS (Lista Profissional) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <AlertTriangle className="text-tjpb-accent" size={20}/>
                    Alertas Críticos e Recentes
                </h3>
                <p className="text-sm text-gray-500 mt-1">Monitoramento em tempo real de infrações e falhas.</p>
            </div>
            <button className="text-sm font-medium text-tjpb-primary hover:text-tjpb-secondary">
                Ver Todos
            </button>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider">
                        <th className="p-5 font-medium">Assistido / Processo</th>
                        <th className="p-5 font-medium">Ocorrência</th>
                        <th className="p-5 font-medium">Horário</th>
                        <th className="p-5 font-medium">Prioridade</th>
                        <th className="p-5 font-medium text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {recentAlerts.map((alert) => (
                        <tr key={alert.id} className="hover:bg-blue-50/30 transition-colors group">
                            <td className="p-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
                                        {alert.nome.split(' ').map(n=>n[0]).join('').substring(0,2)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{alert.nome}</p>
                                        <p className="text-xs text-gray-500 font-mono">{alert.processo}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-5">
                                <span className="text-gray-700 font-medium block">{alert.tipo}</span>
                            </td>
                            <td className="p-5">
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <Clock size={14}/>
                                    {alert.hora}
                                </div>
                            </td>
                            <td className="p-5">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                    ${alert.status === 'Crítico' ? 'bg-red-50 text-red-700 border-red-100' : 
                                      alert.status === 'Atenção' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 
                                      'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                                        ${alert.status === 'Crítico' ? 'bg-red-500' : 
                                          alert.status === 'Atenção' ? 'bg-yellow-500' : 
                                          'bg-blue-500'}`}></span>
                                    {alert.status}
                                </span>
                            </td>
                            <td className="p-5 text-right">
                                <button className="p-2 text-gray-400 hover:text-tjpb-primary hover:bg-gray-100 rounded-full transition-all">
                                    <MoreVertical size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </Layout>
  );
};

// Pequeno helper para o ícone de users que faltou no import acima
const UsersIcon = ({size, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
);

export default Dashboard;