import React from 'react';
import Layout from '../components/Layout';
import { AlertCircle, CheckCircle, Clock, MapPin } from 'lucide-react';

const Dashboard = () => {
  // Dados Mockados (Simulando a API)
const stats = [
  { 
    title: 'Total Assistidos', 
    value: '1,248', 
    icon: MapPin, 
    bgClass: 'bg-blue-500', 
    textClass: 'text-blue-500' // Declaramos explicitamente
  },
  { 
    title: 'Apresentações Hoje', 
    value: '86', 
    icon: CheckCircle, 
    bgClass: 'bg-green-500', 
    textClass: 'text-green-500' 
  },
  { 
    title: 'Alertas Pendentes', 
    value: '12', 
    icon: AlertCircle, 
    bgClass: 'bg-red-500', 
    textClass: 'text-red-500' 
  },
  { 
    title: 'Aguardando Análise', 
    value: '5', 
    icon: Clock, 
    bgClass: 'bg-yellow-500', 
    textClass: 'text-yellow-500' 
  },
];

  const recentAlerts = [
    { id: 1, nome: 'João da Silva', tipo: 'Fora do Perímetro', hora: '10:42', status: 'Crítico' },
    { id: 2, nome: 'Maria Oliveira', tipo: 'Falha Biométrica', hora: '09:15', status: 'Atenção' },
    { id: 3, nome: 'Carlos Souza', tipo: 'Tentativa Offline', hora: '08:30', status: 'Info' },
  ];

  return (
    <Layout title="Painel de Monitoramento">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                        <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                    </div>
                    {/* Aqui usamos as propriedades diretas, sem replace */}
                    <div className={`p-3 rounded-full ${stat.bgClass} bg-opacity-10`}>
                        <Icon className={`w-8 h-8 ${stat.textClass}`} />
                    </div>
                </div>
            )
        })}
      </div>

      {/* Seção de Alertas Recentes */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="text-tjpb-accent" size={20}/>
            Alertas em Tempo Real
        </h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase tracking-wider">
                        <th className="p-4 font-semibold">Assistido</th>
                        <th className="p-4 font-semibold">Tipo de Ocorrência</th>
                        <th className="p-4 font-semibold">Horário</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold text-right">Ação</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {recentAlerts.map((alert) => (
                        <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-800">{alert.nome}</td>
                            <td className="p-4 text-gray-600">{alert.tipo}</td>
                            <td className="p-4 text-gray-500 font-mono text-sm">{alert.hora}</td>
                            <td className="p-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                    ${alert.status === 'Crítico' ? 'bg-red-100 text-red-700' : 
                                      alert.status === 'Atenção' ? 'bg-yellow-100 text-yellow-700' : 
                                      'bg-blue-100 text-blue-700'}`}>
                                    {alert.status}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <button className="text-sm text-tjpb-primary hover:text-tjpb-secondary font-medium underline">
                                    Ver Detalhes
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

export default Dashboard;