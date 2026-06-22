import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, ReputationStars, Tabs, AuctionCard, Icon, YData } from '../ds';

const { sellers, auctions } = YData;

const REVIEWS = [
  { id: 'r1', author: 'collector_lima', rating: 5, comment: 'Carta tal cual la foto, embalaje impecable. Llegó antes de lo previsto.', date: '8 jun 2026' },
  { id: 'r2', author: 'ash_k', rating: 5, comment: 'Vendedor de confianza, respondió todas mis dudas antes de pujar.', date: '1 jun 2026' },
  { id: 'r3', author: 'pdiglett', rating: 4, comment: 'Todo bien, el envío tardó un par de días más de lo estimado.', date: '24 may 2026' },
];

const css = `
.sp{max-width:1080px;margin:0 auto;padding:24px;}
.sp__back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;margin-bottom:14px;}
.sp__head{display:flex;gap:20px;align-items:center;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:22px;margin-bottom:8px;}
.sp__hmeta{flex:1;min-width:0;}
.sp__name{font-size:24px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;display:flex;align-items:center;gap:10px;}
.sp__verif{font-size:12px;color:var(--success);font-weight:600;display:inline-flex;align-items:center;gap:4px;}
.sp__since{font-size:13px;color:var(--text-muted);margin-top:4px;}
.sp__stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:18px 0 22px;}
.sp__stat{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:16px;text-align:center;min-width:0;}
.sp__sval{font-size:22px;font-weight:800;color:var(--text-strong);font-family:var(--font-mono);}
.sp__slabel{font-size:12px;color:var(--text-muted);margin-top:4px;}
.sp__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:18px;}
.sp__reviews{display:flex;flex-direction:column;gap:12px;margin-top:18px;}
.sp__rev{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:16px;}
.sp__revhd{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.sp__revauth{font-size:14px;font-weight:700;color:var(--text-strong);flex:1;}
.sp__revdate{font-size:12px;color:var(--text-subtle);font-family:var(--font-mono);}
.sp__revtxt{font-size:14px;color:var(--text-body);line-height:1.55;}
@media(max-width:1080px){.sp__grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:680px){.sp__grid{grid-template-columns:repeat(2,1fr)}.sp__head{flex-direction:column;text-align:center}}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

export default function SellerProfile({ onBack, onOpenAuction }) {
  ensure();
  const { id } = useParams();
  const s = sellers[id] || sellers.marco;
  const [tab, setTab] = React.useState('auctions');
  const sellerAuctions = auctions.filter((a) => a.seller.id === s.id);
  const shown = sellerAuctions.length ? sellerAuctions : auctions.slice(0, 4);

  return (
    <div className="sp">
      <div className="sp__back" onClick={onBack}><Icon.ChevronLeft size={16} /> Volver</div>
      <div className="sp__head">
        <Avatar name={s.name} verified={s.verified} size={72} />
        <div className="sp__hmeta">
          <div className="sp__name">{s.name} {s.verified && <span className="sp__verif"><Icon.Shield size={14} /> identidad verificada</span>}</div>
          <div className="sp__since">{s.store ? 'Tienda' : 'Vendedor'} en Yala desde {s.since}</div>
          <div style={{ marginTop: 8 }}><ReputationStars value={s.rating} count={s.reviews} positivePct={s.pct} size={16} /></div>
        </div>
      </div>

      <div className="sp__stats">
        <div className="sp__stat"><div className="sp__sval">{s.sales.toLocaleString('es-PE')}</div><div className="sp__slabel">Ventas</div></div>
        <div className="sp__stat"><div className="sp__sval">{s.pct}%</div><div className="sp__slabel">Valoraciones positivas</div></div>
        <div className="sp__stat"><div className="sp__sval">{s.rating.toFixed(1)}</div><div className="sp__slabel">Reputación</div></div>
      </div>

      <Tabs value={tab} onChange={setTab} tabs={[
        { value: 'auctions', label: 'Subastas', count: shown.length },
        { value: 'reviews', label: 'Reseñas', count: s.reviews },
      ]} />

      {tab === 'auctions' ? (
        <div className="sp__grid">
          {shown.map((a) => (
            <AuctionCard key={a.id} image={a.img} title={a.title} currentBid={a.bid} bidsCount={a.bids}
              endsAt={a.endsAt} status={a.status} sellerName={a.seller.name} sellerVerified={a.seller.verified}
              as="a" href="#" onClick={(e) => { e.preventDefault(); onOpenAuction && onOpenAuction(a.id); }} />
          ))}
        </div>
      ) : (
        <div className="sp__reviews">
          {REVIEWS.map((r) => (
            <div className="sp__rev" key={r.id}>
              <div className="sp__revhd">
                <Avatar name={r.author} size={28} />
                <span className="sp__revauth">{r.author}</span>
                <ReputationStars value={r.rating} size={14} />
                <span className="sp__revdate">{r.date}</span>
              </div>
              <div className="sp__revtxt">{r.comment}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
