import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Avatar, ReputationStars, Tabs, AuctionCard, ListingCard, CardSkeleton,
  EmptyState, Pagination, Icon,
} from '../ds';
import { getUser, getUserListings } from '../api/users';
import { getSellerStore } from '../api/seller';
import { listReviewsByUser } from '../api/reviews';
import { auctionCardFrom, listingCardFrom, reviewFromDto, userFromDto } from '../api/adapters';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../auth/AuthContext';

const css = `
.sp{max-width:1080px;margin:0 auto;padding:24px;}
.sp__back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;margin-bottom:14px;}
.sp__head{display:flex;gap:20px;align-items:center;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:22px;margin-bottom:8px;}
.sp__hmeta{flex:1;min-width:0;}
.sp__name{font-size:24px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;display:flex;align-items:center;gap:10px;}
.sp__verif{font-size:12px;color:var(--success);font-weight:600;display:inline-flex;align-items:center;gap:4px;}
.sp__since{font-size:13px;color:var(--text-muted);margin-top:4px;}
.sp__stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:18px 0 22px;}
.sp__stat{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:16px;text-align:center;min-width:0;}
.sp__sval{font-size:22px;font-weight:800;color:var(--text-strong);font-family:var(--font-mono);}
.sp__slabel{font-size:12px;color:var(--text-muted);margin-top:4px;}
.sp__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:18px;}
.sp__reviews{display:flex;flex-direction:column;gap:12px;margin-top:18px;}
.sp__rev{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:16px;}
.sp__revhd{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.sp__revauth{font-size:14px;font-weight:700;color:var(--text-strong);flex:1;}
.sp__revdate{font-size:12px;color:var(--text-subtle);font-family:var(--font-mono);}
.sp__revtxt{font-size:14px;color:var(--text-body);line-height:1.55;}
.sp__store{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:16px 18px;margin:0 0 22px;}
.sp__storehd{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:800;color:var(--text-strong);margin-bottom:6px;}
.sp__storerow{display:flex;align-items:center;gap:7px;font-size:13.5px;color:var(--text-body);}
.sp__storemuted{color:var(--text-subtle);}
.sp__foot{display:flex;justify-content:center;margin-top:22px;}
@media(max-width:1080px){.sp__grid{grid-template-columns:repeat(3,1fr)}}
@media(max-width:680px){.sp__grid{grid-template-columns:repeat(2,1fr)}.sp__head{flex-direction:column;text-align:center}}
@media(max-width:600px){.sp{padding:16px}.sp__stats{grid-template-columns:1fr}}
@media(max-width:480px){.sp__grid{grid-template-columns:1fr}}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

interface SellerProfileProps { onBack?: () => void; onOpenAuction?: (id: any) => void; }
export default function SellerProfile({ onBack, onOpenAuction }: SellerProfileProps) {
  ensure();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tab, setTab] = React.useState('listings');
  const [lPage, setLPage] = React.useState(0);
  const [rPage, setRPage] = React.useState(0);

  // The navbar links to /seller/me; resolve it to the logged-in user's id.
  const sellerId = id === 'me' ? user?.id : id;
  const ready = sellerId != null;

  const userQ = useFetch((signal) => getUser(sellerId, { signal }), [sellerId], { enabled: ready });
  // Store data only for verified sellers; 404 (no store) is ignored silently.
  const storeQ = useFetch((signal) => getSellerStore(sellerId, { signal }), [sellerId],
    { enabled: ready && !!userQ.data?.isVerifiedSeller });
  const listingsQ = useFetch((signal) => getUserListings(sellerId, { page: lPage, size: 12, signal }), [sellerId, lPage], { enabled: ready });
  const reviewsQ = useFetch((signal) => listReviewsByUser(sellerId, { page: rPage, size: 10, signal }), [sellerId, rPage], { enabled: ready });

  const s = userQ.data ? userFromDto(userQ.data) : null;
  const listings = listingsQ.data?.content || [];
  const reviewsCount = reviewsQ.data?.totalElements ?? 0;
  const reviews = (reviewsQ.data?.content || []).map(reviewFromDto);

  if (!ready) {
    return (
      <div className="sp">
        <EmptyState icon={<Icon.User size={26} />} title="Perfil no disponible" description="Inicia sesión para ver tu perfil." />
      </div>
    );
  }

  return (
    <div className="sp">
      <div className="sp__back" onClick={onBack}><Icon.ChevronLeft size={16} /> Volver</div>

      {userQ.loading || !s ? (
        <div className="sp__head"><Avatar name="…" size={72} /><div className="sp__hmeta"><div className="sp__name">Cargando…</div></div></div>
      ) : (
        <>
          <div className="sp__head">
            <Avatar name={s.name} verified={s.verified} size={72} />
            <div className="sp__hmeta">
              <div className="sp__name">{s.name} {s.verified && <span className="sp__verif"><Icon.Shield size={14} /> identidad verificada</span>}</div>
              <div className="sp__since">{s.role === 'SELLER' ? 'Vendedor' : 'Usuario'} en Yala</div>
              <div style={{ marginTop: 8 }}><ReputationStars value={s.rating || 0} count={reviewsCount} size={16} /></div>
            </div>
          </div>

          <div className="sp__stats">
            <div className="sp__stat"><div className="sp__sval">{(s.rating || 0).toFixed(1)}</div><div className="sp__slabel">Reputación</div></div>
            <div className="sp__stat"><div className="sp__sval">{reviewsCount}</div><div className="sp__slabel">Reseñas</div></div>
            <div className="sp__stat"><div className="sp__sval">{listingsQ.data?.totalElements ?? 0}</div><div className="sp__slabel">Publicaciones</div></div>
          </div>
        </>
      )}

      {storeQ.data && (
        <div className="sp__store">
          <div className="sp__storehd">{Icon.Package ? <Icon.Package size={17} /> : null} {storeQ.data.storeName}</div>
          {storeQ.data.address ? (
            <div className="sp__storerow">{Icon.MapPin ? <Icon.MapPin size={15} /> : null} {storeQ.data.address}</div>
          ) : (
            <div className="sp__storerow sp__storemuted">{Icon.MapPin ? <Icon.MapPin size={15} /> : null} Tienda online, sin local presencial</div>
          )}
        </div>
      )}

      <Tabs value={tab} onChange={setTab} tabs={[
        { value: 'listings', label: 'Publicaciones', count: listingsQ.data?.totalElements ?? 0 },
        { value: 'reviews', label: 'Reseñas', count: reviewsCount },
      ]} />

      {tab === 'listings' ? (
        listingsQ.loading ? (
          <div className="sp__grid">{Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}</div>
        ) : listings.length === 0 ? (
          <EmptyState icon={<Icon.Package size={24} />} title="Sin publicaciones" description="Este vendedor todavía no tiene publicaciones activas." />
        ) : (
          <>
            <div className="sp__grid">
              {listings.map((dto) => {
                if (dto.mode === 'AUCTION') {
                  const c = auctionCardFrom(dto);
                  return (
                    <AuctionCard key={dto.id} image={c.image} title={c.title} currentBid={c.currentBid} bidsCount={c.bidsCount}
                      endsAt={c.endsAt} status={c.status} sellerName={c.sellerName} sellerVerified={c.sellerVerified}
                      as="a" href="#" onClick={(e) => { e.preventDefault(); onOpenAuction ? onOpenAuction(c.id) : navigate('/auction/' + c.id); }} />
                  );
                }
                const c = listingCardFrom(dto);
                return (
                  <ListingCard key={dto.id} image={c.image} title={c.title} condition={c.condition} price={c.price}
                    sellerName={c.sellerName} sellerVerified={c.sellerVerified} sellerRating={c.sellerRating}
                    as="a" href="#" onClick={(e) => { e.preventDefault(); navigate('/listing/' + c.id); }} />
                );
              })}
            </div>
            <div className="sp__foot">
              <Pagination page={lPage + 1} total={listingsQ.data?.totalPages ?? 0} onChange={(p) => setLPage(p - 1)} />
            </div>
          </>
        )
      ) : (
        reviewsQ.loading ? (
          <div className="sp__reviews">{Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}</div>
        ) : reviews.length === 0 ? (
          <EmptyState icon={<Icon.Star size={24} />} title="Sin reseñas todavía" description="Cuando complete ventas, las reseñas aparecerán aquí." />
        ) : (
          <>
            <div className="sp__reviews">
              {reviews.map((r) => (
                <div className="sp__rev" key={r.id}>
                  <div className="sp__revhd">
                    <Avatar name={r.author?.name || 'Anónimo'} size={28} />
                    <span className="sp__revauth">{r.author?.name || 'Anónimo'}</span>
                    <ReputationStars value={r.rating} size={14} />
                    <span className="sp__revdate">{r.time}</span>
                  </div>
                  <div className="sp__revtxt">{r.comment}</div>
                </div>
              ))}
            </div>
            <div className="sp__foot">
              <Pagination page={rPage + 1} total={reviewsQ.data?.totalPages ?? 0} onChange={(p) => setRPage(p - 1)} />
            </div>
          </>
        )
      )}
    </div>
  );
}
