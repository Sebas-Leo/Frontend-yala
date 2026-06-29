import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '../ds';
import { useAuth } from '../auth/AuthContext';

const css = `
.vd{max-width:480px;margin:0 auto;padding:64px 24px;text-align:center;}
.vd__icon{display:flex;justify-content:center;margin-bottom:18px;color:var(--brand);}
.vd__spin{width:34px;height:34px;border-radius:50%;border:3px solid var(--border-subtle);border-top-color:var(--brand);animation:vdspin .8s linear infinite;}
@keyframes vdspin{to{transform:rotate(360deg)}}
.vd__h1{font-size:22px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;}
.vd__sub{font-size:14px;color:var(--text-muted);margin:8px 0 22px;line-height:1.5;}
@media(max-width:420px){.vd{padding:36px 18px;}}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

type Phase = 'checking' | 'done' | 'pending';

export default function VerifyDone() {
  ensure();
  const { refreshSession } = useAuth();
  const navigate = useNavigate();
  const [phase, setPhase] = React.useState<Phase>('checking');

  React.useEffect(() => {
    let alive = true;
    let tries = 0;
    const MAX = 6; // ~15s total — the Didit webhook may lag a few seconds.

    const tick = async () => {
      const profile = await refreshSession().catch(() => null);
      if (!alive) return;
      const isSeller = profile && (profile.role === 'SELLER' || profile.isVerifiedSeller);
      if (isSeller) {
        setPhase('done');
        setTimeout(() => { if (alive) navigate('/seller', { replace: true }); }, 1400);
        return;
      }
      tries += 1;
      if (tries < MAX) setTimeout(tick, 2500);
      else setPhase('pending');
    };
    tick();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="vd">
      {phase === 'checking' && (
        <>
          <div className="vd__icon"><div className="vd__spin" /></div>
          <div className="vd__h1">Confirmando tu verificación…</div>
          <div className="vd__sub">Estamos validando tu identidad con Didit. Esto toma unos segundos.</div>
        </>
      )}
      {phase === 'done' && (
        <>
          <div className="vd__icon">{Icon.CheckCircle ? <Icon.CheckCircle size={40} /> : '✓'}</div>
          <div className="vd__h1">¡Listo, ya eres vendedor!</div>
          <div className="vd__sub">Tu identidad fue verificada. Te llevamos a tu panel…</div>
          <Button variant="primary" size="lg" onClick={() => navigate('/seller', { replace: true })}>Ir a mi panel</Button>
        </>
      )}
      {phase === 'pending' && (
        <>
          <div className="vd__icon">{Icon.Clock ? <Icon.Clock size={38} /> : '⏳'}</div>
          <div className="vd__h1">Verificación en proceso</div>
          <div className="vd__sub">Tu verificación puede tardar un momento en confirmarse. Te activaremos como vendedor en cuanto Didit la apruebe; vuelve a intentar en unos minutos.</div>
          <Button variant="primary" size="lg" onClick={() => navigate('/', { replace: true })}>Volver al inicio</Button>
        </>
      )}
    </div>
  );
}
