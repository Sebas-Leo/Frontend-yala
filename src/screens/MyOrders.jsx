import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Price, StatusBadge, Button, Avatar, EmptyState, CardSkeleton, Pagination, Icon } from '../ds';
import { listMyOrders } from '../api/orders.js';
import { orderFromDto } from '../api/adapters.js';
import { useFetch } from '../hooks/useFetch.js';
import { usePaginatedQuery } from '../hooks/usePaginatedQuery.js';
import { useAuth } from '../auth/AuthContext.jsx';
import { formatDate } from '../utils/format.js';

const css = `
.yo{max-width:980px;margin:0 auto;padding:24px;}
.yo__h1{font-size:26px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;margin-bottom:4px;}
.yo__sub{font-size:14px;color:var(--text-muted);margin-bottom:22px;}
.yo__list{display:flex;flex-direction:column;gap:12px;}
.yo__card{display:flex;gap:16px;align-items:center;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:14px 16px;transition:box-shadow var(--dur-fast),border-color var(--dur-fast);cursor:pointer;}
.yo__card:hover{box-shadow:var(--shadow-md);border-color:var(--border-default);}
.yo__img{width:64px;height:64px;border-radius:var(--radius-md);object-fit:cover;flex:none;background:var(--surface-sunken);}
.yo__mid{flex:1;min-width:0;}
.yo__title{font-size:14px;font-weight:700;color:var(--text-strong);margin-bottom:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.yo__meta{font-size:12px;color:var(--text-muted);display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.yo__onum{font-family:var(--font-mono);}
.yo__right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex:none;min-width:160px;}
.yo__act{display:flex;gap:8px;align-items:center;}
.yo__foot{display:flex;justify-content:center;margin-top:22px;}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

export default function MyOrders({ onOpenOrder }) {
  ensure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { page, size, setPage } = usePaginatedQuery({ defaultSize: 10 });

  const { data, loading, error, refetch } = useFetch(
    (signal) => listMyOrders({ page, size, signal }),
    [page, size],
  );

  const orders = (data?.content || []).map((o) => orderFromDto(o, user?.id));
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  const go = (id) => (onOpenOrder ? onOpenOrder(id) : navigate('/checkout?orderId=' + id));

  if (loading) {
    return <div className="yo"><div className="yo__h1">Mis órdenes</div>
      <div className="yo__list">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}</div></div>;
  }
  if (error) {
    return <div className="yo"><div className="yo__h1">Mis órdenes</div>
      <EmptyState icon={<Icon.AlertTriangle size={26} />} title="No pudimos cargar tus órdenes"
        description={error.message} actions={<Button variant="secondary" onClick={refetch}>Reintentar</Button>} /></div>;
  }
  if (orders.length === 0) {
    return <div className="yo"><div className="yo__h1">Mis órdenes</div>
      <EmptyState icon={<Icon.Inbox size={26} />} title="Todavía no tenés órdenes"
        description="Cuando compres o ganes una subasta, vas a verlas acá."
        actions={<Button onClick={() => navigate('/')}>Explorar el marketplace</Button>} /></div>;
  }

  return (
    <div className="yo">
      <div className="yo__h1">Mis órdenes</div>
      <div className="yo__sub">{totalElements} {totalElements === 1 ? 'orden' : 'órdenes'} · como comprador</div>
      <div className="yo__list">
        {orders.map((o) => (
          <div className="yo__card" key={o.id} onClick={() => go(o.id)}>
            <img className="yo__img" src={o.image} alt="" />
            <div className="yo__mid">
              <div className="yo__title">{o.title}</div>
              <div className="yo__meta">
                <span className="yo__onum">#{o.id}</span> · {formatDate(o.createdAt)}
                {o.party && <> · <Avatar name={o.party} size={18} /> {o.party}</>}
              </div>
            </div>
            <div className="yo__right">
              <Price value={o.amount} size="md" />
              <div className="yo__act" onClick={(e) => e.stopPropagation()}>
                {o.status === 'PENDING' && <Button variant="primary" size="sm" onClick={() => navigate('/checkout?orderId=' + o.id)}>Pagar</Button>}
                {o.status === 'CONFIRMED' && <Button variant="secondary" size="sm" iconLeft={<Icon.Star size={14} />} onClick={() => navigate('/review/' + o.id)}>Reseñar</Button>}
                {o.status === 'CANCELLED' && <StatusBadge kind="order" status="CANCELLED" />}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="yo__foot">
        <Pagination page={page + 1} total={totalPages} onChange={(p) => setPage(p - 1)} />
      </div>
    </div>
  );
}
