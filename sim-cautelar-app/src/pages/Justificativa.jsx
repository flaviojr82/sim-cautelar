import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Camera, CheckCircle, 
  UploadCloud, AlertCircle, X 
} from 'lucide-react';
import Webcam from 'react-webcam';

const Justificativa = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  // Estados do Formulário
  const [motivo, setMotivo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cameraAtiva, setCameraAtiva] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const motivos = [
    { id: 'saude', label: 'Problema de Saúde / Atestado' },
    { id: 'trabalho', label: 'Trabalho / Declaração' },
    { id: 'transporte', label: 'Problema de Transporte' },
    { id: 'emergencia', label: 'Emergência Familiar' },
    { id: 'outros', label: 'Outros Motivos' }
  ];

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      setCameraAtiva(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!motivo || !descricao || !imgSrc) {
      alert('Por favor, preencha todos os campos e anexe uma foto.');
      return;
    }

    setEnviando(true);
    // Simulação de envio para o servidor
    setTimeout(() => {
      setEnviando(false);
      setSucesso(true);
    }, 2000);
  };

  if (sucesso) {
    return (
      <div className="justificativa-container success-bg">
        <div className="result-card fade-in">
          <CheckCircle size={64} color="#10B981" />
          <h2>Justificativa Enviada!</h2>
          <p>Seu documento foi recebido e será analisado por um oficial de justiça.</p>
          <div className="receipt-box">
             <div className="receipt-row"><strong>Protocolo:</strong> JUST-{Math.floor(Math.random() * 100000)}</div>
             <div className="receipt-row"><strong>Status:</strong> Pendente de Análise</div>
          </div>
          <button onClick={() => navigate('/home')} className="btn-outline-white">
            Voltar ao Início
          </button>
        </div>
        <Styles />
      </div>
    );
  }

  return (
    <div className="justificativa-container">
      {/* Header */}
      <div className="page-header">
        <button onClick={() => navigate('/home')} className="btn-back">
          <ArrowLeft size={24} />
        </button>
        <h1>Enviar Justificativa</h1>
      </div>

      <div className="page-content">
        <form onSubmit={handleSubmit}>
          
          {/* 1. Seleção de Motivo */}
          <div className="form-group">
            <label className="label">Qual o motivo da ausência/falha?</label>
            <select 
              className="input-select" 
              value={motivo} 
              onChange={(e) => setMotivo(e.target.value)}
            >
              <option value="">Selecione um motivo...</option>
              {motivos.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>

          {/* 2. Descrição */}
          <div className="form-group">
            <label className="label">Descreva o ocorrido</label>
            <textarea 
              className="input-textarea" 
              placeholder="Ex: Não consegui comparecer pois fui ao médico..."
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          {/* 3. Anexo de Foto */}
          <div className="form-group">
            <label className="label">Foto do Documento/Atestado</label>
            
            {!imgSrc ? (
              !cameraAtiva ? (
                <button type="button" className="btn-camera-placeholder" onClick={() => setCameraAtiva(true)}>
                  <Camera size={32} />
                  <span>Tirar foto do documento</span>
                </button>
              ) : (
                <div className="camera-wrapper">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "environment" }} // Tenta usar câmera traseira
                    className="webcam-view"
                  />
                  <button type="button" className="btn-capture" onClick={handleCapture}>
                    <div className="capture-inner"></div>
                  </button>
                  <button type="button" className="btn-close-camera" onClick={() => setCameraAtiva(false)}>
                    <X size={24} />
                  </button>
                </div>
              )
            ) : (
              <div className="photo-preview">
                <img src={imgSrc} alt="Documento" />
                <button type="button" className="btn-remove-photo" onClick={() => setImgSrc(null)}>
                  <X size={16} /> Remover
                </button>
              </div>
            )}
            <p className="hint-text">Certifique-se que o texto do documento está legível.</p>
          </div>

          {/* Botão de Envio */}
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={enviando || !motivo || !descricao || !imgSrc}
          >
            {enviando ? 'Enviando...' : <><UploadCloud size={20} /> Enviar Justificativa</>}
          </button>

        </form>
      </div>
      <Styles />
    </div>
  );
};

