import React from 'react';
import { Input, Button, Icon } from '../ds';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../context/ToastContext';
import { applySeller, getMyApplication } from '../api/seller';
import { useFetch } from '../hooks/useFetch';

const css = `
.sa{max-width:520px;margin:0 auto;padding:40px 24px;}
.sa__h1{font-size:24px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;}
.sa__sub{font-size:14px;color:var(--text-muted);margin:6px 0 22px;}
.sa__card{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-sm);}
.sa__form{display:flex;flex-direction:column;gap:14px;}
.sa__row{display:flex;gap:12px;}
.sa__note{font-size:12px;color:var(--text-subtle);line-height:1.5;display:flex;gap:6px;align-items:flex-start;}
.sa__err{display:flex;gap:8px;align-items:flex-start;font-size:13px;color:var(--danger,#d92d20);background:var(--danger-subtle,#fef3f2);border:1px solid var(--danger,#d92d20);border-radius:var(--radius-md);padding:10px 12px;}
.sa__pending{display:flex;gap:10px;align-items:flex-start;font-size:14px;color:var(--text-body);background:var(--surface-sunken);border-radius:var(--radius-md);padding:14px 16px;}
@media(max-width:420px){.sa{padding:24px 16px;}.sa__row{flex-direction:column;}}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

interface Props { onBack?: () => void; onAlreadySeller?: () => void; }

export default function SellerApply({ onBack, onAlreadySeller }: Props) {
  ensure();
  const { isVerifiedSeller, role } = useAuth();
  const toast = useToast();

  const [storeName, setStoreName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [cci, setCci] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Already a seller → bounce out.
  React.useEffect(() => {
    if (isVerifiedSeller || role === 'SELLER') onAlreadySeller && onAlreadySeller();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerifiedSeller, role]);

  const { data: existing } = useFetch((signal) => getMyApplication({ signal }), []);
  const pending = existing && existing.status === 'PENDING';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    try {
      const app = await applySeller({ storeName, address: address || undefined, phone, cci });
      if (app?.diditUrl) {
        // Send the user to Didit to complete the KYC; approval promotes them to seller.
        window.location.href = app.diditUrl;
        return;
      }
      toast.success('Solicitud enviada', 'Tu aplicación quedó registrada. Te avisaremos al aprobar tu verificación.');
      onBack && onBack();
    } catch (err: any) {
      setError(err?.message || 'No pudimos enviar tu solicitud. Intenta de nuevo.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="sa">
      <div className="sa__h1">Conviértete en vendedor</div>
      <div className="sa__sub">Completa los datos de tu tienda. Verificamos tu identidad con Didit antes de activarte como vendedor.</div>
      <div className="sa__card">
        {pending && (
          <div className="sa__pending" style={{ marginBottom: 14 }}>
            <Icon.Clock size={16} />
            <span>Ya tienes una solicitud <b>pendiente</b>. Si no completaste la verificación, vuelve a enviar el formulario para reanudar el KYC.</span>
          </div>
        )}
        <form className="sa__form" onSubmit={submit}>
          {error && (
            <div className="sa__err">
              {Icon.AlertTriangle ? <Icon.AlertTriangle size={15} style={{ flex: 'none', marginTop: 1 }} /> : null}
              <span>{error}</span>
            </div>
          )}
          <Input label="Nombre de la tienda" placeholder="CardVault PE" required
            value={storeName} onChange={(e: any) => setStoreName(e.target.value)} />
          <Input label="Dirección del local (opcional)" placeholder="Av. Ejemplo 123, Lima"
            value={address} onChange={(e: any) => setAddress(e.target.value)} />
          <div className="sa__row">
            <Input label="Celular / WhatsApp" mono placeholder="+51 999 999 999" required style={{ flex: 1, minWidth: 0 }}
              value={phone} onChange={(e: any) => setPhone(e.target.value)} />
            <Input label="CCI" mono placeholder="002193000..." required style={{ flex: 1, minWidth: 0 }}
              value={cci} onChange={(e: any) => setCci(e.target.value.replace(/\D/g, ''))} />
          </div>
          <div className="sa__note"><Icon.Wallet size={14} style={{ flex: 'none', marginTop: 1 }} /> El CCI se usa para transferirte tus ventas. Tras enviar, completarás la verificación de identidad (Didit).</div>
          <Button variant="primary" size="lg" fullWidth type="submit" disabled={busy}>
            {busy ? 'Enviando…' : 'Enviar y verificar identidad'}
          </Button>
          {onBack && <Button variant="ghost" size="sm" onClick={onBack} type="button">Cancelar</Button>}
        </form>
      </div>
    </div>
  );
}
