import React from 'react';
import { useParams } from 'react-router-dom';
import '@livekit/components-styles';
import { LiveKitRoom, RoomAudioRenderer, VideoTrack, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { Button, Input, Price, Icon, EmptyState } from '../ds';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../context/ToastContext';
import { getLive, watchToken, placeLiveBid, listComments, postComment } from '../api/live';
import { subscribeLive, subscribeLiveChat } from '../api/realtime';
import { useFetch } from '../hooks/useFetch';
import type { FlashAuction, LiveComment, LiveDetail, LiveToken, LiveUpdateMessage } from '../types';

const css = `
.ylv{max-width:1280px;margin:0 auto;padding:20px 24px;display:grid;grid-template-columns:1fr 360px;gap:20px;align-items:start;}
.ylv__back{margin-bottom:14px;}
.ylv__stage{background:#000;border-radius:var(--radius-lg);overflow:hidden;position:relative;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;}
.ylv__stage video{width:100%;height:100%;object-fit:contain;background:#000;}
.ylv__offline{color:#fff;opacity:.7;font-family:var(--font-sans);text-align:center;padding:24px;}
.ylv__livebadge{position:absolute;top:12px;left:12px;display:inline-flex;align-items:center;gap:6px;background:var(--live);color:#fff;font-size:12px;font-weight:800;padding:4px 10px;border-radius:var(--radius-pill);text-transform:uppercase;z-index:2;}
.ylv__dot{width:7px;height:7px;border-radius:50%;background:#fff;animation:yala-live-pulse 1.5s infinite;}
.ylv__head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:14px;}
.ylv__title{font-size:20px;font-weight:800;color:var(--text-strong);}
.ylv__seller{font-size:14px;color:var(--text-muted);}
.ylv__side{display:flex;flex-direction:column;gap:16px;position:sticky;top:96px;}
.ylv__auction{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:16px;display:flex;flex-direction:column;gap:10px;}
.ylv__atitle{font-size:15px;font-weight:800;color:var(--text-strong);}
.ylv__arow{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:var(--text-muted);}
.ylv__bidrow{display:flex;gap:8px;}
.ylv__chat{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);display:flex;flex-direction:column;height:420px;}
.ylv__chathd{padding:12px 14px;border-bottom:1px solid var(--border-subtle);font-weight:700;font-size:14px;color:var(--text-strong);}
.ylv__msgs{flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:8px;}
.ylv__msg{font-size:13px;line-height:1.4;color:var(--text-body);}
.ylv__msg b{color:var(--text-strong);font-weight:700;margin-right:5px;}
.ylv__chatform{display:flex;gap:8px;padding:10px 12px;border-top:1px solid var(--border-subtle);}
.ylv__statetag{font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;padding:3px 9px;border-radius:var(--radius-pill);}
.ylv__statetag--sold{background:var(--success-50,#e9f9f0);color:var(--success-700,#1B9E5A);}
.ylv__statetag--deserted{background:var(--surface-sunken);color:var(--text-muted);}
@media(max-width:1000px){.ylv{grid-template-columns:1fr;}.ylv__side{position:static;}}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); } }

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;

// Renders the seller's published camera (subscribe-only viewer).
function Stage() {
  const tracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare], { onlySubscribed: true });
  const cam = tracks.find((t) => t.publication?.kind === 'video');
  return (
    <div className="ylv__stage">
      <span className="ylv__livebadge"><span className="ylv__dot" /> En vivo</span>
      {cam ? (
        <VideoTrack trackRef={cam} />
      ) : (
        <div className="ylv__offline">Esperando el video del vendedor…</div>
      )}
      <RoomAudioRenderer />
    </div>
  );
}

interface Props {
  verified?: boolean;
  onRequireDni?: () => void;
  onBack?: () => void;
}

export default function LiveView({ verified, onRequireDni, onBack }: Props) {
  ensure();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const { data: detail } = useFetch<LiveDetail>((signal) => getLive(id!, { signal }), [id]);
  const { data: tk } = useFetch<LiveToken>(() => watchToken(id!), [id]);

  const [auction, setAuction] = React.useState<FlashAuction | null>(null);
  const [messages, setMessages] = React.useState<LiveComment[]>([]);
  const [chatText, setChatText] = React.useState('');
  const [bid, setBid] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  // Seed auction state from the detail fetch.
  React.useEffect(() => { setAuction(detail?.activeAuction ?? null); }, [detail]);

  // Seed chat history (endpoint returns newest-first; show oldest-first).
  React.useEffect(() => {
    if (!id) return;
    listComments(id, { size: 30 }).then((page: any) => {
      setMessages([...(page?.content || [])].reverse());
    }).catch(() => {});
  }, [id]);

  // Realtime: auction state changes.
  React.useEffect(() => {
    if (!id) return;
    return subscribeLive<LiveUpdateMessage>(id, (msg) => {
      if (!msg) return;
      if (msg.type === 'LIVE_ENDED') { setAuction(null); return; }
      if (msg.auction) setAuction(msg.auction);
    });
  }, [id]);

  // Realtime: chat.
  React.useEffect(() => {
    if (!id) return;
    return subscribeLiveChat<LiveComment>(id, (c) => {
      if (c) setMessages((prev) => [...prev, c]);
    });
  }, [id]);

  const minNext = auction
    ? (auction.currentPrice == null ? auction.basePrice : auction.currentPrice + auction.bidIncrement)
    : 0;

  const sendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    if (!isAuthenticated) { toast.error('Inicia sesión', 'Necesitas una cuenta para comentar.'); return; }
    const text = chatText.trim();
    setChatText('');
    try { await postComment(id!, text); }
    catch (err: any) { toast.error('No se pudo enviar', err?.message || 'Intenta de nuevo.'); }
  };

  const submitBid = async () => {
    if (!auction) return;
    if (!isAuthenticated) { toast.error('Inicia sesión', 'Necesitas una cuenta para pujar.'); return; }
    if (!verified) { onRequireDni && onRequireDni(); return; }
    const amount = parseFloat(bid);
    if (isNaN(amount) || amount < minNext) {
      toast.error('Puja inválida', `Tu puja debe ser al menos S/. ${minNext}.`);
      return;
    }
    setSubmitting(true);
    try {
      await placeLiveBid(auction.id, amount);
      setBid('');
      toast.success('¡Puja registrada!', 'Vas liderando la subasta.', 'Gavel');
    } catch (err: any) {
      if (err?.status === 409) toast.error('El precio cambió', 'Alguien pujó antes. Revisa el nuevo precio.');
      else toast.error('No se pudo pujar', err?.message || 'Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!detail) {
    return <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>Cargando transmisión…</div>;
  }

  const stateTag = auction?.status === 'SOLD'
    ? <span className="ylv__statetag ylv__statetag--sold">Vendida</span>
    : auction?.status === 'DESERTED'
      ? <span className="ylv__statetag ylv__statetag--deserted">Desierta</span>
      : null;

  return (
    <div>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '12px 24px 0' }}>
        <Button className="ylv__back" variant="ghost" size="sm" onClick={onBack}
          iconLeft={Icon.ChevronLeft ? <Icon.ChevronLeft size={16} /> : null}>Volver</Button>
      </div>
      <div className="ylv">
        <div>
          {LIVEKIT_URL && tk?.token ? (
            <LiveKitRoom serverUrl={tk.url || LIVEKIT_URL} token={tk.token} connect audio={false} video={false}>
              <Stage />
            </LiveKitRoom>
          ) : (
            <div className="ylv__stage"><div className="ylv__offline">El video no está disponible.</div></div>
          )}
          <div className="ylv__head">
            <div>
              <div className="ylv__title">{detail.title}</div>
              {detail.seller && <div className="ylv__seller">{detail.seller.name}</div>}
            </div>
          </div>
        </div>

        <div className="ylv__side">
          <div className="ylv__auction">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-subtle)' }}>Subasta flash</span>
              {stateTag}
            </div>
            {auction ? (
              <>
                <div className="ylv__atitle">{auction.title}</div>
                <div className="ylv__arow">
                  <span>{auction.currentPrice == null ? 'Precio base' : 'Puja actual'}</span>
                  <Price value={auction.currentPrice == null ? auction.basePrice : auction.currentPrice} />
                </div>
                <div className="ylv__arow">
                  <span>{auction.totalBids} {auction.totalBids === 1 ? 'puja' : 'pujas'}</span>
                  <span>Mínimo siguiente: S/. {minNext}</span>
                </div>
                {auction.status === 'ACTIVE' && (
                  <div className="ylv__bidrow">
                    <Input prefix="S/." mono placeholder={String(minNext)} value={bid}
                      onChange={(e: any) => setBid(e.target.value.replace(/[^\d.]/g, ''))} style={{ flex: 1 }} />
                    <Button onClick={submitBid} disabled={submitting}
                      iconLeft={Icon.Gavel ? <Icon.Gavel size={16} /> : null}>Pujar</Button>
                  </div>
                )}
                {auction.status === 'SOLD' && auction.winnerName && (
                  <div className="ylv__arow"><span>Ganador</span><b>{auction.winnerName}</b></div>
                )}
              </>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                No hay una subasta activa en este momento. ¡Quédate atento!
              </div>
            )}
          </div>

          <div className="ylv__chat">
            <div className="ylv__chathd">Chat en vivo</div>
            <div className="ylv__msgs">
              {messages.length === 0 ? (
                <div style={{ fontSize: 13, color: 'var(--text-subtle)' }}>Sé el primero en comentar.</div>
              ) : messages.map((m) => (
                <div className="ylv__msg" key={m.id}><b>{m.userName}</b>{m.text}</div>
              ))}
            </div>
            <form className="ylv__chatform" onSubmit={sendComment}>
              <Input placeholder={isAuthenticated ? 'Escribe un mensaje…' : 'Inicia sesión para comentar'}
                value={chatText} onChange={(e: any) => setChatText(e.target.value)} style={{ flex: 1 }}
                disabled={!isAuthenticated} />
              <Button type="submit" variant="secondary" disabled={!isAuthenticated || !chatText.trim()}>Enviar</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
