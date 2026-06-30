import React from 'react';
import '@livekit/components-styles';
import { LiveKitRoom, VideoTrack, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { QRCodeSVG } from 'qrcode.react';
import { Button, Input, Price, Icon } from '../ds';
import { useToast } from '../context/ToastContext';
import { startLive, endLive, createFlashAuction, closeFlashAuction, listComments, postComment, summarizeComments } from '../api/live';
import { subscribeLive, subscribeLiveChat } from '../api/realtime';
import type { FlashAuction, LiveComment, LiveToken, LiveUpdateMessage } from '../types';

const css = `
.ygl{max-width:1100px;margin:0 auto;padding:24px;}
.ygl--live{max-width:1500px;padding:12px 24px;}
.ygl__setup{max-width:520px;margin:40px auto;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:28px;display:flex;flex-direction:column;gap:16px;}
.ygl__h{font-size:20px;font-weight:800;color:var(--text-strong);}
.ygl__sub{font-size:14px;color:var(--text-muted);}
.ygl__grid{display:flex;gap:16px;align-items:stretch;height:calc(100vh - 132px);}
.ygl__stage{flex:1;min-width:0;position:relative;background:#000;border-radius:var(--radius-lg);overflow:hidden;display:flex;align-items:center;justify-content:center;}
.ygl__stage video{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000;}
.ygl__placeholder{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;opacity:.7;font-family:var(--font-sans);}
.ygl__qr{position:absolute;left:14px;top:50%;transform:translateY(-50%);z-index:3;background:#fff;border-radius:var(--radius-lg);padding:10px;box-shadow:0 6px 24px rgba(0,0,0,0.35);display:flex;flex-direction:column;align-items:center;gap:6px;opacity:.92;transition:opacity .15s ease;}
.ygl__qr:hover{opacity:1;}
.ygl__qrlabel{font-size:11px;font-weight:700;color:#1a1a22;font-family:var(--font-sans);max-width:120px;text-align:center;line-height:1.2;}
.ygl__panel{display:flex;flex-direction:column;gap:14px;width:380px;flex:none;height:100%;overflow-y:auto;}
.ygl__card{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:16px;display:flex;flex-direction:column;gap:10px;}
.ygl__label{font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--text-subtle);}
.ygl__chat{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);display:flex;flex-direction:column;height:340px;}
.ygl__chathd{padding:10px 14px;border-bottom:1px solid var(--border-subtle);font-weight:700;font-size:14px;color:var(--text-strong);display:flex;align-items:center;justify-content:space-between;gap:8px;}
.ygl__summary{padding:10px 12px;background:var(--brand-subtle);border-bottom:1px solid var(--border-subtle);font-size:12.5px;color:var(--text-body);white-space:pre-line;line-height:1.5;max-height:150px;overflow:auto;}
.ygl__summary b{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:var(--brand);margin-bottom:4px;}
.ygl__msgs{flex:1;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:8px;}
.ygl__msg{font-size:13px;line-height:1.4;color:var(--text-body);}
.ygl__msg b{color:var(--text-strong);font-weight:700;margin-right:5px;}
.ygl__chatform{display:flex;gap:8px;padding:10px 12px;border-top:1px solid var(--border-subtle);}
@media(max-width:900px){.ygl__grid{flex-direction:column;height:auto;}.ygl__stage{aspect-ratio:16/9;flex:none;}.ygl__panel{width:100%;height:auto;overflow:visible;}}
@media(max-width:600px){.ygl{padding:14px;}.ygl__chat{height:auto;max-height:50vh;}.ygl__setup{margin:16px auto;padding:20px;}.ygl__qr{display:none;}}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); } }

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;

// The seller's camera preview. Shows a QR (linking to the public live URL) so
// the seller can display it on-camera and viewers join by scanning it.
function PublisherStage({ qrUrl }: { qrUrl?: string }) {
  const tracks = useTracks([Track.Source.Camera], { onlySubscribed: false });
  const cam = tracks.find((t) => t.publication?.kind === 'video' || t.source === Track.Source.Camera);
  return (
    <div className="ygl__stage">
      {qrUrl && (
        <div className="ygl__qr">
          <QRCodeSVG value={qrUrl} size={120} />
          <span className="ygl__qrlabel">Escanea para entrar</span>
        </div>
      )}
      {cam ? <VideoTrack trackRef={cam} /> : <div className="ygl__placeholder">Activando tu cámara…</div>}
    </div>
  );
}

interface Props { onBack?: () => void }

export default function GoLive({ onBack }: Props) {
  ensure();
  const toast = useToast();

  const [title, setTitle] = React.useState('');
  const [token, setToken] = React.useState<LiveToken | null>(null);
  const [starting, setStarting] = React.useState(false);

  const [faTitle, setFaTitle] = React.useState('');
  const [faBase, setFaBase] = React.useState('');
  const [faIncrement, setFaIncrement] = React.useState('1');
  const [auction, setAuction] = React.useState<FlashAuction | null>(null);
  const [messages, setMessages] = React.useState<LiveComment[]>([]);
  const [chatText, setChatText] = React.useState('');
  const [summary, setSummary] = React.useState<string | null>(null);
  const [summarizing, setSummarizing] = React.useState(false);

  React.useEffect(() => {
    if (!token) return;
    return subscribeLive<LiveUpdateMessage>(token.streamId, (msg) => {
      if (!msg) return;
      if (msg.type === 'AUCTION_CLOSED') { setAuction(msg.auction); return; }
      if (msg.auction) setAuction(msg.auction);
    });
  }, [token]);

  // Live chat: seed history (newest-first → show oldest-first) + realtime subscription.
  React.useEffect(() => {
    if (!token) return undefined;
    listComments(token.streamId, { size: 30 })
      .then((page: any) => setMessages([...(page?.content || [])].reverse()))
      .catch(() => {});
    return subscribeLiveChat<LiveComment>(token.streamId, (c) => {
      if (c) setMessages((prev) => [...prev, c]);
    });
  }, [token]);

  const runSummary = async () => {
    if (!token || summarizing) return;
    setSummarizing(true);
    try {
      const r = await summarizeComments(token.streamId, { limit: 80 });
      setSummary(r?.summary || 'Sin resumen.');
    } catch (err: any) {
      toast.error('No se pudo resumir', err?.message || 'Intenta de nuevo.');
    } finally {
      setSummarizing(false);
    }
  };

  const sendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const text = chatText.trim();
    if (!text) return;
    setChatText('');
    // The message is appended when the STOMP broadcast echoes back (no optimistic add).
    try { await postComment(token.streamId, text); }
    catch (err: any) { toast.error('No se pudo enviar', err?.message || 'Intenta de nuevo.'); }
  };

  const start = async () => {
    if (!title.trim()) { toast.error('Falta el título', 'Ponle un título a tu transmisión.'); return; }
    setStarting(true);
    try {
      const tk = await startLive({ title: title.trim() });
      setToken(tk);
      toast.success('¡Estás en vivo!', 'Tu transmisión arrancó.', 'TrendingUp');
    } catch (err: any) {
      toast.error('No se pudo iniciar', err?.message || 'Intenta de nuevo.');
    } finally {
      setStarting(false);
    }
  };

  const end = async () => {
    if (!token) return;
    try { await endLive(token.streamId); } catch { /* ignore */ }
    toast.success('Transmisión finalizada', 'Tu live terminó.');
    setToken(null);
    onBack && onBack();
  };

  const createAuction = async () => {
    if (!token) return;
    const base = parseFloat(faBase);
    if (!faTitle.trim() || isNaN(base)) { toast.error('Datos incompletos', 'Ingresa título y precio base.'); return; }
    const increment = parseFloat(faIncrement) || 1;
    try {
      const a = await createFlashAuction(token.streamId, { title: faTitle.trim(), basePrice: base, bidIncrement: increment });
      setAuction(a);
      setFaTitle(''); setFaBase(''); setFaIncrement('1');
      toast.success('Subasta flash iniciada', 'Los espectadores ya pueden pujar.', 'Gavel');
    } catch (err: any) {
      toast.error('No se pudo crear', err?.message || 'Intenta de nuevo.');
    }
  };

  const closeAuction = async () => {
    if (!auction) return;
    try {
      const a = await closeFlashAuction(auction.id);
      setAuction(a);
      toast.success(a.status === 'SOLD' ? 'Subasta vendida' : 'Subasta desierta',
        a.status === 'SOLD' ? `Ganó ${a.winnerName}.` : 'No hubo pujas.');
    } catch (err: any) {
      toast.error('No se pudo cerrar', err?.message || 'Intenta de nuevo.');
    }
  };

  if (!token) {
    return (
      <div className="ygl">
        <div className="ygl__setup">
          <div className="ygl__h">Iniciar transmisión</div>
          <div className="ygl__sub">Transmite en vivo y lanza subastas flash de tus coleccionables.</div>
          <div>
            <div className="ygl__label" style={{ marginBottom: 6 }}>Título</div>
            <Input placeholder="Ej: Ruptura de sobres Pokémon 151" value={title}
              onChange={(e: any) => setTitle(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button onClick={start} disabled={starting}
              iconLeft={Icon.TrendingUp ? <Icon.TrendingUp size={16} /> : null}>
              {starting ? 'Iniciando…' : 'Iniciar transmisión'}
            </Button>
            <Button variant="ghost" onClick={onBack}>Cancelar</Button>
          </div>
          {!LIVEKIT_URL && (
            <div style={{ fontSize: 12, color: 'var(--warning-700,#C7891A)' }}>
              Falta configurar VITE_LIVEKIT_URL: el video no se publicará.
            </div>
          )}
        </div>
      </div>
    );
  }

  // Public URL viewers reach by scanning the QR (origin + /live/:streamId).
  const liveUrl = typeof window !== 'undefined' ? `${window.location.origin}/live/${token.streamId}` : '';

  return (
    <div className="ygl ygl--live">
      <LiveKitRoom serverUrl={token.url || LIVEKIT_URL} token={token.token} connect audio video>
        <div className="ygl__grid">
          <PublisherStage qrUrl={liveUrl} />
          <div className="ygl__panel">
            <div className="ygl__card">
              <div className="ygl__label">Subasta flash</div>
              {auction && auction.status === 'ACTIVE' ? (
                <>
                  <div style={{ fontWeight: 800, color: 'var(--text-strong)' }}>{auction.title}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}>
                    <span>{auction.totalBids} {auction.totalBids === 1 ? 'puja' : 'pujas'}</span>
                    <Price value={auction.currentPrice == null ? auction.basePrice : auction.currentPrice} />
                  </div>
                  <Button variant="secondary" onClick={closeAuction}>Cerrar subasta</Button>
                </>
              ) : (
                <>
                  <Input label="Producto" placeholder="Título del producto" value={faTitle} onChange={(e: any) => setFaTitle(e.target.value)} />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Input label="Precio base" hint="Puja inicial de la subasta" prefix="S/." mono placeholder="0" value={faBase}
                        onChange={(e: any) => setFaBase(e.target.value.replace(/[^\d.]/g, ''))} style={{ width: '100%' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Input label="Incremento" hint="Cuánto sube cada puja" prefix="S/." mono placeholder="1" value={faIncrement}
                        onChange={(e: any) => setFaIncrement(e.target.value.replace(/[^\d.]/g, ''))} style={{ width: '100%' }} />
                    </div>
                  </div>
                  <Button onClick={createAuction} iconLeft={Icon.Gavel ? <Icon.Gavel size={16} /> : null}>
                    Lanzar subasta flash
                  </Button>
                  {auction && (
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                      Última subasta: {auction.title} — {auction.status === 'SOLD' ? `vendida a ${auction.winnerName}` : 'desierta'}.
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="ygl__chat">
              <div className="ygl__chathd">
                <span>Chat en vivo</span>
                <Button variant="ghost" size="sm" onClick={runSummary} disabled={summarizing}
                  iconLeft={Icon.Sparkles ? <Icon.Sparkles size={14} /> : null}>
                  {summarizing ? 'Resumiendo…' : 'Resumir IA'}
                </Button>
              </div>
              {summary && (
                <div className="ygl__summary"><b>Resumen del chat</b>{summary}</div>
              )}
              <div className="ygl__msgs">
                {messages.length === 0 ? (
                  <div style={{ fontSize: 13, color: 'var(--text-subtle)' }}>Aún no hay comentarios.</div>
                ) : messages.map((m) => (
                  <div className="ygl__msg" key={m.id}><b>{m.userName}</b>{m.text}</div>
                ))}
              </div>
              <form className="ygl__chatform" onSubmit={sendComment}>
                <Input placeholder="Responde a tu audiencia…" value={chatText}
                  onChange={(e: any) => setChatText(e.target.value)} style={{ flex: 1 }} />
                <Button type="submit" variant="secondary" disabled={!chatText.trim()}>Enviar</Button>
              </form>
            </div>
            <Button variant="ghost" onClick={end}
              iconLeft={Icon.X ? <Icon.X size={16} /> : null}>Terminar transmisión</Button>
          </div>
        </div>
      </LiveKitRoom>
    </div>
  );
}
