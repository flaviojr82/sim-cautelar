import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Download, CheckCircle, AlertTriangle, 
  FileText, Calendar, MapPin 
} from 'lucide-react';

const Historico = () => {
  const navigate = useNavigate();

  // Mock de Dados Históricos
  const historico = [
    { 
      id: 1, 
      tipo: 'app', 
      titulo: 'Apresentação via App',
      data: '16/01/2026', 
      hora: '09:15', 
      status: 'sucesso', 
      protocolo: '20260116-8827',
      local: 'Via Geolocalização'
    },
    { 
      id: 2, 
      tipo: 'presencial', 
      titulo: 'Apresentação Presencial',
      data: '15/01/2026', 
      hora: '14:30', 
      status: 'sucesso', 
      protocolo: '20260115-PRE-01',
      local: 'Fórum Criminal - 2ª Vara'
    },
    { 
      id: 3, 
      tipo: 'app', 
      titulo: 'Apresentação via App',
      data: '10/01/2026', 
      hora: '18:45', 
      status: 'analise', 
      protocolo: '20260110-PEND-99',
      local: 'Via Geolocalização'
    },
    { 
      id: 4, 
      tipo: 'justificativa', 
      titulo: 'Justificativa Médica',
      data: '05/01/2026', 
      hora: '10:00', 
      status: 'justificado', 
      protocolo: 'JUST-2026-554',
      local: 'Upload de Documento'
    }
  ];

  const handleDownload = (protocolo) => {
    alert(`Simulando download do PDF do recibo: ${protocolo}`);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'sucesso': return <CheckCircle size={20} color="#10B981" />;
      case 'analise': return <AlertTriangle size={20} color="#D97706" />;
      case 'justificado': return <FileText size={20} color="#3B82F6" />;
      default: return <CheckCircle size={20} color="#64748B" />;
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'sucesso': return <span className="badge badge-success">Confirmado</span>;
      case 'analise': return <span className="badge badge-warning">Em Análise</span>;
      case 'justificado': return <span className="badge badge-info">Justificativa</span>;
      default: return null;
    }
  };

  return (
    <div className="historico-container">
      {/* Header Fixo */}
      <div className="page-header">
        <button onClick={() => navigate('/home')} className="btn-back">
          <ArrowLeft size={24} />
        </button>
        <h1>Meus Comprovantes</h1>
      </div>

      <div className="historico-content">
        <p className="helper-text">
            Este histórico serve como comprovante de cumprimento das medidas cautelares.
        </p>

        <div className="timeline">
            {historico.map((item) => (
                <div key={item.id} className="history-card">
                    <div className="card-header">
                        <div className="header-left">
                            {getStatusIcon(item.status)}
                            <span className="date-text">{item.data} • {item.hora}</span>
                        </div>
                        {getStatusLabel(item.status)}
                    </div>
                    
                    <div className="card-body">
                        <h3>{item.titulo}</h3>
                        <div className="meta-info">
                            <MapPin size={14} /> {item.local}
                        </div>
                        <div className="protocolo-box">
                            Prot: <strong>{item.protocolo}</strong>
                        </div>
                    </div>

                    <div className="card-footer">
                        <button className="btn-download" onClick={() => handleDownload(item.protocolo)}>
                            <Download size={16} /> Baixar Recibo PDF
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
      <Styles />
    </div>
  );
};

const Styles = () => (
  <style>{`
    .historico-container { min-height: 100vh; background: #F8FAFC; display: flex; flex-direction: column; }
    
    .page-header { background: white; padding: 16px 24px; display: flex; align-items: center; gap: 16px; border-bottom: 1px solid #E2E7ED; position: sticky; top: 0; z-index: 10; }
    .page-header h1 { font-size: 18px; font-weight: 600; color: #1E2939; margin: 0; }
    .btn-back { background: none; border: none; cursor: pointer; color: #64748B; padding: 4px; display: flex; }
    
    .historico-content { padding: 24px; flex: 1; overflow-y: auto; }
    .helper-text { font-size: 13px; color: #64748B; margin-bottom: 24px; text-align: center; }

    .history-card { background: white; border-radius: 12px; border: 1px solid #E2E7ED; margin-bottom: 16px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
    
    .card-header { padding: 16px; border-bottom: 1px solid #F1F5F9; display: flex; justify-content: space-between; align-items: center; }
    .header-left { display: flex; align-items: center; gap: 8px; }
    .date-text { font-size: 13px; color: #64748B; font-weight: 500; }
    
    .badge { padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .badge-success { background: #ECFDF5; color: #059669; }
    .badge-warning { background: #FFFBEB; color: #D97706; }
    .badge-info { background: #EFF6FF; color: #3B82F6; }

    .card-body { padding: 16px; }
    .card-body h3 { font-size: 16px; color: #1E2939; margin: 0 0 8px 0; font-weight: 600; }
    .meta-info { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #64748B; margin-bottom: 12px; }
    .protocolo-box { background: #F8FAFC; padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #475569; font-family: monospace; border: 1px dashed #CBD5E1; display: inline-block; }

    .card-footer { padding: 12px 16px; background: #F8FAFC; border-top: 1px solid #F1F5F9; }
    .btn-download { width: 100%; background: white; border: 1px solid #CBD5E1; color: #475569; padding: 10px; border-radius: 8px; font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: all 0.2s; }
    .btn-download:hover { background: #F1F5F9; border-color: #94A3B8; color: #1E2939; }
    .btn-download:active { transform: scale(0.98); }
  `}</style>
);

export default Historico;