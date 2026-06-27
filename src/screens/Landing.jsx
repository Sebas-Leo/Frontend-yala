import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, AuctionCard, EmptyState, CardSkeleton, Icon } from '../ds';
import { listListings } from '../api/listings.js';
import { listCategories } from '../api/categories.js';
import { auctionCardFrom } from '../api/adapters.js';
import { useFetch } from '../hooks/useFetch.js';

// Marketing landing page at /inicio. The browse/explore grid lives at /.
const css = `
.yl{font-family:var(--font-sans);}
.yl__wrap{max-width:var(--container-max);margin:0 auto;padding:0 24px;}

/* Hero */
.yl__hero{background:linear-gradient(180deg,var(--brand-subtle) 0%,var(--surface-page) 100%);padding:72px 0 64px;text-align:center;}
.yl__pill{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:var(--radius-pill);background:var(--surface-card);border:1px solid var(--border-subtle);box-shadow:var(--shadow-xs);font-size:13px;font-weight:600;color:var(--text-muted);margin-bottom:22px;}
.yl__pill .yl__dot{width:8px;height:8px;border-radius:50%;background:var(--live);animation:yala-live-pulse 1.5s infinite;}
.yl__title{font:var(--weight-extrabold) 52px/1.08 var(--font-sans);letter-spacing:-.02em;color:var(--text-strong);margin:0 auto;max-width:760px;}
.yl__title em{font-style:normal;color:var(--brand);}
.yl__sub{margin:18px auto 0;max-width:560px;font-size:18px;line-height:1.6;color:var(--text-muted);}
.yl__cta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:30px;}
.yl__stats{display:flex;gap:36px;justify-content:center;flex-wrap:wrap;margin-top:46px;}
.yl__stat{display:flex;flex-direction:column;gap:2px;}
.yl__statn{font:var(--weight-extrabold) 30px/1 var(--font-mono);color:var(--text-strong);}
.yl__statl{font-size:13px;color:var(--text-subtle);}

/* Section shell */
.yl__sec{padding:60px 0;}
.yl__sechd{text-align:center;margin-bottom:40px;}
.yl__sectt{font:var(--weight-bold) 30px/1.15 var(--font-sans);letter-spacing:-.01em;color:var(--text-strong);margin:0;}
.yl__secsb{margin:10px auto 0;max-width:520px;font-size:15px;color:var(--text-muted);}

/* How it works */
.yl__steps{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.yl__step{position:relative;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:26px 22px;box-shadow:var(--shadow-card);transition:transform var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out);}
.yl__step:hover{transform:translateY(-3px);box-shadow:var(--shadow-card-hover);}
.yl__stepic{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:var(--radius-md);background:var(--brand-subtle);color:var(--brand);margin-bottom:16px;}
.yl__stepn{position:absolute;top:18px;right:20px;font:var(--weight-extrabold) 22px/1 var(--font-mono);color:var(--border-default);}
.yl__stept{font-size:17px;font-weight:700;color:var(--text-strong);margin:0 0 6px;}
.yl__stepd{font-size:14px;line-height:1.55;color:var(--text-muted);margin:0;}

/* Live auctions */
.yl__live{background:var(--surface-card);border-top:1px solid var(--border-subtle);border-bottom:1px solid var(--border-subtle);}
.yl__livehd{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px;}
.yl__livett{display:flex;align-items:center;gap:10px;font:var(--weight-bold) 24px/1.15 var(--font-sans);letter-spacing:-.01em;color:var(--text-strong);}
.yl__livedot{width:10px;height:10px;border-radius:50%;background:var(--live);animation:yala-live-pulse 1.5s infinite;}
.yl__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}

/* Categories */
.yl__cats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
.yl__cat{display:flex;align-items:center;gap:14px;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:18px 20px;cursor:pointer;text-align:left;font-family:inherit;width:100%;box-shadow:var(--shadow-xs);transition:all var(--dur-base) var(--ease-out);}
.yl__cat:hover{border-color:var(--brand);box-shadow:var(--shadow-card-hover);transform:translateY(-2px);}
.yl__catic{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:var(--radius-md);background:var(--brand-subtle);color:var(--brand);flex:none;}
.yl__catn{font-size:15px;font-weight:700;color:var(--text-strong);}
.yl__catg{display:flex;align-items:center;gap:4px;margin-left:auto;color:var(--text-subtle);}

/* Responsive */
@media(max-width:980px){
  .yl__steps{grid-template-columns:repeat(2,1fr);}
  .yl__grid{grid-template-columns:repeat(2,1fr);}
  .yl__cats{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:560px){
  .yl__hero{padding:52px 0 44px;}
  .yl__title{font-size:36px;}
  .yl__sub{font-size:16px;}
  .yl__stats{gap:24px;}
  .yl__sec{padding:44px 0;}
  .yl__sectt{font-size:24px;}
  .yl__steps,.yl__grid,.yl__cats{grid-template-columns:1fr;}
  .yl__cta .yds-btn{width:100%;}
}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); } }

const STEPS = [
  { icon: 'Search', title: 'Explora', desc: 'Busca entre miles de cartas, Funkos y comics de vendedores verificados.' },
  { icon: 'Gavel', title: 'Puja', desc: 'Oferta en vivo por las piezas que quieres. La puja más alta gana.' },
  { icon: 'Star', title: 'Gana', desc: 'Si lideras cuando termina la subasta, el ítem es tuyo.' },
  { icon: 'Package', title: 'Recibe', desc: 'Pagas seguro y el vendedor te envía tu coleccionable a casa.' },
];

function HowItWorksStep({ icon, index, title, desc }) {
  const Glyph = Icon[icon] || Icon.Tag;
  return (
    <div className="yl__step">
      <span className="yl__stepn">{String(index + 1).padStart(2, '0')}</span>
      <span className="yl__stepic"><Glyph size={26} /></span>
      <h3 className="yl__stept">{title}</h3>
      <p className="yl__stepd">{desc}</p>
    </div>
  );
}

function CategoryCard({ name, onClick }) {
  return (
    <button className="yl__cat" onClick={onClick}>
      <span className="yl__catic"><Icon.Tag size={22} /></span>
      <span className="yl__catn">{name}</span>
      <span className="yl__catg"><Icon.ChevronRight size={18} /></span>
    </button>
  );
}

export default function LandingScreen({ onOpenAuction }) {
  ensure();
  const navigate = useNavigate();

  // Active auctions preview. The /auctions endpoint only returns id/price/endsAt/status,
  // so we use /listings?mode=AUCTION which carries the image/title/seller/bids the cards need.
  const auctionsQ = useFetch(
    (signal) => listListings({ mode: 'AUCTION', size: 6, sort: 'createdAt,desc', signal }),
    [],
  );
  const catsQ = useFetch((signal) => listCategories({ signal }), []);

  const items = auctionsQ.data?.content || [];
  const categories = catsQ.data || [];

  const openAuction = (id) => (onOpenAuction ? onOpenAuction(id) : navigate('/auction/' + id));

  return (
    <div className="yl yala-base">
      {/* Hero */}
      <section className="yl__hero">
        <div className="yl__wrap">
          <span className="yl__pill"><span className="yl__dot" /> Subastas en vivo todos los días</span>
          <h1 className="yl__title">Subasta y colecciona <em>cartas que valen la pena</em></h1>
          <p className="yl__sub">
            El marketplace de subastas de coleccionables geek en LatAm. Pokémon TCG, Funko Pop y comics,
            con vendedores verificados y pagos seguros en soles.
          </p>
          <div className="yl__cta">
            <Button variant="primary" size="lg" iconLeft={<Icon.Gavel size={18} />} onClick={() => navigate('/')}>
              Ver subastas activas
            </Button>
            <Button variant="secondary" size="lg" iconRight={<Icon.ChevronRight size={18} />} onClick={() => navigate('/login')}>
              Empezar a vender
            </Button>
          </div>
          <div className="yl__stats">
            <div className="yl__stat"><span className="yl__statn">+5K</span><span className="yl__statl">coleccionables</span></div>
            <div className="yl__stat"><span className="yl__statn">100%</span><span className="yl__statl">vendedores verificados</span></div>
            <div className="yl__stat"><span className="yl__statn">S/.</span><span className="yl__statl">precios en soles</span></div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="yl__sec">
        <div className="yl__wrap">
          <div className="yl__sechd">
            <h2 className="yl__sectt">¿Cómo funciona?</h2>
            <p className="yl__secsb">Comprar y vender coleccionables en Yala es simple y seguro. En cuatro pasos.</p>
          </div>
          <div className="yl__steps">
            {STEPS.map((s, i) => <HowItWorksStep key={s.title} index={i} {...s} />)}
          </div>
        </div>
      </section>

      {/* Live auctions */}
      <section className="yl__sec yl__live">
        <div className="yl__wrap">
          <div className="yl__livehd">
            <div className="yl__livett"><span className="yl__livedot" /> Subastas activas en vivo</div>
            <Button variant="ghost" size="sm" iconRight={<Icon.ChevronRight size={16} />} onClick={() => navigate('/')}>
              Ver todas
            </Button>
          </div>

          {auctionsQ.loading ? (
            <div className="yl__grid">{Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}</div>
          ) : auctionsQ.error ? (
            <EmptyState
              tone="error"
              icon={<Icon.AlertTriangle size={26} />}
              title="No pudimos cargar las subastas"
              description={auctionsQ.error.message || 'Ocurrió un error al consultar el servidor.'}
              actions={<Button variant="secondary" onClick={auctionsQ.refetch}>Reintentar</Button>}
            />
          ) : items.length === 0 ? (
            <EmptyState
              icon={<Icon.Gavel size={26} />}
              title="No hay subastas activas ahora mismo"
              description="Vuelve pronto: cada día se suman nuevas subastas. Mientras tanto, explora el catálogo completo."
              actions={<Button variant="primary" iconLeft={<Icon.Search size={17} />} onClick={() => navigate('/')}>Explorar el catálogo</Button>}
            />
          ) : (
            <div className="yl__grid">
              {items.map((dto) => {
                const c = auctionCardFrom(dto);
                return (
                  <AuctionCard
                    key={c.id}
                    image={c.image} title={c.title} currentBid={c.currentBid} bidsCount={c.bidsCount}
                    endsAt={c.endsAt} status={c.status} sellerName={c.sellerName} sellerVerified={c.sellerVerified}
                    as="a" href="#" onClick={(e) => { e.preventDefault(); openAuction(c.id); }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="yl__sec">
          <div className="yl__wrap">
            <div className="yl__sechd">
              <h2 className="yl__sectt">Explora por categoría</h2>
              <p className="yl__secsb">Encuentra justo lo que coleccionas.</p>
            </div>
            <div className="yl__cats">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  name={cat.name}
                  onClick={() => navigate('/?category=' + encodeURIComponent(cat.name))}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
