import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Button, AuctionCard, ListingCard, CardSkeleton, EmptyState, Icon } from '../ds';
import { getUserListings } from '../api/users';
import { listMySales } from '../api/orders';
import { subscribeNotifications } from '../api/realtime';
import { auctionCardFrom, listingCardFrom } from '../api/adapters';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../auth/AuthContext';

const SALE_STATUS: Record<string, { label: string }> = {
  PENDING: { label: 'Pendiente de pago' },
  CONFIRMED: { label: 'Pagada' },
  CANCELLED: { label: 'Cancelada' },
};

const MAX_LISTINGS = 20;
const COMMISSION_RATE = 0.08; // Yala fee — client-side estimate (no endpoint).

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
.yd__sales{width:100%;border-collapse:collapse;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);overflow:hidden;}
.yd__sales th,.yd__sales td{text-align:left;padding:11px 14px;font-size:13px;border-bottom:1px solid var(--border-subtle);color:var(--text-body);}
.yd__sales th{font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--text-subtle);background:var(--surface-sunken);}
.yd__sales tr:last-child td{border-bottom:none;}
.yd__badge{display:inline-block;padding:2px 9px;border-radius:999px;font-size:11px;font-weight:800;}
.yd__badge--PENDING{background:var(--live-subtle);color:var(--live-hover);}
.yd__badge--CONFIRMED{background:var(--success-bg);color:var(--success);}
.yd__badge--CANCELLED{background:var(--surface-sunken);color:var(--text-muted);}
@media(max-width:1080px){.yd__metrics{grid-template-columns:repeat(2,1fr)}.yd__grid{grid-template-columns:repeat(3,1fr)}}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

interface MetricProps { icon?: any; bg?: any; color?: any; label?: any; value?: any; foot?: any; bar?: any; }
function Metric({ icon, bg, color, label, value, foot, bar }: MetricProps) {
  return (
    <div className="yd__metric">
      <div className="yd__micon" style={{ background: bg, color }}>{icon}</div>
      <div className="yd__mlabel">{label}</div>
      <div className="yd__mval">{value}</div>
      {bar != null && <div className="yd__bar"><div className="yd__barfill" style={{ width: `${Math.min(100, bar)}%` }} /></div>}
      {foot && <div className="yd__mfoot">{foot}</div>}
    </div>
  );
}

