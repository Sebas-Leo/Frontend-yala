import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IconButton, Avatar, Icon } from '../ds';
import { listCategories } from '../api/categories.js';
import { getUnreadCount } from '../api/notifications.js';
import { useFetch } from '../hooks/useFetch.js';
import { useDebounce } from '../hooks/useDebounce.js';

const shellCSS = `
.ysh{position:sticky;top:0;z-index:50;font-family:var(--font-sans);}
.ysh__bar{height:64px;background:var(--surface-card);border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;gap:20px;padding:0 24px;}
.ysh__logo{display:flex;align-items:center;gap:10px;cursor:pointer;flex:none;}
.ysh__logo img{height:34px;display:block;}
.ysh__search{flex:1;max-width:560px;display:flex;align-items:center;gap:10px;background:var(--surface-sunken);border:1px solid transparent;border-radius:var(--radius-pill);padding:0 16px;height:42px;color:var(--text-muted);transition:all var(--dur-fast) var(--ease-out);cursor:text;}
.ysh__search:focus-within{background:var(--surface-card);border-color:var(--brand);box-shadow:var(--ring-brand);}
.ysh__search input{flex:1;border:none;background:transparent;outline:none;font-family:inherit;font-size:14px;color:var(--text-strong);}
.ysh__search input::placeholder{color:var(--text-subtle);}
.ysh__actions{display:flex;align-items:center;gap:6px;flex:none;}
.ysh__user{display:flex;align-items:center;gap:9px;padding:4px 6px 4px 4px;border-radius:var(--radius-pill);cursor:pointer;transition:background var(--dur-fast);border:1px solid var(--border-subtle);}
.ysh__user:hover{background:var(--surface-sunken);}
.ysh__uname{font-size:13px;font-weight:600;color:var(--text-strong);}
.ysh__sell{display:inline-flex;align-items:center;gap:7px;height:40px;padding:0 16px;border-radius:var(--radius-md);background:var(--brand);color:#fff;font-weight:600;font-size:14px;border:none;cursor:pointer;transition:background var(--dur-fast);}
.ysh__sell:hover{background:var(--brand-hover);}
.ysh__login{display:inline-flex;align-items:center;gap:7px;height:40px;padding:0 16px;border-radius:var(--radius-md);background:transparent;color:var(--text-strong);font-weight:600;font-size:14px;border:1px solid var(--border-subtle);cursor:pointer;transition:all var(--dur-fast);}
.ysh__login:hover{background:var(--surface-sunken);}
.ysh__nav{height:48px;background:var(--surface-card);border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;gap:4px;padding:0 24px;overflow-x:auto;}
.ysh__cat{display:inline-flex;align-items:center;gap:7px;height:34px;padding:0 14px;border-radius:var(--radius-pill);font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;white-space:nowrap;transition:all var(--dur-fast);border:1px solid transparent;}
.ysh__cat:hover{background:var(--surface-sunken);color:var(--text-strong);}
.ysh__cat--active{background:var(--brand-subtle);color:var(--brand);}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = shellCSS; document.head.appendChild(s); } }

function readUnread(data) {
  if (!data) return 0;
  if (typeof data.unread === 'number') return data.unread;
  if (typeof data.count === 'number') return data.count;
  const first = Object.values(data)[0];
  return typeof first === 'number' ? first : 0;
}

// `user` is null for a guest session, or { name, verified } for an authed one.
export default function AppShell({ onNav, onLogout, user = null }) {
  ensure();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCat = searchParams.get('category') || null;

  const catsQ = useFetch((signal) => listCategories({ signal }), []);
  const categories = catsQ.data || [];

  // Unread badge — only meaningful for an authed user; refreshed periodically.
  const unreadQ = useFetch((signal) => getUnreadCount({ signal }), [!!user], { enabled: !!user });
  const unread = readUnread(unreadQ.data);
  React.useEffect(() => {
    if (!user) return undefined;
    const t = setInterval(() => unreadQ.refetch(), 30000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Debounced search -> navigate Home with ?q=.
  const [term, setTerm] = React.useState(searchParams.get('q') || '');
  const debounced = useDebounce(term, 400);
  const lastPushed = React.useRef(searchParams.get('q') || '');
  React.useEffect(() => {
    if (debounced === lastPushed.current) return;
    lastPushed.current = debounced;
    navigate(debounced ? `/?q=${encodeURIComponent(debounced)}` : '/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const goCategory = (name) => navigate(name ? `/?category=${encodeURIComponent(name)}` : '/');

  return (
    <div className="ysh">
      <div className="ysh__bar">
        <div className="ysh__logo" onClick={() => onNav && onNav('home')}>
          <img src="/assets/yala-logo.svg" alt="Yala" />
        </div>
        <label className="ysh__search">
          <Icon.Search size={18} />
          <input
            placeholder="Buscar Charizard, Funko, comics…"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate(term ? `/?q=${encodeURIComponent(term)}` : '/'); }}
          />
        </label>
        <div className="ysh__actions">
          {user ? (
            <>
              <button className="ysh__sell" onClick={() => onNav && onNav('seller')}>
                <Icon.Plus size={17} /> Vender
              </button>
              <IconButton label="Notificaciones" variant="ghost" badge={unread || undefined} onClick={() => onNav && onNav('notifications')}>
                <Icon.Bell size={20} />
              </IconButton>
              <div className="ysh__user" onClick={() => onNav && onNav('profile')}>
                <Avatar name={user.name} verified={user.verified} size="sm" />
                <span className="ysh__uname">{user.name.split(' ')[0]}</span>
                <Icon.ChevronDown size={15} />
              </div>
              <IconButton label="Cerrar sesión" variant="ghost" onClick={() => onLogout && onLogout()}>
                {Icon.Logout ? <Icon.Logout size={20} /> : <Icon.ChevronRight size={20} />}
              </IconButton>
            </>
          ) : (
            <button className="ysh__login" onClick={() => onNav && onNav('login')}>
              <Icon.User size={17} /> Ingresar
            </button>
          )}
        </div>
      </div>
      <div className="ysh__nav">
        <span className={`ysh__cat${!activeCat ? ' ysh__cat--active' : ''}`} onClick={() => goCategory(null)}>
          <Icon.LayoutGrid size={15} /> Todo
        </span>
        {categories.map((c) => (
          <span key={c.id} className={`ysh__cat${activeCat === c.name ? ' ysh__cat--active' : ''}`} onClick={() => goCategory(c.name)}>
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}
