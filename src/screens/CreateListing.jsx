import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Textarea, Select, Tag, Button, Icon } from '../ds';
import { listCategories } from '../api/categories.js';
import { createListing } from '../api/listings.js';
import { uploadImage } from '../api/images.js';
import { listTags } from '../api/tags.js';
import { useFetch } from '../hooks/useFetch.js';
import { useForm } from '../hooks/useForm.js';
import { useToast } from '../context/ToastContext.jsx';

const css = `
.cl{max-width:720px;margin:0 auto;padding:24px;}
.cl__back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;margin-bottom:14px;}
.cl__h1{font-size:26px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;margin-bottom:4px;}
.cl__sub{font-size:14px;color:var(--text-muted);margin-bottom:22px;}
.cl__card{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:24px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;gap:18px;}
.cl__lbl{font-size:13px;font-weight:600;color:var(--text-strong);margin-bottom:10px;}
.cl__row{display:flex;gap:14px;}
.cl__radios{display:flex;gap:10px;}
.cl__radio{flex:1;min-width:0;border:1px solid var(--border-default);border-radius:var(--radius-md);padding:12px 14px;cursor:pointer;transition:all var(--dur-fast);font-size:13px;font-weight:600;color:var(--text-muted);text-align:center;}
.cl__radio--on{border-color:var(--brand);background:var(--brand-subtle);color:var(--brand);}
.cl__imgs{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;}
.cl__slot{position:relative;aspect-ratio:1/1;border:1.5px dashed var(--border-default);border-radius:var(--radius-md);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;color:var(--text-subtle);cursor:pointer;font-size:11px;transition:all var(--dur-fast);overflow:hidden;}
.cl__slot:hover{border-color:var(--brand);color:var(--brand);background:var(--brand-subtle);}
.cl__slot img{width:100%;height:100%;object-fit:cover;}
.cl__slotrm{position:absolute;top:4px;right:4px;background:rgba(0,0,0,.6);color:#fff;border:none;border-radius:50%;width:20px;height:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;}
.cl__chips{display:flex;flex-wrap:wrap;gap:7px;}
.cl__err{font-size:12px;color:var(--danger);margin-top:6px;}
.cl__hint{font-size:12px;color:var(--text-subtle);margin-top:8px;display:flex;gap:6px;align-items:flex-start;line-height:1.5;}
@media(max-width:560px){.cl__row{flex-direction:column}.cl__imgs{grid-template-columns:repeat(3,1fr)}}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

const CONDITIONS = ['PSA 10 (Gem Mint)', 'PSA 9 (Mint)', 'PSA 8 (Near Mint)', 'PSA 7 o menor', 'Sin gradar (Excelente/Bueno)'];

function validate(v) {
  const e = {};
  if (!v.title || v.title.trim().length < 10) e.title = 'Mínimo 10 caracteres.';
  if (!v.categoryId) e.categoryId = 'Elegí una categoría.';
  if (!v.condition) e.condition = 'Elegí la condición.';
  if (v.mode === 'FIXED' && (!v.fixedPrice || Number(v.fixedPrice) <= 0)) e.fixedPrice = 'Ingresá un precio válido.';
  return e;
}

export default function CreateListing({ onBack }) {
  ensure();
  const navigate = useNavigate();
  const toast = useToast();
  const fileRef = React.useRef(null);

  const catsQ = useFetch((signal) => listCategories({ signal }), []);
  const tagsQ = useFetch((signal) => listTags({ signal }), []);
  const categories = catsQ.data || [];
  const suggestedTags = (tagsQ.data || []).map((t) => t.name);

  const form = useForm({
    initial: { title: '', description: '', mode: 'AUCTION', fixedPrice: '', categoryId: '', condition: '' },
    validate,
  });
  const [tags, setTags] = React.useState([]);
  const [images, setImages] = React.useState([]); // { file, url }

  const toggleTag = (t) => setTags((x) => (x.includes(t) ? x.filter((y) => y !== t) : [...x, t]));

  const onFiles = (e) => {
    const picked = Array.from(e.target.files || []);
    setImages((cur) => [...cur, ...picked.map((file) => ({ file, url: URL.createObjectURL(file) }))].slice(0, 5));
    e.target.value = '';
  };
  const removeImage = (i) => setImages((cur) => cur.filter((_, idx) => idx !== i));

  const submit = () =>
    form.handleSubmit(async (v) => {
      try {
        const body = {
          title: v.title.trim(),
          description: v.description.trim(),
          mode: v.mode,
          condition: v.condition,
          categoryId: Number(v.categoryId),
          tags,
        };
        if (v.mode === 'FIXED') body.fixedPrice = Number(v.fixedPrice);
        const listing = await createListing(body);

        // Best-effort image upload (listing already exists if a file fails).
        let uploadFailed = false;
        for (let i = 0; i < images.length; i++) {
          try {
            await uploadImage(listing.id, images[i].file, i);
          } catch {
            uploadFailed = true;
          }
        }
        if (uploadFailed) toast.error('Algunas imágenes no se subieron', 'La publicación se creó igual; podés reintentar luego.');

        if (v.mode === 'AUCTION') {
          toast.success('Ítem creado', 'Ahora definí el precio inicial y la duración de la subasta.');
          navigate('/seller/new-auction', { state: { listingId: listing.id, title: listing.title } });
        } else {
          toast.success('Publicación creada', 'Ya está visible en el marketplace.', 'Check');
          navigate('/listing/' + listing.id);
        }
      } catch (err) {
        toast.error('No se pudo crear la publicación', err.message || 'Revisá los datos e intentá de nuevo.');
      }
    });

  const isAuction = form.values.mode === 'AUCTION';

  return (
    <div className="cl">
      <div className="cl__back" onClick={onBack}><Icon.ChevronLeft size={16} /> Panel del vendedor</div>
      <div className="cl__h1">Nueva publicación{isAuction ? ' · Paso 1 de 2' : ''}</div>
      <div className="cl__sub">Mostrá tu coleccionable con buenas fotos y una descripción clara.</div>

      <form className="cl__card" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <div>
          <Input label="Título" placeholder="Charizard Base Set Holo — 1ª edición" hint="Mínimo 10 caracteres."
            value={form.values.title} onChange={form.handleChange('title')} error={form.errors.title} required />
        </div>
        <Textarea label="Descripción" rows={4} maxLength={2000} placeholder="Contá el estado, procedencia, detalles relevantes…"
          value={form.values.description} onChange={form.handleChange('description')} />

        <div>
          <div className="cl__lbl">Modo de venta</div>
          <div className="cl__radios">
            <div className={`cl__radio${isAuction ? ' cl__radio--on' : ''}`} onClick={() => form.setValue('mode', 'AUCTION')}>Subasta</div>
            <div className={`cl__radio${!isAuction ? ' cl__radio--on' : ''}`} onClick={() => form.setValue('mode', 'FIXED')}>Precio fijo</div>
          </div>
        </div>

        {!isAuction && (
          <Input label="Precio fijo (S/.)" prefix="S/." mono placeholder="0.00"
            value={form.values.fixedPrice} onChange={(e) => form.setValue('fixedPrice', e.target.value.replace(/[^\d.]/g, ''))}
            error={form.errors.fixedPrice} required />
        )}

        <div className="cl__row">
          <div style={{ flex: 1, minWidth: 0 }}>
            <Select label="Categoría" placeholder={catsQ.loading ? 'Cargando…' : 'Elegí una categoría'}
              value={form.values.categoryId} onChange={form.handleChange('categoryId')}
              options={categories.map((c) => ({ value: String(c.id), label: c.name }))} required />
            {form.errors.categoryId && <div className="cl__err">{form.errors.categoryId}</div>}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Select label="Condición / PSA" placeholder="Elegí la condición"
              value={form.values.condition} onChange={form.handleChange('condition')}
              options={CONDITIONS} required />
            {form.errors.condition && <div className="cl__err">{form.errors.condition}</div>}
          </div>
        </div>

        {isAuction && (
          <div className="cl__hint"><Icon.Gavel size={14} style={{ flex: 'none', marginTop: 1 }} /> El precio inicial y la duración (1/3/5/7 días) los definís en el paso 2.</div>
        )}

        {suggestedTags.length > 0 && (
          <div>
            <div className="cl__lbl">Etiquetas</div>
            <div className="cl__chips">
              {suggestedTags.map((t) => <Tag key={t} selected={tags.includes(t)} onClick={() => toggleTag(t)}>{t}</Tag>)}
            </div>
          </div>
        )}

        <div>
          <div className="cl__lbl">Imágenes <span style={{ color: 'var(--text-subtle)', fontWeight: 400 }}>· {images.length}/5</span></div>
          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" multiple hidden onChange={onFiles} />
          <div className="cl__imgs">
            {images.map((img, i) => (
              <div className="cl__slot" key={i}>
                <img src={img.url} alt="" />
                <button type="button" className="cl__slotrm" onClick={() => removeImage(i)}><Icon.X size={12} /></button>
              </div>
            ))}
            {images.length < 5 && (
              <div className="cl__slot" onClick={() => fileRef.current && fileRef.current.click()}><Icon.Image size={20} />Agregar</div>
            )}
          </div>
          <div className="cl__hint"><Icon.AlertTriangle size={13} style={{ flex: 'none', marginTop: 1, color: 'var(--warning)' }} /> Hasta 5 imágenes. JPG, PNG o WEBP, hasta 5MB cada una.</div>
        </div>

        <Button variant="primary" size="lg" fullWidth type="submit" disabled={form.submitting}>
          {form.submitting ? 'Creando…' : isAuction ? 'Continuar al paso 2' : 'Publicar'}
        </Button>
      </form>
    </div>
  );
}
