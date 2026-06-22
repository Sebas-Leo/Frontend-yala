import React from 'react';
import {
  AuctionCard, Select, Input, Checkbox, Pagination,
  Button, CardSkeleton, EmptyState, Icon, YData,
} from '../ds';

const { auctions } = YData;

const css = `
.yh{max-width:1280px;margin:0 auto;padding:24px;display:grid;grid-template-columns:248px 1fr;gap:28px;align-items:start;}
.yh__side{position:sticky;top:136px;display:flex;flex-direction:column;gap:22px;}
.yh__fgroup{display:flex;flex-direction:column;gap:11px;}
.yh__ftitle{font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--text-subtle);}
.yh__price{display:flex;align-items:center;gap:8px;}
.yh__main{min-width:0;}
.yh__livehd{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.yh__livett{display:flex;align-items:center;gap:9px;font-size:18px;font-weight:800;color:var(--text-strong);letter-spacing:-.01em;}
.yh__livedot{width:9px;height:9px;border-radius:50%;background:var(--live);animation:yala-live-pulse 1.5s infinite;}
.yh__count{font-size:14px;color:var(--text-muted);}
.yh__count b{color:var(--text-strong);font-weight:700;}
.yh__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.yh__foot{display:flex;justify-content:center;margin-top:28px;}
@media(max-width:1080px){.yh{grid-template-columns:1fr}.yh__side{position:static;flex-direction:row;flex-wrap:wrap}.yh__grid{grid-template-columns:repeat(3,1fr)}}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); } }

function Filters({ conds, toggleCond, onClear }) {
  const CONDS = ['PSA 10 Gem Mint', 'PSA 9 Mint', 'PSA 8 Near Mint', 'PSA 7 o menor', 'Sin gradar'];
  return (
    <aside className="yh__side">
      <div className="yh__fgroup">
        <div className="yh__ftitle">Condición / PSA</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {CONDS.map((c) => <Checkbox key={c} label={c} checked={conds.includes(c)} onChange={() => toggleCond(c)} />)}
        </div>
      </div>
      <div className="yh__fgroup">
        <div className="yh__ftitle">Puja actual (S/.)</div>
        <div className="yh__price">
          <Input prefix="S/." mono placeholder="mín" size="sm" style={{ flex: 1, minWidth: 0 }} />
          <span style={{ color: 'var(--text-subtle)' }}>–</span>
          <Input prefix="S/." mono placeholder="máx" size="sm" style={{ flex: 1, minWidth: 0 }} />
        </div>
      </div>
      <div className="yh__fgroup">
        <div className="yh__ftitle">Ordenar por</div>
        <Select size="sm" defaultValue="ending" options={[
          { value: 'ending', label: 'Subastas por terminar' },
          { value: 'recent', label: 'Más recientes' },
          { value: 'bid_asc', label: 'Puja: menor a mayor' },
          { value: 'bid_desc', label: 'Puja: mayor a menor' },
        ]} />
      </div>
      <Button variant="ghost" size="sm" iconLeft={Icon.X ? <Icon.X size={15} /> : null} onClick={onClear}>Limpiar filtros</Button>
    </aside>
  );
}

export default function HomeScreen({ state = 'default', onOpenAuction }) {
  ensure();
  const [conds, setConds] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const toggleCond = (c) => setConds((x) => x.includes(c) ? x.filter((y) => y !== c) : [...x, c]);

  const items = auctions;
  const showEmpty = state === 'empty';

  return (
    <div className="yh">
      <Filters conds={conds} toggleCond={toggleCond} onClear={() => setConds([])} />
      <div className="yh__main">
        <div className="yh__livehd">
          <div className="yh__livett"><span className="yh__livedot" /> Subastas en vivo</div>
          <div className="yh__count">{showEmpty ? 'Sin resultados' : <span><b>{items.length}</b> subastas activas</span>}</div>
        </div>

        {state === 'loading' ? (
          <div className="yh__grid">{Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}</div>
        ) : showEmpty ? (
          <EmptyState icon={<Icon.SearchX size={26} />} title="No hay subastas con esos filtros"
            description="Probá ampliar el rango de puja o quitar algunas condiciones."
            actions={<Button variant="secondary" onClick={() => setConds([])}>Limpiar filtros</Button>} />
        ) : (
          <>
            <div className="yh__grid">
              {items.map((a) => (
                <AuctionCard key={a.id} image={a.img} title={a.title} currentBid={a.bid} bidsCount={a.bids}
                  endsAt={a.endsAt} status={a.status} sellerName={a.seller.name} sellerVerified={a.seller.verified}
                  as="a" onClick={(e) => { e.preventDefault(); onOpenAuction && onOpenAuction(a.id); }} href="#" />
              ))}
            </div>
            <div className="yh__foot"><Pagination page={page} total={12} onChange={setPage} /></div>
          </>
        )}
      </div>
    </div>
  );
}
