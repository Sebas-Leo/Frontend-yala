import React from 'react';
import type { LiveSummary } from '../types';

// Card for the "En vivo ahora" home carousel. Mirrors the AuctionCard look but
// leans on the live accent color and an EN VIVO pulse badge.
const css = `
.ylc{display:flex;flex-direction:column;width:260px;flex:0 0 260px;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);overflow:hidden;cursor:pointer;transition:transform var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast);text-align:left;}
.ylc:hover{transform:translateY(-3px);box-shadow:var(--shadow-md);}
.ylc__media{position:relative;aspect-ratio:16/10;background:linear-gradient(135deg,var(--brand) 0%,#0a1aa8 100%);display:flex;align-items:center;justify-content:center;overflow:hidden;}
.ylc__media img{width:100%;height:100%;object-fit:cover;}
.ylc__glyph{font-size:40px;opacity:.55;}
.ylc__badge{position:absolute;top:10px;left:10px;display:inline-flex;align-items:center;gap:6px;background:var(--live);color:#fff;font-size:11px;font-weight:800;letter-spacing:.04em;padding:4px 9px;border-radius:var(--radius-pill);text-transform:uppercase;}
.ylc__dot{width:7px;height:7px;border-radius:50%;background:#fff;animation:yala-live-pulse 1.5s infinite;}
.ylc__body{padding:12px 14px;display:flex;flex-direction:column;gap:4px;}
.ylc__title{font-size:14px;font-weight:700;color:var(--text-strong);line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.ylc__seller{font-size:12px;color:var(--text-muted);}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); } }

interface Props {
  live: LiveSummary;
  onClick?: () => void;
}

export default function LiveCard({ live, onClick }: Props) {
  ensure();
  return (
    <button className="ylc" onClick={onClick} type="button">
      <div className="ylc__media">
        {live.coverImageUrl ? (
          <img src={live.coverImageUrl} alt={live.title} />
        ) : (
          <span className="ylc__glyph" aria-hidden>📡</span>
        )}
        <span className="ylc__badge"><span className="ylc__dot" /> En vivo</span>
      </div>
      <div className="ylc__body">
        <div className="ylc__title">{live.title}</div>
        {live.sellerName && <div className="ylc__seller">{live.sellerName}</div>}
      </div>
    </button>
  );
}
