import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, CheckCircle, AlertTriangle, XCircle, 
  RefreshCw, Mail, CalendarCheck 
} from 'lucide-react';
import Webcam from 'react-webcam';
import brasao from '../assets/brasao.png';
import logoSim from '../assets/logo-sim.png';

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
          if (cpf === '123.456.789-00') setStep('duplicate');
          else setStep('gps');
      }, 1500);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'gps') {
      if (!navigator.geolocation) { setStep('error'); setErrorMsg('Geolocalização não suportada.'); return; }
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

  const HeaderTJPB = () => (
    <div className="institutional-header z-content">
        <img src={brasao} alt="Brasão TJPB" className="img-brasao" />
        <h2 className="text-tjpb">Tribunal de Justiça da Paraíba</h2>
    </div>
  );

  // Layout Base
  const LayoutCheckIn = ({ children, bgClass = '' }) => (
    <div className={`checkin-container ${bgClass}`}>
        <div className="checkin-content-card z-content">
            <HeaderTJPB />
            <div className="checkin-body">
                {children}
            </div>
            <div className="checkin-footer">
                <span>SiM Cautelar</span>
            </div>
        </div>
        <Styles />
    </div>
  );

  if (step === 'duplicate') return ( <LayoutCheckIn><div className="result-card fade-in"><div style={{background: '#ECFDF5', borderRadius: '50%', padding: 12, marginBottom: 16}}><CalendarCheck size={48} color="#059669" /></div><h2 style={{color: '#1E2939'}}>Tudo certo!</h2><p style={{color: '#64748B', marginBottom: 24}}>Apresentação já realizada no período atual.</p><button onClick={() => navigate('/home')} className="btn-primary mt-4">Voltar</button></div></LayoutCheckIn> );
  if (step === 'success') return ( <LayoutCheckIn bgClass="success-mode"><div className="result-card fade-in"><CheckCircle size={64} color="#10B981" /><h2>Confirmada!</h2><p>Check-in registrado com sucesso.</p><div className="receipt-box"><div className="receipt-row"><strong>Protocolo:</strong> {Math.floor(Math.random() * 1000000)}</div></div><button onClick={() => navigate('/home')} className="btn-outline-dark">Voltar</button></div></LayoutCheckIn> );
  if (step === 'warning') return ( <LayoutCheckIn bgClass="warning-mode"><div className="result-card fade-in"><AlertTriangle size={64} color="#D97706" /><h2>Em Análise</h2><p>Divergência detectada.</p><button onClick={() => navigate('/home')} className="btn-outline-dark">Voltar</button></div></LayoutCheckIn> );
  if (step === 'error') return ( <LayoutCheckIn><div className="error-card fade-in"><XCircle size={64} color="#EF4444" /><h2>Erro</h2><p>{errorMsg}</p><button onClick={() => navigate('/home')} className="btn-primary mt-4">Voltar</button></div></LayoutCheckIn> );

  return (
    <div className="checkin-container watermarked">
        <div className="checkin-content-card z-content">
            <HeaderTJPB />
            <div className="progress-bar-container">
                <div className={`progress-step ${['validating_time','gps','liveness','processing'].includes(step) ? 'active' : ''}`}></div>
                <div className={`progress-step ${['gps','liveness','processing'].includes(step) ? 'active' : ''}`}></div>
                <div className={`progress-step ${['liveness','processing'].includes(step) ? 'active' : ''}`}></div>
                <div className={`progress-step ${step === 'processing' ? 'active' : ''}`}></div>
            </div>
            <div className="checkin-body">
                {step === 'validating_time' && (<div className="loading-state"><RefreshCw className="spin" size={48} color="#0F99A8" /><h3>Verificando Horário...</h3></div>)}
                {step === 'gps' && (<div className="loading-state"><MapPin className="bounce" size={48} color="#0F99A8" /><h3>Obtendo Localização...</h3></div>)}
                {step === 'liveness' && (<div className="camera-wrapper"><div className="camera-mask"><Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{ facingMode: "user" }} className="webcam-video" /></div><div className="instruction-badge">{livenessInstruction}</div></div>)}
                {step === 'processing' && (<div className="loading-state"><div className="processing-avatar">{imgSrc && <img src={imgSrc} alt="Capture" />}<div className="scan-line"></div></div><h3>Validando...</h3></div>)}
            </div>
             <div className="checkin-footer"><span>SiM Cautelar</span></div>
        </div>
        <Styles />
    </div>
  );
};

