import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Price, Countdown, Avatar, ReputationStars, Button, Input, Textarea, Select, StatusBadge,
  Dialog, DniGate, EmptyState, Skeleton, Icon,
} from '../ds';
import { getListing, updateListing, cancelListing } from '../api/listings';
import { getAuction, updateAuction } from '../api/auctions';
import { listCategories } from '../api/categories';
import { listBids, placeBid as placeBidApi } from '../api/bids';
import { subscribeAuction } from '../api/realtime';
import { listingFromDto, bidFromDto } from '../api/adapters';
import { capPrice } from '../utils/format';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../context/ToastContext';
import { haptics } from '../utils/haptics';
import type { AuctionUpdateMessage } from '../types';

const css = `
.yal{max-width:1180px;margin:0 auto;padding:24px;display:grid;grid-template-columns:1.15fr 1fr;gap:32px;align-items:start;}
.yal__back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;margin-bottom:14px;}
.yal__gallery{display:flex;flex-direction:column;gap:12px;}
.yal__hero{position:relative;aspect-ratio:1/1;border-radius:var(--radius-xl);overflow:hidden;background:var(--surface-sunken);border:1px solid var(--border-subtle);}
.yal__hero img{width:100%;height:100%;object-fit:cover;display:block;}
.yal__herobadge{position:absolute;top:14px;left:14px;}
.yal__thumbs{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;}
.yal__thumb{aspect-ratio:1/1;border-radius:var(--radius-md);overflow:hidden;border:2px solid var(--border-subtle);cursor:pointer;background:var(--surface-sunken);transition:border-color var(--dur-fast);}
.yal__thumb img{width:100%;height:100%;object-fit:cover;display:block;}
.yal__thumb--active{border-color:var(--brand);}
.yal__info{min-width:0;}
.yal__cat{font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--brand);margin-bottom:8px;}
.yal__title{font-size:28px;font-weight:800;color:var(--text-strong);line-height:1.18;letter-spacing:-.02em;margin-bottom:14px;text-wrap:balance;}
.yal__livebox{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:20px;box-shadow:var(--shadow-sm);margin-bottom:18px;}
.yal__owneractions{display:flex;gap:10px;margin:-4px 0 16px;}
.yal__lr{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:6px;flex-wrap:wrap;}
.yal__lbl{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--live-hover);margin-bottom:6px;display:flex;align-items:center;gap:6px;}
.yal__livedot{width:8px;height:8px;border-radius:50%;background:var(--brand);}
.yal__cdwrap{text-align:right;min-width:0;}
.yal__cdwrap .yds-cd__b{min-width:42px;}
.yal__bidsno{font-family:var(--font-mono);font-size:13px;color:var(--text-muted);display:flex;align-items:center;gap:5px;margin-top:10px;}
.yal__bidform{display:flex;gap:10px;align-items:flex-end;margin-top:16px;padding-top:16px;border-top:1px solid var(--live-border);}
.yal__hint{font-size:12px;color:var(--text-muted);margin-top:9px;line-height:1.5;display:flex;gap:6px;align-items:flex-start;}
.yal__seller{display:flex;align-items:center;gap:12px;padding:14px;border:1px solid var(--border-subtle);border-radius:var(--radius-lg);margin-bottom:18px;}
.yal__smeta{flex:1;min-width:0;}
.yal__sname{font-size:14px;font-weight:700;color:var(--text-strong);display:flex;align-items:center;gap:6px;}
.yal__sverif{font-size:12px;color:var(--success);font-weight:600;display:flex;align-items:center;gap:4px;}
.yal__sec{margin-bottom:18px;}
.yal__sectt{font-size:13px;font-weight:700;color:var(--text-strong);margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;}
.yal__desc{font-size:14px;color:var(--text-body);line-height:1.6;}
.yal__hist{display:flex;flex-direction:column;border:1px solid var(--border-subtle);border-radius:var(--radius-lg);overflow:hidden;}
.yal__brow{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border-subtle);font-size:13px;}
.yal__brow:last-child{border-bottom:none;}
.yal__brow--lead{background:var(--live-50);}
.yal__bu{font-weight:600;color:var(--text-strong);flex:1;display:flex;align-items:center;gap:7px;}
.yal__btime{font-size:11px;color:var(--text-subtle);font-family:var(--font-mono);}
.yal__bamt{font-family:var(--font-mono);font-weight:700;color:var(--text-strong);font-variant-numeric:tabular-nums;}
.yal__brow--lead .yal__bamt{color:var(--live-700);}
.yal__leadtag{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--live-hover);background:var(--live-100);padding:2px 7px;border-radius:999px;}
.yal__tick{animation:yala-tick 1.2s var(--ease-out);}
.yal__empty{max-width:1180px;margin:0 auto;padding:48px 24px;}
@media(max-width:960px){.yal{grid-template-columns:1fr}}
@media(max-width:760px){.yal{padding:16px}.yal__thumbs{grid-template-columns:repeat(3,1fr)}}
@media(max-width:480px){.yal__thumbs{grid-template-columns:repeat(2,1fr)}}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

function increment(current) {
  return Math.max(1, Math.round((Number(current) || 0) * 0.01));
}

const CONDITIONS = ['Sellado', 'Como nuevo', 'Con desgaste'];

interface AuctionLiveProps { verified?: any; onRequireDni?: () => void; onBack?: () => void }

export default function AuctionLive({ verified = false, onRequireDni, onBack }: AuctionLiveProps) {
  ensure();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const toast = useToast();

  // 1) The listing carries the gallery, seller, description and the auction id.
  const listingQ = useFetch((signal) => getListing(id, { signal }), [id]);
  const listing = listingQ.data ? listingFromDto(listingQ.data) : null;
  const auctionId = listing?.auction?.id ?? null;

  // 2) Auction detail + bid history (only once we know the auction id). Refetched
  //    by the polling effect and after placing a bid for a near-live feel.
  const auctionQ = useFetch(
    (signal) =>
      Promise.all([
        getAuction(auctionId, { signal }),
        // The bid history requires auth; for guests it 401s. Degrade gracefully
        // to an empty list — the live price/count still come from the auction.
        listBids(auctionId, { size: 25, signal }).catch(() => ({ content: [] })),
      ]).then(([auction, bids]) => ({ auction, bids })),
    [auctionId],
    { enabled: !!auctionId },
  );

  const auction = auctionQ.data?.auction || null;
  const bidsPage = auctionQ.data?.bids || null;

  // Live overlay applied from STOMP `/topic/auction/{id}` messages — gives an
  // instant price/status update ahead of the refetched detail.
  const [live, setLive] = React.useState<AuctionUpdateMessage | null>(null);

  const current = Number(live?.currentPrice ?? auction?.currentPrice ?? listing?.auction?.currentPrice ?? 0);
  const status = live?.status || auction?.status || listing?.auction?.status || 'ACTIVE';
  const isActive = status === 'ACTIVE';
  const inc = increment(current);

  const history = React.useMemo(() => {
    const rows = (bidsPage?.content || []).map((b) => bidFromDto(b));
    rows.sort((a, b) => b.amount - a.amount);
    if (rows[0]) rows[0].leader = true;
    return rows;
  }, [bidsPage]);
  const totalBids = live?.totalBids ?? auction?.totalBids ?? history.length;

  const [activeImg, setActiveImg] = React.useState(0);
  const [bid, setBid] = React.useState(0);
  const [bumped, setBumped] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showGate, setShowGate] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  // Owner management (edit / delete the static auction).
  const catsQ = useFetch((signal) => listCategories({ signal }), []);
  const [showEdit, setShowEdit] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [savingOwner, setSavingOwner] = React.useState(false);
  const [form, setForm] = React.useState<any>({ title: '', description: '', condition: '', categoryId: '', startingPrice: '', endsAt: '' });

  // Keep the suggested bid in sync as the current price climbs.
  const prevCurrent = React.useRef(current);
  React.useEffect(() => {
    setBid(Math.min(9999, current + inc));
    if (prevCurrent.current && current > prevCurrent.current) {
      setBumped(true);
      const t = setTimeout(() => setBumped(false), 1300);
      prevCurrent.current = current;
      return () => clearTimeout(t);
    }
    prevCurrent.current = current;
    return undefined;
  }, [current, inc]);

  // Safety-net polling: STOMP (`subscribeAuction`) is the primary live channel;
  // this slow poll only covers the case where the socket never connects.
  React.useEffect(() => {
    if (!auctionId || !isActive) return undefined;
    const t = setInterval(() => auctionQ.refetch(), 20000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionId, isActive]);

  // Stable handles so the subscription effect can depend only on auctionId
  // (no re-subscribe churn on every render).
  const userRef = React.useRef(user);
  userRef.current = user;
  const refetchRef = React.useRef(auctionQ.refetch);
  refetchRef.current = auctionQ.refetch;
  // The amount of my most recent bid — used to detect when I've been outbid.
  const myLastBid = React.useRef(0);

  // Live channel: subscribe to the auction topic and apply each
  // AuctionUpdateMessage. Field names mirror the backend record exactly
  // (currentPrice, totalBids, status, latestBid, winnerUsername).
  React.useEffect(() => {
    if (!auctionId) return undefined;
    setLive(null);
    const unsub = subscribeAuction<AuctionUpdateMessage>(auctionId, (payload) => {
      if (!payload) return;
      setLive(payload);
      const price = Number(payload.currentPrice ?? 0);
      // Outbid: my last bid was surpassed. Buzz once, then disarm.
      if (myLastBid.current > 0 && price > myLastBid.current) {
        haptics.outbid();
        myLastBid.current = 0;
      }
      // Won: the auction closed and I'm the named winner. `winnerUsername` is
      // built from User.getName() on the backend, so it matches `user.name`.
      const me = userRef.current;
      if (payload.status === 'FINISHED' && payload.winnerUsername && me && payload.winnerUsername === me.name) {
        haptics.won();
      }
      // Pull fresh detail + history so the bid list reflects the new state.
      if (refetchRef.current) refetchRef.current();
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionId]);

  const onPlaceClick = () => {
    if (!isAuthenticated) {
      toast.error('Inicia sesión', 'Necesitas una cuenta para pujar en Yala.');
      navigate('/login');
      return;
    }
    if (!verified) { setShowGate(true); return; }
    if (bid <= current) { toast.error('Puja insuficiente', `Tu puja debe superar S/. ${current.toLocaleString('es-PE')}.`); return; }
    setShowConfirm(true);
  };

  const confirmBid = async () => {
    setSubmitting(true);
    try {
      await placeBidApi({ auctionId, amount: bid });
      myLastBid.current = bid; // remember it to detect a later outbid
      haptics.bidPlaced();
      setShowConfirm(false);
      toast.success('¡Puja registrada!', `Vas liderando con S/. ${bid.toLocaleString('es-PE')}.`, 'Gavel');
      auctionQ.refetch();
    } catch (err) {
      setShowConfirm(false);
      // 409 = optimistic-lock conflict: someone bid at the same instant and the
      // price moved. Refresh and tell the user the real new price.
      if (err && err.status === 409) {
        toast.error('Te ganaron de mano', 'Otra persona pujó al mismo tiempo y el precio subió. Mira el nuevo valor e intenta de nuevo.');
        auctionQ.refetch();
      } else {
        toast.error('No se pudo pujar', err.message || 'Intenta nuevamente.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const openEdit = () => {
    setForm({
      title: listing.title || '',
      description: listing.description || '',
      condition: listing.condition || '',
      categoryId: String(listingQ.data?.category?.id ?? ''),
      startingPrice: String(auction?.startingPrice ?? current ?? ''),
      endsAt: (listing.auction?.endsAt || '').slice(0, 16),
    });
    setShowEdit(true);
  };

  const saveEdit = async () => {
    setSavingOwner(true);
    try {
      await updateListing(listing.id, {
        title: form.title.trim(),
        description: form.description.trim(),
        mode: 'AUCTION',
        condition: form.condition,
        categoryId: Number(form.categoryId),
      });
      // Price/date are only editable while the auction has no bids.
      if (totalBids === 0 && listing.auction?.id) {
        const endsAt = form.endsAt && form.endsAt.length === 16 ? `${form.endsAt}:00` : form.endsAt;
        await updateAuction(listing.auction.id, { startingPrice: Number(form.startingPrice), endsAt });
      }
      toast.success('Subasta actualizada', 'Los cambios se guardaron.', 'Check');
      setShowEdit(false);
      listingQ.refetch();
      auctionQ.refetch();
    } catch (err) {
      toast.error('No se pudo actualizar', err.message || 'Revisa los datos e intenta de nuevo.');
    } finally {
      setSavingOwner(false);
    }
  };

  const doDelete = async () => {
    setSavingOwner(true);
    try {
      await cancelListing(listing.id);
      toast.success('Publicación eliminada', 'Tu subasta fue retirada.');
      navigate('/seller');
    } catch (err) {
      toast.error('No se pudo eliminar', err.message || 'Intenta nuevamente.');
    } finally {
      setSavingOwner(false);
    }
  };

  // --- Loading / error / not-an-auction states ------------------------------
  if (listingQ.loading) {
    return (
      <div className="yal" style={{ paddingTop: 28 }}>
        <Skeleton style={{ aspectRatio: '1/1', borderRadius: 16 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Skeleton style={{ height: 28, width: '70%' }} />
          <Skeleton style={{ height: 160, borderRadius: 16 }} />
          <Skeleton style={{ height: 64, borderRadius: 12 }} />
        </div>
      </div>
    );
  }
  if (listingQ.error || !listing) {
    return (
      <div className="yal__empty">
        <EmptyState icon={<Icon.AlertTriangle size={26} />} title="No encontramos esta subasta"
          description={listingQ.error?.message || 'La publicación no existe o fue retirada.'}
          actions={<Button variant="secondary" onClick={() => navigate('/inicio')}>Volver al inicio</Button>} />
      </div>
    );
  }
  if (!listing.auction) {
    const owner = !!(user && listing.seller && user.id === listing.seller.id);
    return (
      <div className="yal__empty">
        <EmptyState icon={<Icon.Gavel size={26} />} title="Esta subasta aún no está disponible"
          description={owner
            ? 'Termina de configurar tu subasta: define el precio inicial y la fecha de cierre.'
            : 'Esta subasta todavía no está activa. Vuelve más tarde.'}
          actions={owner
            ? <Button variant="primary" onClick={() => navigate('/seller/new-auction', { state: { listingId: listing.id, title: listing.title } })}>Configurar subasta</Button>
            : <Button variant="secondary" onClick={() => navigate('/inicio')}>Volver al inicio</Button>} />
      </div>
    );
  }

  const gallery = listing.images;
  const seller: any = listing.seller || {};
  const isOwner = !!(user && seller && user.id === seller.id);

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', padding: '20px 24px 0' }}>
      <div className="yal__back" onClick={onBack}><Icon.ChevronLeft size={16} /> Volver al marketplace</div>
      <div className="yal" style={{ padding: 0 }}>
        <div className="yal__gallery">
          <div className="yal__hero">
            <div className="yal__herobadge"><StatusBadge kind="auction" status={status} /></div>
            <img src={gallery[activeImg] || gallery[0]} alt={listing.title} />
          </div>
          {gallery.length > 1 && (
            <div className="yal__thumbs">
              {gallery.map((g, i) => (
                <div key={i} className={`yal__thumb${i === activeImg ? ' yal__thumb--active' : ''}`} onClick={() => setActiveImg(i)}>
                  <img src={g} alt="" />
                </div>
              ))}
            </div>
          )}
          {listing.description && (
            <div className="yal__sec" style={{ marginTop: 8 }}>
              <div className="yal__sectt">Descripción</div>
              <p className="yal__desc">{listing.description}</p>
            </div>
          )}
        </div>

        <div className="yal__info">
          <div className="yal__cat">{listing.category}{listing.condition ? ` · ${listing.condition}` : ''}</div>
          <h1 className="yal__title">{listing.title}</h1>

          {isOwner && (
            <div className="yal__owneractions">
              <Button variant="secondary" size="sm" onClick={openEdit}>Editar</Button>
              <Button variant="ghost" size="sm" onClick={() => setShowDelete(true)}>Eliminar</Button>
            </div>
          )}

          <div className="yal__livebox">
            <div className="yal__lr">
              <div>
                <div className="yal__lbl"><span className="yal__livedot" /> {isActive ? 'Puja actual' : 'Precio final'}</div>
                <Price value={current} size={40} live={false} className={bumped ? 'yal__tick' : ''} />
              </div>
              <div className="yal__cdwrap">
                <div className="yal__lbl" style={{ justifyContent: 'flex-end' }}><Icon.Clock size={13} /> {isActive ? 'Cierra en' : 'Finalizada'}</div>
                {isActive && <Countdown endsAt={listing.auction.endsAt} variant="auction" showDot={false} />}
              </div>
            </div>
            <div className="yal__bidsno"><Icon.Gavel size={14} /> {totalBids} {totalBids === 1 ? 'puja' : 'pujas'} · incremento sugerido S/. {inc.toLocaleString('es-PE')} (1%)</div>

            {isActive && (
              <>
                <div className="yal__bidform">
                  <Input label="Tu puja" prefix="S/." mono size="lg" value={bid}
                    onChange={(e) => setBid(Math.min(9999, Number(e.target.value.replace(/\D/g, '')) || 0))} style={{ flex: 1, minWidth: 0 }} />
                  <Button variant="primary" size="lg" iconLeft={<Icon.Gavel size={18} />} onClick={onPlaceClick} disabled={submitting}>Pujar</Button>
                </div>
                <div className="yal__hint">
                  <Icon.AlertTriangle size={14} style={{ color: 'var(--warning)', flex: 'none', marginTop: 1 }} />
                  <span>Tu puja debe superar la actual. No puedes pujar dos veces seguidas ni sobre tu propia subasta.</span>
                </div>
              </>
            )}
          </div>

          <div className="yal__seller">
            <Avatar name={seller.name} verified={seller.verified} size="lg" />
            <div className="yal__smeta">
              <div className="yal__sname">{seller.name} {seller.verified && <span className="yal__sverif"><Icon.Shield size={13} /> verificada</span>}</div>
              {seller.rating != null && <ReputationStars value={seller.rating} size={15} />}
            </div>
            <Button variant="secondary" size="sm" onClick={() => seller.id && navigate('/seller/' + seller.id)}>Ver perfil</Button>
          </div>

          <div className="yal__sec">
            <div className="yal__sectt"><span>Historial de pujas</span><span style={{ fontWeight: 500, color: 'var(--text-muted)', fontSize: 12 }}>en tiempo real</span></div>
            {history.length === 0 ? (
              <div className="yal__desc" style={{ color: 'var(--text-muted)' }}>Todavía no hay pujas. ¡Sé el primero!</div>
            ) : (
              <div className="yal__hist">
                {history.map((b) => {
                  const mine = user && b.bidderId === user.id;
                  return (
                    <div key={b.id} className={`yal__brow${b.leader ? ' yal__brow--lead' : ''}`}>
                      <span className="yal__bu"><Avatar name={b.user} size={22} /> {mine ? 'tú' : b.user} {b.leader && <span className="yal__leadtag">líder</span>}</span>
                      <span className="yal__btime">{b.time}</span>
                      <span className="yal__bamt">S/. {b.amount.toLocaleString('es-PE')}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirm && (
        <Dialog open onClose={() => setShowConfirm(false)} tone="live" icon={<Icon.Gavel size={20} />}
          title="Confirma tu puja"
          description={`Vas a pujar S/. ${bid.toLocaleString('es-PE')} por ${listing.title}.`}
          footer={<><Button variant="ghost" onClick={() => setShowConfirm(false)} disabled={submitting}>Cancelar</Button><Button variant="live" onClick={confirmBid} disabled={submitting}>{submitting ? 'Pujando…' : 'Confirmar puja'}</Button></>}>
          <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.55 }}>
            Si ganas, tendrás <b style={{ color: 'var(--text-strong)' }}>48 horas</b> para pagar. Las pujas no se pueden retirar.
          </div>
        </Dialog>
      )}
      {showGate && (
        <Dialog open onClose={() => setShowGate(false)} width={500}>
          <DniGate action="pujar"
            primaryAction={<Button fullWidth onClick={() => { setShowGate(false); onRequireDni && onRequireDni(); }}>Verificar mi identidad</Button>}
            secondaryAction={<Button variant="ghost" fullWidth onClick={() => setShowGate(false)}>Ahora no</Button>} />
        </Dialog>
      )}

      {showEdit && (
        <Dialog open onClose={() => setShowEdit(false)} width={540} title="Editar subasta"
          footer={<><Button variant="ghost" onClick={() => setShowEdit(false)} disabled={savingOwner}>Cancelar</Button><Button variant="primary" onClick={saveEdit} disabled={savingOwner}>{savingOwner ? 'Guardando…' : 'Guardar cambios'}</Button></>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input label="Título" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            <Textarea label="Descripción" rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            <Select label="Condición" value={form.condition} onChange={(e) => setForm((f) => ({ ...f, condition: e.target.value }))} options={CONDITIONS} />
            <Select label="Categoría" value={form.categoryId} onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
              options={(catsQ.data || []).map((c) => ({ value: String(c.id), label: c.name }))} />
            {totalBids === 0 ? (
              <div style={{ display: 'flex', gap: 12 }}>
                <Input label="Precio inicial (S/.)" prefix="S/." mono value={form.startingPrice}
                  onChange={(e) => setForm((f) => ({ ...f, startingPrice: capPrice(e.target.value) }))} style={{ flex: 1, minWidth: 0 }} />
                <Input label="Cierre" type="datetime-local" value={form.endsAt}
                  onChange={(e) => setForm((f) => ({ ...f, endsAt: e.target.value }))} style={{ flex: 1, minWidth: 0 }} />
              </div>
            ) : (
              <div className="yal__hint"><Icon.AlertTriangle size={14} style={{ color: 'var(--warning)', flex: 'none', marginTop: 1 }} /><span>No puedes cambiar el precio inicial ni la fecha: la subasta ya tiene pujas.</span></div>
            )}
          </div>
        </Dialog>
      )}

      {showDelete && (
        <Dialog open onClose={() => setShowDelete(false)} title="Eliminar publicación"
          description={`¿Seguro que quieres eliminar "${listing.title}"? Se retira la subasta del marketplace.`}
          footer={<><Button variant="ghost" onClick={() => setShowDelete(false)} disabled={savingOwner}>Cancelar</Button><Button variant="primary" onClick={doDelete} disabled={savingOwner}>{savingOwner ? 'Eliminando…' : 'Eliminar'}</Button></>}>
          <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>Si la subasta ya tiene pujas, considera dejarla activa hasta que cierre.</div>
        </Dialog>
      )}
    </div>
  );
}
