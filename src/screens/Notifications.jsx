import React from 'react';
import { Button, EmptyState, CardSkeleton, Pagination, Icon } from '../ds';
import { listNotifications, markRead, markAllRead } from '../api/notifications.js';
import { notificationFromDto } from '../api/adapters.js';
import { useFetch } from '../hooks/useFetch.js';
import { usePaginatedQuery } from '../hooks/usePaginatedQuery.js';

const css = `
.yn{max-width:560px;margin:0 auto;padding:24px;}
.yn__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.yn__h1{font-size:22px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;}
.yn__list{display:flex;flex-direction:column;gap:8px;}
.yn__item{display:flex;gap:12px;padding:14px;border-radius:var(--radius-lg);border:1px solid var(--border-subtle);background:var(--surface-card);position:relative;cursor:pointer;}
.yn__item--unread{background:var(--brand-subtle);border-color:var(--brand-border);}
.yn__ic{width:36px;height:36px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;}
.yn__body{flex:1;min-width:0;padding-right:14px;}
.yn__tt{font-size:14px;font-weight:700;color:var(--text-strong);}
.yn__msg{font-size:13px;color:var(--text-muted);line-height:1.45;margin-top:2px;}
.yn__time{font-size:11px;color:var(--text-subtle);font-family:var(--font-mono);margin-top:6px;}
.yn__dot{width:8px;height:8px;border-radius:50%;background:var(--brand);position:absolute;top:16px;right:14px;}
.yn__foot{display:flex;justify-content:center;margin-top:20px;}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

const TONE_BG = {
  warning: ['var(--warning-bg)', 'var(--warning)'],
  live: ['var(--live-subtle)', 'var(--live-hover)'],
  success: ['var(--success-bg)', 'var(--success)'],
  brand: ['var(--brand-subtle)', 'var(--brand)'],
  neutral: ['var(--surface-sunken)', 'var(--text-muted)'],
};

export default function Notifications() {
  ensure();
  const { page, size, setPage } = usePaginatedQuery({ defaultSize: 20 });
  const { data, loading, error, refetch } = useFetch((signal) => listNotifications({ page, size, signal }), [page, size]);

  // Local overlay so read toggles reflect immediately without a refetch.
  const [readMap, setReadMap] = React.useState({});
  React.useEffect(() => setReadMap({}), [page]);

  const items = (data?.content || []).map((n) => {
    const m = notificationFromDto(n);
    return { ...m, read: m.read || !!readMap[m.id] };
  });
  const unread = items.filter((n) => !n.read).length;
  const totalPages = data?.totalPages ?? 0;

  const markOne = async (id) => {
    if (readMap[id]) return;
    setReadMap((m) => ({ ...m, [id]: true }));
    try { await markRead(id); } catch { /* keep the optimistic state */ }
  };
  const markAll = async () => {
    const next = {};
    items.forEach((n) => { next[n.id] = true; });
    setReadMap((m) => ({ ...m, ...next }));
    try { await markAllRead(); } catch { refetch(); }
  };

  return (
    <div className="yn">
      <div className="yn__head">
        <div className="yn__h1">Notificaciones {unread > 0 && <span style={{ color: 'var(--live)', fontSize: 16 }}>· {unread}</span>}</div>
        <Button variant="ghost" size="sm" onClick={markAll} disabled={unread === 0}>Marcar todas como leídas</Button>
      </div>

      {loading ? (
        <div className="yn__list">{Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : error ? (
        <EmptyState icon={<Icon.AlertTriangle size={26} />} title="No pudimos cargar tus notificaciones"
          description={error.message} actions={<Button variant="secondary" onClick={refetch}>Reintentar</Button>} />
      ) : items.length === 0 ? (
        <EmptyState icon={<Icon.Bell size={26} />} title="Sin notificaciones"
          description="Cuando pujes, ganes o vendas, te avisamos por aquí." />
      ) : (
        <>
          <div className="yn__list">
            {items.map((n) => {
              const [bg, col] = TONE_BG[n.tone] || TONE_BG.brand;
              const I = Icon[n.icon] || Icon.Bell;
              return (
                <div key={n.id} className={`yn__item${!n.read ? ' yn__item--unread' : ''}`} onClick={() => markOne(n.id)}>
                  <div className="yn__ic" style={{ background: bg, color: col }}><I size={18} /></div>
                  <div className="yn__body">
                    <div className="yn__tt">{n.title}</div>
                    <div className="yn__msg">{n.msg}</div>
                    <div className="yn__time">{n.time}</div>
                  </div>
                  {!n.read && <span className="yn__dot" />}
                </div>
              );
            })}
          </div>
          <div className="yn__foot">
            <Pagination page={page + 1} total={totalPages} onChange={(p) => setPage(p - 1)} />
          </div>
        </>
      )}
    </div>
  );
}
