import React from 'react';
import { Input, Textarea, Select, Tag, Button, Icon } from '../ds';

const css = `
.cl{max-width:720px;margin:0 auto;padding:24px;}
.cl__back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;margin-bottom:14px;}
.cl__h1{font-size:26px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;margin-bottom:4px;}
.cl__sub{font-size:14px;color:var(--text-muted);margin-bottom:22px;}
.cl__card{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:18px;}
.cl__lbl{font-size:13px;font-weight:600;color:var(--text-strong);margin-bottom:10px;}
.cl__row{display:flex;gap:14px;}
.cl__radios{display:flex;gap:10px;}
.cl__radio{flex:1;min-width:0;border:1px solid var(--border-default);border-radius:var(--radius-md);padding:12px 14px;cursor:pointer;transition:all var(--dur-fast);}
.cl__radio--on{border-color:var(--brand);background:var(--brand-subtle);}
.cl__imgs{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;}
.cl__slot{aspect-ratio:1/1;border:1.5px dashed var(--border-default);border-radius:var(--radius-md);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:var(--text-subtle);cursor:pointer;font-size:11px;transition:all var(--dur-fast);}
.cl__slot:hover{border-color:var(--brand);color:var(--brand);background:var(--brand-subtle);}
.cl__chips{display:flex;flex-wrap:wrap;gap:7px;}
.cl__hint{font-size:12px;color:var(--text-subtle);margin-top:8px;display:flex;gap:6px;align-items:flex-start;line-height:1.5;}
@media(max-width:560px){.cl__row{flex-direction:column}.cl__imgs{grid-template-columns:repeat(3,1fr)}}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

const CATEGORIES = ['Pokémon TCG', 'Funko Pop', 'Comics', 'Other'];
const CONDITIONS = ['PSA 10 (Gem Mint)', 'PSA 9 (Mint)', 'PSA 8 (Near Mint)', 'PSA 7 o menor', 'Sin gradar (Excelente/Bueno)'];
const SUGGESTED_TAGS = ['1ª edición', 'Holográfica', 'Edición limitada', 'Sellado', 'Promo'];

export default function CreateListing({ onBack, onCreate }) {
  ensure();
  const [tags, setTags] = React.useState([]);
  const toggleTag = (t) => setTags((x) => x.includes(t) ? x.filter((y) => y !== t) : [...x, t]);

  return (
    <div className="cl">
      <div className="cl__back" onClick={onBack}><Icon.ChevronLeft size={16} /> Panel del vendedor</div>
      <div className="cl__h1">Nueva subasta · Paso 1 de 2</div>
      <div className="cl__sub">El ítem: mostrá tu coleccionable con buenas fotos y una descripción clara.</div>

      <form className="cl__card" onSubmit={(e) => { e.preventDefault(); onCreate && onCreate(); }}>
        <Input label="Título" placeholder="Charizard Base Set Holo — 1ª edición" hint="Mínimo 10 caracteres." required />
        <Textarea label="Descripción" rows={4} maxLength={2000} placeholder="Contá el estado, procedencia, detalles relevantes…" required />

        <div className="cl__row">
          <Select label="Categoría" options={CATEGORIES} placeholder="Elegí una categoría" style={{ flex: 1, minWidth: 0 }} required />
          <Select label="Condición / PSA" options={CONDITIONS} placeholder="Elegí la condición" style={{ flex: 1, minWidth: 0 }} required />
        </div>

        <div className="cl__hint"><Icon.Gavel size={14} style={{ flex: 'none', marginTop: 1 }} /> En Yala todo se vende por subasta. El precio inicial y la duración (1/3/5/7 días) los definís en el paso 2.</div>

        <div>
          <div className="cl__lbl">Etiquetas</div>
          <div className="cl__chips">
            {SUGGESTED_TAGS.map((t) => <Tag key={t} selected={tags.includes(t)} onClick={() => toggleTag(t)}>{t}</Tag>)}
          </div>
        </div>

        <div>
          <div className="cl__lbl">Imágenes <span style={{ color: 'var(--text-subtle)', fontWeight: 400 }}>· {0}/5</span></div>
          <div className="cl__imgs">
            {Array.from({ length: 5 }).map((_, i) => (
              <div className="cl__slot" key={i}><Icon.Image size={20} />{i === 0 ? 'Agregar' : ''}</div>
            ))}
          </div>
          <div className="cl__hint"><Icon.AlertTriangle size={13} style={{ flex: 'none', marginTop: 1, color: 'var(--warning)' }} /> Mínimo 1, máximo 5 imágenes. JPG, PNG o WEBP, hasta 5MB cada una.</div>
        </div>

        <div className="cl__hint"><Icon.LayoutGrid size={13} style={{ flex: 'none', marginTop: 1 }} /> Podés tener hasta 20 publicaciones activas a la vez.</div>

        <Button variant="primary" size="lg" fullWidth type="submit">Continuar al paso 2</Button>
      </form>
    </div>
  );
}
