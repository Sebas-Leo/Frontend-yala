import React from 'react';
import { Input, Button, Icon } from '../ds';
import { verifyDni } from '../api/dni.js';

const css = `
.dv{max-width:480px;margin:0 auto;padding:40px 24px;}
.dv__back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;margin-bottom:14px;}
.dv__card{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:28px;box-shadow:var(--shadow-sm);}
.dv__icon{width:52px;height:52px;border-radius:50%;background:var(--brand-subtle);color:var(--brand);display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
.dv__h1{font-size:22px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;margin-bottom:6px;}
.dv__sub{font-size:14px;color:var(--text-muted);line-height:1.5;margin-bottom:20px;}
.dv__form{display:flex;flex-direction:column;gap:14px;}
.dv__row{display:flex;gap:12px;}
.dv__note{font-size:12px;color:var(--text-subtle);display:flex;gap:7px;align-items:flex-start;line-height:1.5;margin-top:4px;}
.dv__cam{display:flex;flex-direction:column;gap:10px;margin-bottom:18px;}
.dv__video{width:100%;aspect-ratio:16/10;border-radius:var(--radius-lg);background:#0b0b0c;object-fit:cover;}
.dv__shot{width:100%;border-radius:var(--radius-lg);border:1px solid var(--border-subtle);display:block;}
.dv__camrow{display:flex;gap:10px;}
.dv__src{font-size:11px;color:var(--text-subtle);margin-top:2px;}
.dv__alert{display:flex;gap:8px;align-items:flex-start;font-size:13px;border-radius:var(--radius-md);padding:10px 12px;line-height:1.45;margin-bottom:4px;}
.dv__alert--err{color:var(--danger,#d92d20);background:var(--danger-subtle,#fef3f2);border:1px solid var(--danger,#d92d20);}
.dv__alert--ok{color:var(--success,#067647);background:var(--success-subtle,#ecfdf3);border:1px solid var(--success,#067647);}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

export default function DniVerify({ onVerify, onBack }) {
  ensure();
  const [dni, setDni] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [result, setResult] = React.useState(null); // { verified, source, ... }
  const [error, setError] = React.useState(null);

  // --- Camera sensor: capture the physical DNI to support the check ----------
  const [camOn, setCamOn] = React.useState(false);
  const [shot, setShot] = React.useState(null); // captured frame (dataURL)
  const [camError, setCamError] = React.useState(null);
  const videoRef = React.useRef(null);
  const streamRef = React.useRef(null);

  const valid = /^\d{8}$/.test(dni);

  const stopCamera = React.useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCamOn(false);
  }, []);

  // Always release the camera when leaving the screen.
  React.useEffect(() => () => stopCamera(), [stopCamera]);

  const openCamera = async () => {
    setCamError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCamError('Tu navegador no permite usar la cámara.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      streamRef.current = stream;
      setShot(null);
      setCamOn(true);
      // Attach after the <video> mounts on the next paint.
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      });
    } catch (err) {
      setCamError(err && err.name === 'NotAllowedError'
        ? 'Permiso de cámara denegado. Puedes ingresar el DNI a mano.'
        : 'No pudimos abrir la cámara. Ingresa el DNI a mano.');
    }
  };

  // Snap a frame, try to auto-read the DNI number off the document barcode
  // (progressive enhancement — only where BarcodeDetector exists), then release.
  const capture = async () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 800;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    setShot(canvas.toDataURL('image/jpeg', 0.85));

    if ('BarcodeDetector' in window) {
      try {
        const detector = new window.BarcodeDetector({ formats: ['pdf417', 'code_128', 'qr_code'] });
        const codes = await detector.detect(canvas);
        const raw = codes && codes[0] ? (codes[0].rawValue || '') : '';
        const m = raw.match(/\b(\d{8})\b/);
        if (m) setDni(m[1]);
      } catch {
        /* detection unsupported or failed — manual entry still works */
      }
    }
    stopCamera();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (busy || !valid) return;
    setError(null);
    setResult(null);
    setBusy(true);
    try {
      const res = await verifyDni({ dni, firstName, lastName });
      setResult(res);
      if (res.verified) {
        // Brief beat so the success state is visible, then hand control back.
        setTimeout(() => { if (onVerify) onVerify(res); }, 600);
      } else {
        setError(res.reason === 'invalid-format'
          ? 'El DNI debe tener 8 dígitos.'
          : 'No pudimos verificar ese DNI con RENIEC. Revisa los datos e intenta de nuevo.');
      }
    } catch {
      setError('No pudimos completar la verificación. Intenta de nuevo.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="dv">
      <div className="dv__back" onClick={() => { stopCamera(); onBack && onBack(); }}><Icon.ChevronLeft size={16} /> Volver</div>
      <div className="dv__card">
        <div className="dv__icon"><Icon.Shield size={26} /></div>
        <div className="dv__h1">Verifica tu identidad</div>
        <div className="dv__sub">Yala pide tu DNI una única vez antes de tu primera puja o compra. Es para mantener el marketplace seguro entre desconocidos.</div>

        {/* Camera sensor */}
        <div className="dv__cam">
          {camError && <div className="dv__alert dv__alert--err">{Icon.AlertTriangle ? <Icon.AlertTriangle size={15} style={{ flex: 'none', marginTop: 1 }} /> : null}<span>{camError}</span></div>}
          {camOn && (
            <>
              <video ref={videoRef} className="dv__video" playsInline muted />
              <div className="dv__camrow">
                <Button type="button" variant="primary" fullWidth onClick={capture}>Capturar</Button>
                <Button type="button" variant="secondary" onClick={stopCamera}>Cancelar</Button>
              </div>
            </>
          )}
          {!camOn && shot && (
            <>
              <img src={shot} alt="DNI capturado" className="dv__shot" />
              <Button type="button" variant="secondary" fullWidth onClick={openCamera}>{Icon.Image ? <Icon.Image size={16} /> : null} Volver a escanear</Button>
            </>
          )}
          {!camOn && !shot && (
            <Button type="button" variant="secondary" fullWidth onClick={openCamera}>{Icon.Image ? <Icon.Image size={16} /> : null} Escanear DNI con la cámara</Button>
          )}
        </div>

        <form className="dv__form" onSubmit={submit}>
          {error && <div className="dv__alert dv__alert--err">{Icon.AlertTriangle ? <Icon.AlertTriangle size={15} style={{ flex: 'none', marginTop: 1 }} /> : null}<span>{error}</span></div>}
          {result && result.verified && (
            <div className="dv__alert dv__alert--ok">
              <Icon.Shield size={15} style={{ flex: 'none', marginTop: 1 }} />
              <span>Identidad verificada{result.source === 'didit' ? ' con RENIEC.' : ' (modo demo).'}</span>
            </div>
          )}
          <Input label="DNI" mono placeholder="12345678" inputMode="numeric" maxLength={8}
            value={dni} onChange={(e) => setDni(e.target.value.replace(/\D/g, '').slice(0, 8))}
            error={dni && !valid ? 'El DNI debe tener 8 dígitos.' : undefined} required />
          <div className="dv__row">
            <Input label="Nombres" placeholder="Diego" style={{ flex: 1, minWidth: 0 }}
              value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <Input label="Apellidos" placeholder="Ramírez" style={{ flex: 1, minWidth: 0 }}
              value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="dv__note"><Icon.Shield size={14} style={{ flex: 'none', marginTop: 1 }} /> Validamos tu DNI contra RENIEC vía Didit. Tu número nunca se comparte con el vendedor: en tu perfil solo se ve el ícono de "identidad verificada".</div>
          <Button variant="primary" size="lg" fullWidth type="submit" disabled={!valid || busy}>
            {busy ? 'Verificando…' : 'Verificar identidad'}
          </Button>
        </form>
      </div>
    </div>
  );
}
