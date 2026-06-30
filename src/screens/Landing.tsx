import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, AuctionCard, EmptyState, CardSkeleton, Icon } from '../ds';
import { listListings } from '../api/listings';
import { auctionCardFrom } from '../api/adapters';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../auth/AuthContext';

// Marketing landing page at /inicio. The browse/explore grid lives at /.
const css = `
.yl{font-family:var(--font-sans);}
.yl__wrap{max-width:var(--container-max);margin:0 auto;padding:0 24px;}

/* Hero */
.yl__hero{background:linear-gradient(180deg,var(--brand-subtle) 0%,var(--surface-page) 100%);padding:76px 0 64px;text-align:center;}
.yl__herogrid{display:flex;align-items:center;justify-content:center;gap:8px;}
.yl__herotext{text-align:left;flex:0 1 auto;max-width:600px;}
.yl__herogrid .yl__title{text-align:left;margin:0;max-width:none;}
.yl__herogrid .yl__sub{margin:20px 0 0;text-align:left;max-width:560px;}
.yl__herogrid .yl__cta{justify-content:flex-start;}
.yl__herogrid .yl__stats{justify-content:flex-start;}
.yl__heroimg{flex:0 0 auto;display:flex;align-items:center;margin-left:-8px;}
.yl__heroimg img{width:100%;max-width:300px;height:auto;filter:drop-shadow(0 22px 40px rgba(17,20,45,.22));animation:yala-hero-float 4s ease-in-out infinite;}
@keyframes yala-hero-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@media(max-width:900px){
  .yl__herogrid{flex-direction:column;gap:14px;text-align:center;}
  .yl__herotext{text-align:center;max-width:none;}
  .yl__herogrid .yl__title,.yl__herogrid .yl__sub{text-align:center;margin-left:auto;margin-right:auto;}
  .yl__herogrid .yl__cta,.yl__herogrid .yl__stats{justify-content:center;}
  .yl__heroimg{order:-1;margin-left:0;}
  .yl__heroimg img{max-width:230px;}
}
.yl__pill{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:var(--radius-pill);background:var(--surface-card);border:1px solid var(--border-subtle);box-shadow:var(--shadow-xs);font-size:13px;font-weight:600;color:var(--text-muted);margin-bottom:22px;}
.yl__pill .yl__dot{width:8px;height:8px;border-radius:50%;background:var(--live);animation:yala-live-pulse 1.5s infinite;}
.yl__hero .yl__title{font:var(--weight-extrabold) 50px/1.1 var(--font-sans);letter-spacing:-.02em;color:var(--text-strong);margin:0 auto;max-width:860px;text-align:center;}
.yl__title em{font-style:normal;color:var(--brand);}
.yl__sub{margin:20px auto 0;max-width:640px;font-size:18px;line-height:1.6;color:var(--text-muted);}
.yl__cta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:32px;}
.yl__stats{display:flex;gap:36px;justify-content:center;flex-wrap:wrap;margin-top:46px;}
.yl__stat{display:flex;flex-direction:column;gap:2px;}
.yl__statn{font:var(--weight-extrabold) 30px/1 var(--font-mono);color:var(--text-strong);}
.yl__statl{font-size:13px;color:var(--text-subtle);}

/* Section shell */
.yl__sec{padding:64px 0;}
.yl__sec--tint{background:var(--surface-sunken);}
.yl__sechd{text-align:center;margin-bottom:42px;}
.yl__sectt{font:var(--weight-bold) 31px/1.15 var(--font-sans);letter-spacing:-.01em;color:var(--text-strong);margin:0;}
.yl__secsb{margin:12px auto 0;max-width:600px;font-size:16px;line-height:1.55;color:var(--text-muted);}

/* Live auctions */
.yl__live{background:var(--surface-card);border-top:1px solid var(--border-subtle);border-bottom:1px solid var(--border-subtle);}
.yl__livehd{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px;}
.yl__livett{display:flex;align-items:center;gap:10px;font:var(--weight-bold) 24px/1.15 var(--font-sans);letter-spacing:-.01em;color:var(--text-strong);}
.yl__livedot{width:10px;height:10px;border-radius:50%;background:var(--live);animation:yala-live-pulse 1.5s infinite;}
.yl__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}

/* Categories (3 fixed) */
.yl__cats{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.yl__cat{display:flex;flex-direction:column;align-items:flex-start;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:26px 24px;cursor:pointer;text-align:left;font-family:inherit;width:100%;box-shadow:var(--shadow-card);transition:all var(--dur-base) var(--ease-out);}
.yl__cat:hover{border-color:var(--brand);box-shadow:var(--shadow-card-hover);transform:translateY(-3px);}
.yl__catic{display:inline-flex;align-items:center;justify-content:center;width:50px;height:50px;border-radius:var(--radius-md);background:var(--brand-subtle);color:var(--brand);margin-bottom:16px;}
.yl__catn{font-size:18px;font-weight:700;color:var(--text-strong);margin-bottom:6px;}
.yl__catd{font-size:14px;line-height:1.55;color:var(--text-muted);margin:0 0 14px;}
.yl__catg{display:inline-flex;align-items:center;gap:4px;margin-top:auto;font-size:13px;font-weight:600;color:var(--brand);}

/* Numbered cards (auction steps + custody) */
.yl__flow{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}
.yl__fcard{position:relative;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:26px 22px;box-shadow:var(--shadow-card);transition:transform var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out);}
.yl__fcard:hover{transform:translateY(-3px);box-shadow:var(--shadow-card-hover);}
.yl__fnum{position:absolute;top:18px;right:20px;font:var(--weight-extrabold) 22px/1 var(--font-mono);color:var(--border-default);}
.yl__fic{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:var(--radius-md);background:var(--brand-subtle);color:var(--brand);margin-bottom:16px;}
.yl__ft{font-size:17px;font-weight:700;color:var(--text-strong);margin:0 0 6px;}
.yl__fd{font-size:14px;line-height:1.55;color:var(--text-muted);margin:0;}

/* Custody emphasis */
.yl__custody .yl__fic{background:var(--success-bg,var(--brand-subtle));color:var(--success,var(--brand));}
.yl__note{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:28px;font-size:14px;color:var(--text-muted);}
.yl__note svg{color:var(--success,var(--brand));flex:none;}

/* Why Yala (3 features) */
.yl__why{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.yl__feat{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:28px 24px;box-shadow:var(--shadow-xs);}
.yl__featic{display:inline-flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:50%;background:var(--brand-subtle);color:var(--brand);margin-bottom:16px;}
.yl__featt{font-size:18px;font-weight:700;color:var(--text-strong);margin:0 0 8px;}
.yl__featd{font-size:14px;line-height:1.6;color:var(--text-muted);margin:0;}

/* Sellers (2 cards) */
.yl__sellers{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;}
.yl__scard{display:flex;flex-direction:column;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:30px 28px;box-shadow:var(--shadow-card);}
.yl__shd{display:flex;align-items:center;gap:14px;margin-bottom:6px;}
.yl__sicon{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:var(--radius-md);background:var(--brand-subtle);color:var(--brand);flex:none;}
.yl__stt{font-size:19px;font-weight:700;color:var(--text-strong);}
.yl__sdesc{font-size:14px;line-height:1.6;color:var(--text-muted);margin:6px 0 16px;}
.yl__slist{list-style:none;margin:0 0 4px;padding:0;display:flex;flex-direction:column;gap:10px;}
.yl__sli{display:flex;gap:10px;font-size:14px;line-height:1.5;color:var(--text-body);}
.yl__sli svg{color:var(--success,var(--brand));flex:none;margin-top:2px;}

/* Final CTA */
.yl__final{background:linear-gradient(135deg,var(--brand) 0%,var(--brand-hover,var(--brand)) 100%);border-radius:var(--radius-xl);padding:54px 32px;text-align:center;margin:8px 0;}
.yl__final .yl__finalt{font:var(--weight-extrabold) 30px/1.2 var(--font-sans);letter-spacing:-.01em;color:#fff;margin:0 auto;max-width:620px;text-align:center;}
.yl__final .yl__finalp{margin:14px auto 26px;max-width:520px;font-size:16px;line-height:1.55;color:rgba(255,255,255,.88);text-align:center;}

/* Responsive */
@media(max-width:980px){
  .yl__flow{grid-template-columns:repeat(2,1fr);}
  .yl__grid{grid-template-columns:repeat(2,1fr);}
  .yl__cats{grid-template-columns:1fr;}
  .yl__why{grid-template-columns:1fr;}
}
@media(max-width:680px){
  .yl__sellers{grid-template-columns:1fr;}
}
@media(max-width:560px){
  .yl__hero{padding:52px 0 44px;}
  .yl__hero .yl__title{font-size:34px;}
  .yl__sub{font-size:16px;}
  .yl__stats{gap:24px;}
  .yl__sec{padding:46px 0;}
  .yl__sectt{font-size:25px;}
  .yl__flow,.yl__grid{grid-template-columns:1fr;}
  .yl__cta .yds-btn{width:100%;}
  .yl__final .yl__finalt{font-size:25px;}
}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); } }

// Three fixed collectible categories Yala handles. `filter` maps to the closest
// category name the explore page understands (?category=<name>).
const CATEGORIES = [
  {
    icon: 'Tag', name: 'Cartas coleccionables', filter: 'Pokémon TCG',
    desc: 'Pokémon TCG y Magic: The Gathering. Cartas individuales y sets completos, desde ediciones comunes hasta piezas de primera edición muy valoradas por la comunidad.',
  },
  {
    icon: 'Package', name: 'Figuras coleccionables', filter: 'Funko Pop',
    desc: 'Funko Pop y figuras o estatuas de colección. Personajes de cultura pop, anime, videojuegos y cómics en formatos de vinilo y resina.',
  },
  {
    icon: 'Image', name: 'Cómics e historietas', filter: 'Comics',
    desc: 'Action Comics, Captain America y títulos icónicos de la historia del cómic. Desde números clásicos de colección hasta ediciones modernas especiales.',
  },
];

const AUCTION_STEPS = [
  { icon: 'Shield', title: 'Regístrate y verifica tu identidad', desc: 'Solo necesitas tu DNI (8 dígitos) para poder pujar. Es gratis y toma menos de 1 minuto.' },
  { icon: 'Search', title: 'Encuentra el coleccionable que buscas', desc: 'Cada artículo tiene fotos reales y condición declarada por el vendedor. Las subastas duran 1, 3, 5 o 7 días.' },
  { icon: 'Gavel', title: 'Haz tu puja y sigue en tiempo real', desc: 'Ingresa el monto que ofreces. Si alguien te supera, te avisamos al instante para que decidas si sigues pujando.' },
  { icon: 'CreditCard', title: 'Si ganas, tienes 48 horas para pagar', desc: 'Recibes un email con el monto final y el link de pago. Todo dentro de Yala, con pago seguro vía Mercado Pago.' },
];

const CUSTODY_STEPS = [
  { icon: 'CreditCard', title: 'Ganas y pagas', desc: 'Completas el pago dentro de Yala vía Mercado Pago. El dinero todavía no le llega al vendedor.' },
  { icon: 'Shield', title: 'Yala retiene el pago', desc: 'Tu dinero queda en custodia en Yala durante todo el envío (entre 7 y 15 días).' },
  { icon: 'Truck', title: 'Recibes tu coleccionable', desc: 'Cuando llega el producto a tus manos, confirmas la recepción en la plataforma.' },
  { icon: 'Wallet', title: 'Recién ahí el vendedor cobra', desc: 'Yala libera el pago al vendedor: recibe el 92% del precio final (Yala retiene 8% de comisión).' },
];

const WHY = [
  { icon: 'Shield', title: 'Vendedores verificados', desc: 'Tiendas aprobadas por Yala y coleccionistas con historial real de transacciones y reseñas de la comunidad.' },
  { icon: 'TrendingUp', title: 'Precio justo por subasta', desc: 'El mercado decide el valor real del artículo. Sin precios inflados ni negociaciones incómodas.' },
  { icon: 'MapPin', title: 'Hecho para Latinoamérica', desc: 'Tiendas locales, precios en soles y enfoque en la comunidad coleccionista de la región.' },
];

const SELLERS = [
  {
    icon: 'LayoutGrid', title: 'Tiendas especializadas',
    desc: 'Regístrate con tus datos comerciales y empieza a publicar desde el día 1, sin requisitos previos.',
    points: ['Comisión del 8% solo sobre el precio final de cada venta.', 'Recibes el 92% neto directo en tu cuenta bancaria (CCI).'],
  },
  {
    icon: 'User', title: 'Coleccionistas que quieren vender',
    desc: 'Construye tu reputación participando y ganando subastas antes de publicar las tuyas.',
    points: ['Participa en 5 subastas y gana al menos 3.', 'Luego solicita tu verificación como vendedor.', 'Misma comisión del 8% sobre el precio final.'],
  },
];

function FlowCard({ icon, index, title, desc }) {
  const Glyph = Icon[icon] || Icon.Tag;
  return (
    <div className="yl__fcard">
      <span className="yl__fnum">{String(index + 1).padStart(2, '0')}</span>
      <span className="yl__fic"><Glyph size={26} /></span>
      <h3 className="yl__ft">{title}</h3>
      <p className="yl__fd">{desc}</p>
    </div>
  );
}

function CategoryCard({ icon, name, desc, onClick }) {
  const Glyph = Icon[icon] || Icon.Tag;
  return (
    <button className="yl__cat" onClick={onClick}>
      <span className="yl__catic"><Glyph size={24} /></span>
      <span className="yl__catn">{name}</span>
      <p className="yl__catd">{desc}</p>
      <span className="yl__catg">Ver subastas <Icon.ChevronRight size={15} /></span>
    </button>
  );
}

interface LandingScreenProps { onOpenAuction?: (id: any) => void }

export default function LandingScreen({ onOpenAuction }: LandingScreenProps) {
  ensure();
  const navigate = useNavigate();

  const { isAuthenticated, role } = useAuth();
  const location = useLocation();
  // Footer "¿Cómo funciona?" links to /#como-funciona; scroll to it when the hash is present.
  React.useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }, [location.hash]);

  // Logged in → "Vender" (seller dashboard or apply); otherwise → register.
  const goSell = () =>
    isAuthenticated ? navigate(role === 'SELLER' ? '/seller' : '/seller/apply') : navigate('/register');
  const ctaLabel = isAuthenticated ? 'Vender' : 'Registrarse';
  const goExplore = () => navigate('/inicio');

  return (
    <div className="yl yala-base">
      {/* 1. Hero */}
      <section className="yl__hero">
        <div className="yl__wrap yl__herogrid">
          <div className="yl__herotext">
          <span className="yl__pill"><span className="yl__dot" /> Subastas en vivo todos los días</span>
          <h1 className="yl__title">
            Encuentra ese coleccionable que tanto buscabas. <em>Sin riesgo, sin intermediarios dudosos.</em>
          </h1>
          <p className="yl__sub">
            Yala conecta a coleccionistas con tiendas especializadas en cartas, cómics y figuras a través de
            subastas transparentes. Tu dinero se queda en Yala hasta que el producto llegue a tus manos.
          </p>
          <div className="yl__cta">
            <Button variant="primary" size="lg" iconLeft={<Icon.User size={18} />} onClick={goSell}>
              {ctaLabel}
            </Button>
            <Button variant="secondary" size="lg" iconRight={<Icon.ChevronRight size={18} />} onClick={goExplore}>
              Ver subastas activas
            </Button>
          </div>
          <div className="yl__stats">
            <div className="yl__stat"><span className="yl__statn">100%</span><span className="yl__statl">pago en custodia</span></div>
            <div className="yl__stat"><span className="yl__statn">92%</span><span className="yl__statl">para el vendedor</span></div>
            <div className="yl__stat"><span className="yl__statn">S/.</span><span className="yl__statl">precios en soles</span></div>
          </div>
          </div>
          <div className="yl__heroimg">
            <img src="/assets/groot-hero.png" alt="Coleccionable de Yala" />
          </div>
        </div>
      </section>

      {/* 2. Categories */}
      <section className="yl__sec">
        <div className="yl__wrap">
          <div className="yl__sechd">
            <h2 className="yl__sectt">Tres mundos de coleccionables</h2>
            <p className="yl__secsb">Cartas, figuras y cómics. Todo lo que la comunidad geek busca, en un solo lugar.</p>
          </div>
          <div className="yl__cats">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.name}
                icon={cat.icon}
                name={cat.name}
                desc={cat.desc}
                onClick={() => navigate('/inicio?category=' + encodeURIComponent(cat.filter))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. How the auction works */}
      <section id="como-funciona" className="yl__sec yl__sec--tint">
        <div className="yl__wrap">
          <div className="yl__sechd">
            <h2 className="yl__sectt">Pujar es tan fácil como hacer una oferta</h2>
            <p className="yl__secsb">De cero a ganar tu coleccionable en cuatro pasos.</p>
          </div>
          <div className="yl__flow">
            {AUCTION_STEPS.map((s, i) => <FlowCard key={s.title} index={i} {...s} />)}
          </div>
        </div>
      </section>

      {/* 5. How the money works (custody — main trust differentiator) */}
      <section className="yl__sec yl__custody">
        <div className="yl__wrap">
          <div className="yl__sechd">
            <h2 className="yl__sectt">Tu plata, protegida hasta que tengas el producto en mano</h2>
            <p className="yl__secsb">Somos el puente entre tú y la tienda. El dinero nunca sale de Yala hasta que el producto llegue a tus manos.</p>
          </div>
          <div className="yl__flow">
            {CUSTODY_STEPS.map((s, i) => <FlowCard key={s.title} index={i} {...s} />)}
          </div>
          <div className="yl__note"><Icon.Shield size={16} /> Pago en custodia de punta a punta. Si algo sale mal, tu dinero está protegido.</div>
        </div>
      </section>

      {/* 6. Why Yala */}
      <section className="yl__sec yl__sec--tint">
        <div className="yl__wrap">
          <div className="yl__sechd">
            <h2 className="yl__sectt">¿Por qué comprar en Yala?</h2>
          </div>
          <div className="yl__why">
            {WHY.map((f) => {
              const Glyph = Icon[f.icon] || Icon.Star;
              return (
                <div className="yl__feat" key={f.title}>
                  <span className="yl__featic"><Glyph size={22} /></span>
                  <h3 className="yl__featt">{f.title}</h3>
                  <p className="yl__featd">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. For sellers and shops */}
      <section className="yl__sec">
        <div className="yl__wrap">
          <div className="yl__sechd">
            <h2 className="yl__sectt">¿Tienes una tienda o quieres vender tu colección?</h2>
            <p className="yl__secsb">Yala es también el lugar para vender. Eliges cómo empezar.</p>
          </div>
          <div className="yl__sellers">
            {SELLERS.map((s) => {
              const Glyph = Icon[s.icon] || Icon.Tag;
              return (
                <div className="yl__scard" key={s.title}>
                  <div className="yl__shd">
                    <span className="yl__sicon"><Glyph size={24} /></span>
                    <span className="yl__stt">{s.title}</span>
                  </div>
                  <p className="yl__sdesc">{s.desc}</p>
                  <ul className="yl__slist">
                    {s.points.map((p) => (
                      <li className="yl__sli" key={p}><Icon.Check size={16} /> <span>{p}</span></li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="yl__cta">
            <Button variant="primary" size="lg" iconLeft={<Icon.Plus size={18} />} onClick={goSell}>
              Quiero vender en Yala
            </Button>
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="yl__sec">
        <div className="yl__wrap">
          <div className="yl__final">
            <h2 className="yl__finalt">¿Listo para encontrar ese coleccionable que tanto buscabas?</h2>
            <p className="yl__finalp">Crea tu cuenta gratis y empieza a pujar hoy. Tu dinero siempre protegido en custodia.</p>
            <Button variant="secondary" size="lg" iconLeft={<Icon.User size={18} />} onClick={goSell}>
              {ctaLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
