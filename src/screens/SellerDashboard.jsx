import React from 'react';
import { Price, Tabs, Button, AuctionCard, StatusBadge, Icon, YData } from '../ds';

const { auctions, orders, sellerMetrics } = YData;

const css = `
.yd{max-width:1280px;margin:0 auto;padding:24px;}
.yd__head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:20px;}
.yd__h1{font-size:26px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;}
.yd__sub{font-size:14px;color:var(--text-muted);margin-top:3px;}
.yd__metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:26px;}
.yd__metric{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:18px;min-width:0;}
.yd__micon{width:38px;height:38px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin-bottom:12px;}
.yd__mlabel{font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:5px;}
.yd__mval{font-size:24px;font-weight:800;color:var(--text-strong);font-family:var(--font-mono);letter-spacing:-.01em;}
.yd__mfoot{font-size:12px;color:var(--text-subtle);margin-top:6px;}
.yd__bar{height:6px;background:var(--surface-sunken);border-radius:999px;overflow:hidden;margin-top:10px;}
.yd__barfill{height:100%;background:var(--brand);border-radius:999px;}
.yd__tabs{margin-bottom:20px;}
.yd__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.yd__addcard{border:1.5px dashed var(--border-default);border-radius:var(--radius-card);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--text-muted);cursor:pointer;min-height:300px;transition:all var(--dur-fast);}
.yd__addcard:hover{border-color:var(--brand);color:var(--brand);background:var(--brand-subtle);}
.yd__table{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);overflow:hidden;}
.yd__tr{display:grid;grid-template-columns:1fr 130px 110px 150px;align-items:center;gap:12px;padding:13px 18px;border-bottom:1px solid var(--border-subtle);}
.yd__tr:last-child{border-bottom:none;}
.yd__trh{background:var(--surface-sunken);font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--text-subtle);}
.yd__titem{display:flex;align-items:center;gap:12px;min-width:0;}
.yd__timg{width:46px;height:46px;border-radius:var(--radius-sm);object-fit:cover;flex:none;background:var(--surface-sunken);}
.yd__tname{font-size:13px;font-weight:600;color:var(--text-strong);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.yd__tparty{font-size:12px;color:var(--text-muted);}
@media(max-width:1080px){.yd__metrics{grid-template-columns:repeat(2,1fr)}.yd__grid{grid-template-columns:repeat(3,1fr)}}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

function Metric({ icon, bg, color, label, value, foot, bar }) {
  return (
    <div className="yd__metric">
      <div className="yd__micon" style={{ background: bg, color }}>{icon}</div>
      <div className="yd__mlabel">{label}</div>
      <div className="yd__mval">{value}</div>
      {bar != null && <div className="yd__bar"><div className="yd__barfill" style={{ width: `${bar}%` }} /></div>}
      {foot && <div className="yd__mfoot">{foot}</div>}
    </div>
  );
}

export default function SellerDashboard({ onNew, onOpenAuction, onOpenOrder }) {
  ensure();
  const [tab, setTab] = React.useState('auctions');
  const m = sellerMetrics;
  const myAuctions = auctions.slice(0, 6);
  const sellerOrders = orders.slice(0, 4);

  return (
    <div className="yd">
      <div className="yd__head">
        <div>
          <div className="yd__h1">Panel del vendedor</div>
          <div className="yd__sub">Hola Marco — esto es lo que pasa con tu tienda hoy.</div>
        </div>
        <Button variant="primary" iconLeft={<Icon.Plus size={17} />} onClick={onNew}>Nueva subasta</Button>
      </div>

      <div className="yd__metrics">
        <Metric icon={<Icon.TrendingUp size={20} />} bg="var(--brand-subtle)" color="var(--brand)"
          label="Ventas del mes" value={`S/. ${m.salesTotal.toLocaleString('es-PE')}`} foot="+18% vs. mayo" />
        <Metric icon={<Icon.Wallet size={20} />} bg="var(--success-bg)" color="var(--success)"
          label="Neto (92%)" value={`S/. ${m.net.toLocaleString('es-PE')}`} foot={`Comisión Yala: S/. ${m.commission.toLocaleString('es-PE')}`} />
        <Metric icon={<Icon.LayoutGrid size={20} />} bg="var(--info-bg)" color="var(--info)"
          label="Ítems activos" value={`${m.activeListings} / ${m.maxListings}`} bar={(m.activeListings / m.maxListings) * 100} foot={`${m.maxListings - m.activeListings} cupos libres`} />
        <Metric icon={<Icon.Gavel size={20} />} bg="var(--live-subtle)" color="var(--live-hover)"
          label="Subastas en curso" value={m.activeAuctions} foot="2 cierran hoy" />
      </div>

      <div className="yd__tabs">
        <Tabs value={tab} onChange={setTab} tabs={[
          { value: 'auctions', label: 'Mis subastas', count: m.activeAuctions },
          { value: 'orders', label: 'Órdenes como vendedor', count: 8 },
        ]} />
      </div>

      {tab === 'auctions' && (
        <div className="yd__grid">
          <div className="yd__addcard" onClick={onNew}><Icon.Plus size={28} /><span style={{ fontWeight: 600, fontSize: 14 }}>Nueva subasta</span></div>
          {myAuctions.map((a) => (
            <AuctionCard key={a.id} image={a.img} title={a.title} currentBid={a.bid} bidsCount={a.bids}
              endsAt={a.endsAt} status={a.status} sellerName={a.seller.name} sellerVerified={a.seller.verified}
              as="a" onClick={(e) => { e.preventDefault(); onOpenAuction && onOpenAuction(a.id); }} href="#" />
          ))}
        </div>
      )}

      {tab === 'orders' && (
        <div className="yd__table">
          <div className="yd__tr yd__trh"><span>Ítem</span><span>Comprador</span><span>Monto</span><span>Acción</span></div>
          {sellerOrders.map((o) => (
            <div className="yd__tr" key={o.id}>
              <div className="yd__titem">
                <img className="yd__timg" src={o.img} alt="" />
                <div style={{ minWidth: 0 }}>
                  <div className="yd__tname">{o.title}</div>
                  <div className="yd__tparty">#{o.id} · {o.date}</div>
                </div>
              </div>
              <div className="yd__tparty">{o.party}</div>
              <Price value={o.amount} size="sm" />
              <div>
                {o.status === 'CONFIRMED'
                  ? <Button variant="primary" size="sm" iconLeft={<Icon.Truck size={15} />} onClick={() => onOpenOrder && onOpenOrder(o.id)}>Enviar</Button>
                  : o.status === 'PENDING'
                    ? <StatusBadge kind="order" status="PENDING" />
                    : <StatusBadge kind="order" status={o.status} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
