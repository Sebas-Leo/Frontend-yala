import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '@livekit/components-styles';
import { LiveKitRoom, RoomAudioRenderer, VideoTrack, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { QRCodeSVG } from 'qrcode.react';
import { Button, Input, Price, Icon, EmptyState } from '../ds';
import { useAuth } from '../auth/AuthContext';
import { useToast } from '../context/ToastContext';
import { getLive, watchToken, placeLiveBid, listComments, postComment } from '../api/live';
import { subscribeLive, subscribeLiveChat } from '../api/realtime';
import { useFetch } from '../hooks/useFetch';
import type { FlashAuction, LiveComment, LiveDetail, LiveToken, LiveUpdateMessage } from '../types';

const css = `
/* ── Desktop layout (video grande + sidebar) ─────────────────────────────── */
.ylv{width:100%;max-width:1600px;margin:0 auto;padding:12px 24px;display:flex;gap:16px;align-items:stretch;height:calc(100vh - 124px);}
.ylv__main{flex:1;min-width:0;display:flex;flex-direction:column;}
.ylv__stage{flex:1;min-height:0;background:#000;border-radius:var(--radius-lg);overflow:hidden;position:relative;display:flex;align-items:center;justify-content:center;}
.ylv__stage video{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000;}
.ylv__offline{position:absolute;inset:0;z-index:1;display:flex;align-items:center;justify-content:center;color:#fff;opacity:.7;font-family:var(--font-sans);text-align:center;padding:24px;}
.ylv__topscrim{position:absolute;top:0;left:0;right:0;z-index:3;display:flex;align-items:center;gap:12px;padding:14px 16px 28px;background:linear-gradient(to bottom,rgba(0,0,0,0.6) 0%,transparent 100%);pointer-events:none;}
.ylv__topscrim>*{pointer-events:auto;}
.ylv__backbtn{background:rgba(0,0,0,0.35);border:none;cursor:pointer;color:#fff;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:none;}
.ylv__topinfo{min-width:0;flex:1;}
.ylv__title{font-size:18px;font-weight:800;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,0.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ylv__seller{font-size:13px;color:rgba(255,255,255,0.8);text-shadow:0 1px 4px rgba(0,0,0,0.5);}
.ylv__livebadge{position:absolute;top:14px;right:16px;display:inline-flex;align-items:center;gap:6px;background:var(--live);color:#fff;font-size:12px;font-weight:800;padding:4px 10px;border-radius:var(--radius-pill);text-transform:uppercase;z-index:3;}
.ylv__dot{width:7px;height:7px;border-radius:50%;background:#fff;animation:yala-live-pulse 1.5s infinite;}
.ylv__qr{position:absolute;left:14px;top:50%;transform:translateY(-50%);z-index:3;background:#fff;border-radius:var(--radius-lg);padding:10px;box-shadow:0 6px 24px rgba(0,0,0,0.35);display:flex;flex-direction:column;align-items:center;gap:6px;opacity:.92;transition:opacity .15s ease;}
.ylv__qr:hover{opacity:1;}
.ylv__qrlabel{font-size:11px;font-weight:700;color:#1a1a22;font-family:var(--font-sans);max-width:120px;text-align:center;line-height:1.2;}
.ylv__side{width:380px;flex:none;display:flex;flex-direction:column;gap:16px;height:100%;}
.ylv__auction{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:16px;display:flex;flex-direction:column;gap:10px;flex:none;}
.ylv__atitle{font-size:15px;font-weight:800;color:var(--text-strong);}
.ylv__arow{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:var(--text-muted);}
.ylv__bidrow{display:flex;gap:8px;align-items:center;}
.ylv__bidrow>button{flex:none;white-space:nowrap;}
.ylv__chat{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);display:flex;flex-direction:column;flex:1;min-height:0;}
.ylv__chathd{padding:12px 14px;border-bottom:1px solid var(--border-subtle);font-weight:700;font-size:14px;color:var(--text-strong);}
.ylv__msgs{flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:8px;}
.ylv__msg{font-size:13px;line-height:1.4;color:var(--text-body);}
.ylv__msg b{color:var(--text-strong);font-weight:700;margin-right:5px;}
.ylv__chatform{display:flex;gap:8px;padding:10px 12px;border-top:1px solid var(--border-subtle);}
.ylv__statetag{font-size:12px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;padding:3px 9px;border-radius:var(--radius-pill);}
.ylv__statetag--sold{background:var(--success-50,#e9f9f0);color:var(--success-700,#1B9E5A);}
.ylv__statetag--deserted{background:var(--surface-sunken);color:var(--text-muted);}
@media(max-width:1000px){.ylv{flex-direction:column;height:auto;}.ylv__stage{aspect-ratio:16/9;flex:none;}.ylv__side{width:100%;height:auto;}.ylv__chat{flex:none;height:420px;}}
@media(max-width:600px){.ylv{padding:14px;}.ylv__chat{height:auto;max-height:55vh;}.ylv__qr{display:none;}}

/* ── Inmersivo (TikTok/Whatnot) — viewport angosto (≤720px) ─────────────── */
.ylvi__root{position:fixed;inset:0;z-index:200;background:#000;overflow:hidden;}
.ylvi__stageroot{position:absolute;inset:0;overflow:hidden;}
.ylvi__stageinner{position:absolute;inset:0;}
.ylvi__stageinner video{width:100%;height:100%;object-fit:cover;background:#000;}
.ylvi__stageno{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.75);font-family:var(--font-sans);font-size:14px;text-align:center;padding:32px;line-height:1.5;}
.ylvi__topscrim{position:absolute;top:0;left:0;right:0;background:linear-gradient(to bottom,rgba(0,0,0,0.58) 0%,transparent 100%);padding-top:max(12px,env(safe-area-inset-top,12px));padding-left:16px;padding-right:16px;padding-bottom:24px;}
.ylvi__toprow{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.ylvi__backbtn{background:none;border:none;cursor:pointer;color:#fff;padding:4px;display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;}
.ylvi__livebadge{display:inline-flex;align-items:center;gap:5px;background:var(--live);color:#fff;font-size:11px;font-weight:800;padding:3px 9px;border-radius:var(--radius-pill);letter-spacing:.04em;text-transform:uppercase;}
.ylvi__dot{width:6px;height:6px;border-radius:50%;background:#fff;animation:yala-live-pulse 1.5s infinite;}
.ylvi__livetitle{font-size:16px;font-weight:800;color:#fff;font-family:var(--font-sans);line-height:1.25;text-shadow:0 1px 4px rgba(0,0,0,0.4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ylvi__liveseller{font-size:13px;color:rgba(255,255,255,0.75);font-family:var(--font-sans);margin-top:3px;}
.ylvi__bottom{position:absolute;bottom:0;left:0;right:0;display:flex;flex-direction:column;gap:8px;padding:8px 12px;padding-bottom:max(16px,calc(env(safe-area-inset-bottom,0px) + 16px));}
.ylvi__chatoverlay{display:flex;flex-direction:column;gap:4px;max-width:68%;pointer-events:none;}
.ylvi__chatpill{display:inline-flex;flex-wrap:wrap;align-items:center;align-self:flex-start;background:rgba(15,15,22,0.55);border-radius:12px;padding:5px 10px;font-size:13px;color:#fff;font-family:var(--font-sans);line-height:1.4;gap:2px;}
.ylvi__chatpill b{font-weight:700;margin-right:2px;}
.ylvi__acard{background:var(--surface-card,#fff);border-radius:var(--radius-xl,18px);padding:14px;display:flex;flex-direction:column;gap:10px;box-shadow:var(--shadow-live,0 4px 32px rgba(251,101,20,0.22));}
.ylvi__acardtop{display:flex;align-items:center;justify-content:space-between;gap:8px;}
.ylvi__acardlabel{font-size:10px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--live);}
.ylvi__acardname{font-size:14px;font-weight:800;color:var(--text-strong);font-family:var(--font-sans);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.ylvi__acardmeta{font-size:12px;color:var(--text-muted);font-family:var(--font-mono);}
.ylvi__whatnotrow{display:flex;gap:8px;align-items:center;}
.ylvi__customrow{display:flex;gap:8px;align-items:center;}
.ylvi__gatetext{font-size:12px;color:var(--text-muted);margin:0;}
.ylvi__commentbar{display:flex;gap:8px;align-items:center;}
.ylvi__commentinput{flex:1;height:42px;border-radius:var(--radius-pill,999px);background:rgba(255,255,255,0.18);border:1.5px solid rgba(255,255,255,0.25);padding:0 16px;font-family:var(--font-sans);font-size:14px;color:#fff;outline:none;-webkit-appearance:none;}
.ylvi__commentinput:focus{border-color:rgba(255,255,255,0.5);}
.ylvi__commentinput::placeholder{color:rgba(255,255,255,0.5);}
.ylvi__logingate{background:rgba(15,15,22,0.65);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border-radius:var(--radius-xl,18px);padding:14px;display:flex;flex-direction:column;gap:10px;}
.ylvi__logintext{font-size:13px;color:rgba(255,255,255,0.85);font-family:var(--font-sans);text-align:center;margin:0;}
.ylvi__loginbtnrow{display:flex;gap:8px;}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); } }

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;

// Renders the seller's published camera (subscribe-only viewer).
// Renders just the seller's video + audio (subscribe-only). The stage wrapper
// and overlays (badge/QR/scrim) are provided by each layout around it.
function Stage({ offlineClass = 'ylv__offline' }: { offlineClass?: string }) {
  const tracks = useTracks([Track.Source.Camera, Track.Source.ScreenShare], { onlySubscribed: true });
  const cam = tracks.find((t) => t.publication?.kind === 'video');
  return (
    <>
      {cam ? (
        <VideoTrack trackRef={cam} />
      ) : (
        <div className={offlineClass}>Esperando el video del vendedor…</div>
      )}
      <RoomAudioRenderer />
    </>
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
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const toast = useToast();

  const { data: detail } = useFetch<LiveDetail>((signal) => getLive(id!, { signal }), [id]);
  const { data: tk } = useFetch<LiveToken>(() => watchToken(id!), [id]);

  const [auction, setAuction] = React.useState<FlashAuction | null>(null);
  const [messages, setMessages] = React.useState<LiveComment[]>([]);
  const [chatText, setChatText] = React.useState('');
  const [bid, setBid] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const [customMode, setCustomMode] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 720px)').matches : false
  );
  // Tracks whether the LiveKit room ever connected, so a disconnect after the
  // host ends the stream is treated as "ended" instead of a generic error.
  const connectedRef = React.useRef(false);

  // Seed auction + ended state from the detail fetch.
  React.useEffect(() => {
    setAuction(detail?.activeAuction ?? null);
    if (detail?.status === 'ENDED') setEnded(true);
  }, [detail]);

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
      if (msg.type === 'LIVE_ENDED') { setEnded(true); setAuction(null); return; }
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

  // Viewport listener: switch between desktop (2-col) and immersive layouts.
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const minNext = auction
    ? (auction.currentPrice == null ? auction.basePrice : auction.currentPrice + auction.bidIncrement)
    : 0;

  // URL pública de este live para compartirlo vía QR (escanear → entrar al live).
  const liveUrl = typeof window !== 'undefined' ? `${window.location.origin}/live/${id}` : '';

  // Auto-seed the bid input with the minimum next amount when the auction changes or a new bid lands.
  React.useEffect(() => {
    if (!auction) return;
    setBid((prev) => {
      const cur = parseFloat(prev);
      if (!prev || isNaN(cur) || cur < minNext) return String(minNext);
      return prev;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minNext, auction?.id]);

  // Event-free comment handler, shared by both layouts.
  const handleComment = async () => {
    if (!chatText.trim() || !isAuthenticated) return;
    const text = chatText.trim();
    setChatText('');
    try { await postComment(id!, text); }
    catch (err: any) { toast.error('No se pudo enviar', err?.message || 'Intenta de nuevo.'); }
  };

  const sendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    if (!isAuthenticated) { toast.error('Inicia sesión', 'Necesitas una cuenta para comentar.'); return; }
    await handleComment();
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

  // Quick bid: puja el mínimo siguiente de un toque (layout inmersivo).
  const quickBid = async () => {
    if (!auction) return;
    if (!isAuthenticated) { toast.error('Inicia sesión', 'Necesitas una cuenta para pujar.'); return; }
    if (!verified) { onRequireDni && onRequireDni(); return; }
    setSubmitting(true);
    try {
      await placeLiveBid(auction.id, minNext);
      setCustomMode(false);
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

  // ── Inmersivo (TikTok/Whatnot) — solo viewport angosto (≤720px) ────────────
  if (isMobile) {
    return (
      <div className="ylvi__root">

        {/* Video de fondo a pantalla completa */}
        <div className="ylvi__stageroot">
          {ended ? (
            <div className="ylvi__stageno">La transmisión finalizó.<br />¡Gracias por acompañarnos!</div>
          ) : LIVEKIT_URL && tk?.token ? (
            <LiveKitRoom
              serverUrl={tk.url || LIVEKIT_URL}
              token={tk.token}
              connect
              audio={false}
              video={false}
              onConnected={() => { connectedRef.current = true; }}
              onDisconnected={() => { if (connectedRef.current) setEnded(true); }}
            >
              <div className="ylvi__stageinner"><Stage offlineClass="ylvi__stageno" /></div>
            </LiveKitRoom>
          ) : (
            <div className="ylvi__stageno">El video no está disponible.</div>
          )}
        </div>

        {/* Scrim superior: botón volver + badge "En vivo" + título/vendedor */}
        <div className="ylvi__topscrim">
          <div className="ylvi__toprow">
            <button className="ylvi__backbtn" onClick={onBack} aria-label="Volver">
              {Icon.ChevronLeft ? <Icon.ChevronLeft size={26} /> : '‹'}
            </button>
            <span className="ylvi__livebadge">
              <span className="ylvi__dot" /> En vivo
            </span>
          </div>
          <div className="ylvi__livetitle">{detail.title}</div>
          {detail.seller && <div className="ylvi__liveseller">{detail.seller.name}</div>}
        </div>

        {/* Overlay inferior: chat + card de subasta + barra de comentario/login */}
        <div className="ylvi__bottom">

          {/* Últimos 5 mensajes del chat (no interactivo) */}
          {messages.length > 0 && (
            <div className="ylvi__chatoverlay">
              {messages.slice(-5).map((m) => (
                <div key={m.id} className="ylvi__chatpill">
                  <b>{m.userName ?? 'Anónimo'}</b>{m.text}
                </div>
              ))}
            </div>
          )}

          {/* Card flotante de subasta flash */}
          {auction && !ended && (
            <div className="ylvi__acard">
              <div className="ylvi__acardtop">
                <span className="ylvi__acardlabel">Subasta flash</span>
                {stateTag}
              </div>
              <div className="ylvi__acardname">{auction.title}</div>
              <div className="ylvi__acardmeta">
                S/. {(auction.currentPrice ?? auction.basePrice).toFixed(2)}
                {'  ·  '}
                {auction.totalBids} puja{auction.totalBids !== 1 ? 's' : ''}
                {'  ·  '}
                Mín. S/. {minNext}
              </div>

              {auction.status === 'ACTIVE' && isAuthenticated && (
                customMode ? (
                  <div className="ylvi__customrow">
                    <Input
                      prefix="S/."
                      mono
                      placeholder={String(minNext)}
                      value={bid}
                      onChange={(e: any) => {
                        let v = e.target.value.replace(/[^\d.]/g, '');
                        if (Number(v) > 9999) v = '9999';
                        setBid(v);
                      }}
                      style={{ flex: 1, minWidth: 0 }}
                    />
                    <Button
                      variant="live"
                      size="md"
                      onClick={submitBid}
                      disabled={submitting}
                      iconLeft={Icon.Gavel ? <Icon.Gavel size={16} /> : null}
                    >
                      {submitting ? '…' : 'Pujar'}
                    </Button>
                  </div>
                ) : (
                  <div className="ylvi__whatnotrow">
                    <Button
                      variant="secondary"
                      size="md"
                      style={{ flex: 1 }}
                      onClick={() => { setCustomMode(true); setBid(String(minNext)); }}
                    >
                      Personalizar
                    </Button>
                    <Button
                      variant="live"
                      size="md"
                      style={{ flex: 2 }}
                      onClick={quickBid}
                      disabled={submitting}
                      iconLeft={Icon.Gavel ? <Icon.Gavel size={16} /> : null}
                    >
                      {submitting ? '…' : `Pujar  S/. ${minNext}`}
                    </Button>
                  </div>
                )
              )}

              {auction.status === 'ACTIVE' && !isAuthenticated && (
                <p className="ylvi__gatetext">Inicia sesión para pujar.</p>
              )}

              {auction.status === 'SOLD' && auction.winnerName && (
                <div style={{ fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                  Ganador: <b>{auction.winnerName}</b>
                </div>
              )}
              {auction.status === 'SOLD' && user?.name && auction.winnerName === user.name && (
                <Button
                  variant="live"
                  size="md"
                  fullWidth
                  onClick={() => navigate('/orders')}
                  iconLeft={Icon.Gavel ? <Icon.Gavel size={16} /> : null}
                >
                  ¡Ganaste! Pagar ahora
                </Button>
              )}
            </div>
          )}

          {/* Barra de comentario (logueado) o CTA de login (invitado) */}
          {isAuthenticated ? (
            <div className="ylvi__commentbar">
              <input
                className="ylvi__commentinput"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                placeholder={ended ? 'El chat se cerró' : 'Escribe un comentario…'}
                disabled={ended}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleComment(); } }}
              />
              <Button
                size="sm"
                variant="secondary"
                onClick={handleComment}
                disabled={ended || !chatText.trim()}
              >
                Enviar
              </Button>
            </div>
          ) : (
            <div className="ylvi__logingate">
              <p className="ylvi__logintext">Inicia sesión para pujar y comentar en el live.</p>
              <div className="ylvi__loginbtnrow">
                <Button variant="live" size="md" fullWidth onClick={() => navigate('/login')}>
                  Iniciar sesión
                </Button>
                <Button variant="secondary" size="md" fullWidth onClick={() => navigate('/register')}>
                  Registrarse
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Layout desktop (video grande + sidebar) ──────────────────────────────────
  return (
    <div className="ylv">
      <div className="ylv__main">
        <div className="ylv__stage">
          {/* Scrim superior superpuesto: botón volver + título/vendedor */}
          <div className="ylv__topscrim">
            <button className="ylv__backbtn" onClick={onBack} aria-label="Volver">
              {Icon.ChevronLeft ? <Icon.ChevronLeft size={20} /> : '‹'}
            </button>
            <div className="ylv__topinfo">
              <div className="ylv__title">{detail.title}</div>
              {detail.seller && <div className="ylv__seller">{detail.seller.name}</div>}
            </div>
          </div>
          {!ended && <span className="ylv__livebadge"><span className="ylv__dot" /> En vivo</span>}

          {/* QR para entrar al live escaneándolo (costado izquierdo del video) */}
          {liveUrl && (
            <div className="ylv__qr">
              <QRCodeSVG value={liveUrl} size={120} />
              <span className="ylv__qrlabel">Escanea para entrar</span>
            </div>
          )}

          {/* Contenido del video según estado */}
          {ended ? (
            <div className="ylv__offline">La transmisión finalizó.<br />¡Gracias por acompañarnos!</div>
          ) : LIVEKIT_URL && tk?.token ? (
            <LiveKitRoom serverUrl={tk.url || LIVEKIT_URL} token={tk.token} connect audio={false} video={false}
              onConnected={() => { connectedRef.current = true; }}
              onDisconnected={() => { if (connectedRef.current) setEnded(true); }}>
              <Stage />
            </LiveKitRoom>
          ) : (
            <div className="ylv__offline">El video no está disponible.</div>
          )}
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
                      onChange={(e: any) => { let v = e.target.value.replace(/[^\d.]/g, ''); if (Number(v) > 9999) v = '9999'; setBid(v); }}
                      style={{ flex: 1, minWidth: 0 }} />
                    <Button onClick={submitBid} disabled={submitting}
                      iconLeft={Icon.Gavel ? <Icon.Gavel size={16} /> : null}>Pujar S/. {minNext}</Button>
                  </div>
                )}
                {auction.status === 'SOLD' && auction.winnerName && (
                  <div className="ylv__arow"><span>Ganador</span><b>{auction.winnerName}</b></div>
                )}
                {auction.status === 'SOLD' && user?.name && auction.winnerName === user.name && (
                  <Button variant="primary" size="md" fullWidth onClick={() => navigate('/orders')}
                    iconLeft={Icon.Gavel ? <Icon.Gavel size={16} /> : null}>¡Ganaste! Pagar ahora</Button>
                )}
              </>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                {ended
                  ? 'La transmisión finalizó. No hay más subastas en este live.'
                  : 'No hay una subasta activa en este momento. ¡Quédate atento!'}
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
              <Input placeholder={ended ? 'El chat se cerró' : isAuthenticated ? 'Escribe un mensaje…' : 'Inicia sesión para comentar'}
                value={chatText} onChange={(e: any) => setChatText(e.target.value)} style={{ flex: 1 }}
                disabled={!isAuthenticated || ended} />
              <Button type="submit" variant="secondary" disabled={!isAuthenticated || ended || !chatText.trim()}>Enviar</Button>
            </form>
          </div>
        </div>
      </div>
  );
}
