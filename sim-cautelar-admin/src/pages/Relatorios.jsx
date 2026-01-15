import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
  Search, Download, Printer, Filter 
} from 'lucide-react';

const Relatorios = () => {
  const [dataInicio, setDataInicio] = useState('2024-02-01');
  const [dataFim, setDataFim] = useState('2024-02-28');
  const [tipoEvento, setTipoEvento] = useState('todos');
  const [busca, setBusca] = useState('');

  // Dados Mockados
  const dadosRelatorio = [
    { id: 1, data: '15/02/2024 10:00', nome: 'Carlos Eduardo Silva', cpf: '098.112.334-12', tipo: 'Presencial', status: 'sucesso', detalhe: 'Comparecimento confirmado no balcão.' },
    { id: 2, data: '14/02/2024 20:00', nome: 'Mariana Costa', cpf: '654.321.098-34', tipo: 'Biometria', status: 'falha', detalhe: 'Fora do perímetro (800m).' },
    { id: 3, data: '14/02/2024 19:30', nome: 'João Pedro Santos', cpf: '321.654.987-56', tipo: 'Biometria', status: 'sucesso', detalhe: 'Reconhecimento Facial (99%).' },
    { id: 4, data: '13/02/2024 09:00', nome: 'Ana Maria de Souza', cpf: '123.456.789-45', tipo: 'Presencial', status: 'justificado', detalhe: 'Atestado Médico apresentado.' },
    { id: 5, data: '12/02/2024 20:15', nome: 'Marcos Vinicius Dias', cpf: '999.888.777-66', tipo: 'Biometria', status: 'falha', detalhe: 'Atraso (Limite 19:00).' },
    { id: 6, data: '10/02/2024 14:00', nome: 'Carlos Eduardo Silva', cpf: '098.112.334-12', tipo: 'Presencial', status: 'sucesso', detalhe: 'Comparecimento extra solicitado.' },
  ];

  const dadosFiltrados = dadosRelatorio.filter(item => {
      const matchTipo = tipoEvento === 'todos' ? true : 
                        (tipoEvento === 'sucesso' ? item.status === 'sucesso' :
                        (tipoEvento === 'falha' ? item.status === 'falha' : item.status === 'justificado'));
      const matchTexto = item.nome.toLowerCase().includes(busca.toLowerCase()) || item.cpf.includes(busca);
      return matchTipo && matchTexto;
  });

  const totalRegistros = dadosFiltrados.length;
  const totalSucesso = dadosFiltrados.filter(i => i.status === 'sucesso').length;
  const totalFalhas = dadosFiltrados.filter(i => i.status === 'falha').length;
  const taxaConformidade = totalRegistros > 0 ? Math.round((totalSucesso / totalRegistros) * 100) : 0;

  const handlePrint = () => window.print();

  return (
    <Layout>
      {/* Título e Filtros (Somem na Impressão) */}
      <div className="page-title-group no-print">
         <div className="title-pill"></div>
         <h2 className="page-h1">Relatórios Gerenciais</h2>
      </div>

      <div className="form-container no-print" style={{ marginBottom: '32px' }}>
          <div className="form-section-title"><Filter size={20} color="#0F99A8" /> Filtros de Pesquisa</div>
          <div className="form-grid">
              <div className="input-group"><label>Período (Início)</label><input type="date" className="form-control" value={dataInicio} onChange={e => setDataInicio(e.target.value)} /></div>
              <div className="input-group"><label>Período (Fim)</label><input type="date" className="form-control" value={dataFim} onChange={e => setDataFim(e.target.value)} /></div>
              <div className="input-group"><label>Status</label><select className="form-control" value={tipoEvento} onChange={e => setTipoEvento(e.target.value)}><option value="todos">Todos</option><option value="sucesso">Sucesso</option><option value="falha">Violação</option></select></div>
              <div className="input-group" style={{ gridColumn: 'span 3' }}>
                  <label>Buscar Assistido</label>
                  <div style={{ position: 'relative' }}>
                      <Search className="search-icon" size={20} style={{ top: '50%', transform: 'translateY(-50%)' }} />
                      <input type="text" className="form-control" style={{ paddingLeft: '48px' }} placeholder="Nome ou CPF..." value={busca} onChange={e => setBusca(e.target.value)} />
                  </div>
              </div>
          </div>
          <div className="form-actions" style={{ marginTop: '0', borderTop: 'none', paddingTop: '0' }}>
              <button className="btn-secondary"><Download size={18} /> Exportar CSV</button>
              <button className="btn-primary" onClick={handlePrint}><Printer size={18} /> Gerar Relatório PDF</button>
          </div>
      </div>

      {/* Área do Relatório (Aparece na Tela e na Impressão) */}
      <div className="print-area">
          <div className="print-header" style={{ display: 'none', marginBottom: '20px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
              <h1 style={{ fontSize: '24px', margin: 0, color: '#000' }}>Relatório de Monitoramento</h1>
              <p style={{ margin: '4px 0 0', color: '#333' }}>Tribunal de Justiça da Paraíba - SiM Cautelar</p>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#555' }}>Período: {new Date(dataInicio).toLocaleDateString()} a {new Date(dataFim).toLocaleDateString()}</p>
          </div>

          <div className="kpi-grid" style={{ marginBottom: '24px' }}>
              <div className="kpi-card" style={{ background: 'white', borderLeft: '4px solid #0F99A8' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' }}>Registros</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E2939' }}>{totalRegistros}</div>
              </div>
              <div className="kpi-card" style={{ background: 'white', borderLeft: '4px solid #10B981' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' }}>Conformidade</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10B981' }}>{taxaConformidade}%</div>
              </div>
              <div className="kpi-card" style={{ background: 'white', borderLeft: '4px solid #EF4444' }}>
                  <div style={{ fontSize: '12px', color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' }}>Violações</div>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#EF4444' }}>{totalFalhas}</div>
              </div>
          </div>

          <div className="table-container">
              <table className="custom-table">
                  <thead>
                      <tr>
                          <th>Data / Hora</th>
                          <th>Assistido</th>
                          <th>Tipo</th>
                          <th>Status</th>
                          <th>Detalhe</th>
                      </tr>
                  </thead>
                  <tbody>
                      {dadosFiltrados.map((item) => (
                          <tr key={item.id}>
                              <td style={{ fontSize: '13px', fontFamily: 'monospace' }}>{item.data}</td>
                              <td><div style={{ fontWeight: '600', fontSize: '13px' }}>{item.nome}</div><div style={{ fontSize: '11px', color: '#64748B' }}>{item.cpf}</div></td>
                              <td style={{ fontSize: '13px' }}>{item.tipo}</td>
                              <td>
                                  {item.status === 'sucesso' && <span className="status-badge status-active">Sucesso</span>}
                                  {item.status === 'falha' && <span className="status-badge status-alert">Violação</span>}
                                  {item.status === 'justificado' && <span className="status-badge status-analysis">Justificado</span>}
                              </td>
                              <td style={{ fontSize: '13px', color: '#475569' }}>{item.detalhe}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          
          <div className="print-footer" style={{ display: 'none', marginTop: '30px', textAlign: 'center', fontSize: '11px', color: '#000', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
              Documento gerado eletronicamente em {new Date().toLocaleString()}.
          </div>
      </div>
    </Layout>
  );
};

export default Relatorios;