const Styles = () => (
  <style>{`
    .justificativa-container { min-height: 100vh; background: #F8FAFC; display: flex; flex-direction: column; }
    .success-bg { background: #10B981; color: white; align-items: center; justify-content: center; padding: 24px; text-align: center; }
    
    .page-header { background: white; padding: 16px 24px; display: flex; align-items: center; gap: 16px; border-bottom: 1px solid #E2E7ED; position: sticky; top: 0; z-index: 10; }
    .page-header h1 { font-size: 18px; font-weight: 600; color: #1E2939; margin: 0; }
    .btn-back { background: none; border: none; cursor: pointer; color: #64748B; padding: 4px; display: flex; }
    
    .page-content { padding: 24px; flex: 1; overflow-y: auto; }
    
    .form-group { margin-bottom: 24px; }
    .label { display: block; font-size: 14px; font-weight: 600; color: #1E2939; margin-bottom: 8px; }
    
    .input-select, .input-textarea { width: 100%; padding: 12px; border: 1px solid #CBD5E1; border-radius: 12px; font-size: 16px; background: white; outline: none; }
    .input-textarea { resize: vertical; min-height: 100px; }
    .input-select:focus, .input-textarea:focus { border-color: #0F99A8; box-shadow: 0 0 0 3px rgba(15, 153, 168, 0.1); }
    
    /* Camera Placeholder */
    .btn-camera-placeholder { width: 100%; height: 160px; border: 2px dashed #CBD5E1; border-radius: 12px; background: #F1F5F9; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #64748B; gap: 8px; cursor: pointer; transition: all 0.2s; }
    .btn-camera-placeholder:hover { border-color: #0F99A8; color: #0F99A8; background: #F0FDFA; }
    
    /* Camera Ativa */
    .camera-wrapper { position: relative; width: 100%; height: 300px; background: black; border-radius: 12px; overflow: hidden; display: flex; justify-content: center; }
    .webcam-view { width: 100%; height: 100%; object-fit: cover; }
    .btn-capture { position: absolute; bottom: 20px; width: 60px; height: 60px; border-radius: 50%; background: rgba(255,255,255,0.3); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; }
    .capture-inner { width: 48px; height: 48px; background: white; border-radius: 50%; transition: transform 0.1s; }
    .btn-capture:active .capture-inner { transform: scale(0.9); }
    .btn-close-camera { position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.5); border: none; color: white; padding: 8px; border-radius: 50%; cursor: pointer; }
    
    /* Preview da Foto */
    .photo-preview { position: relative; border-radius: 12px; overflow: hidden; border: 1px solid #E2E7ED; }
    .photo-preview img { width: 100%; display: block; }
    .btn-remove-photo { position: absolute; top: 10px; right: 10px; background: rgba(239, 68, 68, 0.9); color: white; border: none; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 4px; cursor: pointer; }

    .hint-text { font-size: 12px; color: #64748B; margin-top: 8px; }

    /* Botão Primário */
    .btn-primary { width: 100%; height: 56px; background: #0F99A8; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 6px rgba(15, 153, 168, 0.2); }
    .btn-primary:disabled { background: #94A3B8; cursor: not-allowed; box-shadow: none; }
    
    /* Tela de Sucesso */
    .result-card { background: transparent; }
    .result-card h2 { font-size: 24px; margin: 16px 0 8px; font-weight: 700; }
    .receipt-box { background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.4); border-radius: 12px; padding: 16px; margin: 24px 0; text-align: left; }
    .receipt-row { margin-bottom: 6px; font-size: 14px; }
    .btn-outline-white { background: transparent; border: 2px solid white; color: white; height: 48px; padding: 0 24px; border-radius: 12px; font-weight: 600; cursor: pointer; margin-top: 16px; }
    .fade-in { animation: fadeIn 0.5s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `}</style>
);

export default Justificativa;