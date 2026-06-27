import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../ds';

// Global site footer: brand blurb, navigation + legal links, and social media.
// Rendered once in App.jsx so it shows on every route.
const css = `
.yf{background:var(--surface-card);border-top:1px solid var(--border-subtle);font-family:var(--font-sans);margin-top:48px;}
.yf__in{max-width:var(--container-max);margin:0 auto;padding:48px 24px 28px;display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:32px;}
.yf__brand{display:flex;flex-direction:column;gap:12px;max-width:320px;}
.yf__logo img{height:30px;display:block;}
.yf__tag{font-size:14px;line-height:1.6;color:var(--text-muted);}
.yf__social{display:flex;gap:10px;margin-top:4px;}
.yf__soc{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:var(--radius-pill);background:var(--surface-sunken);color:var(--text-muted);border:1px solid var(--border-subtle);transition:all var(--dur-fast) var(--ease-out);}
.yf__soc:hover{background:var(--brand);color:#fff;border-color:var(--brand);transform:translateY(-2px);}
.yf__col{display:flex;flex-direction:column;gap:12px;}
.yf__ct{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text-subtle);}
.yf__link{font-size:14px;color:var(--text-muted);background:none;border:none;padding:0;text-align:left;cursor:pointer;font-family:inherit;transition:color var(--dur-fast);}
.yf__link:hover{color:var(--brand);}
.yf__bottom{max-width:var(--container-max);margin:0 auto;padding:18px 24px;border-top:1px solid var(--border-subtle);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;}
.yf__copy{font-size:13px;color:var(--text-subtle);}
.yf__made{font-size:13px;color:var(--text-subtle);}
@media(max-width:900px){.yf__in{grid-template-columns:1fr 1fr;}.yf__brand{grid-column:1 / -1;max-width:none;}}
@media(max-width:520px){.yf__in{grid-template-columns:1fr;gap:24px;}.yf__bottom{flex-direction:column;align-items:flex-start;}}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); } }

// Brand glyphs — the DS icon set has no social-brand marks, so we inline them here.
const SOCIALS = [
  {
    label: 'Instagram', href: '#',
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: 'X', href: '#',
    path: <path d="M4 4l16 16M20 4L4 20" />,
  },
  {
    label: 'Facebook', href: '#',
    path: <path d="M14 8.5h2.5V5.5H14c-2 0-3.2 1.2-3.2 3.2V11H8.5v3h2.3v6h3v-6h2.3l.4-3h-2.7V9.2c0-.5.2-.7.9-.7z" fill="currentColor" stroke="none" />,
  },
  {
    label: 'TikTok', href: '#',
    path: <path d="M14 4v9.5a3 3 0 11-3-3M14 7.5a4.5 4.5 0 004.5 3" />,
  },
];

function SocialIcon({ label, href, path }: { label: string; href: string; path: React.ReactNode }) {
  return (
    <a className="yf__soc" href={href} aria-label={label} target="_blank" rel="noreferrer">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {path}
      </svg>
    </a>
  );
}

export default function Footer() {
  ensure();
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="yf">
      <div className="yf__in">
        <div className="yf__brand">
          <div className="yf__logo"><img src="/assets/yala-logo.svg" alt="Yala" /></div>
          <p className="yf__tag">
            El marketplace de subastas de coleccionables geek en LatAm. Pokémon TCG, Funko Pop, comics y más,
            con vendedores verificados y precios en soles.
          </p>
          <div className="yf__social">
            {SOCIALS.map((s) => <SocialIcon key={s.label} {...s} />)}
          </div>
        </div>

        <nav className="yf__col">
          <div className="yf__ct">Navegar</div>
          <button className="yf__link" onClick={() => navigate('/inicio')}>Inicio</button>
          <button className="yf__link" onClick={() => navigate('/')}>Explorar subastas</button>
          <button className="yf__link" onClick={() => navigate('/login')}>Vender</button>
        </nav>

        <nav className="yf__col">
          <div className="yf__ct">Ayuda</div>
          <a className="yf__link" href="#">¿Cómo funciona?</a>
          <a className="yf__link" href="#">Centro de ayuda</a>
          <a className="yf__link" href="#">Contacto</a>
        </nav>

        <nav className="yf__col">
          <div className="yf__ct">Legal</div>
          <a className="yf__link" href="#">Términos y condiciones</a>
          <a className="yf__link" href="#">Política de privacidad</a>
          <a className="yf__link" href="#">Política de cookies</a>
        </nav>
      </div>

      <div className="yf__bottom">
        <span className="yf__copy">© {year} Yala. Todos los derechos reservados.</span>
        <span className="yf__made">Hecho en Perú · Precios en S/.</span>
      </div>
    </footer>
  );
}