interface SellerDashboardProps { onNew?: () => void; onGoLive?: () => void; onOpenAuction?: (id: any) => void; onOpenOrder?: (id: any) => void; }
export default function SellerDashboard({ onNew, onGoLive, onOpenAuction }: SellerDashboardProps) {
  ensure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = React.useState('auctions');

  const listingsQ = useFetch(
    (signal) => getUserListings(user.id, { page: 0, size: 100, signal }),
    [user?.id],
    { enabled: !!user?.id },
  );

  // Sales (incl. live-auction winners) + their payment status.
  const salesQ = useFetch(
    (signal) => listMySales({ page: 0, size: 50, signal }),
    [user?.id],
    { enabled: !!user?.id },
  );
  const sales = salesQ.data?.content || [];

  // Refresh the sales list in real time when a sale/notification arrives.
  const refetchSalesRef = React.useRef(salesQ.refetch);
  refetchSalesRef.current = salesQ.refetch;
  React.useEffect(() => {
    if (!user?.id) return undefined;
    return subscribeNotifications(user.id, () => refetchSalesRef.current && refetchSalesRef.current());
  }, [user?.id]);

  const all = listingsQ.data?.content || [];
  const total = listingsQ.data?.totalElements ?? all.length;

  // Metrics derived from the seller's own listings (the backend exposes no
  // dashboard endpoint). Financials are estimates labelled as such.
  const auctionsList = all.filter((l) => l.mode === 'AUCTION');
  const activeAuctions = auctionsList.filter((l) => l.auction && l.auction.status === 'ACTIVE').length;
  const activeListings = all.filter((l) => l.status === 'ACTIVE').length;
  const salesTotal = all.filter((l) => l.status === 'SOLD').reduce((sum, l) => sum + Number(l.fixedPrice || 0), 0);
  const commission = Math.round(salesTotal * COMMISSION_RATE);
  const net = salesTotal - commission;
  const money = (n) => `S/. ${n.toLocaleString('es-PE')}`;

  return (
    <div className="yd">
      <div className="yd__head">
        <div>
          <div className="yd__h1">Panel del vendedor</div>
          <div className="yd__sub">Hola {user?.name?.split(' ')[0] || ''} — esto es lo que pasa con tu tienda hoy.</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" iconLeft={Icon.TrendingUp ? <Icon.TrendingUp size={17} /> : null} onClick={onGoLive}>Iniciar transmisión</Button>
          <Button variant="primary" iconLeft={<Icon.Plus size={17} />} onClick={onNew}>Nueva publicación</Button>
        </div>
      </div>

      <div className="yd__metrics">
        <Metric icon={<Icon.TrendingUp size={20} />} bg="var(--brand-subtle)" color="var(--brand)"
          label="Ventas (vendidas)" value={money(salesTotal)} foot="Estimado sobre ítems SOLD" />
        <Metric icon={<Icon.Wallet size={20} />} bg="var(--success-bg)" color="var(--success)"
          label="Neto estimado (92%)" value={money(net)} foot={`Comisión Yala estimada: ${money(commission)}`} />
        <Metric icon={<Icon.LayoutGrid size={20} />} bg="var(--info-bg)" color="var(--info)"
          label="Ítems activos" value={`${activeListings} / ${MAX_LISTINGS}`} bar={(activeListings / MAX_LISTINGS) * 100} foot={`${total} publicaciones en total`} />
        <Metric icon={<Icon.Gavel size={20} />} bg="var(--live-subtle)" color="var(--live-hover)"
          label="Subastas en curso" value={activeAuctions} foot={`${auctionsList.length} en modo subasta`} />
      </div>

      <div className="yd__tabs">
        <Tabs value={tab} onChange={setTab} tabs={[
          { value: 'auctions', label: 'Mis subastas', count: auctionsList.length },
          { value: 'all', label: 'Todas mis publicaciones', count: total },
          { value: 'sales', label: 'Ventas / Ganadores', count: salesQ.data?.totalElements ?? sales.length },
        ]} />
      </div>

      {tab === 'sales' ? (
        salesQ.loading ? (
          <div className="yd__grid">{Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}</div>
        ) : salesQ.error ? (
          <EmptyState icon={<Icon.AlertTriangle size={26} />} title="No pudimos cargar tus ventas"
            description={salesQ.error.message} actions={<Button variant="secondary" onClick={salesQ.refetch}>Reintentar</Button>} />
        ) : sales.length === 0 ? (
          <EmptyState icon={<Icon.Gavel size={24} />} title="Aún no tienes ventas"
            description="Cuando alguien gane una de tus subastas en vivo o compre un producto, aparecerá aquí con su estado de pago." />
        ) : (
          <table className="yd__sales">
            <thead>
              <tr><th>Comprador</th><th>Producto</th><th>Monto</th><th>Estado</th><th>Límite de pago</th></tr>
            </thead>
            <tbody>
              {sales.map((o) => (
                <tr key={o.id}>
                  <td>{o.buyer?.name || '—'}</td>
                  <td>{o.itemTitle || '—'}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{money(Number(o.amount || 0))}</td>
                  <td><span className={`yd__badge yd__badge--${o.status}`}>{(SALE_STATUS[o.status]?.label) || o.status}</span></td>
                  <td>{o.paymentDeadline ? new Date(o.paymentDeadline).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' }) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      ) : listingsQ.loading ? (
        <div className="yd__grid">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : listingsQ.error ? (
        <EmptyState icon={<Icon.AlertTriangle size={26} />} title="No pudimos cargar tus publicaciones"
          description={listingsQ.error.message} actions={<Button variant="secondary" onClick={listingsQ.refetch}>Reintentar</Button>} />
      ) : tab === 'auctions' ? (
        <div className="yd__grid">
          <div className="yd__addcard" onClick={onNew}><Icon.Plus size={28} /><span style={{ fontWeight: 600, fontSize: 14 }}>Nueva publicación</span></div>
          {auctionsList.map((dto) => {
            const c = auctionCardFrom(dto);
            return (
              <AuctionCard key={dto.id} image={c.image} title={c.title} currentBid={c.currentBid} bidsCount={c.bidsCount}
                endsAt={c.endsAt} status={c.status} sellerName={c.sellerName} sellerVerified={c.sellerVerified}
                as="a" href="#" onClick={(e) => { e.preventDefault(); onOpenAuction ? onOpenAuction(c.id) : navigate('/auction/' + c.id); }} />
            );
          })}
        </div>
      ) : all.length === 0 ? (
        <EmptyState icon={<Icon.Package size={24} />} title="Todavía no tienes publicaciones"
          description="Crea tu primera publicación para empezar a vender en Yala."
          actions={<Button variant="primary" onClick={onNew}>Nueva publicación</Button>} />
      ) : (
        <div className="yd__grid">
          {all.map((dto) => {
            if (dto.mode === 'AUCTION') {
              const c = auctionCardFrom(dto);
              return (
                <AuctionCard key={dto.id} image={c.image} title={c.title} currentBid={c.currentBid} bidsCount={c.bidsCount}
                  endsAt={c.endsAt} status={c.status} sellerName={c.sellerName} sellerVerified={c.sellerVerified}
                  as="a" href="#" onClick={(e) => { e.preventDefault(); navigate('/auction/' + c.id); }} />
              );
            }
            const c = listingCardFrom(dto);
            return (
              <ListingCard key={dto.id} image={c.image} title={c.title} condition={c.condition} price={c.price}
                sellerName={c.sellerName} sellerVerified={c.sellerVerified} sellerRating={c.sellerRating}
                as="a" href="#" onClick={(e) => { e.preventDefault(); navigate('/listing/' + c.id); }} />
            );
          })}
        </div>
      )}
    </div>
  );
}