const Styles = () => (
  <style>{`
    .checkin-container { min-height: 100vh; background: #F1F5F9; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 20px; }
    
    /* Marca D'água */
    .watermarked::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-10deg); width: 80%; height: 80%; max-width: 500px; background-image: url(${logoSim}); background-size: contain; background-repeat: no-repeat; background-position: center; opacity: 0.05; pointer-events: none; z-index: 0; }
    .z-content { position: relative; z-index: 2; }

    /* Card Branco Compacto */
    .checkin-content-card { 
        background: white; 
        width: 100%; max-width: 400px; 
        border-radius: 20px; 
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); 
        display: flex; flex-direction: column;
        overflow: hidden;
        min-height: 500px;
    }

    .institutional-header { padding: 24px; display: flex; flex-direction: column; align-items: center; text-align: center; }
    .img-brasao { height: 40px; margin-bottom: 8px; }
    .text-tjpb { font-size: 11px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin: 0; }

    .checkin-body { flex: 1; padding: 0 24px 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
    .checkin-footer { padding: 16px; text-align: center; color: #CBD5E1; font-size: 10px; margin-top: auto; border-top: 1px solid #F8FAFC; }

    .progress-bar-container { display: flex; gap: 8px; padding: 0 24px 16px; width: 100%; }
    .progress-step { h-height: 4px; flex: 1; background: #E2E7ED; border-radius: 2px; transition: background 0.3s; height: 4px; }
    .progress-step.active { background: #0F99A8; }

    .loading-state h3 { margin-top: 24px; color: #1E2939; font-size: 18px; }
    .spin { animation: spin 1s linear infinite; }
    .bounce { animation: bounce 1s infinite; }
    @keyframes spin { 100% { transform: rotate(360deg); } }
    @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

    .camera-wrapper { position: relative; width: 100%; max-width: 280px; aspect-ratio: 3/4; display: flex; justify-content: center; }
    .camera-mask { width: 240px; height: 300px; border-radius: 50% / 40%; overflow: hidden; border: 4px solid #0F99A8; position: relative; z-index: 10; background: black; }
    .webcam-video { width: 100%; height: 100%; object-fit: cover; }
    .instruction-badge { position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%); background: rgba(15, 23, 42, 0.9); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; white-space: nowrap; z-index: 20; }

    .processing-avatar { width: 100px; height: 100px; border-radius: 50%; overflow: hidden; position: relative; margin: 0 auto 24px; border: 4px solid #E2E7ED; }
    .processing-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #10B981; box-shadow: 0 0 10px #10B981; animation: scan 2s infinite linear; }
    @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }

    .result-card, .error-card { width: 100%; display: flex; flex-direction: column; align-items: center; }
    .receipt-box { background: #F8FAFC; border: 1px solid #E2E7ED; border-radius: 8px; padding: 12px; margin: 16px 0; text-align: left; width: 100%; font-size: 13px; }
    .btn-outline-dark { background: transparent; border: 1px solid #CBD5E1; color: #334155; height: 48px; padding: 0 24px; border-radius: 12px; font-weight: 600; cursor: pointer; margin-top: 16px; width: 100%; }

    /* Modos de Resultado */
    .success-mode .checkin-content-card { border: 2px solid #10B981; }
    .warning-mode .checkin-content-card { border: 2px solid #D97706; }
    
    .fade-in { animation: fadeIn 0.5s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    @media (max-width: 480px) {
        .checkin-container { padding: 0; background: white; }
        .checkin-content-card { max-width: 100%; height: 100vh; border-radius: 0; box-shadow: none; border: none; }
        .success-mode .checkin-content-card, .warning-mode .checkin-content-card { border: none; }
    }
  `}</style>
);

export default CheckIn;