import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, AlertCircle, ArrowRight, ShieldCheck, RefreshCw 
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
    '098.112.334-12',
    '111.222.333-44',
    '123.456.789-00'
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
    <div className="login-container watermarked">
      
      <div className="login-content-card z-content">
        {/* Cabeçalho Institucional */}
        <div className="institutional-header">
            <img src={brasao} alt="Brasão TJPB" className="img-brasao" />
            <h2 className="text-tjpb">Tribunal de Justiça da Paraíba</h2>
        </div>

        {/* Corpo do Login */}
        <div className="login-body">
            {step === 'start' && (<div className="fade-in text-center"><h3 className="step-title">SiM Cautelar</h3><p className="step-desc">Apresentação Eletrônica</p><button onClick={handleStart} className="btn-primary mt-4">Iniciar Apresentação <ArrowRight size={20} /></button></div>)}
            {step === 'gps' && (<div className="fade-in text-center"><div className={`gps-circle ${gpsStatus}`}><MapPin size={40} /></div>{gpsStatus === 'checking' && (<><h3 className="step-title">Verificando Localização...</h3><p className="step-desc">Aguarde.</p></>)}{gpsStatus === 'success' && (<><h3 className="step-title text-success">Localização Ativa!</h3><p className="step-desc">GPS validado.</p></>)}{gpsStatus === 'error' && (<><h3 className="step-title text-error">Erro de Localização</h3><p className="step-desc">{erro}</p><button onClick={handleStart} className="btn-outline mt-4"><RefreshCw size={20} style={{marginRight: 8}} /> Tentar Novamente</button></>)}</div>)}
            {step === 'cpf' && (<form onSubmit={handleCpfSubmit} className="fade-in"><h3 className="step-title text-center">Identificação</h3><p className="step-desc text-center mb-4">Informe seu CPF.</p><div className="form-group"><label className="form-label">CPF</label><input type="tel" className="form-input" placeholder="000.000.000-00" value={cpf} onChange={handleCpfChange} maxLength={14} autoFocus /></div>{erro && <div className="error-message mb-4"><AlertCircle size={16} /> {erro}</div>}<button type="submit" className="btn-primary" disabled={cpf.length < 14}>Continuar <ArrowRight size={20} /></button></form>)}
            {step === 'challenge' && (<form onSubmit={handleChallengeSubmit} className="fade-in text-center"><h3 className="step-title">Segurança</h3><p className="step-desc">Digite o código abaixo.</p><div className="challenge-box">{randomCode}</div><div className="form-group"><label className="form-label text-left">Código</label><input type="tel" className="form-input text-center text-large" placeholder="0000" value={userCodeInput} onChange={(e) => setUserCodeInput(e.target.value)} maxLength={4} autoFocus /></div>{erro && <div className="error-message mb-4 justify-center"><AlertCircle size={16} /> {erro}</div>}<button type="submit" className="btn-primary" disabled={loading || userCodeInput.length < 4}>{loading ? 'Validando...' : <><ShieldCheck size={20} /> Acessar</>}</button><button type="button" className="btn-link mt-4" onClick={() => setStep('cpf')}>Voltar</button></form>)}
        </div>

        {/* Rodapé (Agora dentro do Card) */}
        <div className="login-footer">
            <div className="footer-line"></div>
            <span>SiM Cautelar &copy; 2026</span>
        </div>
      </div>
      
      <style>{`
        .login-container { min-height: 100vh; display: flex; flex-direction: column; background: #F1F5F9; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 20px; }
        
        /* Marca D'água */
        .watermarked::before {
            content: ''; position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%) rotate(-10deg);
            width: 80%; height: 80%;
            max-width: 500px; max-height: 500px;
            background-image: url(${logoSim});
            background-size: contain; background-repeat: no-repeat; background-position: center;
            opacity: 0.05; pointer-events: none; z-index: 0;
        }
        .z-content { position: relative; z-index: 2; }

        /* Card Branco Compacto */
        .login-content-card { 
            background: white; 
            width: 100%; max-width: 400px; /* Mais estreito */
            border-radius: 20px; 
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); 
            display: flex; flex-direction: column;
            overflow: hidden;
        }

        .institutional-header { padding: 32px 24px 16px; display: flex; flex-direction: column; align-items: center; text-align: center; }
        .img-brasao { height: 48px; margin-bottom: 8px; }
        .text-tjpb { font-size: 11px; color: #64748B; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; }
        
        .login-body { flex: 1; padding: 0 24px 24px; display: flex; flex-direction: column; justify-content: center; }
        .step-title { font-size: 20px; font-weight: 700; color: #1E2939; margin-bottom: 4px; }
        .step-desc { font-size: 14px; color: #64748B; line-height: 1.4; margin-bottom: 24px; }
        
        .gps-circle { width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; transition: all 0.3s; }
        .gps-circle.checking { background: #E0F2FE; color: #0284C7; animation: pulse 1.5s infinite; }
        .gps-circle.success { background: #DCFCE7; color: #166534; }
        .gps-circle.error { background: #FEE2E2; color: #DC2626; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(14, 165, 233, 0); } 100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); } }
        
        .challenge-box { background: #F1F5F9; border: 2px dashed #CBD5E1; border-radius: 8px; font-size: 28px; font-weight: 700; letter-spacing: 6px; color: #334155; padding: 12px; margin-bottom: 20px; font-family: monospace; }
        .text-large { font-size: 20px; letter-spacing: 4px; font-weight: 600; }
        .error-message { display: flex; align-items: center; gap: 6px; color: #EF4444; font-size: 12px; font-weight: 500; }
        .text-success { color: #166534; } .text-error { color: #DC2626; }
        .btn-link { background: none; border: none; color: #64748B; text-decoration: underline; font-size: 13px; cursor: pointer; }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        .login-footer { padding: 16px 24px 24px; text-align: center; color: #CBD5E1; font-size: 11px; margin-top: auto; }
        .footer-line { height: 1px; background: #F1F5F9; margin-bottom: 12px; width: 100%; }

        /* Ajuste Mobile */
        @media (max-width: 480px) {
            .login-container { padding: 0; background: white; }
            .login-content-card { max-width: 100%; height: 100vh; border-radius: 0; box-shadow: none; justify-content: center; }
            .institutional-header { margin-top: auto; }
            .login-footer { margin-bottom: 20px; }
        }
      `}</style>
    </div>
  );
};

export default Login;