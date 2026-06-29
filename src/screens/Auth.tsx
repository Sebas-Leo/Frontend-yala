import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, Button, Icon } from '../ds';
import { useAuth } from '../auth/AuthContext';

const css = `
.au{max-width:440px;margin:0 auto;padding:40px 24px;}
.au__brand{display:flex;flex-direction:column;align-items:center;gap:10px;margin-bottom:24px;}
.au__brand img{height:36px;}
.au__sub{font-size:14px;color:var(--text-muted);text-align:center;}
.au__card{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-sm);}
.au__form{display:flex;flex-direction:column;gap:14px;margin-top:20px;}
.au__row{display:flex;gap:12px;}
.au__note{font-size:12px;color:var(--text-subtle);line-height:1.5;display:flex;gap:6px;align-items:flex-start;margin-top:4px;}
.au__foot{font-size:13px;color:var(--text-muted);text-align:center;margin-top:18px;}
.au__link{color:var(--text-link);font-weight:600;cursor:pointer;}
.au__err{display:flex;gap:8px;align-items:flex-start;font-size:13px;color:var(--danger,#d92d20);background:var(--danger-subtle,#fef3f2);border:1px solid var(--danger,#d92d20);border-radius:var(--radius-md);padding:10px 12px;}
.au__title{font-size:19px;font-weight:800;color:var(--text-strong);letter-spacing:-.01em;margin-bottom:2px;}
@media(max-width:420px){.au{padding:24px 16px;}.au__row{flex-direction:column;gap:14px;}}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

interface AuthProps { onAuth?: (profile: any) => void; }
export default function Auth({ onAuth }: AuthProps) {
  ensure();
  const { login, register } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // El formulario se elige por la ruta: /register = crear cuenta, /login = ingresar.
  const mode = location.pathname === '/register' ? 'register' : 'login';
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState(null);
  // Limpia el error al alternar entre /login y /register.
  React.useEffect(() => { setError(null); }, [location.pathname]);

  // Buyer registration: DNI + names are validated against RENIEC (JSON.pe) in the backend.
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [dni, setDni] = React.useState('');
  const [nombres, setNombres] = React.useState('');
  const [apellidoPaterno, setApellidoPaterno] = React.useState('');
  const [apellidoMaterno, setApellidoMaterno] = React.useState('');
  const dniValid = /^\d{8}$/.test(dni);

  const run = (action) => async (e) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      const profile = await action();
      if (onAuth) onAuth(profile);
    } catch (err) {
      setError((err && err.message) || 'No pudimos completar la operación. Intenta de nuevo.');
    } finally {
      setBusy(false);
    }
  };

  const doLogin = run(() => login({ email, password }));
  const doRegister = run(() => register({ dni, email, password, nombres, apellidoPaterno, apellidoMaterno }));

  const errorBanner = error ? (
    <div className="au__err">
      {Icon.AlertTriangle ? <Icon.AlertTriangle size={15} style={{ flex: 'none', marginTop: 1 }} /> : null}
      <span>{error}</span>
    </div>
  ) : null;

  return (
    <div className="au">
      <div className="au__brand">
        <img src="/assets/yala-logo.png" alt="Yala" />
        <div className="au__sub">Subastas de coleccionables geek.</div>
      </div>
      <div className="au__card">
        {mode === 'login' && (
          <form className="au__form" onSubmit={doLogin}>
            <div className="au__title">Ingresar</div>
            {errorBanner}
            <Input label="Email" type="email" placeholder="tu@email.com" required
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Contraseña" type="password" placeholder="••••••••" required
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="primary" size="lg" fullWidth type="submit" disabled={busy}>
              {busy ? 'Ingresando…' : 'Ingresar'}
            </Button>
            <div className="au__foot">¿No tienes cuenta? <span className="au__link" onClick={() => navigate('/register')}>Crea una</span></div>
          </form>
        )}

        {mode === 'register' && (
          <form className="au__form" onSubmit={doRegister}>
            <div className="au__title">Crear cuenta</div>
            {errorBanner}
            <Input label="DNI" mono inputMode="numeric" maxLength={8} placeholder="12345678" required
              value={dni} onChange={(e) => setDni(e.target.value.replace(/\D/g, '').slice(0, 8))}
              error={dni && !dniValid ? 'El DNI debe tener 8 dígitos.' : undefined} />
            <Input label="Nombres" placeholder="Ana María" required
              value={nombres} onChange={(e) => setNombres(e.target.value)} />
            <div className="au__row">
              <Input label="Apellido paterno" placeholder="Torres" required style={{ flex: 1, minWidth: 0 }}
                value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} />
              <Input label="Apellido materno" placeholder="Quispe" required style={{ flex: 1, minWidth: 0 }}
                value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
            </div>
            <Input label="Email" type="email" placeholder="tu@email.com" required
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Contraseña" type="password" hint="Mín. 8 caracteres." required
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="au__note"><Icon.Shield size={14} style={{ flex: 'none', marginTop: 1 }} /> Validamos tu DNI contra RENIEC. Tus nombres y apellidos deben coincidir con tu documento.</div>
            <Button variant="primary" size="lg" fullWidth type="submit" disabled={busy || !dniValid}>
              {busy ? 'Creando…' : 'Crear cuenta'}
            </Button>
            <div className="au__foot">¿Ya tienes cuenta? <span className="au__link" onClick={() => navigate('/login')}>Ingresar</span></div>
          </form>
        )}
      </div>
    </div>
  );
}
