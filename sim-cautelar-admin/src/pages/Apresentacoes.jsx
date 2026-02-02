import React, { useState } from 'react';
import Layout from '../components/Layout';
// Removido 'Download' da importação, pois era usado apenas no botão de relatório
import { Search, MapPin, CheckCircle, FileText, UserCheck } from 'lucide-react';

// Removidas as importações do jsPDF e autoTable

const Apresentacoes = () => {
  const [busca, setBusca] = useState('');

  // 1. DADOS MOCKADOS (Mantidos inalterados)
  const checkinsHoje = [
    { 
      id: 1, 
      nome: 'João Pedro Santos', 
      cpf: '098.112.334-12', 
      hora: '08:15', 
      local: 'Fórum Criminal - João Pessoa', 
      metodo: 'Biometria Facial', 
      foto: 'https://ui-avatars.com/api/?name=Joao+Santos&background=fed7aa&color=9a3412' 
    },
    { 
      id: 2, 
      nome: 'Carlos Eduardo Silva', 
      cpf: '123.456.789-45', 
      hora: '09:30', 
      local: 'Aplicativo SiM Cautelar (GPS)', 
      metodo: 'Reconhecimento Facial', 
      foto: 'https://ui-avatars.com/api/?name=Carlos+Silva&background=c7d2fe&color=3730a3' 
    },
    { 
      id: 3, 
      nome: 'Julia Mendes', 
      cpf: '222.333.444-55', 
      hora: '10:00', 
      local: '1ª Vara Mista de Cabedelo', 
      metodo: 'Apresentação Presencial', 
      foto: 'https://ui-avatars.com/api/?name=Julia+Mendes&background=bbf7d0&color=166534' 
    },
    { 
      id: 4, 
      nome: 'Fernanda Oliveira', 
      cpf: '789.012.345-90', 
      hora: '11:10', 
      local: 'Aplicativo SiM Cautelar (GPS)', 
      metodo: 'Reconhecimento Facial', 
      foto: 'https://ui-avatars.com/api/?name=Fernanda+Oliveira&background=e5e7eb&color=374151' 
    },
    { 
      id: 5, 
      nome: 'Roberto Alves', 
      cpf: '456.789.012-78', 
      hora: '10:45', 
      local: 'Fórum de Mangabeira', 
      metodo: 'Biometria Facial', 
      foto: 'https://ui-avatars.com/api/?name=Roberto+Alves&background=bbf7d0&color=166534' 
    },
  ];

  // 2. Lógica de Busca
  const dadosFiltrados = checkinsHoje.filter((item) => {
    const termo = busca.toLowerCase();
    return (
        item.nome.toLowerCase().includes(termo) ||
        item.cpf.includes(termo)
    );
  });

  // A função exportarRelatorio foi removida completamente daqui.

  return (
    <Layout>
      <div className="page-title-group">
         <div className="title-pill"></div>
         <h2 className="page-h1">Apresentações do Dia</h2>
      </div>

      <div className="action-bar">
        <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input 
                type="text" 
                className="search-input" 
                placeholder="Buscar por Nome ou CPF..." 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />
        </div>
        
        {/* O botão foi removido e não há mais lógica de PDF no componente */}
      </div>

      <div className="table-container">
        <table className="custom-table">
            <thead>
                <tr>
                    <th>Assistido</th>
                    <th>Horário</th>
                    <th>Localização / Origem</th>
                    <th>Método de Validação</th>
                    <th>Confirmação</th>
                </tr>
            </thead>
            <tbody>
                {dadosFiltrados.length > 0 ? (
                    dadosFiltrados.map((item) => {
                        const isPresencial = item.metodo === 'Apresentação Presencial';

                        return (
                          <tr key={item.id}>
                              <td>
                                  <div className="user-cell">
                                      <img src={item.foto} alt={item.nome} className="user-avatar" />
                                      <div className="user-info">
                                          <span className="user-name">{item.nome}</span>
                                          <span className="user-meta">{item.cpf}</span>
                                      </div>
                                  </div>
                              </td>
                              <td style={{ fontWeight: 'bold', color: '#1E2939' }}>{item.hora}</td>
                              <td style={{ color: '#6A7282' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                      <MapPin size={14} />
                                      {item.local}
                                  </div>
                              </td>
                              <td>
                                  <span style={{ 
                                      display: 'inline-flex', 
                                      alignItems: 'center',
                                      gap: '6px',
                                      padding: '4px 8px', 
                                      borderRadius: '6px', 
                                      background: isPresencial ? '#F5F3FF' : '#F0F9FF', 
                                      color: isPresencial ? '#7C3AED' : '#0369A1', 
                                      fontSize: '12px',
                                      fontWeight: '600',
                                      border: isPresencial ? '1px solid #DDD6FE' : '1px solid #BAE6FD'
                                  }}>
                                      {isPresencial && <UserCheck size={12} />}
                                      {item.metodo}
                                  </span>
                              </td>
                              <td>
                                  <span className="status-badge status-active">
                                      <CheckCircle size={12} style={{ marginRight: '4px' }} />
                                      Confirmado
                                  </span>
                              </td>
                          </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="5" style={{ padding: '40px 0', textAlign: 'center', color: '#6A7282' }}>
                            Nenhum registro encontrado para "{busca}"
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        
        <div className="table-footer-summary">
            <div>
                Total de apresentações listadas: <strong>{dadosFiltrados.length}</strong>
            </div>
            {dadosFiltrados.length > 0 && (
                <div style={{ fontSize: '12px', color: '#0F99A8' }}>
                    <FileText size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}/>
                </div>
            )}
        </div>
      </div>
    </Layout>
  );
};

export default Apresentacoes;