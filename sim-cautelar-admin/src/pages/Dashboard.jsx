import React from 'react';
import Layout from '../components/Layout';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
    AreaChart, Area 
} from 'recharts';
import { Users, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

const Dashboard = () => {
  // Dados do Gráfico
  const data = [
    { name: 'Seg', total: 45 }, { name: 'Ter', total: 52 },
    { name: 'Qua', total: 38 }, { name: 'Qui', total: 65 },
    { name: 'Sex', total: 48 }, { name: 'Sáb', total: 20 }, { name: 'Dom', total: 15 },
  ];

  return (
    <Layout>
      {/* Título da Página */}
      <div className="flex items-center gap-[12px] mb-[40px]">
        <div className="w-[8px] h-[40px] rounded-full bg-gradient-to-b from-[#0A9FAF] to-[#2A585D]" />
        <h2 className="font-arial text-[36px] text-[#1E2939]">Início</h2>
      </div>

      {/* Grid de Cards (KPIs) com Gradiente Específico */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[22px] mb-[32px]">
         <GradientCard 
            title="Total Monitorados" 
            value="1.248" 
            icon={Users} 
            badge="1.2% Total"
         />
         <GradientCard 
            title="Apresentações Hoje" 
            value="142" 
            icon={CheckCircle} 
            badge="Diário"
         />
         <GradientCard 
            title="Irregulares" 
            value="12" 
            icon={AlertTriangle} 
            badge="Atenção"
         />
         <GradientCard 
            title="Análises Pendentes" 
            value="08" 
            icon={Clock} 
            badge="Aguardando"
         />
      </div>

      {/* Área do Gráfico (Dashboard Card Branco) */}
      <div className="bg-white rounded-[16px] border border-[#F3F4F6] shadow-card p-[32px]">
        <div className="flex justify-between items-center mb-[20px]">
            <h3 className="font-arial text-[24px] text-[#1E2939]">Dashboard</h3>
            <div className="flex items-center gap-[8px]">
                <div className="w-[16px] h-[16px] border border-[#6A7282] rounded-sm" />
                <span className="text-[14px] text-[#6A7282]">Atualizado em tempo real</span>
            </div>
        </div>

        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#42969F" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#42969F" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E7ED" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                    <RechartsTooltip />
                    <Area type="monotone" dataKey="total" stroke="#42969F" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
};

// Componente do Card com Gradiente Exato
const GradientCard = ({ title, value, icon: Icon, badge }) => (
    <div 
        className="relative w-full h-[150px] rounded-[14px] p-[20px] flex flex-col justify-between overflow-hidden shadow-card text-white transition-transform hover:scale-[1.02]"
        style={{
            background: 'linear-gradient(110.45deg, #42969F -0.37%, #00B0C4 100%)'
        }}
    >
        {/* Cabeçalho do Card */}
        <div className="flex justify-between items-start z-10">
            <div className="w-[39px] h-[39px] bg-[#FFE1C9]/20 rounded-[8px] flex items-center justify-center">
                <Icon size={20} className="text-white" />
            </div>
            <div className="px-[10px] py-[4px] bg-white/20 rounded-full text-[12px]">
                {title}
            </div>
        </div>

        {/* Valor Grande */}
        <div className="z-10 mt-auto">
            <span className="font-arial text-[30px] font-bold block leading-none">{value}</span>
        </div>

        {/* Decoração de Fundo (Ícone gigante transparente) */}
        <div className="absolute -right-[20px] -bottom-[20px] opacity-10">
            <Icon size={120} />
        </div>
    </div>
);

export default Dashboard;