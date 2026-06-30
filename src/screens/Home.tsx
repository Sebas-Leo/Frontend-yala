import React from 'react';
import {
  AuctionCard, Select, Input, Checkbox, Pagination,
  Button, CardSkeleton, EmptyState, Icon,
} from '../ds';
import { listListings } from '../api/listings';
import { listLives } from '../api/live';
import { listCategories } from '../api/categories';
import LiveCard from '../components/LiveCard';
import { auctionCardFrom } from '../api/adapters';
import { useFetch } from '../hooks/useFetch';
import { usePaginatedQuery } from '../hooks/usePaginatedQuery';
import { useDebounce } from '../hooks/useDebounce';

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
.yh__cats{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;}
.yh__cat{display:inline-flex;align-items:center;height:34px;padding:0 14px;border-radius:var(--radius-pill);font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;white-space:nowrap;border:1px solid var(--border-subtle);transition:all var(--dur-fast);}
.yh__cat:hover{background:var(--surface-sunken);color:var(--text-strong);}
.yh__cat--active{background:var(--brand-subtle);color:var(--brand);border-color:transparent;}
.yh__lives{margin-bottom:28px;}
.yh__livesrow{display:flex;gap:16px;overflow-x:auto;padding:4px 2px 12px;scroll-snap-type:x mandatory;}
.yh__livesrow>*{scroll-snap-align:start;}
.yh__foot{display:flex;flex-direction:column;align-items:center;gap:8px;margin-top:28px;}
.yh__range{font-size:12px;color:var(--text-subtle);font-family:var(--font-mono);}
@media(max-width:1080px){.yh{grid-template-columns:1fr}.yh__side{position:static;flex-direction:row;flex-wrap:wrap}.yh__grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:760px){.yh{padding:16px}.yh__grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.yh__grid{grid-template-columns:1fr}}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); } }

// Must match CreateListing.tsx exactly so the condition filter hits stored listings.
const CONDS = ['Sellado', 'Como nuevo', 'Con desgaste'];
const SORTS = [
  { value: 'createdAt,desc', label: 'Más recientes' },
  { value: 'createdAt,asc', label: 'Más antiguas' },
  { value: 'title,asc', label: 'Título: A–Z' },
];

function Filters({ condition, onCond, minPrice, maxPrice, onPrice, sort, onSort, onClear }) {
  return (
    <aside className="yh__side">
      <div className="yh__fgroup">
        <div className="yh__ftitle">Condición / PSA</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {CONDS.map((c) => (
            <Checkbox key={c} label={c} checked={condition === c} onChange={() => onCond(condition === c ? '' : c)} />
          ))}
        </div>
      </div>
      <div className="yh__fgroup">
        <div className="yh__ftitle">Puja actual (S/.)</div>
        <div className="yh__price">
          <Input prefix="S/." mono placeholder="mín" size="sm" value={minPrice}
            onChange={(e) => onPrice('min', e.target.value.replace(/\D/g, ''))} style={{ flex: 1, minWidth: 0 }} />
          <span style={{ color: 'var(--text-subtle)' }}>–</span>
          <Input prefix="S/." mono placeholder="máx" size="sm" value={maxPrice}
            onChange={(e) => onPrice('max', e.target.value.replace(/\D/g, ''))} style={{ flex: 1, minWidth: 0 }} />
        </div>
      </div>
      <div className="yh__fgroup">
        <div className="yh__ftitle">Ordenar por</div>
        <Select size="sm" value={sort} onChange={(e) => onSort(e.target.value)} options={SORTS} />
      </div>
      <Button variant="ghost" size="sm" iconLeft={Icon.X ? <Icon.X size={15} /> : null} onClick={onClear}>Limpiar filtros</Button>
    </aside>
  );
}

interface HomeScreenProps { onOpenAuction?: (id: any) => void; onOpenLive?: (id: any) => void }

