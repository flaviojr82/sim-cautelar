import React from 'react';
import Layout from '../components/Layout';
import { User, MapPin, FileText, Camera, Save, X, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NovoAssistido = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="page-title-group">
         <div className="title-pill"></div>
         <h2 className="page-h1">Novo Cadastro</h2>
      </div>

      <div className="form-container">
        
        {/* 1. SEÇÃO DE FOTO (BIOMETRIA) */}
        <div className="form-section-title">
            <Camera size={20} color="#0F99A8" />
            Biometria e Identificação Visual
        </div>
        
        <div className="photo-upload-area">
            <div style={{ padding: '16px', background: '#E0F2FE', borderRadius: '50%' }}>
                <UploadCloud size={32} color="#0F99A8" />
            </div>
            <p className="upload-text">Clique para carregar a foto de referência</p>
            <p className="upload-subtext">Formatos aceitos: JPG, PNG (Max. 5MB). O rosto deve estar bem visível.</p>
        </div>

        {/* 2. DADOS PESSOAIS */}
        <div className="form-section-title">
            <User size={20} color="#0F99A8" />
            Dados Pessoais
        </div>

        <div className="form-grid">
            <div className="input-group">
                <label>Nome Completo</label>
                <input type="text" className="form-control" placeholder="Ex: João da Silva" />
            </div>
            <div className="input-group">
                <label>CPF</label>
                <input type="text" className="form-control" placeholder="000.000.000-00" />
            </div>
            <div className="input-group">
                <label>Data de Nascimento</label>
                <input type="date" className="form-control" />
            </div>
            <div className="input-group">
                <label>Nome da Mãe</label>
                <input type="text" className="form-control" placeholder="Nome completo da mãe" />
            </div>
            <div className="input-group">
                <label>Telefone / WhatsApp</label>
                <input type="tel" className="form-control" placeholder="(83) 90000-0000" />
            </div>
            <div className="input-group">
                <label>Gênero</label>
                <select className="form-control">
                    <option value="">Selecione...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                </select>
            </div>
        </div>

        {/* 3. ENDEREÇO */}
        <div className="form-section-title">
            <MapPin size={20} color="#0F99A8" />
            Endereço de Residência
        </div>

        <div className="form-grid">
            <div className="input-group">
                <label>CEP</label>
                <input type="text" className="form-control" placeholder="00000-000" />
            </div>
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label>Logradouro</label>
                <input type="text" className="form-control" placeholder="Rua, Avenida..." />
            </div>
            <div className="input-group">
                <label>Número</label>
                <input type="text" className="form-control" placeholder="123" />
            </div>
            <div className="input-group">
                <label>Bairro</label>
                <input type="text" className="form-control" placeholder="Bairro" />
            </div>
            <div className="input-group">
                <label>Cidade / UF</label>
                <input type="text" className="form-control" placeholder="João Pessoa - PB" />
            </div>
        </div>

        {/* 4. DADOS DO PROCESSO */}
        <div className="form-section-title">
            <FileText size={20} color="#0F99A8" />
            Dados Processuais
        </div>

        <div className="form-grid">
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
                <label>Número do Processo</label>
                <input type="text" className="form-control" placeholder="0000000-00.0000.8.15.0000" />
            </div>
            <div className="input-group">
                <label>Comarca</label>
                <select className="form-control">
                    <option value="JPA">João Pessoa</option>
                    <option value="CG">Campina Grande</option>
                    <option value="CAB">Cabedelo</option>
                </select>
            </div>
            <div className="input-group">
                <label>Vara</label>
                <input type="text" className="form-control" placeholder="Ex: 1ª Vara Criminal" />
            </div>
            <div className="input-group">
                <label>Artigo Penal</label>
                <input type="text" className="form-control" placeholder="Ex: Art. 157" />
            </div>
            <div className="input-group">
                <label>Dispositivo de Monitoramento</label>
                <select className="form-control">
                    <option value="TZ">Tornozeleira Eletrônica</option>
                    <option value="APP">Aplicativo Móvel (Reconhecimento Facial)</option>
                    <option value="BT">Botão de Pânico</option>
                </select>
            </div>
        </div>

        {/* BOTÕES DE AÇÃO */}
        <div className="form-actions">
            <button className="btn-secondary" onClick={() => navigate('/assistidos')}>
                Cancelar
            </button>
            <button className="btn-primary" onClick={() => alert('Cadastro salvo com sucesso!')}>
                <Save size={18} />
                Salvar Cadastro
            </button>
        </div>

      </div>
    </Layout>
  );
};

export default NovoAssistido;