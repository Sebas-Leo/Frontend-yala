import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, Select, Tag, Button, EmptyState, Icon } from '../ds';
import { getUserListings } from '../api/users';
import { createAuction } from '../api/auctions';
import { useFetch } from '../hooks/useFetch';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../context/ToastContext';
import { isoFromDays, capPrice } from '../utils/format';

const css = `
.ca{max-width:640px;margin:0 auto;padding:24px;}
.ca__back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;margin-bottom:14px;}
.ca__h1{font-size:26px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;margin-bottom:4px;}
.ca__sub{font-size:14px;color:var(--text-muted);margin-bottom:22px;}
.ca__card{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:18px;}
.ca__lbl{font-size:13px;font-weight:600;color:var(--text-strong);margin-bottom:10px;}
.ca__durs{display:flex;gap:10px;flex-wrap:wrap;}
.ca__err{font-size:12px;color:var(--danger);margin-top:6px;}
.ca__hint{font-size:12px;color:var(--text-subtle);display:flex;gap:6px;align-items:flex-start;line-height:1.5;}
.ca__dt{display:flex;gap:12px;}
.ca__dt>*{flex:1;min-width:0;}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

const DURATIONS = [1, 3, 5, 7];

function validate(v: any) {
  const e: any = {};
  if (!v.listingId) e.listingId = 'Elige una publicación.';
  if (!v.startingPrice || Number(v.startingPrice) < 0) e.startingPrice = 'Ingresa un precio inicial válido.';
  return e;
}

interface CreateAuctionProps { onBack?: () => void; onCreate?: () => void; }
export default function CreateAuction({ onBack }: CreateAuctionProps) {
  ensure();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const toast = useToast();
  const preselected = location.state?.listingId;

  // The seller's own AUCTION listings that don't already have an active auction.
  const listingsQ = useFetch(
    (signal) => getUserListings(user.id, { page: 0, size: 100, signal }),
    [user?.id],
    { enabled: !!user?.id },
  );
  const eligible = (listingsQ.data?.content || []).filter(
    (l) => l.mode === 'AUCTION' && (!l.auction || l.auction.status !== 'ACTIVE'),
  );

  const form = useForm({
    initial: { listingId: preselected ? String(preselected) : '', startingPrice: '', endDate: '', endTime: '' },
    validate,
  });
  const [duration, setDuration] = React.useState(3);

  const submit = () =>
    form.handleSubmit(async (v) => {
      try {
        // Fecha + hora locales (sin Z) -> LocalDateTime del backend. Si no hay fecha, usa la duración elegida.
        const endsAt = v.endDate ? `${v.endDate}T${v.endTime || '23:59'}:00` : isoFromDays(duration);
        await createAuction({
          listingId: Number(v.listingId),
          startingPrice: Number(v.startingPrice),
          endsAt,
        });
        toast.success('Subasta creada', 'La subasta arranca según lo que programaste.', 'Gavel');
        navigate('/seller');
      } catch (err) {
        toast.error('No se pudo crear la subasta', err.message || 'Revisa los datos e intenta de nuevo.');
      }
    });

  return (
    <div className="ca">
      <div className="ca__back" onClick={onBack}><Icon.ChevronLeft size={16} /> Panel del vendedor</div>
      <div className="ca__h1">Nueva subasta</div>
      <div className="ca__sub">Elige una publicación tuya y define el precio inicial y la duración.</div>

      {!listingsQ.loading && eligible.length === 0 ? (
        <EmptyState icon={<Icon.Package size={24} />} title="No tienes publicaciones disponibles"
          description="Crea primero una publicación en modo subasta para poder abrir una subasta."
          actions={<Button variant="primary" onClick={() => navigate('/seller/new-listing')}>Crear publicación</Button>} />
      ) : (
        <form className="ca__card" onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <div>
            <Select label="Publicación" placeholder={listingsQ.loading ? 'Cargando…' : 'Elige una de tus publicaciones'}
              value={form.values.listingId} onChange={form.handleChange('listingId')}
              options={eligible.map((l) => ({ value: String(l.id), label: l.title }))} required />
            {form.errors.listingId && <div className="ca__err">{form.errors.listingId}</div>}
          </div>

          <div>
            <Input label="Precio inicial (S/.)" prefix="S/." mono placeholder="0.00" hint="Es la puja mínima de apertura."
              value={form.values.startingPrice} onChange={(e) => form.setValue('startingPrice', capPrice(e.target.value))}
              error={form.errors.startingPrice} required />
          </div>

          <div>
            <div className="ca__lbl">Duración</div>
            <div className="ca__durs">
              {DURATIONS.map((d) => <Tag key={d} selected={duration === d} onClick={() => { setDuration(d); form.setValue('endDate', ''); form.setValue('endTime', ''); }}>{d} {d === 1 ? 'día' : 'días'}</Tag>)}
            </div>
          </div>

          <div>
            <div className="ca__lbl">Fin exacto (opcional)</div>
            <div className="ca__dt">
              <Input label="Fecha" type="date" value={form.values.endDate} onChange={form.handleChange('endDate')} />
              <Input label="Hora" type="time" value={form.values.endTime} onChange={form.handleChange('endTime')} />
            </div>
            <div className="ca__hint" style={{ marginTop: 8 }}><Icon.Clock size={13} style={{ flex: 'none', marginTop: 1 }} /> Si lo dejas vacío, cierra según la duración elegida (la hora por defecto es 23:59).</div>
          </div>

          <div className="ca__hint"><Icon.Clock size={14} style={{ flex: 'none', marginTop: 1 }} /> Al cerrar con pujas se crea una orden para el ganador con 48h para pagar.</div>

          <Button variant="primary" size="lg" fullWidth type="submit" disabled={form.submitting}>{form.submitting ? 'Creando…' : 'Crear subasta'}</Button>
        </form>
      )}
    </div>
  );
}
