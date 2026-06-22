import React from 'react';
import { Price, Countdown, OrderStepper, StatusBadge, Button, Avatar, Icon, YData } from '../ds';

const { checkoutOrder } = YData;

const css = `
.yc{max-width:1080px;margin:0 auto;padding:24px;}
.yc__back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;margin-bottom:14px;}
.yc__head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px;}
.yc__h1{font-size:26px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;display:flex;align-items:center;gap:12px;}
.yc__onum{font-family:var(--font-mono);font-size:14px;color:var(--text-muted);}
.yc__stepper{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:22px 24px;margin:18px 0 24px;}
.yc__grid{display:grid;grid-template-columns:1fr 360px;gap:24px;align-items:start;}
.yc__panel{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);overflow:hidden;}
.yc__ptt{font-size:13px;font-weight:700;color:var(--text-strong);padding:15px 18px;border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;gap:8px;}
.yc__item{display:flex;gap:14px;padding:18px;}
.yc__itimg{width:88px;height:88px;border-radius:var(--radius-md);object-fit:cover;flex:none;background:var(--surface-sunken);}
.yc__itinfo{flex:1;min-width:0;}
.yc__ittitle{font-size:15px;font-weight:700;color:var(--text-strong);line-height:1.35;margin-bottom:6px;}
.yc__itseller{display:flex;align-items:center;gap:7px;font-size:13px;color:var(--text-muted);}
.yc__deadline{display:flex;align-items:center;gap:14px;padding:16px 18px;background:var(--warning-bg);border:1px solid var(--warning-100,transparent);border-radius:var(--radius-lg);margin-bottom:18px;}
.yc__dlicon{width:42px;height:42px;border-radius:50%;background:#fff;color:var(--warning);display:flex;align-items:center;justify-content:center;flex:none;}
.yc__dltt{font-size:14px;font-weight:700;color:var(--warning-700);}
.yc__dlsub{font-size:12px;color:var(--warning-700);opacity:.85;}
.yc__sum{padding:6px 18px 14px;}
.yc__srow{display:flex;justify-content:space-between;align-items:center;padding:9px 0;font-size:14px;color:var(--text-body);}
.yc__srow--total{border-top:1px solid var(--border-subtle);margin-top:4px;padding-top:14px;font-weight:700;color:var(--text-strong);font-size:16px;}
.yc__comm{color:var(--text-muted);font-size:13px;}
.yc__pay{padding:0 18px 18px;display:flex;flex-direction:column;gap:10px;}
.yc__stripe{display:flex;align-items:center;gap:8px;border:1px solid var(--border-default);border-radius:var(--radius-md);padding:13px 14px;font-size:13px;color:var(--text-muted);}
.yc__note{font-size:12px;color:var(--text-subtle);text-align:center;display:flex;align-items:center;gap:6px;justify-content:center;}
.yc__track{padding:14px 18px;display:flex;align-items:center;gap:10px;font-size:13px;font-family:var(--font-mono);color:var(--text-body);background:var(--info-bg);border-radius:var(--radius-md);margin:0 18px 16px;}
@media(max-width:880px){.yc__grid{grid-template-columns:1fr}}
`;
let ic = false; function ensure(){ if(!ic){ic=true;const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);} }

function Row({ label, children, comm }) {
  return <div className="yc__srow"><span className={comm ? 'yc__comm' : ''}>{label}</span><span>{children}</span></div>;
}

export default function Checkout({ role = 'buyer', onBack }) {
  ensure();
  const o = checkoutOrder;
  const price = o.amount;
  const commission = Math.round(price * 0.08);
  const net = price - commission;

  return (
    <div className="yc">
      <div className="yc__back" onClick={onBack}><Icon.ChevronLeft size={16} /> Mis órdenes</div>
      <div className="yc__head">
        <div className="yc__h1">Orden <span className="yc__onum">#{o.id}</span></div>
        <StatusBadge kind="order" status={o.status} size="md" />
      </div>

      <div className="yc__stepper"><OrderStepper current={o.status} /></div>

      <div className="yc__grid">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {o.status === 'PENDING' && (
            <div className="yc__deadline">
              <div className="yc__dlicon"><Icon.Clock size={22} /></div>
              <div style={{ flex: 1 }}>
                <div className="yc__dltt">Tenés 48h para completar el pago</div>
                <div className="yc__dlsub">Si no pagás a tiempo, la orden se ofrece al 2º mejor postor.</div>
              </div>
              <Countdown endsAt={o.payBy} variant="order" format="inline" />
            </div>
          )}
          <div className="yc__panel">
            <div className="yc__ptt"><Icon.Package size={16} /> Ítem</div>
            <div className="yc__item">
              <img className="yc__itimg" src={o.img} alt={o.title} />
              <div className="yc__itinfo">
                <div className="yc__ittitle">{o.title}</div>
                <div className="yc__itseller"><Avatar name={o.party} verified size="xs" /> {o.party}</div>
                <div style={{ marginTop: 8 }}><Price value={price} size="md" /></div>
              </div>
            </div>
            {o.status === 'IN_TRANSIT' && (
              <div className="yc__track"><Icon.Truck size={16} /> Tracking: {o.tracking || 'OLVA-PE-8842193'}</div>
            )}
          </div>
        </div>

        <div className="yc__panel">
          <div className="yc__ptt"><Icon.Wallet size={16} /> {role === 'seller' ? 'Tu liquidación' : 'Resumen de pago'}</div>
          <div className="yc__sum">
            <Row label="Precio del ítem"><Price value={price} size="sm" /></Row>
            <Row label="Comisión Yala (8%)" comm><span style={{ fontFamily: 'var(--font-mono)', color: role === 'seller' ? 'var(--error)' : 'var(--text-muted)' }}>{role === 'seller' ? '−' : ''} S/. {commission.toLocaleString('es-PE')}</span></Row>
            {role === 'seller'
              ? <div className="yc__srow yc__srow--total"><span>Recibís (92%)</span><Price value={net} size="md" /></div>
              : <div className="yc__srow yc__srow--total"><span>Total a pagar</span><Price value={price} size="md" /></div>}
          </div>
          <div className="yc__pay">
            {role === 'buyer' && o.status === 'PENDING' && (<>
              <div className="yc__stripe"><Icon.CreditCard size={16} /> Pago seguro con MercadoPago</div>
              <Button variant="primary" size="lg" fullWidth iconLeft={<Icon.CreditCard size={18} />}>Pagar S/. {price.toLocaleString('es-PE')}</Button>
              <Button variant="ghost" size="sm" fullWidth>Cancelar orden</Button>
            </>)}
            {role === 'buyer' && o.status === 'IN_TRANSIT' && (
              <Button variant="primary" size="lg" fullWidth iconLeft={<Icon.Check size={18} />}>Confirmar recepción</Button>
            )}
            {role === 'seller' && o.status === 'CONFIRMED' && (
              <Button variant="primary" size="lg" fullWidth iconLeft={<Icon.Truck size={18} />}>Marcar como enviado</Button>
            )}
            <div className="yc__note"><Icon.Shield size={13} /> Protegido por Yala hasta la entrega</div>
          </div>
        </div>
      </div>
    </div>
  );
}
