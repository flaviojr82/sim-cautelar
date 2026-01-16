import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogIn, MapPin, AlertCircle, ArrowRight, ShieldCheck, RefreshCw 
} from 'lucide-react';

import brasao from '../assets/brasao.png';
import logoSim from '../assets/logo-sim.png';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('start');
  const [cpf, setCpf] = useState('');
  const [gpsStatus, setGpsStatus] = useState('idle');
  const [randomCode, setRandomCode] = useState('');
  const [userCodeInput, setUserCodeInput] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const ASSISTIDOS_VALIDOS = [
    '098.112.334-12', // Carlos Eduardo (Caminho Feliz)
    '111.222.333-44', // José da Silva (Caminho Alerta)
    '123.456.789-00'  // Ana Maria (Caminho Duplicado)
  ];

  const handleStart = () => {
    setStep('gps');
    setGpsStatus('checking');
    setErro('');

    if (!('geolocation' in navigator)) {
      setGpsStatus('error');
      setErro('Seu dispositivo não suporta geolocalização.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setTimeout(() => {
            setGpsStatus('success');
            setTimeout(() => setStep('cpf'), 1000);
        }, 1500);
      },
      (error) => {
        setGpsStatus('error');
        setErro('É obrigatório ativar o GPS para acessar o sistema.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleCpfSubmit = (e) => {
    e.preventDefault();
    if (cpf.length < 14) {
        setErro('Informe um CPF válido.');
        return;
    }
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setRandomCode(code);
    setStep('challenge');
    setErro('');
  };

  const handleChallengeSubmit = (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    if (userCodeInput !== randomCode) {
        setErro('Código de segurança incorreto.');
        setLoading(false);
        return;
    }

    setTimeout(() => {
        if (ASSISTIDOS_VALIDOS.includes(cpf)) {
            localStorage.setItem('userCpf', cpf);
            navigate('/home');
        } else {
            setErro('CPF não encontrado ou situação irregular.');
            setLoading(false);
        }
    }, 1500);
  };

  const handleCpfChange = (e) => {
    setErro('');
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(value);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={brasao} alt="Brasão TJPB" className="img-brasao" />
        <h2 className="text-tjpb">Tribunal de Justiça da Paraíba</h2>
        {step === 'start' && (<div className="logo-hero"><img src={logoSim} alt="SiM Cautelar" className="img-logo-sim" /></div>)}
      </div>
      <div className="login-body">
        {step === 'start' && (<div className="fade-in text-center"><h3 className="step-title">Bem-vindo ao SiM Cautelar</h3><p className="step-desc">Sistema de Monitoramento Eletrônico para cumprimento de medidas cautelares.</p><button onClick={handleStart} className="btn-primary mt-4">Iniciar Apresentação <ArrowRight size={20} /></button></div>)}
        {step === 'gps' && (<div className="fade-in text-center"><div className={`gps-circle ${gpsStatus}`}><MapPin size={40} /></div>{gpsStatus === 'checking' && (<><h3 className="step-title">Verificando Localização...</h3><p className="step-desc">Aguarde enquanto validamos o GPS.</p></>)}{gpsStatus === 'success' && (<><h3 className="step-title text-success">Localização Ativa!</h3><p className="step-desc">GPS validado com sucesso.</p></>)}{gpsStatus === 'error' && (<><h3 className="step-title text-error">Erro de Localização</h3><p className="step-desc">{erro}</p><button onClick={handleStart} className="btn-outline mt-4"><RefreshCw size={20} style={{marginRight: 8}} /> Tentar Novamente</button></>)}</div>)}
        {step === 'cpf' && (<form onSubmit={handleCpfSubmit} className="fade-in"><h3 className="step-title text-center">Identificação</h3><p className="step-desc text-center mb-4">Informe seu CPF para continuar.</p><div className="form-group"><label className="form-label">CPF</label><input type="tel" className="form-input" placeholder="000.000.000-00" value={cpf} onChange={handleCpfChange} maxLength={14} autoFocus /></div>{erro && <div className="error-message mb-4"><AlertCircle size={16} /> {erro}</div>}<button type="submit" className="btn-primary" disabled={cpf.length < 14}>Continuar <ArrowRight size={20} /></button></form>)}
        {step === 'challenge' && (<form onSubmit={handleChallengeSubmit} className="fade-in text-center"><h3 className="step-title">Verificação de Segurança</h3><p className="step-desc">Digite o código abaixo.</p><div className="challenge-box">{randomCode}</div><div className="form-group"><label className="form-label text-left">Código</label><input type="tel" className="form-input text-center text-large" placeholder="0000" value={userCodeInput} onChange={(e) => setUserCodeInput(e.target.value)} maxLength={4} autoFocus /></div>{erro && <div className="error-message mb-4 justify-center"><AlertCircle size={16} /> {erro}</div>}<button type="submit" className="btn-primary" disabled={loading || userCodeInput.length < 4}>{loading ? 'Validando...' : <><ShieldCheck size={20} /> Confirmar Acesso</>}</button><button type="button" className="btn-link mt-4" onClick={() => setStep('cpf')}>Voltar e corrigir CPF</button></form>)}
      </div>
      <div className="login-footer"><div className="footer-line"></div><span>SiM Cautelar &copy; 2026</span></div>
      <style>{`
        .login-container { min-height: 100vh; display: flex; flex-direction: column; background: white; }
        .login-header { background: linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%); padding: 32px 24px 16px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .img-brasao { height: 50px; margin-bottom: 8px; opacity: 0.9; }
        .text-tjpb { font-size: 12px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 16px; }
        .logo-hero { filter: drop-shadow(0 4px 6px rgba(0,0,0,0.05)); }
        .img-logo-sim { height: 60px; object-fit: contain; }
        .login-body { flex: 1; padding: 24px 32px; max-width: 480px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; justify-content: center; }
        .step-title { font-size: 22px; font-weight: 700; color: #1E2939; margin-bottom: 8px; }
        .step-desc { font-size: 14px; color: #64748B; line-height: 1.5; margin-bottom: 24px; }
        .gps-circle { width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; transition: all 0.3s; }
        .gps-circle.checking { background: #E0F2FE; color: #0284C7; animation: pulse 1.5s infinite; }
        .gps-circle.success { background: #DCFCE7; color: #166534; }
        .gps-circle.error { background: #FEE2E2; color: #DC2626; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(14, 165, 233, 0); } 100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); } }
        .challenge-box { background: #F1F5F9; border: 2px dashed #CBD5E1; border-radius: 12px; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #334155; padding: 16px; margin-bottom: 24px; font-family: monospace; }
        .text-large { font-size: 24px; letter-spacing: 4px; font-weight: 600; }
        .error-message { display: flex; align-items: center; gap: 6px; color: #EF4444; font-size: 13px; font-weight: 500; }
        .text-success { color: #166534; }
        .text-error { color: #DC2626; }
        .btn-link { background: none; border: none; color: #64748B; text-decoration: underline; font-size: 14px; cursor: pointer; }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .login-footer { padding: 24px; text-align: center; color: #CBD5E1; font-size: 12px; }
        .footer-line { height: 1px; background: #F1F5F9; margin-bottom: 16px; width: 100%; }
        @media (min-width: 768px) { .login-container { background-color: #F1F5F9; align-items: center; justify-content: center; } .login-header { background: transparent; padding-top: 0; } .login-body { background: white; padding: 48px; border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); margin-bottom: 40px; } .login-footer { position: fixed; bottom: 0; } }
      `}</style>
    </div>
  );
};

export default Login;