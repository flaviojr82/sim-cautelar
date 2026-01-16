import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Camera, CheckCircle, AlertTriangle, XCircle, 
  ArrowLeft, RefreshCw, Mail, CalendarCheck 
} from 'lucide-react';
import Webcam from 'react-webcam';

const CheckIn = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [step, setStep] = useState('validating_time');
  const [errorMsg, setErrorMsg] = useState('');
  const [coords, setCoords] = useState(null);
  const [livenessInstruction, setLivenessInstruction] = useState('Centralize seu rosto');
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (step === 'validating_time') {
      setTimeout(() => {
          const cpf = localStorage.getItem('userCpf');
          
          // --- VERIFICAÇÃO DE DUPLICIDADE ---
          if (cpf === '123.456.789-00') {
            setStep('duplicate');
          } else {
            setStep('gps');
          }
      }, 1500);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'gps') {
      if (!navigator.geolocation) {
        setStep('error');
        setErrorMsg('Geolocalização não suportada.');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => { setCoords(pos.coords); setTimeout(() => setStep('liveness'), 1000); },
        (err) => { setStep('error'); setErrorMsg('Erro ao obter localização. Ative o GPS.'); },
        { enableHighAccuracy: true }
      );
    }
  }, [step]);

  useEffect(() => {
    if (step === 'liveness') {
      let sequence = 0;
      const interval = setInterval(() => {
        sequence++;
        if (sequence === 1) setLivenessInstruction('Vire o rosto levemente para a direita');
        if (sequence === 2) setLivenessInstruction('Agora olhe para frente e SORRIA');
        if (sequence === 3) { capturePhoto(); clearInterval(interval); }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [step]);

  const capturePhoto = () => {
    if (webcamRef.current) { const imageSrc = webcamRef.current.getScreenshot(); setImgSrc(imageSrc); setStep('processing'); }
  };

  useEffect(() => {
    if (step === 'processing') {
        const cpf = localStorage.getItem('userCpf');
        setTimeout(() => {
            if (cpf === '111.222.333-44') setStep('warning');
            else setStep('success');
        }, 3000);
    }
  }, [step]);

  // --- TELA: DUPLICADO (JÁ REALIZADO) ---
  if (step === 'duplicate') {
    return (
        <div className="checkin-container">
            <div className="error-card fade-in" style={{padding: 32}}>
                <div style={{background: '#ECFDF5', borderRadius: '50%', padding: 12, marginBottom: 16}}>
                    <CalendarCheck size={48} color="#059669" />
                </div>
                <h2 style={{color: '#1E2939'}}>Tudo certo por aqui!</h2>
                <p style={{color: '#64748B', marginBottom: 24}}>Você já realizou sua apresentação obrigatória de hoje. Não é necessário enviar novamente.</p>
                <div className="receipt-box" style={{background: '#F8FAFC', borderColor: '#E2E7ED'}}>
                    <div className="receipt-row"><strong>Último Registro:</strong> Hoje, às 09:15</div>
                    <div className="receipt-row"><strong>Status:</strong> Confirmado</div>
                </div>
                <button onClick={() => navigate('/home')} className="btn-primary mt-4">Voltar ao Início</button>
            </div>
            <Styles />
        </div>
    );
  }

  // --- TELA: SUCESSO ---
  if (step === 'success') {
    return (
        <div className="checkin-container success-bg">
            <div className="result-card fade-in">
                <CheckCircle size={64} color="#10B981" />
                <h2>Apresentação Confirmada!</h2>
                <p>Seu check-in foi registrado com sucesso.</p>
                <div className="receipt-box">
                    <div className="receipt-row"><strong>Data:</strong> {new Date().toLocaleDateString()}</div>
                    <div className="receipt-row"><strong>Hora:</strong> {new Date().toLocaleTimeString()}</div>
                    <div className="receipt-row"><strong>Local:</strong> Lat {coords?.latitude.toFixed(4)}, Long {coords?.longitude.toFixed(4)}</div>
                    <div className="receipt-row"><strong>Protocolo:</strong> {Math.floor(Math.random() * 1000000)}</div>
                </div>
                <div className="email-alert"><Mail size={20} /><span>Recibo enviado para e-mail.</span></div>
                <button onClick={() => navigate('/home')} className="btn-outline" style={{marginTop: 24, borderColor: 'white', color: 'white'}}>Voltar ao Início</button>
            </div>
            <Styles />
        </div>
    );
  }

  // --- TELA: ALERTA ---
  if (step === 'warning') {
    return (
        <div className="checkin-container warning-bg">
            <div className="result-card fade-in">
                <div style={{background: 'white', borderRadius: '50%', padding: 4}}><AlertTriangle size={64} color="#D97706" /></div>
                <h2 style={{color: '#78350F'}}>Apresentação em Análise</h2>
                <p style={{color: '#92400E'}}>Detectamos uma divergência durante sua verificação.</p>
                <div className="receipt-box" style={{background: 'rgba(255,255,255,0.4)', borderColor: '#FCD34D', color: '#92400E'}}>
                    <div className="receipt-row"><strong>Motivo:</strong> Baixa aderência biométrica.</div>
                    <div className="receipt-row" style={{marginTop: 12}}>Sua apresentação foi registrada, mas passará por revisão.</div>
                </div>
                <button onClick={() => navigate('/home')} className="btn-outline" style={{marginTop: 24, borderColor: '#78350F', color: '#78350F'}}>Voltar ao Início</button>
            </div>
            <Styles />
        </div>
    );
  }

  // --- TELA: ERRO ---
  if (step === 'error') {
    return (
        <div className="checkin-container">
            <div className="error-card fade-in"><XCircle size={64} color="#EF4444" /><h2>Não foi possível completar</h2><p>{errorMsg}</p><button onClick={() => navigate('/home')} className="btn-primary mt-4">Voltar</button></div>
            <Styles />
        </div>
    );
  }

  return (
    <div className="checkin-container">
        <div className="progress-bar-container">
            <div className={`progress-step ${['validating_time','gps','liveness','processing'].includes(step) ? 'active' : ''}`}></div>
            <div className={`progress-step ${['gps','liveness','processing'].includes(step) ? 'active' : ''}`}></div>
            <div className={`progress-step ${['liveness','processing'].includes(step) ? 'active' : ''}`}></div>
            <div className={`progress-step ${step === 'processing' ? 'active' : ''}`}></div>
        </div>
        <div className="checkin-content">
            {step === 'validating_time' && (<div className="loading-state"><RefreshCw className="spin" size={48} color="#0F99A8" /><h3>Verificando Janela de Horário...</h3></div>)}
            {step === 'gps' && (<div className="loading-state"><MapPin className="bounce" size={48} color="#0F99A8" /><h3>Obtendo Localização Segura...</h3></div>)}
            {step === 'liveness' && (<div className="camera-wrapper"><div className="camera-mask"><Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{ facingMode: "user" }} className="webcam-video" /></div><div className="instruction-badge">{livenessInstruction}</div></div>)}
            {step === 'processing' && (<div className="loading-state"><div className="processing-avatar">{imgSrc && <img src={imgSrc} alt="Capture" />}<div className="scan-line"></div></div><h3>Validando Biometria...</h3><p>Por favor, aguarde.</p></div>)}
        </div>
        <Styles />
    </div>
  );
};

const Styles = () => (
  <style>{`
    .checkin-container { min-height: 100vh; background: white; display: flex; flex-direction: column; }
    .success-bg { background: #10B981; color: white; justify-content: center; padding: 24px; }
    .warning-bg { background: #FFB020; color: white; justify-content: center; padding: 24px; }
    .progress-bar-container { display: flex; gap: 8px; padding: 16px 24px; }
    .progress-step { h-height: 4px; flex: 1; background: #E2E7ED; border-radius: 2px; transition: background 0.3s; height: 6px; }
    .progress-step.active { background: #0F99A8; }
    .checkin-content { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; }
    .loading-state h3 { margin-top: 24px; color: #1E2939; }
    .spin { animation: spin 1s linear infinite; }
    .bounce { animation: bounce 1s infinite; }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    .camera-wrapper { position: relative; width: 100%; max-width: 320px; aspect-ratio: 3/4; display: flex; justify-content: center; }
    .camera-mask { width: 280px; height: 350px; border-radius: 50% / 40%; overflow: hidden; border: 4px solid #0F99A8; box-shadow: 0 0 0 1000px white; position: relative; z-index: 10; background: black; }
    .webcam-video { width: 100%; height: 100%; object-fit: cover; }
    .instruction-badge { position: absolute; bottom: -60px; left: 50%; transform: translateX(-50%); background: rgba(15, 23, 42, 0.9); color: white; padding: 12px 24px; border-radius: 30px; font-weight: 600; white-space: nowrap; z-index: 20; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
    .processing-avatar { width: 120px; height: 120px; border-radius: 50%; overflow: hidden; position: relative; margin: 0 auto 24px; border: 4px solid #E2E7ED; }
    .processing-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #10B981; box-shadow: 0 0 10px #10B981; animation: scan 2s infinite linear; }
    @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
    .result-card, .error-card { text-align: center; display: flex; flex-direction: column; align-items: center; width: 100%; }
    .receipt-box { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); border-radius: 12px; padding: 16px; margin: 24px 0; width: 100%; text-align: left; }
    .receipt-row { margin-bottom: 8px; font-size: 14px; }
    .email-alert { display: flex; align-items: center; gap: 8px; font-size: 13px; background: rgba(0,0,0,0.1); padding: 8px 16px; border-radius: 20px; }
    .fade-in { animation: fadeIn 0.5s ease; }
  `}</style>
);

export default CheckIn;