import React from 'react';
import { Button, CardSkeleton, EmptyState, Icon } from '../ds';
import { listLives } from '../api/live';
import LiveCard from '../components/LiveCard';
import { useFetch } from '../hooks/useFetch';

const css = `
.yv{max-width:1280px;margin:0 auto;padding:24px;}
.yv__hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;}
.yv__tt{display:flex;align-items:center;gap:9px;font-size:22px;font-weight:800;color:var(--text-strong);letter-spacing:-.01em;}
.yv__dot{width:9px;height:9px;border-radius:50%;background:var(--live);animation:yala-live-pulse 1.5s infinite;}
.yv__count{font-size:14px;color:var(--text-muted);}
.yv__count b{color:var(--text-strong);font-weight:700;}
.yv__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
@media(max-width:1080px){.yv__grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:760px){.yv{padding:16px}.yv__grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.yv__grid{grid-template-columns:1fr}}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); } }

interface LivesProps { onOpenLive?: (id: any) => void }

// "Lives" tab: full list of the live streams happening right now (GET /live).
export default function Lives({ onOpenLive }: LivesProps) {
  ensure();
  const { data, loading, error, refetch } = useFetch((signal) => listLives({ page: 0, size: 48, signal }), []);
  const lives = data?.content || [];

  return (
    <div className="yv">
      <div className="yv__hd">
        <div className="yv__tt"><span className="yv__dot" /> Lives</div>
        {!loading && !error && (
          <div className="yv__count"><b>{lives.length}</b> {lives.length === 1 ? 'transmisión en vivo' : 'transmisiones en vivo'}</div>
        )}
      </div>

      {loading ? (
        <div className="yv__grid">{Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : error ? (
        <EmptyState icon={<Icon.AlertTriangle size={26} />} title="No pudimos cargar los lives"
          description={error.message || 'Ocurrió un error al consultar el servidor.'}
          actions={<Button variant="secondary" onClick={refetch}>Reintentar</Button>} />
      ) : lives.length === 0 ? (
        <EmptyState icon={Icon.Radio ? <Icon.Radio size={26} /> : <Icon.Search size={26} />} title="No hay transmisiones en vivo"
          description="Cuando un vendedor inicie una transmisión, aparecerá aquí." />
      ) : (
        <div className="yv__grid">
          {lives.map((live) => (
            <LiveCard key={live.id} live={live} onClick={() => onOpenLive && onOpenLive(live.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
