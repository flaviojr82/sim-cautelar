import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Search, MapPin, CheckCircle, FileText, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // Importação direta da função

const Apresentacoes = () => {
  const [busca, setBusca] = useState('');

  // 1. DADOS MOCKADOS
  const checkinsHoje = [
    { id: 1, nome: 'João Pedro Santos', cpf: '098.112.334-12', hora: '08:15', local: 'Fórum Criminal - João Pessoa', metodo: 'Biometria Facial', foto: 'https://ui-avatars.com/api/?name=Joao+Santos&background=fed7aa&color=9a3412' },
    { id: 2, nome: 'Carlos Eduardo Silva', cpf: '123.456.789-45', hora: '09:30', local: 'Aplicativo SiM Cautelar (GPS)', metodo: 'Reconhecimento Facial', foto: 'https://ui-avatars.com/api/?name=Carlos+Silva&background=c7d2fe&color=3730a3' },
    { id: 3, nome: 'Roberto Alves', cpf: '456.789.012-78', hora: '10:45', local: 'Fórum de Mangabeira', metodo: 'Biometria Facial', foto: 'https://ui-avatars.com/api/?name=Roberto+Alves&background=bbf7d0&color=166534' },
    { id: 4, nome: 'Fernanda Oliveira', cpf: '789.012.345-90', hora: '11:10', local: 'Aplicativo SiM Cautelar (GPS)', metodo: 'Reconhecimento Facial', foto: 'https://ui-avatars.com/api/?name=Fernanda+Oliveira&background=e5e7eb&color=374151' },
    { id: 5, nome: 'Mariana Costa', cpf: '321.654.987-00', hora: '13:20', local: 'Fórum de Cabedelo', metodo: 'Biometria Facial', foto: 'https://ui-avatars.com/api/?name=Mariana+Costa&background=fecaca&color=991b1b' },
  ];

  // 2. Lógica de Busca
  const dadosFiltrados = checkinsHoje.filter((item) => {
    const termo = busca.toLowerCase();
    return (
        item.nome.toLowerCase().includes(termo) ||
        item.cpf.includes(termo)
    );
  });

  // 3. Função de Exportar PDF (Modo Robusto)
  const exportarRelatorio = () => {
    try {
      const doc = new jsPDF();

      // -- CABEÇALHO --
      doc.setFillColor(63, 111, 116); 
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Tribunal de Justiça da Paraíba', 14, 18);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text('SiM Cautelar - Monitoramento Eletrônico', 14, 26);

      // -- INFORMAÇÕES --
      doc.setTextColor(30, 41, 57);
      doc.setFontSize(14);
      doc.text('Relatório Diário de Apresentações', 14, 50);
      
      const dataHoje = new Date().toLocaleDateString('pt-BR');
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Gerado em: ${dataHoje}`, 14, 56);
      doc.text(`Total de Registros: ${dadosFiltrados.length}`, 14, 61);

      // -- TABELA (Usando a função importada diretamente) --
      const corpoTabela = dadosFiltrados.map(item => [
          item.nome,
          item.cpf,
          item.hora,
          item.local,
          item.metodo
      ]);

      autoTable(doc, {
          startY: 70,
          head: [['Nome do Assistido', 'CPF', 'Horário', 'Localização', 'Validação']],
          body: corpoTabela,
          theme: 'grid',
          headStyles: { 
              fillColor: [15, 153, 168],
              textColor: 255,
              fontStyle: 'bold',
              halign: 'left'
          },
          bodyStyles: { textColor: 50 },
          alternateRowStyles: { fillColor: [245, 245, 245] },
          styles: { font: 'helvetica', fontSize: 9, cellPadding: 4 }
      });

      // -- RODAPÉ --
      const pageCount = doc.internal.getNumberOfPages();
      for(let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setTextColor(150);
          doc.text('Documento oficial gerado pelo sistema SiM Cautelar.', 14, doc.internal.pageSize.height - 10);
          doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - 25, doc.internal.pageSize.height - 10);
      }

      doc.save(`Relatorio_Apresentacoes_${dataHoje.replace(/\//g, '-')}.pdf`);

    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Houve um erro ao gerar o relatório. Verifique o console (F12) para detalhes.");
    }
  };

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
        
        <button 
            className="btn-primary" 
            onClick={exportarRelatorio}
            style={{ background: 'white', color: '#1E2939', border: '1px solid #E2E7ED' }}
        >
            <Download size={18} color="#0F99A8" />
            Exportar Relatório
        </button>
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
                    dadosFiltrados.map((item) => (
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
                                    display: 'inline-block', 
                                    padding: '4px 8px', 
                                    borderRadius: '6px', 
                                    background: '#F0F9FF', 
                                    color: '#0369A1', 
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    border: '1px solid #BAE6FD'
                                }}>
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
                    ))
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
                    Relatório pronto para exportação
                </div>
            )}
        </div>
      </div>
    </Layout>
  );
};

export default Apresentacoes;