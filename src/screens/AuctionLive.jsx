import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Price, Countdown, Avatar, ReputationStars, Button, Input, StatusBadge,
  Dialog, DniGate, EmptyState, Skeleton, Icon,
} from '../ds';
import { getListing } from '../api/listings.js';
import { getAuction } from '../api/auctions.js';
import { listBids, placeBid as placeBidApi } from '../api/bids.js';
import { listingFromDto, bidFromDto } from '../api/adapters.js';
import { useFetch } from '../hooks/useFetch.js';
import { useAuth } from '../auth/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

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
.yal__livebox{background:linear-gradient(165deg,var(--live-50),var(--surface-card));border:1px solid var(--live-border);border-radius:var(--radius-xl);padding:20px;box-shadow:var(--shadow-live);margin-bottom:18px;}
.yal__lr{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:6px;}
.yal__lbl{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--live-hover);margin-bottom:6px;display:flex;align-items:center;gap:6px;}
.yal__livedot{width:8px;height:8px;border-radius:50%;background:var(--live);animation:yala-live-pulse 1.4s infinite;}
.yal__cdwrap{text-align:right;}
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
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

function increment(current) {
  return Math.max(1, Math.round((Number(current) || 0) * 0.01));
}

export default function AuctionLive({ verified = false, onRequireDni, onBack }) {
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

  const current = Number(auction?.currentPrice ?? listing?.auction?.currentPrice ?? 0);
  const status = auction?.status || listing?.auction?.status || 'ACTIVE';
  const isActive = status === 'ACTIVE';
  const inc = increment(current);

  const history = React.useMemo(() => {
    const rows = (bidsPage?.content || []).map((b) => bidFromDto(b));
    rows.sort((a, b) => b.amount - a.amount);
    if (rows[0]) rows[0].leader = true;
    return rows;
  }, [bidsPage]);
  const totalBids = auction?.totalBids ?? history.length;

  const [activeImg, setActiveImg] = React.useState(0);
  const [bid, setBid] = React.useState(0);
  const [bumped, setBumped] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [showGate, setShowGate] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  // Keep the suggested bid in sync as the current price climbs.
  const prevCurrent = React.useRef(current);
  React.useEffect(() => {
    setBid(current + inc);
    if (prevCurrent.current && current > prevCurrent.current) {
      setBumped(true);
      const t = setTimeout(() => setBumped(false), 1300);
      prevCurrent.current = current;
      return () => clearTimeout(t);
    }
    prevCurrent.current = current;
    return undefined;
  }, [current, inc]);

  // Poll for live updates while the auction is active.
  React.useEffect(() => {
    if (!auctionId || !isActive) return undefined;
    const t = setInterval(() => auctionQ.refetch(), 8000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionId, isActive]);

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
      setShowConfirm(false);
      toast.success('¡Puja registrada!', `Vas liderando con S/. ${bid.toLocaleString('es-PE')}.`, 'Gavel');
      auctionQ.refetch();
    } catch (err) {
      setShowConfirm(false);
      toast.error('No se pudo pujar', err.message || 'Intenta nuevamente.');
    } finally {
      setSubmitting(false);
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
          actions={<Button variant="secondary" onClick={() => navigate('/')}>Volver al inicio</Button>} />
      </div>
    );
  }
  if (!listing.auction) {
    return (
      <div className="yal__empty">
        <EmptyState icon={<Icon.Gavel size={26} />} title="Esta publicación no es una subasta"
          description="Es una venta a precio fijo. Puedes comprarla directamente."
          actions={<Button variant="primary" onClick={() => navigate('/listing/' + listing.id)}>Ver publicación</Button>} />
      </div>
    );
  }

  const gallery = listing.images;
  const seller = listing.seller || {};

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

          <div className="yal__livebox">
            <div className="yal__lr">
              <div>
                <div className="yal__lbl"><span className="yal__livedot" /> {isActive ? 'Puja actual' : 'Precio final'}</div>
                <Price value={current} size={40} live={isActive} className={bumped ? 'yal__tick' : ''} />
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
                    onChange={(e) => setBid(Number(e.target.value.replace(/\D/g, '')) || 0)} style={{ flex: 1, minWidth: 0 }} />
                  <Button variant="live" size="lg" iconLeft={<Icon.Gavel size={18} />} onClick={onPlaceClick} disabled={submitting}>Pujar</Button>
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
            Si ganás, tendrás <b style={{ color: 'var(--text-strong)' }}>48 horas</b> para pagar. Las pujas no se pueden retirar.
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
    </div>
  );
}