export default function HomeScreen({ onOpenAuction, onOpenLive }: HomeScreenProps) {
  ensure();
  const { page, size, sort, get, setParams, setPage } = usePaginatedQuery({ defaultSize: 12, defaultSort: 'createdAt,desc' });

  // Active live streams for the top carousel (public endpoint).
  const { data: livesData } = useFetch((signal) => listLives({ page: 0, size: 12, signal }), []);
  const lives = livesData?.content || [];

  // Category chips (moved here from the global navbar).
  const { data: catsData } = useFetch((signal) => listCategories({ signal }), []);
  const categories = catsData || [];

  const condition = get('condition');
  const category = get('category');
  const q = get('q');
  // Local state for the debounced price inputs (keeps typing snappy, hits the API on quiet).
  const [priceDraft, setPriceDraft] = React.useState({ min: get('minPrice'), max: get('maxPrice') });
  const debouncedPrice = useDebounce(priceDraft, 450);

  const minPrice = get('minPrice');
  const maxPrice = get('maxPrice');

  React.useEffect(() => {
    // Only push to the URL (and reset to page 0) when the debounced draft
    // actually differs from what's in the query string — avoids clobbering a
    // deep-linked ?page=N on mount.
    if (debouncedPrice.min !== minPrice || debouncedPrice.max !== maxPrice) {
      setParams({ minPrice: debouncedPrice.min, maxPrice: debouncedPrice.max });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedPrice.min, debouncedPrice.max]);

  const { data, loading, error, refetch } = useFetch(
    (signal) =>
      listListings({
        page,
        size,
        sort,
        mode: 'AUCTION',
        category: category || undefined,
        condition: condition || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        q: q || undefined,
        signal,
      }),
    [page, size, sort, category, condition, minPrice, maxPrice, q],
  );

  const items = data?.content || [];
  const totalElements = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;
  const from = totalElements === 0 ? 0 : page * size + 1;
  const to = page * size + items.length;

  const clearFilters = () => {
    setPriceDraft({ min: '', max: '' });
    setParams({ condition: '', minPrice: '', maxPrice: '', q: '', sort: 'createdAt,desc', page: 0 });
  };

  return (
    <div className="yh">
      <Filters
        condition={condition}
        onCond={(c) => setParams({ condition: c })}
        minPrice={priceDraft.min}
        maxPrice={priceDraft.max}
        onPrice={(k, v) => setPriceDraft((p) => ({ ...p, [k]: v }))}
        sort={sort}
        onSort={(s) => setParams({ sort: s })}
        onClear={clearFilters}
      />
      <div className="yh__main">
        {categories.length > 0 && (
          <div className="yh__cats">
            <span className={`yh__cat${!category ? ' yh__cat--active' : ''}`} onClick={() => setParams({ category: '' })}>Todo</span>
            {categories.map((c) => (
              <span key={c.id} className={`yh__cat${category === c.name ? ' yh__cat--active' : ''}`} onClick={() => setParams({ category: c.name })}>{c.name}</span>
            ))}
          </div>
        )}
        {lives.length > 0 && (
          <section className="yh__lives">
            <div className="yh__livehd">
              <div className="yh__livett"><span className="yh__livedot" /> En vivo ahora</div>
              <div className="yh__count"><b>{lives.length}</b> {lives.length === 1 ? 'transmisión' : 'transmisiones'}</div>
            </div>
            <div className="yh__livesrow">
              {lives.map((live) => (
                <LiveCard key={live.id} live={live} onClick={() => onOpenLive && onOpenLive(live.id)} />
              ))}
            </div>
          </section>
        )}

        <div className="yh__livehd">
          <div className="yh__livett">Subastas</div>
          <div className="yh__count">
            {loading ? 'Cargando…' : <span><b>{totalElements}</b> {totalElements === 1 ? 'subasta activa' : 'subastas activas'}</span>}
          </div>
        </div>

        {loading ? (
          <div className="yh__grid">{Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}</div>
        ) : error ? (
          <EmptyState icon={<Icon.AlertTriangle size={26} />} title="No pudimos cargar las subastas"
            description={error.message || 'Ocurrió un error al consultar el servidor.'}
            actions={<Button variant="secondary" onClick={refetch}>Reintentar</Button>} />
        ) : items.length === 0 ? (
          <EmptyState icon={Icon.SearchX ? <Icon.SearchX size={26} /> : <Icon.Search size={26} />} title="No hay subastas con esos filtros"
            description="Prueba ampliar el rango de puja o quitar algunas condiciones."
            actions={<Button variant="secondary" onClick={clearFilters}>Limpiar filtros</Button>} />
        ) : (
          <>
            <div className="yh__grid">
              {items.map((dto) => {
                const c = auctionCardFrom(dto);
                return (
                  <AuctionCard key={c.id} image={c.image} title={c.title} currentBid={c.currentBid} bidsCount={c.bidsCount}
                    endsAt={c.endsAt} status={c.status} sellerName={c.sellerName} sellerVerified={c.sellerVerified}
                    as="a" href="#" onClick={(e) => { e.preventDefault(); onOpenAuction && onOpenAuction(c.id); }} />
                );
              })}
            </div>
            <div className="yh__foot">
              <Pagination page={page + 1} total={totalPages} onChange={(p) => setPage(p - 1)} />
              <div className="yh__range">Mostrando {from}–{to} de {totalElements}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
