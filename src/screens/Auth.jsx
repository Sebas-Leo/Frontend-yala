import React from 'react';
import { Tabs, Input, Button, Icon } from '../ds';
import { useAuth } from '../auth/AuthContext.jsx';

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
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

export default function Auth({ onAuth }) {
  ensure();
  const { login, register } = useAuth();
  const [tab, setTab] = React.useState('login');
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Only the fields the backend contract accepts (RequestRegisterDTO/RequestLoginDTO):
  // name, email, password, role. The extra design fields (birth date, address, CCI,
  // phone) stay as UI for now — there is no endpoint to persist them yet.
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const switchTab = (v) => { setTab(v); setError(null); };

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
  const doRegister = run(() => register({ name, email, password, role: 'USER' }));
  const doStore = run(() => register({ name, email, password, role: 'SELLER' }));

  const errorBanner = error ? (
    <div className="au__err">
      {Icon.AlertTriangle ? <Icon.AlertTriangle size={15} style={{ flex: 'none', marginTop: 1 }} /> : null}
      <span>{error}</span>
    </div>
  ) : null;

  return (
    <div className="au">
      <div className="au__brand">
        <img src="/assets/yala-logo.svg" alt="Yala" />
        <div className="au__sub">Subastas de coleccionables geek.</div>
      </div>
      <div className="au__card">
        <Tabs value={tab} onChange={switchTab} tabs={[
          { value: 'login', label: 'Ingresar' },
          { value: 'register', label: 'Crear cuenta' },
          { value: 'store', label: 'Tienda' },
        ]} />

        {tab === 'login' && (
          <form className="au__form" onSubmit={doLogin}>
            {errorBanner}
            <Input label="Email" type="email" placeholder="tu@email.com" required
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Contraseña" type="password" placeholder="••••••••" required
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="primary" size="lg" fullWidth type="submit" disabled={busy}>
              {busy ? 'Ingresando…' : 'Ingresar'}
            </Button>
            <div className="au__foot">¿No tienes cuenta? <span className="au__link" onClick={() => switchTab('register')}>Crea una</span></div>
          </form>
        )}

        {tab === 'register' && (
          <form className="au__form" onSubmit={doRegister}>
            {errorBanner}
            <Input label="Nombre completo" placeholder="Diego Ramírez" required
              value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" type="email" placeholder="tu@email.com" required
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Contraseña" type="password" hint="Mín. 8 caracteres." required
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input label="Fecha de nacimiento" type="date" required />
            <div className="au__note"><Icon.Shield size={14} style={{ flex: 'none', marginTop: 1 }} /> Tienes que ser mayor de 18. El DNI se pide una sola vez, solo al pujar o comprar.</div>
            <Button variant="primary" size="lg" fullWidth type="submit" disabled={busy}>
              {busy ? 'Creando…' : 'Crear cuenta'}
            </Button>
          </form>
        )}

        {tab === 'store' && (
          <form className="au__form" onSubmit={doStore}>
            {errorBanner}
            <Input label="Nombre de la tienda" placeholder="CardVault PE" required
              value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" type="email" placeholder="tienda@email.com" required
              value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="Contraseña" type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input label="Dirección" placeholder="Av. Ejemplo 123, Lima" required />
            <div className="au__row">
              <Input label="CCI" mono placeholder="00219..." required style={{ flex: 1, minWidth: 0 }} />
              <Input label="Teléfono" mono placeholder="+51 9..." style={{ flex: 1, minWidth: 0 }} />
            </div>
            <div className="au__note"><Icon.Wallet size={14} style={{ flex: 'none', marginTop: 1 }} /> El CCI se usa para transferirte el neto (92%) después de cada venta. Tu tienda queda pendiente de aprobación de un admin.</div>
            <Button variant="primary" size="lg" fullWidth type="submit" disabled={busy}>
              {busy ? 'Registrando…' : 'Registrar tienda'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
