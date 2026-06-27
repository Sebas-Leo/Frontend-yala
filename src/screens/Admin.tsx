import React from 'react';
import { Tabs, Button, Input, EmptyState, CardSkeleton, Icon } from '../ds';
import { listCategories, createCategory } from '../api/categories';
import { listTags, createTag, deleteTag } from '../api/tags';
import { useFetch } from '../hooks/useFetch';
import { useToast } from '../context/ToastContext';

const css = `
.ad{max-width:920px;margin:0 auto;padding:24px;}
.ad__h1{font-size:26px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;margin-bottom:4px;}
.ad__sub{font-size:14px;color:var(--text-muted);margin-bottom:22px;}
.ad__tabs{margin-bottom:18px;}
.ad__panel{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);overflow:hidden;}
.ad__row{display:flex;align-items:center;gap:14px;padding:14px 18px;border-bottom:1px solid var(--border-subtle);}
.ad__row:last-child{border-bottom:none;}
.ad__meta{flex:1;min-width:0;}
.ad__name{font-size:14px;font-weight:700;color:var(--text-strong);}
.ad__det{font-size:12px;color:var(--text-muted);margin-top:2px;}
.ad__actions{display:flex;gap:8px;flex:none;}
.ad__new{display:flex;gap:10px;align-items:flex-end;padding:16px 18px;border-bottom:1px solid var(--border-subtle);background:var(--surface-sunken);}
@media(max-width:560px){.ad__row{flex-wrap:wrap}.ad__new{flex-wrap:wrap}}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

interface AdminProps { onAction?: (m: any) => void; }
export default function Admin({}: AdminProps = {}) {
  ensure();
  const toast = useToast();
  const [tab, setTab] = React.useState('categories');

  const catsQ = useFetch((signal) => listCategories({ signal }), []);
  const tagsQ = useFetch((signal) => listTags({ signal }), []);
  const categories = catsQ.data || [];
  const tags = tagsQ.data || [];

  const [catName, setCatName] = React.useState('');
  const [catDesc, setCatDesc] = React.useState('');
  const [tagName, setTagName] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  const addCategory = async () => {
    if (!catName.trim()) return;
    setBusy(true);
    try {
      await createCategory({ name: catName.trim(), description: catDesc.trim() || undefined });
      toast.success('Categoría creada', `“${catName.trim()}” ya está disponible.`);
      setCatName(''); setCatDesc('');
      catsQ.refetch();
    } catch (err) {
      toast.error('No se pudo crear la categoría', err.message || 'Revisa el nombre (debe ser único).');
    } finally { setBusy(false); }
  };

  const addTag = async () => {
    if (!tagName.trim()) return;
    setBusy(true);
    try {
      await createTag({ name: tagName.trim() });
      toast.success('Etiqueta creada', `“${tagName.trim()}” ya está disponible.`);
      setTagName('');
      tagsQ.refetch();
    } catch (err) {
      toast.error('No se pudo crear la etiqueta', err.message || 'Revisa el nombre (debe ser único).');
    } finally { setBusy(false); }
  };

  const removeTag = async (t) => {
    setBusy(true);
    try {
      await deleteTag(t.id);
      toast.success('Etiqueta eliminada', `Se eliminó “${t.name}”.`);
      tagsQ.refetch();
    } catch (err) {
      toast.error('No se pudo eliminar', err.message || 'Puede estar asociada a publicaciones.');
    } finally { setBusy(false); }
  };

  return (
    <div className="ad">
      <div className="ad__h1">Panel de administración</div>
      <div className="ad__sub">Gestioná las categorías y etiquetas del marketplace.</div>

      <div className="ad__tabs">
        <Tabs value={tab} onChange={setTab} tabs={[
          { value: 'categories', label: 'Categorías', count: categories.length },
          { value: 'tags', label: 'Etiquetas', count: tags.length },
        ]} />
      </div>

      {tab === 'categories' && (
        <div className="ad__panel">
          <div className="ad__new">
            <Input label="Nueva categoría" placeholder="Ej: Cartas Magic" style={{ flex: 1, minWidth: 0 }}
              value={catName} onChange={(e) => setCatName(e.target.value)} />
            <Input label="Descripción (opcional)" placeholder="Breve descripción" style={{ flex: 1, minWidth: 0 }}
              value={catDesc} onChange={(e) => setCatDesc(e.target.value)} />
            <Button variant="primary" iconLeft={<Icon.Plus size={16} />} onClick={addCategory} disabled={busy || !catName.trim()}>Crear</Button>
          </div>
          {catsQ.loading ? (
            <div style={{ padding: 16 }}><CardSkeleton /></div>
          ) : categories.length === 0 ? (
            <EmptyState icon={<Icon.LayoutGrid size={24} />} title="Sin categorías" description="Crea la primera categoría del marketplace." />
          ) : categories.map((c) => (
            <div className="ad__row" key={c.id}>
              <div className="ad__meta">
                <div className="ad__name">{c.name}</div>
                {c.description && <div className="ad__det">{c.description}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'tags' && (
        <div className="ad__panel">
          <div className="ad__new">
            <Input label="Nueva etiqueta" placeholder="Ej: holo" style={{ flex: 1, minWidth: 0 }}
              value={tagName} onChange={(e) => setTagName(e.target.value)} />
            <Button variant="primary" iconLeft={<Icon.Plus size={16} />} onClick={addTag} disabled={busy || !tagName.trim()}>Crear</Button>
          </div>
          {tagsQ.loading ? (
            <div style={{ padding: 16 }}><CardSkeleton /></div>
          ) : tags.length === 0 ? (
            <EmptyState icon={<Icon.Star size={24} />} title="Sin etiquetas" description="Crea la primera etiqueta reutilizable." />
          ) : tags.map((t) => (
            <div className="ad__row" key={t.id}>
              <div className="ad__meta"><div className="ad__name">{t.name}</div></div>
              <div className="ad__actions">
                <Button variant="ghost" size="sm" iconLeft={<Icon.X size={14} />} onClick={() => removeTag(t)} disabled={busy}>Eliminar</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
