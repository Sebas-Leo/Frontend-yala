import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReputationStars, Textarea, Button, Avatar, EmptyState, Skeleton, Icon } from '../ds';
import { getOrder } from '../api/orders';
import { createReview } from '../api/reviews';
import { orderFromDto } from '../api/adapters';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../context/ToastContext';

const css = `
.rv{max-width:560px;margin:0 auto;padding:32px 24px;}
.rv__back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;margin-bottom:14px;}
.rv__h1{font-size:24px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;margin-bottom:4px;}
.rv__sub{font-size:14px;color:var(--text-muted);margin-bottom:20px;}
.rv__card{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:22px;box-shadow:var(--shadow-sm);}
.rv__item{display:flex;align-items:center;gap:12px;padding-bottom:18px;border-bottom:1px solid var(--border-subtle);margin-bottom:18px;}
.rv__img{width:56px;height:56px;border-radius:var(--radius-md);object-fit:cover;background:var(--surface-sunken);flex:none;}
.rv__ititle{font-size:14px;font-weight:700;color:var(--text-strong);}
.rv__iparty{font-size:13px;color:var(--text-muted);display:flex;align-items:center;gap:6px;margin-top:3px;}
.rv__lbl{font-size:13px;font-weight:700;color:var(--text-strong);margin-bottom:10px;}
.rv__stars{margin-bottom:20px;}
.rv__actions{display:flex;gap:10px;margin-top:18px;}
.rv__note{font-size:12px;color:var(--text-subtle);display:flex;gap:6px;align-items:flex-start;margin-top:14px;line-height:1.5;}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

const RATING_LABELS = { 0: 'Toca una estrella', 1: 'Muy malo', 2: 'Malo', 3: 'Regular', 4: 'Bueno', 5: 'Excelente' };

interface ReviewProps { onBack?: () => void; onSubmit?: () => void; }
export default function Review({ onBack }: ReviewProps) {
  ensure();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();

  const { data, loading, error } = useFetch((signal) => getOrder(orderId, { signal }), [orderId], { enabled: !!orderId });
  const o = data ? orderFromDto(data, user?.id) : null;

  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const submit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    try {
      await createReview({ orderId: Number(orderId), rating, comment: comment.trim() || undefined });
      toast.success('Reseña publicada', 'Gracias por calificar tu experiencia.', 'Star');
      navigate('/orders');
    } catch (err) {
      toast.error('No se pudo publicar la reseña', err.message || 'La orden debe estar confirmada.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="rv"><Skeleton style={{ height: 200, borderRadius: 16 }} /></div>;
  }
  if (error || !o) {
    return <div className="rv">
      <EmptyState icon={<Icon.AlertTriangle size={26} />} title="No pudimos cargar la orden"
        description={error?.message || 'La orden no existe o no tienes acceso.'}
        actions={<Button variant="secondary" onClick={() => navigate('/orders')}>Mis órdenes</Button>} />
    </div>;
  }

  return (
    <div className="rv">
      <div className="rv__back" onClick={onBack}><Icon.ChevronLeft size={16} /> Mis órdenes</div>
      <div className="rv__h1">Deja tu reseña</div>
      <div className="rv__sub">La reseña es mutua: tú calificas a la contraparte y la contraparte te califica a ti.</div>

      <div className="rv__card">
        <div className="rv__item">
          <img className="rv__img" src={o.image} alt="" />
          <div style={{ minWidth: 0 }}>
            <div className="rv__ititle">{o.title}</div>
            <div className="rv__iparty"><Avatar name={o.party} size={18} /> {o.party} · orden #{o.id}</div>
          </div>
        </div>

        <div className="rv__lbl">¿Cómo fue tu experiencia?</div>
        <div className="rv__stars">
          <ReputationStars interactive value={rating} size={34} onRate={setRating} />
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>{RATING_LABELS[rating]}</div>
        </div>

        <Textarea label="Tu comentario (opcional)" maxLength={1000} rows={4}
          placeholder="Cuenta cómo fue la compra: el estado del ítem, el envío, la comunicación…"
          value={comment} onChange={(e) => setComment(e.target.value)} />

        <div className="rv__note"><Icon.Shield size={14} style={{ flex: 'none', marginTop: 1 }} /> Las reseñas no se pueden editar ni borrar una vez publicadas. Solo se permiten con la orden confirmada.</div>

        <div className="rv__actions">
          <Button variant="ghost" onClick={onBack} disabled={submitting}>Cancelar</Button>
          <Button variant="primary" fullWidth disabled={rating === 0 || submitting} onClick={submit}>{submitting ? 'Publicando…' : 'Publicar reseña'}</Button>
        </div>
      </div>
    </div>
  );
}
