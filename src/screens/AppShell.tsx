import React from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { IconButton, Avatar, Icon } from '../ds';
import { getUnreadCount } from '../api/notifications';
import { subscribeNotifications } from '../api/realtime';
import { notificationFromDto } from '../api/adapters';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../context/ToastContext';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';

const shellCSS = `
.ysh{position:sticky;top:0;z-index:50;font-family:var(--font-sans);}
.ysh__bar{height:64px;background:var(--surface-card);border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;gap:20px;padding:0 24px;}
.ysh__logo{display:flex;align-items:center;gap:10px;cursor:pointer;flex:none;}
.ysh__logo img{height:40px;width:auto;display:block;object-fit:contain;}
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
.ysh__register{display:inline-flex;align-items:center;gap:7px;height:40px;padding:0 18px;border-radius:var(--radius-md);background:#0E28D6;color:#fff;font-weight:700;font-size:14px;border:none;cursor:pointer;transition:background var(--dur-fast),transform var(--dur-fast);box-shadow:0 2px 10px rgba(14,40,214,.28);}
.ysh__register:hover{background:#0a1fb0;transform:translateY(-1px);}
.ysh__nav{height:48px;background:var(--surface-card);border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;gap:4px;padding:0 24px;overflow-x:auto;}
.ysh__nav--inline{flex:none;max-width:46%;height:auto;border-bottom:none;background:transparent;padding:0;scrollbar-width:none;}
.ysh__nav--inline::-webkit-scrollbar{display:none;}
.ysh__nav--row{display:none;}
.ysh__cat{display:inline-flex;align-items:center;gap:7px;height:34px;padding:0 14px;border-radius:var(--radius-pill);font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;white-space:nowrap;transition:all var(--dur-fast);border:1px solid transparent;}
.ysh__cat:hover{background:var(--surface-sunken);color:var(--text-strong);}
.ysh__cat--active{background:var(--brand-subtle);color:var(--brand);}
.ysh__burger{display:none;align-items:center;justify-content:center;width:42px;height:42px;border-radius:var(--radius-md);background:var(--surface-sunken);border:1px solid var(--border-subtle);color:var(--text-strong);cursor:pointer;flex:none;}
@media(max-width:720px){
  .ysh__bar{gap:10px;padding:0 14px;}
  .ysh__search{min-width:0;}
  .ysh__burger{display:inline-flex;}
  .ysh__actions{position:absolute;top:64px;right:10px;flex-direction:column;align-items:stretch;gap:8px;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);box-shadow:0 10px 30px rgba(0,0,0,.18);padding:10px;min-width:212px;display:none;z-index:60;}
  .ysh__actions--open{display:flex;}
  .ysh__sell,.ysh__login,.ysh__register{width:100%;justify-content:center;}
  .ysh__user{justify-content:flex-start;}
  .ysh__nav{padding:0 12px;}
  .ysh__nav--inline{display:none;}
  .ysh__nav--row{display:flex;}
}
@media(max-width:400px){
  .ysh__bar{padding:0 10px;}
  .ysh__logo img{height:34px;}
}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = shellCSS; document.head.appendChild(s); } }

function readUnread(data: any) {
  if (!data) return 0;
  if (typeof data.unread === 'number') return data.unread;
  if (typeof data.count === 'number') return data.count;
  const first = Object.values(data)[0];
  return typeof first === 'number' ? first : 0;
}

interface AppShellProps { user?: any; onNav?: (d: any) => void; onCat?: () => void; onLogout?: () => void; }

// `user` is null for a guest session, or { name, verified } for an authed one.
export default function AppShell({ onNav, onLogout, user = null }: AppShellProps) {
  ensure();
  const navigate = useNavigate();
  // Top nav tabs (Subastar / Lives), shown everywhere except landing/login/register.
  const loc = useLocation();
  const showTabs = !['/', '/login', '/register'].includes(loc.pathname);
  const navTab = loc.pathname.startsWith('/live') ? 'lives' : 'subastar';
  const auth = useAuth();
  const toast = useToast();
  const [searchParams] = useSearchParams();

  const [menuOpen, setMenuOpen] = React.useState(false);

  // Unread badge — only meaningful for an authed user; refreshed periodically.
  const unreadQ = useFetch((signal) => getUnreadCount({ signal }), [!!user], { enabled: !!user });
  const unread = readUnread(unreadQ.data);
  React.useEffect(() => {
    if (!user) return undefined;
    const t = setInterval(() => unreadQ.refetch(), 30000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Real-time notifications: STOMP (`/topic/notifications/{userId}`) pushes the
  // badge live and pops a toast the instant something happens, instead of
  // waiting up to 30s for the poll above (which stays as a safety net). The
  // shell `user` prop carries no id, so the real id comes from the auth context.
  const userId = auth.user?.id;
  const refetchUnreadRef = React.useRef(unreadQ.refetch);
  refetchUnreadRef.current = unreadQ.refetch;
  React.useEffect(() => {
    if (!userId) return undefined;
    const unsub = subscribeNotifications(userId, (dto) => {
      const n = notificationFromDto(dto);
      if (n) toast.show({ tone: n.tone, title: n.title, message: n.msg, icon: n.icon });
      if (refetchUnreadRef.current) refetchUnreadRef.current();
    });
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Debounced search -> navigate Home with ?q=.
  const [term, setTerm] = React.useState(searchParams.get('q') || '');
  const debounced = useDebounce(term, 400);
  const lastPushed = React.useRef(searchParams.get('q') || '');
  React.useEffect(() => {
    if (debounced === lastPushed.current) return;
    lastPushed.current = debounced;
    navigate(debounced ? `/inicio?q=${encodeURIComponent(debounced)}` : '/inicio');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const tabs = (
    <>
      <span className={`ysh__cat${navTab === 'subastar' ? ' ysh__cat--active' : ''}`} onClick={() => navigate('/inicio')}>
        {Icon.Gavel ? <Icon.Gavel size={15} /> : null} Subastar
      </span>
      <span className={`ysh__cat${navTab === 'lives' ? ' ysh__cat--active' : ''}`} onClick={() => navigate('/lives')}>
        {Icon.Radio ? <Icon.Radio size={15} /> : null} Lives
      </span>
    </>
  );

  return (
    <div className="ysh">
      <div className="ysh__bar">
        <div className="ysh__logo" onClick={() => navigate('/')}>
          <img src="/assets/yala-logo.png" alt="Yala" />
        </div>
        {showTabs && <div className="ysh__nav ysh__nav--inline">{tabs}</div>}
        <label className="ysh__search">
          <Icon.Search size={18} />
          <input
            placeholder="Buscar Charizard, Funko, comics…"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate(term ? `/inicio?q=${encodeURIComponent(term)}` : '/inicio'); }}
          />
        </label>
        <button className="ysh__burger" aria-label="Menú" onClick={() => setMenuOpen((o) => !o)}>
          {Icon.Menu ? <Icon.Menu size={22} /> : '≡'}
        </button>
        <div className={`ysh__actions${menuOpen ? ' ysh__actions--open' : ''}`} onClick={() => setMenuOpen(false)}>
          {user ? (
            <>
              <button className="ysh__sell" onClick={() => navigate(user.verified ? '/seller' : '/seller/apply')}>
                <Icon.Plus size={17} /> Vender
              </button>
              <IconButton label="Notificaciones" variant="ghost" badge={unread || undefined} onClick={() => onNav && onNav('notifications')}>
                <Icon.Bell size={20} />
              </IconButton>
              <div className="ysh__user" onClick={() => onNav && onNav('profile')}>
                <Avatar name={user.name} verified={user.verified} size="sm" />
                <span className="ysh__uname">{user.name.split(' ')[0]}</span>
              </div>
              <IconButton label="Cerrar sesión" variant="ghost" onClick={() => onLogout && onLogout()}>
                {Icon.Logout ? <Icon.Logout size={20} /> : <Icon.ChevronRight size={20} />}
              </IconButton>
            </>
          ) : (
            <>
              <button className="ysh__register" onClick={() => navigate('/register')}>
                <Icon.User size={17} /> Registrarse
              </button>
              <button className="ysh__login" onClick={() => onNav && onNav('login')}>
                Ingresar
              </button>
            </>
          )}
        </div>
      </div>
      {showTabs && <div className="ysh__nav ysh__nav--row">{tabs}</div>}
    </div>
  );
}
