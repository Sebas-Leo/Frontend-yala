import React from 'react';
import '@livekit/components-styles';
import { LiveKitRoom, VideoTrack, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { Button, Input, Price, Icon } from '../ds';
import { useToast } from '../context/ToastContext';
import { startLive, endLive, createFlashAuction, closeFlashAuction } from '../api/live';
import { subscribeLive } from '../api/realtime';
import type { FlashAuction, LiveToken, LiveUpdateMessage } from '../types';

const css = `
.ygl{max-width:1100px;margin:0 auto;padding:24px;}
.ygl__setup{max-width:520px;margin:40px auto;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:28px;display:flex;flex-direction:column;gap:16px;}
.ygl__h{font-size:20px;font-weight:800;color:var(--text-strong);}
.ygl__sub{font-size:14px;color:var(--text-muted);}
.ygl__grid{display:grid;grid-template-columns:1fr 360px;gap:20px;align-items:start;}
.ygl__stage{background:#000;border-radius:var(--radius-lg);overflow:hidden;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;}
.ygl__stage video{width:100%;height:100%;object-fit:contain;background:#000;}
.ygl__placeholder{color:#fff;opacity:.7;font-family:var(--font-sans);}
.ygl__panel{display:flex;flex-direction:column;gap:14px;}
.ygl__card{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:16px;display:flex;flex-direction:column;gap:10px;}
.ygl__label{font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--text-subtle);}
@media(max-width:900px){.ygl__grid{grid-template-columns:1fr;}}
`;
let ic = false;
function ensure() { if (!ic) { ic = true; const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s); } }

const LIVEKIT_URL = import.meta.env.VITE_LIVEKIT_URL;

function PublisherStage() {
  const tracks = useTracks([Track.Source.Camera], { onlySubscribed: false });
  const cam = tracks.find((t) => t.publication?.kind === 'video' || t.source === Track.Source.Camera);
  return (
    <div className="ygl__stage">
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

  React.useEffect(() => {
    if (!token) return;
    return subscribeLive<LiveUpdateMessage>(token.streamId, (msg) => {
      if (!msg) return;
      if (msg.type === 'AUCTION_CLOSED') { setAuction(msg.auction); return; }
      if (msg.auction) setAuction(msg.auction);
    });
  }, [token]);

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

  return (
    <div className="ygl">
      <LiveKitRoom serverUrl={token.url || LIVEKIT_URL} token={token.token} connect audio video>
        <div className="ygl__grid">
          <PublisherStage />
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
                  <Input placeholder="Título del producto" value={faTitle} onChange={(e: any) => setFaTitle(e.target.value)} />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Input prefix="S/." mono placeholder="Precio base" value={faBase}
                      onChange={(e: any) => setFaBase(e.target.value.replace(/[^\d.]/g, ''))} style={{ flex: 1 }} />
                    <Input prefix="S/." mono placeholder="Incremento" value={faIncrement}
                      onChange={(e: any) => setFaIncrement(e.target.value.replace(/[^\d.]/g, ''))} style={{ flex: 1 }} />
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
            <Button variant="ghost" onClick={end}
              iconLeft={Icon.X ? <Icon.X size={16} /> : null}>Terminar transmisión</Button>
          </div>
        </div>
      </LiveKitRoom>
    </div>
  );
}
