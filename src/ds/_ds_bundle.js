/* @ds-bundle: {"format":3,"namespace":"YalaDesignSystem_e5dc9e","components":[{"name":"AuctionCard","sourcePath":"components/cards/AuctionCard.jsx"},{"name":"ListingCard","sourcePath":"components/cards/ListingCard.jsx"},{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"Countdown","sourcePath":"components/data/Countdown.jsx"},{"name":"Price","sourcePath":"components/data/Price.jsx"},{"name":"ReputationStars","sourcePath":"components/data/ReputationStars.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"DniGate","sourcePath":"components/feedback/DniGate.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"ORDER_STEPS","sourcePath":"components/feedback/OrderStepper.jsx"},{"name":"OrderStepper","sourcePath":"components/feedback/OrderStepper.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"CardSkeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Radio","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Badge","sourcePath":"components/status/Badge.jsx"},{"name":"ORDER_STATUS","sourcePath":"components/status/StatusBadge.jsx"},{"name":"AUCTION_STATUS","sourcePath":"components/status/StatusBadge.jsx"},{"name":"LISTING_STATUS","sourcePath":"components/status/StatusBadge.jsx"},{"name":"StatusBadge","sourcePath":"components/status/StatusBadge.jsx"},{"name":"Tag","sourcePath":"components/status/Tag.jsx"}],"sourceHashes":{"components/cards/AuctionCard.jsx":"e39b93e586b8","components/cards/ListingCard.jsx":"91c6ed863080","components/data/Avatar.jsx":"c8a3019a3ac0","components/data/Countdown.jsx":"c136ea9b7e28","components/data/Price.jsx":"434d86ad28b1","components/data/ReputationStars.jsx":"09898cb53f41","components/feedback/Dialog.jsx":"38718222d68c","components/feedback/DniGate.jsx":"a5a6b7d1eabb","components/feedback/EmptyState.jsx":"7b3bc50ce525","components/feedback/OrderStepper.jsx":"bd3c0e74423e","components/feedback/Skeleton.jsx":"8d77a45fbdeb","components/feedback/Toast.jsx":"62d81674f044","components/forms/Button.jsx":"454d8f8fbe5c","components/forms/Checkbox.jsx":"f4cceeb338ee","components/forms/IconButton.jsx":"40b19eb4feb9","components/forms/Input.jsx":"64d5940bd602","components/forms/Select.jsx":"faf405bc2d1a","components/forms/Switch.jsx":"482812c33d3c","components/forms/Textarea.jsx":"3b87ccdc7c86","components/navigation/Pagination.jsx":"bb8817f3c8da","components/navigation/Tabs.jsx":"e214920dc916","components/status/Badge.jsx":"32011fea319c","components/status/StatusBadge.jsx":"06e526359309","components/status/Tag.jsx":"60fcf0114762","ui_kits/marketplace/AppShell.jsx":"ae2f3f2ebc0f","ui_kits/marketplace/AuctionLive.jsx":"0306dedd7446","ui_kits/marketplace/Checkout.jsx":"b42250994f4e","ui_kits/marketplace/Home.jsx":"951afefb52a7","ui_kits/marketplace/Misc.jsx":"9da913a13e20","ui_kits/marketplace/SellerDashboard.jsx":"a6f96fb684fb","ui_kits/marketplace/data.js":"043cbabcec66","ui_kits/marketplace/icons.jsx":"69216ea552d6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.YalaDesignSystem_e5dc9e = window.YalaDesignSystem_e5dc9e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:var(--violet-100);color:var(--violet-700);font-family:var(--font-sans);font-weight:700;overflow:visible;flex:none;}
.yds-avatar__img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block;}
.yds-avatar__initials{text-transform:uppercase;letter-spacing:-.02em;}
.yds-avatar--square{border-radius:var(--radius-md);}
.yds-avatar--square .yds-avatar__img{border-radius:var(--radius-md);}
.yds-avatar__verified{position:absolute;right:-2px;bottom:-2px;width:42%;height:42%;min-width:14px;min-height:14px;background:var(--brand);border-radius:50%;border:2px solid var(--surface-card);display:flex;align-items:center;justify-content:center;color:#fff;}
.yds-avatar__verified svg{width:62%;height:62%;}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'avatar');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
const SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80
};
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('');
}
function Avatar({
  src,
  name = '',
  size = 'md',
  square = false,
  verified = false,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  const d = typeof size === 'number' ? size : SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `yds-avatar${square ? ' yds-avatar--square' : ''} ${className}`.trim(),
    style: {
      width: d,
      height: d,
      fontSize: d * 0.4,
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    className: "yds-avatar__img",
    src: src,
    alt: name
  }) : /*#__PURE__*/React.createElement("span", {
    className: "yds-avatar__initials"
  }, initials(name)), verified && /*#__PURE__*/React.createElement("span", {
    className: "yds-avatar__verified",
    title: "Identidad verificada"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/Countdown.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-cd{font-family:var(--font-mono);font-variant-numeric:tabular-nums;display:inline-flex;align-items:center;gap:8px;color:var(--text-strong);font-weight:700;line-height:1;}
.yds-cd--live{color:var(--live-700);}
.yds-cd--urgent{color:var(--error);}
.yds-cd__blocks{display:inline-flex;align-items:stretch;gap:6px;}
.yds-cd__b{display:flex;flex-direction:column;align-items:center;gap:4px;background:var(--surface-sunken);border-radius:var(--radius-sm);padding:7px 9px;min-width:46px;}
.yds-cd--live .yds-cd__b{background:var(--live-subtle);}
.yds-cd--urgent .yds-cd__b{background:var(--error-bg);}
.yds-cd__num{font-size:22px;font-weight:700;letter-spacing:.5px;}
.yds-cd__unit{font-family:var(--font-sans);font-size:9px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--text-muted);}
.yds-cd--live .yds-cd__unit{color:var(--live-hover);}
.yds-cd__sep{font-size:20px;font-weight:700;align-self:flex-start;margin-top:7px;opacity:.4;}
.yds-cd__inline{letter-spacing:1px;}
.yds-cd__dot{width:8px;height:8px;border-radius:50%;background:var(--live);animation:yala-live-pulse 1.4s infinite;}
.yds-cd__done{font-family:var(--font-sans);font-weight:600;color:var(--text-muted);}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'countdown');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
function parts(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor(s % 86400 / 3600),
    m: Math.floor(s % 3600 / 60),
    s: s % 60
  };
}
const pad = n => String(n).padStart(2, '0');
function Countdown({
  endsAt,
  variant = 'auction',
  format = 'blocks',
  urgentUnderSec = 600,
  showDot = true,
  onComplete,
  doneLabel = 'Finalizada',
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  const target = React.useMemo(() => new Date(endsAt).getTime(), [endsAt]);
  const [now, setNow] = React.useState(() => Date.now());
  const firedRef = React.useRef(false);
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = target - now;
  React.useEffect(() => {
    if (remaining <= 0 && !firedRef.current) {
      firedRef.current = true;
      onComplete && onComplete();
    }
  }, [remaining, onComplete]);
  const tone = variant === 'order' ? remaining <= urgentUnderSec * 1000 ? 'urgent' : '' : remaining <= urgentUnderSec * 1000 ? 'urgent' : 'live';
  if (remaining <= 0) {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: `yds-cd ${className}`.trim(),
      style: style
    }, rest), /*#__PURE__*/React.createElement("span", {
      className: "yds-cd__done"
    }, doneLabel));
  }
  const p = parts(remaining);
  const cls = `yds-cd${tone ? ` yds-cd--${tone}` : ''} ${className}`.trim();
  if (format === 'inline') {
    const str = p.d > 0 ? `${p.d}d ${pad(p.h)}:${pad(p.m)}:${pad(p.s)}` : `${pad(p.h)}:${pad(p.m)}:${pad(p.s)}`;
    return /*#__PURE__*/React.createElement("span", _extends({
      className: cls,
      style: style
    }, rest), showDot && variant === 'auction' && tone !== 'urgent' && /*#__PURE__*/React.createElement("span", {
      className: "yds-cd__dot"
    }), /*#__PURE__*/React.createElement("span", {
      className: "yds-cd__inline"
    }, str));
  }
  const blocks = [];
  if (p.d > 0) blocks.push(['d', p.d, 'días']);
  blocks.push(['h', pad(p.h), 'hrs'], ['m', pad(p.m), 'min'], ['s', pad(p.s), 'seg']);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: style
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "yds-cd__blocks"
  }, blocks.map(([k, val, unit], i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: k
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    className: "yds-cd__sep"
  }, ":"), /*#__PURE__*/React.createElement("span", {
    className: "yds-cd__b"
  }, /*#__PURE__*/React.createElement("span", {
    className: "yds-cd__num"
  }, val), /*#__PURE__*/React.createElement("span", {
    className: "yds-cd__unit"
  }, unit))))));
}
Object.assign(__ds_scope, { Countdown });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Countdown.jsx", error: String((e && e.message) || e) }); }

// components/data/Price.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-price{font-family:var(--font-mono);font-variant-numeric:tabular-nums;font-weight:700;color:var(--price);letter-spacing:-.02em;display:inline-flex;align-items:baseline;gap:.28em;line-height:1;white-space:nowrap;}
.yds-price--live{color:var(--price-live);}
.yds-price__cur{font-weight:600;color:var(--text-muted);}
.yds-price--live .yds-price__cur{color:var(--live-hover);opacity:.85;}
.yds-price__dec{opacity:.55;font-weight:600;}
.yds-price__strike{font-family:var(--font-mono);color:var(--text-subtle);text-decoration:line-through;font-weight:500;margin-left:.5em;font-size:.7em;}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'price');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
const SIZES = {
  sm: 15,
  md: 20,
  lg: 28,
  xl: 40
};
function fmt(n) {
  const v = Number(n) || 0;
  const [int, dec] = v.toFixed(2).split('.');
  return [int.replace(/\B(?=(\d{3})+(?!\d))/g, ','), dec];
}
function Price({
  value,
  currency = 'S/.',
  size = 'md',
  live = false,
  showDecimals = true,
  strikethrough,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  const [int, dec] = fmt(value);
  const fs = typeof size === 'number' ? size : SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `yds-price${live ? ' yds-price--live' : ''} ${className}`.trim(),
    style: {
      fontSize: fs,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "yds-price__cur",
    style: {
      fontSize: '0.62em'
    }
  }, currency), /*#__PURE__*/React.createElement("span", null, int, showDecimals && /*#__PURE__*/React.createElement("span", {
    className: "yds-price__dec"
  }, ".", dec)), strikethrough != null && /*#__PURE__*/React.createElement("span", {
    className: "yds-price__strike"
  }, currency, " ", fmt(strikethrough)[0]));
}
Object.assign(__ds_scope, { Price });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Price.jsx", error: String((e && e.message) || e) }); }

// components/data/ReputationStars.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-stars{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-sans);}
.yds-stars__row{display:inline-flex;gap:2px;}
.yds-stars__star{position:relative;display:inline-block;line-height:0;}
.yds-stars__star svg{display:block;}
.yds-stars__star--btn{cursor:pointer;transition:transform var(--dur-fast) var(--ease-out);}
.yds-stars__star--btn:hover{transform:scale(1.15);}
.yds-stars__meta{display:inline-flex;align-items:baseline;gap:6px;}
.yds-stars__avg{font-weight:700;color:var(--text-strong);font-family:var(--font-mono);}
.yds-stars__count{font-size:13px;color:var(--text-muted);}
.yds-stars__pct{font-size:12px;font-weight:600;color:var(--success);}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'stars');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
function Star({
  fill,
  size
}) {
  // fill 0..1 for partial
  const id = `g${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24"
  }, fill > 0 && fill < 1 && /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id
  }, /*#__PURE__*/React.createElement("stop", {
    offset: `${fill * 100}%`,
    stopColor: "var(--star-on)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: `${fill * 100}%`,
    stopColor: "var(--star-off)"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M12 2.5l2.9 6.06 6.6.74-4.9 4.47 1.32 6.48L12 17.9 6.08 20.7 7.4 14.27 2.5 9.8l6.6-.74L12 2.5z",
    fill: fill >= 1 ? 'var(--star-on)' : fill <= 0 ? 'var(--star-off)' : `url(#${id})`
  }));
}
function ReputationStars({
  value = 0,
  max = 5,
  size = 16,
  count,
  positivePct,
  interactive = false,
  onRate,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  const [hover, setHover] = React.useState(0);
  const shown = interactive && hover ? hover : value;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `yds-stars ${className}`.trim(),
    style: style
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "yds-stars__row",
    onMouseLeave: () => setHover(0)
  }, Array.from({
    length: max
  }).map((_, i) => {
    const fill = Math.max(0, Math.min(1, shown - i));
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      className: `yds-stars__star${interactive ? ' yds-stars__star--btn' : ''}`,
      onMouseEnter: interactive ? () => setHover(i + 1) : undefined,
      onClick: interactive ? () => onRate && onRate(i + 1) : undefined,
      role: interactive ? 'button' : undefined,
      "aria-label": interactive ? `${i + 1} estrellas` : undefined
    }, /*#__PURE__*/React.createElement(Star, {
      fill: interactive ? i < shown ? 1 : 0 : fill,
      size: size
    }));
  })), (count != null || positivePct != null) && /*#__PURE__*/React.createElement("span", {
    className: "yds-stars__meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "yds-stars__avg"
  }, value.toFixed(1)), positivePct != null && /*#__PURE__*/React.createElement("span", {
    className: "yds-stars__pct"
  }, positivePct, "% positivas"), count != null && /*#__PURE__*/React.createElement("span", {
    className: "yds-stars__count"
  }, "(", count, ")")));
}
Object.assign(__ds_scope, { ReputationStars });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ReputationStars.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-overlay{position:fixed;inset:0;background:var(--surface-overlay);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:24px;z-index:1000;animation:yds-fade var(--dur-base) var(--ease-out);}
.yds-dialog{background:var(--surface-card);border-radius:var(--radius-modal);box-shadow:var(--shadow-xl);width:100%;max-width:480px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;font-family:var(--font-sans);animation:yds-pop var(--dur-slow) var(--ease-out);}
.yds-dialog__head{display:flex;align-items:flex-start;gap:14px;padding:22px 24px 0;}
.yds-dialog__icon{width:44px;height:44px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;background:var(--brand-subtle);color:var(--brand);}
.yds-dialog__icon--danger{background:var(--error-bg);color:var(--error);}
.yds-dialog__icon--live{background:var(--live-subtle);color:var(--live-hover);}
.yds-dialog__tt{flex:1;min-width:0;}
.yds-dialog__title{font-size:19px;font-weight:700;color:var(--text-strong);line-height:1.25;}
.yds-dialog__desc{font-size:14px;color:var(--text-muted);margin-top:5px;line-height:1.5;text-wrap:pretty;}
.yds-dialog__close{flex:none;width:32px;height:32px;border:none;background:transparent;border-radius:var(--radius-sm);color:var(--text-muted);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background var(--dur-fast);}
.yds-dialog__close:hover{background:var(--surface-sunken);color:var(--text-strong);}
.yds-dialog__body{padding:18px 24px;overflow:auto;}
.yds-dialog__foot{display:flex;gap:10px;justify-content:flex-end;padding:16px 24px 22px;border-top:1px solid var(--border-subtle);}
@keyframes yds-fade{from{opacity:0}to{opacity:1}}
@keyframes yds-pop{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'dialog');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
const X = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round"
}, /*#__PURE__*/React.createElement("line", {
  x1: "18",
  y1: "6",
  x2: "6",
  y2: "18"
}), /*#__PURE__*/React.createElement("line", {
  x1: "6",
  y1: "6",
  x2: "18",
  y2: "18"
}));
function Dialog({
  open = true,
  onClose,
  title,
  description,
  icon,
  tone = 'brand',
  footer,
  width,
  children,
  closeOnOverlay = true,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "yds-overlay",
    onClick: closeOnOverlay ? onClose : undefined
  }, /*#__PURE__*/React.createElement("div", _extends({
    className: `yds-dialog ${className}`.trim(),
    style: {
      maxWidth: width,
      ...style
    },
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "yds-dialog__head"
  }, icon && /*#__PURE__*/React.createElement("div", {
    className: `yds-dialog__icon yds-dialog__icon--${tone}`
  }, icon), /*#__PURE__*/React.createElement("div", {
    className: "yds-dialog__tt"
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "yds-dialog__title"
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: "yds-dialog__desc"
  }, description)), onClose && /*#__PURE__*/React.createElement("button", {
    className: "yds-dialog__close",
    onClick: onClose,
    "aria-label": "Cerrar"
  }, /*#__PURE__*/React.createElement(X, null))), children && /*#__PURE__*/React.createElement("div", {
    className: "yds-dialog__body"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "yds-dialog__foot"
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/DniGate.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-gate{display:flex;flex-direction:column;align-items:center;text-align:center;font-family:var(--font-sans);background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-modal);padding:32px 28px;gap:8px;max-width:440px;}
.yds-gate__shield{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--brand-subtle);color:var(--brand);margin-bottom:8px;}
.yds-gate__title{font-size:20px;font-weight:700;color:var(--text-strong);line-height:1.25;}
.yds-gate__desc{font-size:14px;color:var(--text-muted);line-height:1.55;text-wrap:pretty;}
.yds-gate__why{display:flex;flex-direction:column;gap:10px;width:100%;margin:16px 0 4px;text-align:left;}
.yds-gate__row{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--text-body);}
.yds-gate__ck{flex:none;width:20px;height:20px;border-radius:50%;background:var(--success-bg);color:var(--success);display:flex;align-items:center;justify-content:center;margin-top:1px;}
.yds-gate__actions{display:flex;flex-direction:column;gap:8px;width:100%;margin-top:18px;}
.yds-gate__note{font-size:12px;color:var(--text-subtle);display:flex;align-items:center;gap:6px;justify-content:center;margin-top:4px;}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'gate');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
const Shield = () => /*#__PURE__*/React.createElement("svg", {
  width: "30",
  height: "30",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
}), /*#__PURE__*/React.createElement("path", {
  d: "m9 12 2 2 4-4"
}));
const Ck = () => /*#__PURE__*/React.createElement("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3.2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
const Lock = () => /*#__PURE__*/React.createElement("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "11",
  width: "18",
  height: "11",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 11V7a5 5 0 0 1 10 0v4"
}));
function DniGate({
  action = 'pujar',
  reasons,
  primaryAction,
  secondaryAction,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  const defaults = ['Protegemos cada transacción entre desconocidos.', 'Tu documento se valida una sola vez y nunca se vuelve a mostrar.', 'Solo queda visible el ícono de identidad verificada.'];
  const list = reasons || defaults;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `yds-gate ${className}`.trim(),
    style: style
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "yds-gate__shield"
  }, /*#__PURE__*/React.createElement(Shield, null)), /*#__PURE__*/React.createElement("div", {
    className: "yds-gate__title"
  }, "Verific\xE1 tu identidad para ", action), /*#__PURE__*/React.createElement("div", {
    className: "yds-gate__desc"
  }, "Yala pide tu DNI una \xFAnica vez antes de tu primera compra o puja. Es dinero real entre personas: la verificaci\xF3n mantiene el marketplace seguro."), /*#__PURE__*/React.createElement("div", {
    className: "yds-gate__why"
  }, list.map((r, i) => /*#__PURE__*/React.createElement("div", {
    className: "yds-gate__row",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "yds-gate__ck"
  }, /*#__PURE__*/React.createElement(Ck, null)), /*#__PURE__*/React.createElement("span", null, r)))), /*#__PURE__*/React.createElement("div", {
    className: "yds-gate__actions"
  }, primaryAction, secondaryAction), /*#__PURE__*/React.createElement("div", {
    className: "yds-gate__note"
  }, /*#__PURE__*/React.createElement(Lock, null), " Tu DNI nunca se comparte con el vendedor."));
}
Object.assign(__ds_scope, { DniGate });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/DniGate.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-empty{display:flex;flex-direction:column;align-items:center;text-align:center;font-family:var(--font-sans);padding:48px 28px;gap:6px;}
.yds-empty__icon{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--brand-subtle);color:var(--brand);margin-bottom:10px;}
.yds-empty--error .yds-empty__icon{background:var(--error-bg);color:var(--error);}
.yds-empty--live .yds-empty__icon{background:var(--live-subtle);color:var(--live-hover);}
.yds-empty__title{font-size:18px;font-weight:700;color:var(--text-strong);}
.yds-empty__desc{font-size:14px;color:var(--text-muted);max-width:380px;line-height:1.5;text-wrap:pretty;}
.yds-empty__actions{display:flex;gap:10px;margin-top:14px;}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'empty');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
function EmptyState({
  icon,
  title,
  description,
  tone = 'neutral',
  actions,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `yds-empty yds-empty--${tone} ${className}`.trim(),
    style: style
  }, rest), icon && /*#__PURE__*/React.createElement("div", {
    className: "yds-empty__icon"
  }, icon), title && /*#__PURE__*/React.createElement("div", {
    className: "yds-empty__title"
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: "yds-empty__desc"
  }, description), actions && /*#__PURE__*/React.createElement("div", {
    className: "yds-empty__actions"
  }, actions));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/OrderStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-step{display:flex;font-family:var(--font-sans);width:100%;}
.yds-step--vert{flex-direction:column;gap:0;}
.yds-step__item{display:flex;align-items:center;flex:1;min-width:0;}
.yds-step--vert .yds-step__item{flex:none;align-items:flex-start;}
.yds-step__node{display:flex;flex-direction:column;align-items:center;gap:7px;flex:none;position:relative;z-index:1;}
.yds-step--vert .yds-step__node{flex-direction:row;align-items:flex-start;gap:12px;}
.yds-step__dot{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--surface-card);border:2px solid var(--border-default);color:var(--text-subtle);font-weight:700;font-size:13px;font-family:var(--font-mono);flex:none;transition:all var(--dur-base) var(--ease-out);}
.yds-step__lbl{font-size:12px;font-weight:600;color:var(--text-muted);text-align:center;max-width:96px;line-height:1.25;}
.yds-step--vert .yds-step__lbl{text-align:left;max-width:none;padding-top:4px;}
.yds-step__sub{display:block;font-weight:400;color:var(--text-subtle);font-size:11px;margin-top:2px;}
.yds-step__bar{flex:1;height:2px;background:var(--border-default);margin:0 4px;align-self:flex-start;margin-top:14px;min-width:16px;}
.yds-step--vert .yds-step__bar{width:2px;height:24px;flex:none;margin:2px 0 2px 14px;align-self:flex-start;}
/* done */
.yds-step__item--done .yds-step__dot{background:var(--brand);border-color:var(--brand);color:#fff;}
.yds-step__item--done .yds-step__lbl{color:var(--text-body);}
.yds-step__item--done .yds-step__bar{background:var(--brand);}
/* current */
.yds-step__item--current .yds-step__dot{background:var(--brand);border-color:var(--brand);color:#fff;box-shadow:var(--ring-brand);}
.yds-step__item--current .yds-step__lbl{color:var(--text-strong);font-weight:700;}
/* cancelled */
.yds-step__item--cancelled .yds-step__dot{background:var(--error-bg);border-color:var(--error);color:var(--error);}
.yds-step__item--cancelled .yds-step__lbl{color:var(--error);}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'stepper');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
const Check = () => /*#__PURE__*/React.createElement("svg", {
  width: "15",
  height: "15",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "3.2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));

/* Default order lifecycle (English ids, Spanish labels) */
const ORDER_STEPS = [{
  id: 'PENDING',
  label: 'Pendiente de pago'
}, {
  id: 'CONFIRMED',
  label: 'Confirmada'
}, {
  id: 'IN_TRANSIT',
  label: 'En tránsito'
}, {
  id: 'COMPLETED',
  label: 'Completada'
}];
function OrderStepper({
  steps = ORDER_STEPS,
  current,
  cancelled = false,
  orientation = 'horizontal',
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  const idx = typeof current === 'number' ? current : steps.findIndex(s => s.id === current);
  const vert = orientation === 'vertical';
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `yds-step${vert ? ' yds-step--vert' : ''} ${className}`.trim(),
    style: style
  }, rest), steps.map((step, i) => {
    const isCancelled = cancelled && i === idx;
    const state = isCancelled ? 'cancelled' : i < idx ? 'done' : i === idx ? 'current' : 'todo';
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: step.id
    }, /*#__PURE__*/React.createElement("div", {
      className: `yds-step__item yds-step__item--${state}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "yds-step__node"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yds-step__dot"
    }, state === 'done' ? /*#__PURE__*/React.createElement(Check, null) : isCancelled ? '×' : i + 1), /*#__PURE__*/React.createElement("div", {
      className: "yds-step__lbl"
    }, step.label, step.sub && /*#__PURE__*/React.createElement("span", {
      className: "yds-step__sub"
    }, step.sub))), vert && i < steps.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: "yds-step__bar"
    })), !vert && i < steps.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: `yds-step__bar${i < idx ? ' yds-step__bar--done' : ''}`,
      style: i < idx ? {
        background: 'var(--brand)'
      } : undefined
    }));
  }));
}
Object.assign(__ds_scope, { ORDER_STEPS, OrderStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/OrderStepper.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-sk{display:block;position:relative;overflow:hidden;background:var(--surface-sunken);border-radius:var(--radius-sm);}
.yds-sk::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);background-size:480px 100%;background-repeat:no-repeat;animation:yala-shimmer 1.3s infinite;}
[data-theme="dark"] .yds-sk::after,.dark .yds-sk::after{background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);background-size:480px 100%;background-repeat:no-repeat;}
.yds-sk--text{border-radius:var(--radius-xs);}
.yds-sk--circle{border-radius:50%;}
.yds-sk--card{border-radius:var(--radius-card);}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'skeleton');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
function Skeleton({
  variant = 'rect',
  width,
  height,
  radius,
  lines = 1,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  if (variant === 'text' && lines > 1) {
    return /*#__PURE__*/React.createElement("span", _extends({
      className: className,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        ...style
      }
    }, rest), Array.from({
      length: lines
    }).map((_, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      className: "yds-sk yds-sk--text",
      style: {
        height: height || 12,
        width: i === lines - 1 ? '70%' : '100%'
      }
    })));
  }
  const cls = `yds-sk yds-sk--${variant} ${className}`.trim();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    style: {
      width: width != null ? width : '100%',
      height: height != null ? height : variant === 'text' ? 12 : 80,
      borderRadius: radius,
      ...style
    }
  }, rest));
}

/* Ready-made listing/auction card skeleton */
function CardSkeleton({
  style = {}
}) {
  ensureCSS();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    variant: "rect",
    height: 170,
    radius: 0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    variant: "text",
    height: 13,
    lines: 2
  }), /*#__PURE__*/React.createElement(Skeleton, {
    variant: "text",
    width: 90,
    height: 20
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    variant: "circle",
    width: 24,
    height: 24
  }), /*#__PURE__*/React.createElement(Skeleton, {
    variant: "text",
    width: 80,
    height: 11
  }))));
}
Object.assign(__ds_scope, { Skeleton, CardSkeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-toast{display:flex;align-items:flex-start;gap:12px;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);padding:14px 14px 14px 16px;font-family:var(--font-sans);width:360px;max-width:100%;position:relative;overflow:hidden;}
.yds-toast::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--brand);}
.yds-toast--success::before{background:var(--success);}
.yds-toast--error::before{background:var(--error);}
.yds-toast--warning::before{background:var(--warning);}
.yds-toast--live::before{background:var(--live);}
.yds-toast__icon{width:30px;height:30px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;background:var(--brand-subtle);color:var(--brand);margin-top:1px;}
.yds-toast--success .yds-toast__icon{background:var(--success-bg);color:var(--success);}
.yds-toast--error .yds-toast__icon{background:var(--error-bg);color:var(--error);}
.yds-toast--warning .yds-toast__icon{background:var(--warning-bg);color:var(--warning);}
.yds-toast--live .yds-toast__icon{background:var(--live-subtle);color:var(--live-hover);}
.yds-toast__body{flex:1;min-width:0;}
.yds-toast__title{font-size:14px;font-weight:700;color:var(--text-strong);}
.yds-toast__msg{font-size:13px;color:var(--text-muted);margin-top:2px;line-height:1.45;}
.yds-toast__time{font-size:11px;color:var(--text-subtle);font-family:var(--font-mono);margin-top:6px;}
.yds-toast__close{flex:none;width:26px;height:26px;border:none;background:transparent;border-radius:var(--radius-sm);color:var(--text-subtle);cursor:pointer;display:flex;align-items:center;justify-content:center;}
.yds-toast__close:hover{background:var(--surface-sunken);color:var(--text-body);}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'toast');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
function Toast({
  tone = 'brand',
  icon,
  title,
  message,
  time,
  onClose,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `yds-toast yds-toast--${tone} ${className}`.trim(),
    style: style,
    role: "status"
  }, rest), icon && /*#__PURE__*/React.createElement("div", {
    className: "yds-toast__icon"
  }, icon), /*#__PURE__*/React.createElement("div", {
    className: "yds-toast__body"
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "yds-toast__title"
  }, title), message && /*#__PURE__*/React.createElement("div", {
    className: "yds-toast__msg"
  }, message), time && /*#__PURE__*/React.createElement("div", {
    className: "yds-toast__time"
  }, time)), onClose && /*#__PURE__*/React.createElement("button", {
    className: "yds-toast__close",
    onClick: onClose,
    "aria-label": "Cerrar"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
/* Inject interactive-state CSS once (hover/active/focus/disabled live here;
   base look is inline so it survives even if injection is blocked). */
const CSS = `
.yds-btn{font-family:var(--font-sans);font-weight:600;display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid transparent;border-radius:var(--radius-button);cursor:pointer;white-space:nowrap;text-decoration:none;transition:background var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out),transform var(--dur-fast) var(--ease-out);user-select:none;}
.yds-btn:active{transform:translateY(1px);}
.yds-btn:focus-visible{outline:none;box-shadow:var(--ring-brand);}
.yds-btn[disabled],.yds-btn[aria-disabled="true"]{cursor:not-allowed;opacity:.5;transform:none;box-shadow:none;pointer-events:none;}
.yds-btn--primary{background:var(--brand);color:var(--on-brand);}
.yds-btn--primary:hover{background:var(--brand-hover);}
.yds-btn--primary:active{background:var(--brand-active);}
.yds-btn--secondary{background:var(--surface-card);color:var(--text-strong);border-color:var(--border-default);}
.yds-btn--secondary:hover{background:var(--surface-sunken);border-color:var(--border-strong);}
.yds-btn--ghost{background:transparent;color:var(--brand);}
.yds-btn--ghost:hover{background:var(--brand-subtle);}
.yds-btn--danger{background:var(--error);color:#fff;}
.yds-btn--danger:hover{filter:brightness(.93);}
.yds-btn--danger:focus-visible{box-shadow:var(--ring-error);}
.yds-btn--live{background:var(--live);color:var(--on-live);box-shadow:0 1px 2px rgba(194,61,11,.25);}
.yds-btn--live:hover{background:var(--live-hover);}
.yds-btn--live:active{background:var(--live-active);}
.yds-btn--live:focus-visible{box-shadow:var(--ring-live);}
.yds-btn__spin{width:1em;height:1em;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:yds-spin .6s linear infinite;}
@keyframes yds-spin{to{transform:rotate(360deg)}}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'button');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
const SIZES = {
  sm: {
    height: 34,
    padding: '0 14px',
    fontSize: 13
  },
  md: {
    height: 42,
    padding: '0 18px',
    fontSize: 15
  },
  lg: {
    height: 50,
    padding: '0 24px',
    fontSize: 16
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  href,
  type = 'button',
  className = '',
  style = {},
  children,
  ...rest
}) {
  ensureCSS();
  const s = SIZES[size] || SIZES.md;
  const Tag = as === 'a' ? 'a' : 'button';
  const isDisabled = disabled || loading;
  const props = {
    className: `yds-btn yds-btn--${variant} ${className}`.trim(),
    style: {
      height: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      width: fullWidth ? '100%' : undefined,
      ...style
    },
    ...rest
  };
  if (Tag === 'a') {
    props.href = isDisabled ? undefined : href;
    if (isDisabled) props['aria-disabled'] = 'true';
  } else {
    props.type = type;
    props.disabled = isDisabled;
  }
  return /*#__PURE__*/React.createElement(Tag, props, loading && /*#__PURE__*/React.createElement("span", {
    className: "yds-btn__spin",
    "aria-hidden": "true"
  }), !loading && iconLeft, children, !loading && iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-check{display:inline-flex;align-items:flex-start;gap:10px;font-family:var(--font-sans);cursor:pointer;font-size:14px;color:var(--text-body);user-select:none;}
.yds-check input{position:absolute;opacity:0;width:0;height:0;}
.yds-check__box{flex:none;width:20px;height:20px;border:1.5px solid var(--border-strong);border-radius:6px;background:var(--surface-card);display:flex;align-items:center;justify-content:center;transition:all var(--dur-fast) var(--ease-out);margin-top:1px;color:#fff;}
.yds-check__box svg{opacity:0;transform:scale(.6);transition:all var(--dur-fast) var(--ease-out);}
.yds-check input:checked + .yds-check__box{background:var(--brand);border-color:var(--brand);}
.yds-check input:checked + .yds-check__box svg{opacity:1;transform:scale(1);}
.yds-check input:focus-visible + .yds-check__box{box-shadow:var(--ring-brand);}
.yds-check:hover input:not(:checked):not(:disabled) + .yds-check__box{border-color:var(--brand);}
.yds-check input:disabled + .yds-check__box{opacity:.45;}
.yds-check--disabled{cursor:not-allowed;opacity:.6;}
.yds-check__label{line-height:1.45;}
.yds-check__sub{display:block;font-size:12px;color:var(--text-muted);margin-top:1px;}
/* radio variant */
.yds-check__box--radio{border-radius:50%;}
.yds-check__box--radio .yds-dot{width:9px;height:9px;border-radius:50%;background:#fff;opacity:0;transform:scale(.4);transition:all var(--dur-fast) var(--ease-out);}
.yds-check input:checked + .yds-check__box--radio .yds-dot{opacity:1;transform:scale(1);}
.yds-check input:checked + .yds-check__box--radio{background:var(--brand);border-color:var(--brand);}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'checkable');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
function Checkbox({
  label,
  sublabel,
  disabled = false,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  return /*#__PURE__*/React.createElement("label", {
    className: `yds-check${disabled ? ' yds-check--disabled' : ''} ${className}`.trim(),
    style: style
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "yds-check__box"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), (label || sublabel) && /*#__PURE__*/React.createElement("span", {
    className: "yds-check__label"
  }, label, sublabel && /*#__PURE__*/React.createElement("span", {
    className: "yds-check__sub"
  }, sublabel)));
}
function Radio({
  label,
  sublabel,
  disabled = false,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  return /*#__PURE__*/React.createElement("label", {
    className: `yds-check${disabled ? ' yds-check--disabled' : ''} ${className}`.trim(),
    style: style
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "yds-check__box yds-check__box--radio"
  }, /*#__PURE__*/React.createElement("span", {
    className: "yds-dot"
  })), (label || sublabel) && /*#__PURE__*/React.createElement("span", {
    className: "yds-check__label"
  }, label, sublabel && /*#__PURE__*/React.createElement("span", {
    className: "yds-check__sub"
  }, sublabel)));
}
Object.assign(__ds_scope, { Checkbox, Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-iconbtn{font-family:var(--font-sans);display:inline-flex;align-items:center;justify-content:center;border:1px solid transparent;border-radius:var(--radius-md);cursor:pointer;background:transparent;color:var(--text-body);transition:background var(--dur-fast) var(--ease-out),color var(--dur-fast) var(--ease-out),border-color var(--dur-fast) var(--ease-out);position:relative;}
.yds-iconbtn:hover{background:var(--surface-sunken);color:var(--text-strong);}
.yds-iconbtn:active{transform:translateY(1px);}
.yds-iconbtn:focus-visible{outline:none;box-shadow:var(--ring-brand);}
.yds-iconbtn--solid{background:var(--brand);color:var(--on-brand);}
.yds-iconbtn--solid:hover{background:var(--brand-hover);color:#fff;}
.yds-iconbtn--outline{border-color:var(--border-default);}
.yds-iconbtn--outline:hover{border-color:var(--border-strong);background:var(--surface-sunken);}
.yds-iconbtn[disabled]{opacity:.45;cursor:not-allowed;pointer-events:none;}
.yds-iconbtn__badge{position:absolute;top:-3px;right:-3px;min-width:17px;height:17px;padding:0 4px;border-radius:999px;background:var(--live);color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid var(--surface-card);font-family:var(--font-mono);}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'iconbtn');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
const SIZES = {
  sm: 32,
  md: 40,
  lg: 44
};
function IconButton({
  variant = 'ghost',
  size = 'md',
  badge,
  label,
  disabled = false,
  className = '',
  style = {},
  children,
  ...rest
}) {
  ensureCSS();
  const d = SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: `yds-iconbtn yds-iconbtn--${variant} ${className}`.trim(),
    style: {
      width: d,
      height: d,
      ...style
    },
    "aria-label": label,
    title: label,
    disabled: disabled
  }, rest), children, badge != null && badge !== 0 && /*#__PURE__*/React.createElement("span", {
    className: "yds-iconbtn__badge"
  }, badge > 99 ? '99+' : badge));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-field{display:flex;flex-direction:column;gap:6px;font-family:var(--font-sans);}
.yds-field__label{font-size:13px;font-weight:600;color:var(--text-strong);display:flex;gap:6px;align-items:center;}
.yds-field__req{color:var(--error);}
.yds-field__hint{font-size:12px;color:var(--text-muted);}
.yds-field__err{font-size:12px;color:var(--error);font-weight:500;}
.yds-input-wrap{display:flex;align-items:center;gap:8px;background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-input);padding:0 12px;transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out);}
.yds-input-wrap:hover{border-color:var(--border-strong);}
.yds-input-wrap:focus-within{border-color:var(--brand);box-shadow:var(--ring-brand);}
.yds-input-wrap--error{border-color:var(--error);}
.yds-input-wrap--error:focus-within{box-shadow:var(--ring-error);}
.yds-input-wrap--disabled{background:var(--surface-sunken);opacity:.6;cursor:not-allowed;}
.yds-input{flex:1;border:none;outline:none;background:transparent;font-family:inherit;font-size:15px;color:var(--text-strong);min-width:0;}
.yds-input::placeholder{color:var(--text-subtle);}
.yds-input--mono{font-family:var(--font-mono);font-variant-numeric:tabular-nums;letter-spacing:.04em;}
.yds-input__affix{font-size:14px;color:var(--text-muted);font-weight:500;white-space:nowrap;}
.yds-input__icon{display:flex;color:var(--text-muted);}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'input');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
const HEIGHTS = {
  sm: 36,
  md: 44,
  lg: 52
};
function Input({
  label,
  hint,
  error,
  required = false,
  size = 'md',
  prefix,
  suffix,
  iconLeft,
  iconRight,
  mono = false,
  disabled = false,
  id,
  className = '',
  style = {},
  wrapStyle = {},
  ...rest
}) {
  ensureCSS();
  const inputId = id || (label ? `in-${Math.random().toString(36).slice(2, 8)}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: `yds-field ${className}`.trim(),
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "yds-field__label",
    htmlFor: inputId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "yds-field__req"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: `yds-input-wrap${error ? ' yds-input-wrap--error' : ''}${disabled ? ' yds-input-wrap--disabled' : ''}`,
    style: {
      height: HEIGHTS[size] || HEIGHTS.md,
      ...wrapStyle
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    className: "yds-input__icon"
  }, iconLeft), prefix && /*#__PURE__*/React.createElement("span", {
    className: "yds-input__affix"
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: `yds-input${mono ? ' yds-input--mono' : ''}`,
    disabled: disabled,
    "aria-invalid": !!error
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    className: "yds-input__affix"
  }, suffix), iconRight && /*#__PURE__*/React.createElement("span", {
    className: "yds-input__icon"
  }, iconRight)), error ? /*#__PURE__*/React.createElement("span", {
    className: "yds-field__err"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "yds-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-sel-wrap{display:flex;flex-direction:column;gap:6px;font-family:var(--font-sans);}
.yds-sel-label{font-size:13px;font-weight:600;color:var(--text-strong);}
.yds-sel-req{color:var(--error);}
.yds-sel-box{position:relative;display:flex;align-items:center;}
.yds-sel{appearance:none;-webkit-appearance:none;width:100%;font-family:inherit;font-size:15px;color:var(--text-strong);background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-input);padding:0 38px 0 13px;outline:none;cursor:pointer;transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out);}
.yds-sel:hover{border-color:var(--border-strong);}
.yds-sel:focus{border-color:var(--brand);box-shadow:var(--ring-brand);}
.yds-sel--error{border-color:var(--error);}
.yds-sel:disabled{background:var(--surface-sunken);opacity:.6;cursor:not-allowed;}
.yds-sel--placeholder{color:var(--text-subtle);}
.yds-sel-caret{position:absolute;right:13px;pointer-events:none;color:var(--text-muted);display:flex;}
.yds-sel-hint{font-size:12px;color:var(--text-muted);}
.yds-sel-err{font-size:12px;color:var(--error);font-weight:500;}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'select');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
const HEIGHTS = {
  sm: 36,
  md: 44,
  lg: 52
};
function Select({
  label,
  hint,
  error,
  required = false,
  size = 'md',
  options = [],
  placeholder,
  value,
  id,
  className = '',
  style = {},
  children,
  ...rest
}) {
  ensureCSS();
  const selId = id || (label ? `sel-${Math.random().toString(36).slice(2, 8)}` : undefined);
  const isPlaceholder = (value === '' || value == null) && placeholder;
  return /*#__PURE__*/React.createElement("div", {
    className: `yds-sel-wrap ${className}`.trim(),
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "yds-sel-label",
    htmlFor: selId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "yds-sel-req"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "yds-sel-box"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    className: `yds-sel${error ? ' yds-sel--error' : ''}${isPlaceholder ? ' yds-sel--placeholder' : ''}`,
    style: {
      height: HEIGHTS[size] || HEIGHTS.md
    },
    value: value,
    "aria-invalid": !!error
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), children || options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    className: "yds-sel-caret",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))), error ? /*#__PURE__*/React.createElement("span", {
    className: "yds-sel-err"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "yds-sel-hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-switch{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-sans);cursor:pointer;font-size:14px;color:var(--text-body);user-select:none;}
.yds-switch input{position:absolute;opacity:0;width:0;height:0;}
.yds-switch__track{flex:none;width:40px;height:24px;border-radius:999px;background:var(--gray-300);position:relative;transition:background var(--dur-base) var(--ease-out);}
.yds-switch__thumb{position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:var(--shadow-sm);transition:transform var(--dur-base) var(--ease-out);}
.yds-switch input:checked + .yds-switch__track{background:var(--brand);}
.yds-switch input:checked + .yds-switch__track .yds-switch__thumb{transform:translateX(16px);}
.yds-switch input:focus-visible + .yds-switch__track{box-shadow:var(--ring-brand);}
.yds-switch--disabled{cursor:not-allowed;opacity:.5;}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'switch');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
function Switch({
  label,
  disabled = false,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  return /*#__PURE__*/React.createElement("label", {
    className: `yds-switch${disabled ? ' yds-switch--disabled' : ''} ${className}`.trim(),
    style: style
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "yds-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "yds-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-ta-wrap{display:flex;flex-direction:column;gap:6px;font-family:var(--font-sans);}
.yds-ta-label{font-size:13px;font-weight:600;color:var(--text-strong);}
.yds-ta-req{color:var(--error);}
.yds-ta{font-family:var(--font-sans);font-size:15px;color:var(--text-strong);background:var(--surface-card);border:1px solid var(--border-default);border-radius:var(--radius-input);padding:11px 13px;resize:vertical;min-height:96px;outline:none;transition:border-color var(--dur-fast) var(--ease-out),box-shadow var(--dur-fast) var(--ease-out);line-height:1.5;}
.yds-ta:hover{border-color:var(--border-strong);}
.yds-ta:focus{border-color:var(--brand);box-shadow:var(--ring-brand);}
.yds-ta--error{border-color:var(--error);}
.yds-ta::placeholder{color:var(--text-subtle);}
.yds-ta-foot{display:flex;justify-content:space-between;align-items:center;gap:8px;}
.yds-ta-hint{font-size:12px;color:var(--text-muted);}
.yds-ta-err{font-size:12px;color:var(--error);font-weight:500;}
.yds-ta-count{font-size:12px;color:var(--text-subtle);font-family:var(--font-mono);}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'textarea');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
function Textarea({
  label,
  hint,
  error,
  required = false,
  maxLength,
  value,
  id,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  const taId = id || (label ? `ta-${Math.random().toString(36).slice(2, 8)}` : undefined);
  const len = typeof value === 'string' ? value.length : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: `yds-ta-wrap ${className}`.trim(),
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "yds-ta-label",
    htmlFor: taId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "yds-ta-req"
  }, "*")), /*#__PURE__*/React.createElement("textarea", _extends({
    id: taId,
    className: `yds-ta${error ? ' yds-ta--error' : ''}`,
    maxLength: maxLength,
    value: value,
    "aria-invalid": !!error
  }, rest)), /*#__PURE__*/React.createElement("div", {
    className: "yds-ta-foot"
  }, /*#__PURE__*/React.createElement("span", null, error ? /*#__PURE__*/React.createElement("span", {
    className: "yds-ta-err"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "yds-ta-hint"
  }, hint) : null), maxLength && /*#__PURE__*/React.createElement("span", {
    className: "yds-ta-count"
  }, len, "/", maxLength)));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-pg{display:inline-flex;align-items:center;gap:4px;font-family:var(--font-sans);}
.yds-pg__btn{min-width:38px;height:38px;padding:0 6px;border:1px solid var(--border-subtle);background:var(--surface-card);border-radius:var(--radius-sm);font-family:var(--font-mono);font-size:14px;font-weight:600;color:var(--text-body);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all var(--dur-fast) var(--ease-out);}
.yds-pg__btn:hover:not(:disabled){border-color:var(--brand);color:var(--brand);background:var(--brand-subtle);}
.yds-pg__btn--active{background:var(--brand);border-color:var(--brand);color:#fff;}
.yds-pg__btn--active:hover{background:var(--brand-hover);color:#fff;}
.yds-pg__btn:disabled{opacity:.4;cursor:not-allowed;}
.yds-pg__ell{min-width:24px;text-align:center;color:var(--text-subtle);font-family:var(--font-mono);}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'pagination');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
function range(page, total) {
  const out = [];
  const add = v => out.push(v);
  add(1);
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) add('…');
  for (let i = start; i <= end; i++) add(i);
  if (end < total - 1) add('…');
  if (total > 1) add(total);
  return out;
}
const Arrow = ({
  dir
}) => /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, dir === 'left' ? /*#__PURE__*/React.createElement("polyline", {
  points: "15 18 9 12 15 6"
}) : /*#__PURE__*/React.createElement("polyline", {
  points: "9 18 15 12 9 6"
}));
function Pagination({
  page = 1,
  total = 1,
  onChange,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  if (total <= 1) return null;
  const go = p => onChange && p >= 1 && p <= total && p !== page && onChange(p);
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: `yds-pg ${className}`.trim(),
    style: style,
    "aria-label": "Paginaci\xF3n"
  }, rest), /*#__PURE__*/React.createElement("button", {
    className: "yds-pg__btn",
    onClick: () => go(page - 1),
    disabled: page <= 1,
    "aria-label": "Anterior"
  }, /*#__PURE__*/React.createElement(Arrow, {
    dir: "left"
  })), range(page, total).map((p, i) => p === '…' ? /*#__PURE__*/React.createElement("span", {
    className: "yds-pg__ell",
    key: `e${i}`
  }, "\u2026") : /*#__PURE__*/React.createElement("button", {
    key: p,
    className: `yds-pg__btn${p === page ? ' yds-pg__btn--active' : ''}`,
    onClick: () => go(p),
    "aria-current": p === page ? 'page' : undefined
  }, p)), /*#__PURE__*/React.createElement("button", {
    className: "yds-pg__btn",
    onClick: () => go(page + 1),
    disabled: page >= total,
    "aria-label": "Siguiente"
  }, /*#__PURE__*/React.createElement(Arrow, {
    dir: "right"
  })));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-tabs{display:flex;gap:2px;font-family:var(--font-sans);border-bottom:1px solid var(--border-subtle);overflow-x:auto;}
.yds-tabs--pill{border-bottom:none;gap:6px;background:var(--surface-sunken);padding:4px;border-radius:var(--radius-md);display:inline-flex;}
.yds-tab{appearance:none;border:none;background:transparent;font-family:inherit;font-size:14px;font-weight:600;color:var(--text-muted);padding:11px 14px;cursor:pointer;position:relative;white-space:nowrap;display:flex;align-items:center;gap:7px;transition:color var(--dur-fast) var(--ease-out);}
.yds-tab:hover{color:var(--text-strong);}
.yds-tab--active{color:var(--brand);}
.yds-tabs:not(.yds-tabs--pill) .yds-tab--active::after{content:"";position:absolute;left:8px;right:8px;bottom:-1px;height:2px;background:var(--brand);border-radius:2px 2px 0 0;}
.yds-tabs--pill .yds-tab{border-radius:var(--radius-sm);padding:8px 14px;}
.yds-tabs--pill .yds-tab--active{background:var(--surface-card);color:var(--brand);box-shadow:var(--shadow-xs);}
.yds-tab__count{font-family:var(--font-mono);font-size:11px;font-weight:700;background:var(--surface-sunken);color:var(--text-muted);padding:1px 7px;border-radius:999px;}
.yds-tab--active .yds-tab__count{background:var(--brand-subtle);color:var(--brand);}
.yds-tabs--pill .yds-tab__count{background:var(--surface-sunken);}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'tabs');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
function Tabs({
  tabs = [],
  value,
  onChange,
  variant = 'underline',
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `yds-tabs${variant === 'pill' ? ' yds-tabs--pill' : ''} ${className}`.trim(),
    style: style,
    role: "tablist"
  }, rest), tabs.map(t => {
    const tab = typeof t === 'string' ? {
      value: t,
      label: t
    } : t;
    const active = tab.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.value,
      role: "tab",
      "aria-selected": active,
      className: `yds-tab${active ? ' yds-tab--active' : ''}`,
      onClick: () => onChange && onChange(tab.value)
    }, tab.icon, tab.label, tab.count != null && /*#__PURE__*/React.createElement("span", {
      className: "yds-tab__count"
    }, tab.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/status/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-badge{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-sans);font-weight:600;border-radius:var(--radius-badge);white-space:nowrap;line-height:1;border:1px solid transparent;}
.yds-badge--sm{font-size:11px;padding:3px 8px;}
.yds-badge--md{font-size:12px;padding:5px 10px;}
.yds-badge__dot{width:6px;height:6px;border-radius:50%;background:currentColor;}
.yds-badge__dot--pulse{animation:yala-live-pulse 1.6s infinite;}
.yds-badge--solid{color:#fff;}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'badge');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}

/* tone -> {bg, fg, border} using tokens */
const TONES = {
  neutral: {
    bg: 'var(--gray-100)',
    fg: 'var(--gray-600)',
    bd: 'var(--gray-200)'
  },
  brand: {
    bg: 'var(--brand-subtle)',
    fg: 'var(--brand)',
    bd: 'var(--brand-border)'
  },
  live: {
    bg: 'var(--live-subtle)',
    fg: 'var(--live-hover)',
    bd: 'var(--live-border)'
  },
  success: {
    bg: 'var(--success-bg)',
    fg: 'var(--success)',
    bd: 'transparent'
  },
  warning: {
    bg: 'var(--warning-bg)',
    fg: 'var(--warning)',
    bd: 'transparent'
  },
  error: {
    bg: 'var(--error-bg)',
    fg: 'var(--error)',
    bd: 'transparent'
  },
  info: {
    bg: 'var(--info-bg)',
    fg: 'var(--info)',
    bd: 'transparent'
  }
};
function Badge({
  tone = 'neutral',
  size = 'md',
  dot = false,
  pulse = false,
  solid = false,
  className = '',
  style = {},
  children,
  ...rest
}) {
  ensureCSS();
  const t = TONES[tone] || TONES.neutral;
  const base = solid ? {
    background: t.fg,
    color: '#fff',
    borderColor: 'transparent'
  } : {
    background: t.bg,
    color: t.fg,
    borderColor: t.bd
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `yds-badge yds-badge--${size}${solid ? ' yds-badge--solid' : ''} ${className}`.trim(),
    style: {
      ...base,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: `yds-badge__dot${pulse ? ' yds-badge__dot--pulse' : ''}`
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/Badge.jsx", error: String((e && e.message) || e) }); }

// components/status/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Backend enum -> { es label, tone }.  Identifiers stay in English (code),
   every visible string is Spanish (LatAm). */
const ORDER_STATUS = {
  PENDING: {
    label: 'Pendiente de pago',
    tone: 'warning'
  },
  CONFIRMED: {
    label: 'Confirmada',
    tone: 'brand'
  },
  IN_TRANSIT: {
    label: 'En tránsito',
    tone: 'info'
  },
  COMPLETED: {
    label: 'Completada',
    tone: 'success'
  },
  CANCELLED: {
    label: 'Cancelada',
    tone: 'neutral'
  },
  DISPUTED: {
    label: 'En disputa',
    tone: 'error'
  }
};
const AUCTION_STATUS = {
  SCHEDULED: {
    label: 'Programada',
    tone: 'neutral'
  },
  ACTIVE: {
    label: 'En subasta',
    tone: 'success'
  },
  CLOSED: {
    label: 'Cerrada',
    tone: 'neutral'
  },
  PAID: {
    label: 'Pagada',
    tone: 'success'
  },
  CANCELLED: {
    label: 'Cancelada',
    tone: 'neutral'
  }
};
const LISTING_STATUS = {
  DRAFT: {
    label: 'Borrador',
    tone: 'neutral'
  },
  ACTIVE: {
    label: 'Activa',
    tone: 'success'
  },
  SOLD: {
    label: 'Vendida',
    tone: 'info'
  },
  CANCELLED: {
    label: 'Cancelada',
    tone: 'neutral'
  },
  SUSPENDED: {
    label: 'Suspendida',
    tone: 'error'
  }
};
const MAPS = {
  order: ORDER_STATUS,
  auction: AUCTION_STATUS,
  listing: LISTING_STATUS
};
function StatusBadge({
  kind = 'order',
  status,
  size = 'md',
  solid = false,
  ...rest
}) {
  const map = MAPS[kind] || ORDER_STATUS;
  const cfg = map[status] || {
    label: status,
    tone: 'neutral'
  };
  return /*#__PURE__*/React.createElement(__ds_scope.Badge, _extends({
    tone: cfg.tone,
    size: size,
    solid: solid,
    dot: !!cfg.dot,
    pulse: !!cfg.pulse
  }, rest), cfg.label);
}
Object.assign(__ds_scope, { ORDER_STATUS, AUCTION_STATUS, LISTING_STATUS, StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/cards/AuctionCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-ac{display:flex;flex-direction:column;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-card);overflow:hidden;font-family:var(--font-sans);cursor:pointer;transition:transform var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out);box-shadow:var(--shadow-card);text-decoration:none;color:inherit;}
.yds-ac:hover{transform:translateY(-3px);box-shadow:var(--shadow-card-hover);border-color:var(--live-border);}
.yds-ac--live{border-color:var(--live-border);}
.yds-ac__media{position:relative;aspect-ratio:4/3;overflow:hidden;background:var(--surface-sunken);}
.yds-ac__img{width:100%;height:100%;object-fit:cover;display:block;transition:transform var(--dur-slow) var(--ease-out);}
.yds-ac:hover .yds-ac__img{transform:scale(1.04);}
.yds-ac__badge{position:absolute;top:10px;left:10px;}
.yds-ac__cd{position:absolute;left:10px;right:10px;bottom:10px;display:flex;justify-content:center;background:rgba(15,15,22,.62);backdrop-filter:blur(6px);border-radius:var(--radius-md);padding:6px;}
.yds-ac__cd .yds-cd__b{background:rgba(255,255,255,.14)!important;}
.yds-ac__cd .yds-cd__num{color:#fff;}
.yds-ac__cd .yds-cd__unit{color:rgba(255,255,255,.7)!important;}
.yds-ac__cd .yds-cd__sep{color:#fff;}
.yds-ac__body{padding:13px 14px 15px;display:flex;flex-direction:column;gap:9px;flex:1;}
.yds-ac__title{font-size:14px;font-weight:600;color:var(--text-strong);line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.7em;}
.yds-ac__bidrow{display:flex;align-items:flex-end;justify-content:space-between;gap:8px;}
.yds-ac__bidlbl{font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--live-hover);margin-bottom:2px;}
.yds-ac__bids{font-size:12px;color:var(--text-muted);font-family:var(--font-mono);display:flex;align-items:center;gap:4px;}
.yds-ac__seller{display:flex;align-items:center;gap:7px;padding-top:9px;border-top:1px solid var(--border-subtle);margin-top:auto;}
.yds-ac__sname{font-size:12px;color:var(--text-muted);font-weight:500;}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'auctioncard');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
const GavelMini = () => /*#__PURE__*/React.createElement("svg", {
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "m14.5 12.5-8 8a2.12 2.12 0 1 1-3-3l8-8"
}), /*#__PURE__*/React.createElement("path", {
  d: "m16 16 6-6"
}), /*#__PURE__*/React.createElement("path", {
  d: "m8 8 6-6"
}), /*#__PURE__*/React.createElement("path", {
  d: "m9 7 8 8"
}), /*#__PURE__*/React.createElement("path", {
  d: "m21 11-8-8"
}));
function AuctionCard({
  image,
  title,
  currentBid,
  bidsCount = 0,
  endsAt,
  currency = 'S/.',
  status = 'ACTIVE',
  sellerName,
  sellerVerified = false,
  as = 'div',
  href,
  onClick,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  const Tag = as === 'a' ? 'a' : 'div';
  const isLive = status === 'ACTIVE';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `yds-ac${isLive ? ' yds-ac--live' : ''} ${className}`.trim(),
    style: style,
    href: Tag === 'a' ? href : undefined,
    onClick: onClick
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "yds-ac__media"
  }, /*#__PURE__*/React.createElement("img", {
    className: "yds-ac__img",
    src: image,
    alt: title
  }), /*#__PURE__*/React.createElement("div", {
    className: "yds-ac__badge"
  }, /*#__PURE__*/React.createElement(__ds_scope.StatusBadge, {
    kind: "auction",
    status: status,
    size: "sm"
  })), isLive && endsAt && /*#__PURE__*/React.createElement("div", {
    className: "yds-ac__cd"
  }, /*#__PURE__*/React.createElement(__ds_scope.Countdown, {
    endsAt: endsAt,
    variant: "auction",
    showDot: false
  }))), /*#__PURE__*/React.createElement("div", {
    className: "yds-ac__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "yds-ac__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "yds-ac__bidrow"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "yds-ac__bidlbl"
  }, isLive ? 'Puja actual' : 'Precio final'), /*#__PURE__*/React.createElement(__ds_scope.Price, {
    value: currentBid,
    currency: currency,
    size: "lg",
    live: isLive
  })), /*#__PURE__*/React.createElement("div", {
    className: "yds-ac__bids"
  }, /*#__PURE__*/React.createElement(GavelMini, null), bidsCount, " ", bidsCount === 1 ? 'puja' : 'pujas')), sellerName && /*#__PURE__*/React.createElement("div", {
    className: "yds-ac__seller"
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: sellerName,
    verified: sellerVerified,
    size: "xs"
  }), /*#__PURE__*/React.createElement("span", {
    className: "yds-ac__sname"
  }, sellerName))));
}
Object.assign(__ds_scope, { AuctionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/AuctionCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/ListingCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-lc{display:flex;flex-direction:column;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-card);overflow:hidden;font-family:var(--font-sans);cursor:pointer;transition:transform var(--dur-base) var(--ease-out),box-shadow var(--dur-base) var(--ease-out),border-color var(--dur-base) var(--ease-out);box-shadow:var(--shadow-card);text-decoration:none;color:inherit;}
.yds-lc:hover{transform:translateY(-3px);box-shadow:var(--shadow-card-hover);border-color:var(--border-default);}
.yds-lc__media{position:relative;aspect-ratio:1/1;overflow:hidden;background:var(--surface-sunken);}
.yds-lc__img{width:100%;height:100%;object-fit:cover;display:block;transition:transform var(--dur-slow) var(--ease-out);}
.yds-lc:hover .yds-lc__img{transform:scale(1.04);}
.yds-lc__top{position:absolute;top:10px;left:10px;right:10px;display:flex;justify-content:space-between;align-items:flex-start;gap:6px;}
.yds-lc__fav{width:34px;height:34px;border-radius:50%;border:none;background:rgba(255,255,255,.92);backdrop-filter:blur(4px);color:var(--text-muted);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all var(--dur-fast);box-shadow:var(--shadow-sm);}
.yds-lc__fav:hover{color:var(--live);transform:scale(1.08);}
.yds-lc__fav--on{color:var(--live);}
.yds-lc__body{padding:13px 14px 15px;display:flex;flex-direction:column;gap:8px;flex:1;}
.yds-lc__title{font-size:14px;font-weight:600;color:var(--text-strong);line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:2.7em;}
.yds-lc__price{margin-top:2px;}
.yds-lc__seller{display:flex;align-items:center;gap:7px;padding-top:9px;border-top:1px solid var(--border-subtle);margin-top:auto;}
.yds-lc__sname{font-size:12px;color:var(--text-muted);font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.yds-lc__rep{margin-left:auto;display:flex;align-items:center;gap:3px;font-size:12px;color:var(--text-muted);font-family:var(--font-mono);font-weight:600;}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'listingcard');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
const HeartIcon = ({
  on
}) => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: on ? 'currentColor' : 'none',
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
}));
const StarMini = () => /*#__PURE__*/React.createElement("svg", {
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "var(--star-on)"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 2.5l2.9 6.06 6.6.74-4.9 4.47 1.32 6.48L12 17.9 6.08 20.7 7.4 14.27 2.5 9.8l6.6-.74L12 2.5z"
}));
function ListingCard({
  image,
  title,
  condition,
  price,
  originalPrice,
  currency = 'S/.',
  sellerName,
  sellerVerified = false,
  sellerRating,
  status,
  favorite = false,
  onFavorite,
  as = 'div',
  href,
  onClick,
  className = '',
  style = {},
  ...rest
}) {
  ensureCSS();
  const Tag = as === 'a' ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `yds-lc ${className}`.trim(),
    style: style,
    href: Tag === 'a' ? href : undefined,
    onClick: onClick
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "yds-lc__media"
  }, /*#__PURE__*/React.createElement("img", {
    className: "yds-lc__img",
    src: image,
    alt: title
  }), /*#__PURE__*/React.createElement("div", {
    className: "yds-lc__top"
  }, condition ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "neutral",
    size: "sm",
    solid: false,
    style: {
      background: 'rgba(255,255,255,.92)',
      color: 'var(--text-body)'
    }
  }, condition) : /*#__PURE__*/React.createElement("span", null), status ? /*#__PURE__*/React.createElement(__ds_scope.StatusBadge, {
    kind: "listing",
    status: status,
    size: "sm"
  }) : onFavorite && /*#__PURE__*/React.createElement("button", {
    className: `yds-lc__fav${favorite ? ' yds-lc__fav--on' : ''}`,
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      onFavorite();
    },
    "aria-label": "Favorito"
  }, /*#__PURE__*/React.createElement(HeartIcon, {
    on: favorite
  })))), /*#__PURE__*/React.createElement("div", {
    className: "yds-lc__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "yds-lc__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "yds-lc__price"
  }, /*#__PURE__*/React.createElement(__ds_scope.Price, {
    value: price,
    currency: currency,
    size: "lg",
    strikethrough: originalPrice
  })), sellerName && /*#__PURE__*/React.createElement("div", {
    className: "yds-lc__seller"
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: sellerName,
    verified: sellerVerified,
    size: "xs"
  }), /*#__PURE__*/React.createElement("span", {
    className: "yds-lc__sname"
  }, sellerName), sellerRating != null && /*#__PURE__*/React.createElement("span", {
    className: "yds-lc__rep"
  }, /*#__PURE__*/React.createElement(StarMini, null), sellerRating.toFixed(1)))));
}
Object.assign(__ds_scope, { ListingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ListingCard.jsx", error: String((e && e.message) || e) }); }

// components/status/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.yds-chip{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-sans);font-size:13px;font-weight:500;border-radius:var(--radius-chip);border:1px solid var(--border-default);background:var(--surface-card);color:var(--text-body);padding:6px 12px;cursor:pointer;white-space:nowrap;transition:all var(--dur-fast) var(--ease-out);user-select:none;}
.yds-chip:hover{border-color:var(--border-strong);background:var(--surface-sunken);}
.yds-chip--selected{background:var(--brand-subtle);border-color:var(--brand);color:var(--brand);font-weight:600;}
.yds-chip--selected:hover{background:var(--brand-subtle-2);}
.yds-chip--static{cursor:default;}
.yds-chip--static:hover{border-color:var(--border-default);background:var(--surface-card);}
.yds-chip__x{display:flex;border-radius:50%;margin-right:-3px;opacity:.6;transition:opacity var(--dur-fast);}
.yds-chip__x:hover{opacity:1;}
.yds-chip__count{font-family:var(--font-mono);font-size:11px;opacity:.7;}
`;
let injected = false;
function ensureCSS() {
  if (typeof document !== 'undefined' && !injected) {
    injected = true;
    const s = document.createElement('style');
    s.setAttribute('data-yds', 'chip');
    s.textContent = CSS;
    document.head.appendChild(s);
  }
}
function Tag({
  selected = false,
  removable = false,
  onRemove,
  count,
  icon,
  className = '',
  style = {},
  children,
  onClick,
  ...rest
}) {
  ensureCSS();
  const isStatic = !onClick && !removable && !selected;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `yds-chip${selected ? ' yds-chip--selected' : ''}${isStatic ? ' yds-chip--static' : ''} ${className}`.trim(),
    style: style,
    onClick: onClick,
    role: onClick ? 'button' : undefined
  }, rest), icon, children, count != null && /*#__PURE__*/React.createElement("span", {
    className: "yds-chip__count"
  }, count), removable && /*#__PURE__*/React.createElement("span", {
    className: "yds-chip__x",
    onClick: e => {
      e.stopPropagation();
      onRemove && onRemove(e);
    },
    "aria-label": "Quitar"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/Tag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/AppShell.jsx
try { (() => {
/* Yala App Shell — global header (logo, search, notifications, user) + category nav. */
(function () {
  const {
    IconButton,
    Avatar,
    Badge
  } = window.YalaDesignSystem_e5dc9e;
  const Icon = window.Icon;
  const {
    categories
  } = window.YData;
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
  .ysh__nav{height:48px;background:var(--surface-card);border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;gap:4px;padding:0 24px;overflow-x:auto;}
  .ysh__cat{display:inline-flex;align-items:center;gap:7px;height:34px;padding:0 14px;border-radius:var(--radius-pill);font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;white-space:nowrap;transition:all var(--dur-fast);border:1px solid transparent;}
  .ysh__cat:hover{background:var(--surface-sunken);color:var(--text-strong);}
  .ysh__cat--active{background:var(--brand-subtle);color:var(--brand);}
  .ysh__catcount{font-family:var(--font-mono);font-size:11px;opacity:.7;}
  .ysh__all{display:inline-flex;align-items:center;gap:7px;height:34px;padding:0 14px;border-radius:var(--radius-pill);font-size:13px;font-weight:700;color:var(--text-strong);cursor:pointer;white-space:nowrap;}
  `;
  let ic = false;
  function ensure() {
    if (!ic) {
      ic = true;
      const s = document.createElement('style');
      s.textContent = shellCSS;
      document.head.appendChild(s);
    }
  }
  function AppShell({
    activeCat,
    onCat,
    onNav,
    unread = 3,
    user = {
      name: 'Diego Ramírez',
      verified: true
    }
  }) {
    ensure();
    return /*#__PURE__*/React.createElement("div", {
      className: "ysh"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ysh__bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ysh__logo",
      onClick: () => onNav && onNav('home')
    }, /*#__PURE__*/React.createElement("img", {
      src: "assets/yala-logo.png",
      alt: "Yala"
    })), /*#__PURE__*/React.createElement("label", {
      className: "ysh__search"
    }, /*#__PURE__*/React.createElement(Icon.Search, {
      size: 18
    }), /*#__PURE__*/React.createElement("input", {
      placeholder: "Buscar Charizard, Funko, comics\u2026"
    })), /*#__PURE__*/React.createElement("div", {
      className: "ysh__actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "ysh__sell",
      onClick: () => onNav && onNav('seller')
    }, /*#__PURE__*/React.createElement(Icon.Plus, {
      size: 17
    }), " Vender"), /*#__PURE__*/React.createElement(IconButton, {
      label: "Notificaciones",
      variant: "ghost",
      badge: unread,
      onClick: () => onNav && onNav('notifications')
    }, /*#__PURE__*/React.createElement(Icon.Bell, {
      size: 20
    })), /*#__PURE__*/React.createElement(IconButton, {
      label: "Favoritos",
      variant: "ghost"
    }, /*#__PURE__*/React.createElement(Icon.Heart, {
      size: 20
    })), /*#__PURE__*/React.createElement("div", {
      className: "ysh__user",
      onClick: () => onNav && onNav('profile')
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: user.name,
      verified: user.verified,
      size: "sm"
    }), /*#__PURE__*/React.createElement("span", {
      className: "ysh__uname"
    }, user.name.split(' ')[0]), /*#__PURE__*/React.createElement(Icon.ChevronDown, {
      size: 15
    })))), /*#__PURE__*/React.createElement("div", {
      className: "ysh__nav"
    }, /*#__PURE__*/React.createElement("span", {
      className: `ysh__cat${!activeCat ? ' ysh__cat--active' : ''}`,
      onClick: () => onCat && onCat(null)
    }, /*#__PURE__*/React.createElement(Icon.LayoutGrid, {
      size: 15
    }), " Todo"), categories.map(c => /*#__PURE__*/React.createElement("span", {
      key: c.name,
      className: `ysh__cat${activeCat === c.name ? ' ysh__cat--active' : ''}`,
      onClick: () => onCat && onCat(c.name)
    }, c.name, " ", /*#__PURE__*/React.createElement("span", {
      className: "ysh__catcount"
    }, c.count.toLocaleString('es-PE'))))));
  }
  window.AppShell = AppShell;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/AuctionLive.jsx
try { (() => {
/* Yala — Detalle de subasta EN VIVO (screen 3). The star screen. */
(function () {
  const {
    Price,
    Countdown,
    Avatar,
    ReputationStars,
    Button,
    Input,
    StatusBadge,
    Badge,
    Dialog,
    DniGate
  } = window.YalaDesignSystem_e5dc9e;
  const Icon = window.Icon;
  const {
    liveAuction
  } = window.YData;
  const css = `
  .yal{max-width:1180px;margin:0 auto;padding:24px;display:grid;grid-template-columns:1.15fr 1fr;gap:32px;align-items:start;}
  .yal__back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:var(--text-muted);cursor:pointer;margin-bottom:14px;}
  .yal__gallery{display:flex;flex-direction:column;gap:12px;}
  .yal__hero{position:relative;aspect-ratio:1/1;border-radius:var(--radius-xl);overflow:hidden;background:var(--surface-sunken);border:1px solid var(--border-subtle);}
  .yal__hero img{width:100%;height:100%;object-fit:cover;display:block;}
  .yal__herobadge{position:absolute;top:14px;left:14px;}
  .yal__thumbs{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;}
  .yal__thumb{aspect-ratio:1/1;border-radius:var(--radius-md);overflow:hidden;border:2px solid var(--border-subtle);cursor:pointer;background:var(--surface-sunken);transition:border-color var(--dur-fast);}
  .yal__thumb img{width:100%;height:100%;object-fit:cover;display:block;}
  .yal__thumb--active{border-color:var(--brand);}
  .yal__info{min-width:0;}
  .yal__cat{font-size:12px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--brand);margin-bottom:8px;}
  .yal__title{font-size:28px;font-weight:800;color:var(--text-strong);line-height:1.18;letter-spacing:-.02em;margin-bottom:14px;text-wrap:balance;}
  .yal__livebox{background:linear-gradient(165deg,var(--live-50),var(--surface-card));border:1px solid var(--live-border);border-radius:var(--radius-xl);padding:20px;box-shadow:var(--shadow-live);margin-bottom:18px;}
  .yal__lr{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-bottom:6px;}
  .yal__lbl{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--live-hover);margin-bottom:6px;display:flex;align-items:center;gap:6px;}
  .yal__livedot{width:8px;height:8px;border-radius:50%;background:var(--live);animation:yala-live-pulse 1.4s infinite;}
  .yal__cdwrap{text-align:right;}
  .yal__bidsno{font-family:var(--font-mono);font-size:13px;color:var(--text-muted);display:flex;align-items:center;gap:5px;margin-top:10px;}
  .yal__bidform{display:flex;gap:10px;align-items:flex-end;margin-top:16px;padding-top:16px;border-top:1px solid var(--live-border);}
  .yal__hint{font-size:12px;color:var(--text-muted);margin-top:9px;line-height:1.5;display:flex;gap:6px;align-items:flex-start;}
  .yal__seller{display:flex;align-items:center;gap:12px;padding:14px;border:1px solid var(--border-subtle);border-radius:var(--radius-lg);margin-bottom:18px;}
  .yal__smeta{flex:1;min-width:0;}
  .yal__sname{font-size:14px;font-weight:700;color:var(--text-strong);display:flex;align-items:center;gap:6px;}
  .yal__sverif{font-size:12px;color:var(--success);font-weight:600;display:flex;align-items:center;gap:4px;}
  .yal__sec{margin-bottom:18px;}
  .yal__sectt{font-size:13px;font-weight:700;color:var(--text-strong);margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;}
  .yal__desc{font-size:14px;color:var(--text-body);line-height:1.6;}
  .yal__hist{display:flex;flex-direction:column;border:1px solid var(--border-subtle);border-radius:var(--radius-lg);overflow:hidden;}
  .yal__brow{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border-subtle);font-size:13px;}
  .yal__brow:last-child{border-bottom:none;}
  .yal__brow--lead{background:var(--live-50);}
  .yal__bu{font-weight:600;color:var(--text-strong);flex:1;display:flex;align-items:center;gap:7px;}
  .yal__btime{font-size:11px;color:var(--text-subtle);font-family:var(--font-mono);}
  .yal__bamt{font-family:var(--font-mono);font-weight:700;color:var(--text-strong);font-variant-numeric:tabular-nums;}
  .yal__brow--lead .yal__bamt{color:var(--live-700);}
  .yal__leadtag{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--live-hover);background:var(--live-100);padding:2px 7px;border-radius:999px;}
  .yal__tick{animation:yala-tick 1.2s var(--ease-out);}
  @media(max-width:960px){.yal{grid-template-columns:1fr}}
  `;
  let ic = false;
  function ensure() {
    if (!ic) {
      ic = true;
      const s = document.createElement('style');
      s.textContent = css;
      document.head.appendChild(s);
    }
  }
  function AuctionLive({
    verified = false,
    onRequireDni,
    onBack
  }) {
    ensure();
    const a = liveAuction;
    const [activeImg, setActiveImg] = React.useState(0);
    const [bid, setBid] = React.useState(a.bid + a.minIncrement);
    const [history, setHistory] = React.useState(a.bidHistory);
    const [current, setCurrent] = React.useState(a.bid);
    const [justBumped, setJustBumped] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [showGate, setShowGate] = React.useState(false);
    const placeBid = () => {
      if (!verified) {
        setShowGate(true);
        return;
      }
      setShowConfirm(true);
    };
    const confirmBid = () => {
      setCurrent(bid);
      setHistory(h => [{
        user: 'vos',
        amount: bid,
        time: 'ahora',
        leader: true
      }, ...h.map(x => ({
        ...x,
        leader: false
      }))]);
      setBid(bid + a.minIncrement);
      setShowConfirm(false);
      setJustBumped(true);
      setTimeout(() => setJustBumped(false), 1300);
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1180,
        margin: '0 auto',
        padding: '20px 24px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "yal__back",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon.ChevronLeft, {
      size: 16
    }), " Volver al marketplace"), /*#__PURE__*/React.createElement("div", {
      className: "yal",
      style: {
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "yal__gallery"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yal__hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yal__herobadge"
    }, /*#__PURE__*/React.createElement(StatusBadge, {
      kind: "auction",
      status: "ACTIVE"
    })), /*#__PURE__*/React.createElement("img", {
      src: a.gallery[activeImg],
      alt: a.title
    })), /*#__PURE__*/React.createElement("div", {
      className: "yal__thumbs"
    }, a.gallery.map((g, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `yal__thumb${i === activeImg ? ' yal__thumb--active' : ''}`,
      onClick: () => setActiveImg(i)
    }, /*#__PURE__*/React.createElement("img", {
      src: g,
      alt: ""
    })))), /*#__PURE__*/React.createElement("div", {
      className: "yal__sec",
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "yal__sectt"
    }, "Descripci\xF3n"), /*#__PURE__*/React.createElement("p", {
      className: "yal__desc"
    }, a.desc))), /*#__PURE__*/React.createElement("div", {
      className: "yal__info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yal__cat"
    }, a.cat, " \xB7 ", a.cond), /*#__PURE__*/React.createElement("h1", {
      className: "yal__title"
    }, a.title), /*#__PURE__*/React.createElement("div", {
      className: "yal__livebox"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yal__lr"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "yal__lbl"
    }, /*#__PURE__*/React.createElement("span", {
      className: "yal__livedot"
    }), " Puja actual"), /*#__PURE__*/React.createElement(Price, {
      value: current,
      size: 40,
      live: true,
      className: justBumped ? 'yal__tick' : ''
    })), /*#__PURE__*/React.createElement("div", {
      className: "yal__cdwrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yal__lbl",
      style: {
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement(Icon.Clock, {
      size: 13
    }), " Cierra en"), /*#__PURE__*/React.createElement(Countdown, {
      endsAt: a.endsAt,
      variant: "auction",
      showDot: false
    }))), /*#__PURE__*/React.createElement("div", {
      className: "yal__bidsno"
    }, /*#__PURE__*/React.createElement(Icon.Gavel, {
      size: 14
    }), " ", history.length, " pujas \xB7 incremento sugerido S/. ", a.minIncrement.toLocaleString('es-PE'), " (1%)"), /*#__PURE__*/React.createElement("div", {
      className: "yal__bidform"
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Tu puja",
      prefix: "S/.",
      mono: true,
      size: "lg",
      value: bid,
      onChange: e => setBid(Number(e.target.value.replace(/\D/g, '')) || 0),
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "live",
      size: "lg",
      iconLeft: /*#__PURE__*/React.createElement(Icon.Gavel, {
        size: 18
      }),
      onClick: placeBid
    }, "Pujar")), /*#__PURE__*/React.createElement("div", {
      className: "yal__hint"
    }, /*#__PURE__*/React.createElement(Icon.AlertTriangle, {
      size: 14,
      style: {
        color: 'var(--warning)',
        flex: 'none',
        marginTop: 1
      }
    }), /*#__PURE__*/React.createElement("span", null, "Tu puja debe superar la actual. No pod\xE9s pujar dos veces seguidas ni sobre tu propia subasta."))), /*#__PURE__*/React.createElement("div", {
      className: "yal__seller"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: a.seller.name,
      verified: a.seller.verified,
      size: "lg"
    }), /*#__PURE__*/React.createElement("div", {
      className: "yal__smeta"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yal__sname"
    }, a.seller.name, " ", a.seller.verified && /*#__PURE__*/React.createElement("span", {
      className: "yal__sverif"
    }, /*#__PURE__*/React.createElement(Icon.Shield, {
      size: 13
    }), " verificada")), /*#__PURE__*/React.createElement(ReputationStars, {
      value: a.seller.rating,
      count: a.seller.reviews,
      positivePct: a.seller.pct,
      size: 15
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, "Ver perfil")), /*#__PURE__*/React.createElement("div", {
      className: "yal__sec"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yal__sectt"
    }, /*#__PURE__*/React.createElement("span", null, "Historial de pujas"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 500,
        color: 'var(--text-muted)',
        fontSize: 12
      }
    }, "en tiempo real")), /*#__PURE__*/React.createElement("div", {
      className: "yal__hist"
    }, history.map((b, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `yal__brow${b.leader ? ' yal__brow--lead' : ''}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "yal__bu"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: b.user,
      size: 22
    }), " ", b.user, " ", b.leader && /*#__PURE__*/React.createElement("span", {
      className: "yal__leadtag"
    }, "l\xEDder")), /*#__PURE__*/React.createElement("span", {
      className: "yal__btime"
    }, b.time), /*#__PURE__*/React.createElement("span", {
      className: "yal__bamt"
    }, "S/. ", b.amount.toLocaleString('es-PE')))))))), showConfirm && /*#__PURE__*/React.createElement(Dialog, {
      open: true,
      onClose: () => setShowConfirm(false),
      tone: "live",
      icon: /*#__PURE__*/React.createElement(Icon.Gavel, {
        size: 20
      }),
      title: "Confirm\xE1 tu puja",
      description: `Vas a pujar S/. ${bid.toLocaleString('es-PE')} por ${a.title}.`,
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "ghost",
        onClick: () => setShowConfirm(false)
      }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
        variant: "live",
        onClick: confirmBid
      }, "Confirmar puja"))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: 'var(--text-muted)',
        lineHeight: 1.55
      }
    }, "Si gan\xE1s, tendr\xE1s ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--text-strong)'
      }
    }, "48 horas"), " para pagar. Las pujas no se pueden retirar.")), showGate && /*#__PURE__*/React.createElement(Dialog, {
      open: true,
      onClose: () => setShowGate(false),
      width: 500
    }, /*#__PURE__*/React.createElement(DniGate, {
      action: "pujar",
      primaryAction: /*#__PURE__*/React.createElement(Button, {
        fullWidth: true,
        onClick: () => {
          setShowGate(false);
          onRequireDni && onRequireDni();
        }
      }, "Verificar mi identidad"),
      secondaryAction: /*#__PURE__*/React.createElement(Button, {
        variant: "ghost",
        fullWidth: true,
        onClick: () => setShowGate(false)
      }, "Ahora no")
    })));
  }
  window.AuctionLive = AuctionLive;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/AuctionLive.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/Checkout.jsx
try { (() => {
/* Yala — Detalle de orden / Checkout (screen 8). Commission 8%, 48h deadline, stepper. */
(function () {
  const {
    Price,
    Countdown,
    OrderStepper,
    StatusBadge,
    Button,
    Avatar,
    Badge
  } = window.YalaDesignSystem_e5dc9e;
  const Icon = window.Icon;
  const {
    checkoutOrder
  } = window.YData;
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
  let ic = false;
  function ensure() {
    if (!ic) {
      ic = true;
      const s = document.createElement('style');
      s.textContent = css;
      document.head.appendChild(s);
    }
  }
  function Row({
    label,
    children,
    comm
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: `yc__srow${comm ? '' : ''}`
    }, /*#__PURE__*/React.createElement("span", {
      className: comm ? 'yc__comm' : ''
    }, label), /*#__PURE__*/React.createElement("span", null, children));
  }
  function CheckoutScreen({
    role = 'buyer',
    onBack
  }) {
    ensure();
    const o = checkoutOrder;
    const price = o.amount;
    const commission = Math.round(price * 0.08);
    const net = price - commission;
    return /*#__PURE__*/React.createElement("div", {
      className: "yc"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yc__back",
      onClick: onBack
    }, /*#__PURE__*/React.createElement(Icon.ChevronLeft, {
      size: 16
    }), " Mis \xF3rdenes"), /*#__PURE__*/React.createElement("div", {
      className: "yc__head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yc__h1"
    }, "Orden ", /*#__PURE__*/React.createElement("span", {
      className: "yc__onum"
    }, "#", o.id)), /*#__PURE__*/React.createElement(StatusBadge, {
      kind: "order",
      status: o.status,
      size: "md"
    })), /*#__PURE__*/React.createElement("div", {
      className: "yc__stepper"
    }, /*#__PURE__*/React.createElement(OrderStepper, {
      current: o.status
    })), /*#__PURE__*/React.createElement("div", {
      className: "yc__grid"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, o.status === 'PENDING' && /*#__PURE__*/React.createElement("div", {
      className: "yc__deadline"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yc__dlicon"
    }, /*#__PURE__*/React.createElement(Icon.Clock, {
      size: 22
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "yc__dltt"
    }, "Ten\xE9s 48h para completar el pago"), /*#__PURE__*/React.createElement("div", {
      className: "yc__dlsub"
    }, "Si no pag\xE1s a tiempo, la orden se ofrece al 2\xBA mejor postor.")), /*#__PURE__*/React.createElement(Countdown, {
      endsAt: o.payBy,
      variant: "order",
      format: "inline"
    })), /*#__PURE__*/React.createElement("div", {
      className: "yc__panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yc__ptt"
    }, /*#__PURE__*/React.createElement(Icon.Package, {
      size: 16
    }), " \xCDtem"), /*#__PURE__*/React.createElement("div", {
      className: "yc__item"
    }, /*#__PURE__*/React.createElement("img", {
      className: "yc__itimg",
      src: o.img,
      alt: o.title
    }), /*#__PURE__*/React.createElement("div", {
      className: "yc__itinfo"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yc__ittitle"
    }, o.title), /*#__PURE__*/React.createElement("div", {
      className: "yc__itseller"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: o.party,
      verified: true,
      size: "xs"
    }), " ", o.party), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(Price, {
      value: price,
      size: "md"
    })))), o.status === 'IN_TRANSIT' && /*#__PURE__*/React.createElement("div", {
      className: "yc__track"
    }, /*#__PURE__*/React.createElement(Icon.Truck, {
      size: 16
    }), " Tracking: ", o.tracking || 'OLVA-PE-8842193'))), /*#__PURE__*/React.createElement("div", {
      className: "yc__panel"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yc__ptt"
    }, /*#__PURE__*/React.createElement(Icon.Wallet, {
      size: 16
    }), " ", role === 'seller' ? 'Tu liquidación' : 'Resumen de pago'), /*#__PURE__*/React.createElement("div", {
      className: "yc__sum"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Precio del \xEDtem"
    }, /*#__PURE__*/React.createElement(Price, {
      value: price,
      size: "sm"
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Comisi\xF3n Yala (8%)",
      comm: true
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        color: role === 'seller' ? 'var(--error)' : 'var(--text-muted)'
      }
    }, role === 'seller' ? '−' : '', " S/. ", commission.toLocaleString('es-PE'))), role === 'seller' ? /*#__PURE__*/React.createElement("div", {
      className: "yc__srow yc__srow--total"
    }, /*#__PURE__*/React.createElement("span", null, "Recib\xEDs (92%)"), /*#__PURE__*/React.createElement(Price, {
      value: net,
      size: "md"
    })) : /*#__PURE__*/React.createElement("div", {
      className: "yc__srow yc__srow--total"
    }, /*#__PURE__*/React.createElement("span", null, "Total a pagar"), /*#__PURE__*/React.createElement(Price, {
      value: price,
      size: "md"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "yc__pay"
    }, role === 'buyer' && o.status === 'PENDING' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "yc__stripe"
    }, /*#__PURE__*/React.createElement(Icon.CreditCard, {
      size: 16
    }), " Pago seguro con Stripe"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      fullWidth: true,
      iconLeft: /*#__PURE__*/React.createElement(Icon.CreditCard, {
        size: 18
      })
    }, "Pagar S/. ", price.toLocaleString('es-PE')), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      fullWidth: true
    }, "Cancelar orden")), role === 'buyer' && o.status === 'IN_TRANSIT' && /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      fullWidth: true,
      iconLeft: /*#__PURE__*/React.createElement(Icon.Check, {
        size: 18
      })
    }, "Confirmar recepci\xF3n"), role === 'seller' && o.status === 'CONFIRMED' && /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      fullWidth: true,
      iconLeft: /*#__PURE__*/React.createElement(Icon.Truck, {
        size: 18
      })
    }, "Marcar como enviado"), /*#__PURE__*/React.createElement("div", {
      className: "yc__note"
    }, /*#__PURE__*/React.createElement(Icon.Shield, {
      size: 13
    }), " Protegido por Yala hasta la entrega")))));
  }
  window.CheckoutScreen = CheckoutScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/Checkout.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/Home.jsx
try { (() => {
/* Yala — Home / Marketplace (screen 1). Filters + live auctions row + listing grid. */
(function () {
  const {
    AuctionCard,
    ListingCard,
    Tag,
    Select,
    Input,
    Checkbox,
    Pagination,
    Button,
    Price,
    CardSkeleton,
    EmptyState
  } = window.YalaDesignSystem_e5dc9e;
  const Icon = window.Icon;
  const {
    listings,
    auctions
  } = window.YData;
  const css = `
  .yh{max-width:1280px;margin:0 auto;padding:24px;display:grid;grid-template-columns:248px 1fr;gap:28px;align-items:start;}
  .yh__side{position:sticky;top:136px;display:flex;flex-direction:column;gap:22px;}
  .yh__fgroup{display:flex;flex-direction:column;gap:11px;}
  .yh__ftitle{font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--text-subtle);}
  .yh__chips{display:flex;flex-wrap:wrap;gap:7px;}
  .yh__price{display:flex;align-items:center;gap:8px;}
  .yh__main{min-width:0;}
  .yh__live{background:linear-gradient(180deg,var(--live-50),var(--surface-card));border:1px solid var(--live-border);border-radius:var(--radius-xl);padding:18px 18px 20px;margin-bottom:26px;}
  .yh__livehd{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
  .yh__livett{display:flex;align-items:center;gap:9px;font-size:18px;font-weight:800;color:var(--text-strong);letter-spacing:-.01em;}
  .yh__livedot{width:9px;height:9px;border-radius:50%;background:var(--live);animation:yala-live-pulse 1.5s infinite;}
  .yh__seeall{font-size:13px;font-weight:600;color:var(--live-hover);cursor:pointer;display:flex;align-items:center;gap:3px;}
  .yh__liverow{display:grid;grid-auto-flow:column;grid-auto-columns:210px;gap:14px;overflow-x:auto;padding-bottom:6px;}
  .yh__bar{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
  .yh__count{font-size:14px;color:var(--text-muted);}
  .yh__count b{color:var(--text-strong);font-weight:700;}
  .yh__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
  .yh__foot{display:flex;justify-content:center;margin-top:28px;}
  @media(max-width:1080px){.yh{grid-template-columns:1fr}.yh__side{position:static;flex-direction:row;flex-wrap:wrap}.yh__grid{grid-template-columns:repeat(3,1fr)}}
  `;
  let ic = false;
  function ensure() {
    if (!ic) {
      ic = true;
      const s = document.createElement('style');
      s.textContent = css;
      document.head.appendChild(s);
    }
  }
  function Filters({
    mode,
    setMode,
    conds,
    toggleCond,
    cat
  }) {
    const CONDS = ['PSA 10 Gem Mint', 'PSA 9 Mint', 'PSA 8 Near Mint', 'PSA 7 o menor', 'Sin gradar'];
    return /*#__PURE__*/React.createElement("aside", {
      className: "yh__side"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yh__fgroup"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yh__ftitle"
    }, "Modo"), /*#__PURE__*/React.createElement("div", {
      className: "yh__chips"
    }, /*#__PURE__*/React.createElement(Tag, {
      selected: mode === 'all',
      onClick: () => setMode('all')
    }, "Todo"), /*#__PURE__*/React.createElement(Tag, {
      selected: mode === 'fixed',
      onClick: () => setMode('fixed')
    }, "Precio fijo"), /*#__PURE__*/React.createElement(Tag, {
      selected: mode === 'auction',
      onClick: () => setMode('auction')
    }, "Subasta"))), /*#__PURE__*/React.createElement("div", {
      className: "yh__fgroup"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yh__ftitle"
    }, "Condici\xF3n / PSA"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 9
      }
    }, CONDS.map(c => /*#__PURE__*/React.createElement(Checkbox, {
      key: c,
      label: c,
      checked: conds.includes(c),
      onChange: () => toggleCond(c)
    })))), /*#__PURE__*/React.createElement("div", {
      className: "yh__fgroup"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yh__ftitle"
    }, "Precio (S/.)"), /*#__PURE__*/React.createElement("div", {
      className: "yh__price"
    }, /*#__PURE__*/React.createElement(Input, {
      prefix: "S/.",
      mono: true,
      placeholder: "m\xEDn",
      size: "sm"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-subtle)'
      }
    }, "\u2013"), /*#__PURE__*/React.createElement(Input, {
      prefix: "S/.",
      mono: true,
      placeholder: "m\xE1x",
      size: "sm"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "yh__fgroup"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yh__ftitle"
    }, "Ordenar por"), /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      defaultValue: "recent",
      options: [{
        value: 'recent',
        label: 'Más recientes'
      }, {
        value: 'price_asc',
        label: 'Precio: menor a mayor'
      }, {
        value: 'price_desc',
        label: 'Precio: mayor a menor'
      }, {
        value: 'ending',
        label: 'Subastas por terminar'
      }]
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon.X, {
        size: 15
      })
    }, "Limpiar filtros"));
  }
  function HomeScreen({
    state = 'default',
    cat,
    onOpenAuction,
    onOpenListing
  }) {
    ensure();
    const [mode, setMode] = React.useState('all');
    const [conds, setConds] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const toggleCond = c => setConds(x => x.includes(c) ? x.filter(y => y !== c) : [...x, c]);
    let items = listings;
    if (cat) items = items.filter(l => l.cat === cat);
    const showEmpty = state === 'empty';
    return /*#__PURE__*/React.createElement("div", {
      className: "yh"
    }, /*#__PURE__*/React.createElement(Filters, {
      mode: mode,
      setMode: setMode,
      conds: conds,
      toggleCond: toggleCond,
      cat: cat
    }), /*#__PURE__*/React.createElement("div", {
      className: "yh__main"
    }, mode !== 'fixed' && !cat && /*#__PURE__*/React.createElement("section", {
      className: "yh__live"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yh__livehd"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yh__livett"
    }, /*#__PURE__*/React.createElement("span", {
      className: "yh__livedot"
    }), " Subastas en vivo"), /*#__PURE__*/React.createElement("span", {
      className: "yh__seeall"
    }, "Ver todas ", /*#__PURE__*/React.createElement(Icon.ChevronRight, {
      size: 15
    }))), /*#__PURE__*/React.createElement("div", {
      className: "yh__liverow"
    }, auctions.map(a => /*#__PURE__*/React.createElement(AuctionCard, {
      key: a.id,
      image: a.img,
      title: a.title,
      currentBid: a.bid,
      bidsCount: a.bids,
      endsAt: a.endsAt,
      status: a.status,
      sellerName: a.seller.name,
      sellerVerified: a.seller.verified,
      as: "a",
      onClick: e => {
        e.preventDefault();
        onOpenAuction && onOpenAuction(a.id);
      },
      href: "#"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "yh__bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yh__count"
    }, showEmpty ? 'Sin resultados' : /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, items.length), " publicaciones", cat ? ` en ${cat}` : ''))), state === 'loading' ? /*#__PURE__*/React.createElement("div", {
      className: "yh__grid"
    }, Array.from({
      length: 8
    }).map((_, i) => /*#__PURE__*/React.createElement(CardSkeleton, {
      key: i
    }))) : showEmpty ? /*#__PURE__*/React.createElement(EmptyState, {
      icon: /*#__PURE__*/React.createElement(Icon.SearchX, {
        size: 26
      }),
      title: "No encontramos nada con esos filtros",
      description: "Prob\xE1 ampliar el rango de precio o quitar algunas condiciones.",
      actions: /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: () => {
          setConds([]);
          setMode('all');
        }
      }, "Limpiar filtros")
    }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "yh__grid"
    }, items.map(l => /*#__PURE__*/React.createElement(ListingCard, {
      key: l.id,
      image: l.img,
      title: l.title,
      condition: l.cond,
      price: l.price,
      originalPrice: l.orig,
      sellerName: l.seller.name,
      sellerVerified: l.seller.verified,
      sellerRating: l.seller.rating,
      favorite: l.fav,
      onFavorite: () => {},
      as: "a",
      onClick: e => {
        e.preventDefault();
        onOpenListing && onOpenListing(l.id);
      },
      href: "#"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "yh__foot"
    }, /*#__PURE__*/React.createElement(Pagination, {
      page: page,
      total: 12,
      onChange: setPage
    })))));
  }
  window.HomeScreen = HomeScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/Misc.jsx
try { (() => {
/* Yala — Mis órdenes (screen 7) + Notificaciones (screen 9). */
(function () {
  const {
    Price,
    StatusBadge,
    Button,
    Avatar,
    Toast,
    EmptyState,
    Countdown
  } = window.YalaDesignSystem_e5dc9e;
  const Icon = window.Icon;
  const {
    orders,
    notifications
  } = window.YData;
  const css = `
  .yo{max-width:980px;margin:0 auto;padding:24px;}
  .yo__h1{font-size:26px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;margin-bottom:4px;}
  .yo__sub{font-size:14px;color:var(--text-muted);margin-bottom:22px;}
  .yo__list{display:flex;flex-direction:column;gap:12px;}
  .yo__card{display:flex;gap:16px;align-items:center;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:14px 16px;transition:box-shadow var(--dur-fast),border-color var(--dur-fast);cursor:pointer;}
  .yo__card:hover{box-shadow:var(--shadow-md);border-color:var(--border-default);}
  .yo__img{width:64px;height:64px;border-radius:var(--radius-md);object-fit:cover;flex:none;background:var(--surface-sunken);}
  .yo__mid{flex:1;min-width:0;}
  .yo__title{font-size:14px;font-weight:700;color:var(--text-strong);margin-bottom:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .yo__meta{font-size:12px;color:var(--text-muted);display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
  .yo__onum{font-family:var(--font-mono);}
  .yo__right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex:none;min-width:160px;}
  .yo__act{display:flex;gap:8px;align-items:center;}

  .yn{max-width:560px;margin:0 auto;padding:24px;}
  .yn__head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
  .yn__h1{font-size:22px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;}
  .yn__list{display:flex;flex-direction:column;gap:8px;}
  .yn__item{display:flex;gap:12px;padding:14px;border-radius:var(--radius-lg);border:1px solid var(--border-subtle);background:var(--surface-card);position:relative;}
  .yn__item--unread{background:var(--brand-subtle);border-color:var(--brand-border);}
  .yn__ic{width:36px;height:36px;border-radius:50%;flex:none;display:flex;align-items:center;justify-content:center;}
  .yn__body{flex:1;min-width:0;}
  .yn__tt{font-size:14px;font-weight:700;color:var(--text-strong);}
  .yn__msg{font-size:13px;color:var(--text-muted);line-height:1.45;margin-top:2px;}
  .yn__time{font-size:11px;color:var(--text-subtle);font-family:var(--font-mono);margin-top:6px;}
  .yn__dot{width:8px;height:8px;border-radius:50%;background:var(--brand);position:absolute;top:16px;right:14px;}
  `;
  let ic = false;
  function ensure() {
    if (!ic) {
      ic = true;
      const s = document.createElement('style');
      s.textContent = css;
      document.head.appendChild(s);
    }
  }
  const TONE_BG = {
    warning: ['var(--warning-bg)', 'var(--warning)'],
    live: ['var(--live-subtle)', 'var(--live-hover)'],
    success: ['var(--success-bg)', 'var(--success)'],
    brand: ['var(--brand-subtle)', 'var(--brand)']
  };
  function MyOrders({
    state = 'default',
    onOpenOrder
  }) {
    ensure();
    if (state === 'empty') {
      return /*#__PURE__*/React.createElement("div", {
        className: "yo"
      }, /*#__PURE__*/React.createElement("div", {
        className: "yo__h1"
      }, "Mis \xF3rdenes"), /*#__PURE__*/React.createElement(EmptyState, {
        icon: /*#__PURE__*/React.createElement(Icon.Inbox, {
          size: 26
        }),
        title: "Todav\xEDa no ten\xE9s \xF3rdenes",
        description: "Cuando compres o ganes una subasta, vas a verlas ac\xE1.",
        actions: /*#__PURE__*/React.createElement(Button, {
          onClick: () => onOpenOrder && onOpenOrder('home')
        }, "Explorar el marketplace")
      }));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "yo"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yo__h1"
    }, "Mis \xF3rdenes"), /*#__PURE__*/React.createElement("div", {
      className: "yo__sub"
    }, orders.length, " \xF3rdenes \xB7 como comprador"), /*#__PURE__*/React.createElement("div", {
      className: "yo__list"
    }, orders.map(o => /*#__PURE__*/React.createElement("div", {
      className: "yo__card",
      key: o.id,
      onClick: () => onOpenOrder && onOpenOrder(o.id)
    }, /*#__PURE__*/React.createElement("img", {
      className: "yo__img",
      src: o.img,
      alt: ""
    }), /*#__PURE__*/React.createElement("div", {
      className: "yo__mid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yo__title"
    }, o.title), /*#__PURE__*/React.createElement("div", {
      className: "yo__meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "yo__onum"
    }, "#", o.id), " \xB7 ", o.date, " \xB7 ", /*#__PURE__*/React.createElement(Avatar, {
      name: o.party,
      verified: true,
      size: 18
    }), " ", o.party)), /*#__PURE__*/React.createElement("div", {
      className: "yo__right"
    }, /*#__PURE__*/React.createElement(Price, {
      value: o.amount,
      size: "md"
    }), /*#__PURE__*/React.createElement("div", {
      className: "yo__act"
    }, o.status === 'PENDING' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Countdown, {
      endsAt: o.payBy,
      variant: "order",
      format: "inline"
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm"
    }, "Pagar")), o.status === 'IN_TRANSIT' && /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon.Check, {
        size: 14
      })
    }, "Confirmar"), o.status === 'COMPLETED' && /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon.Star, {
        size: 14
      })
    }, "Rese\xF1ar"), (o.status === 'CONFIRMED' || o.status === 'CANCELLED') && /*#__PURE__*/React.createElement(StatusBadge, {
      kind: "order",
      status: o.status
    })))))));
  }
  function Notifications() {
    ensure();
    const [items, setItems] = React.useState(notifications);
    const unread = items.filter(n => !n.read).length;
    const markAll = () => setItems(x => x.map(n => ({
      ...n,
      read: true
    })));
    return /*#__PURE__*/React.createElement("div", {
      className: "yn"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yn__head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yn__h1"
    }, "Notificaciones ", unread > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--live)',
        fontSize: 16
      }
    }, "\xB7 ", unread)), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: markAll,
      disabled: unread === 0
    }, "Marcar todas como le\xEDdas")), /*#__PURE__*/React.createElement("div", {
      className: "yn__list"
    }, items.map(n => {
      const [bg, col] = TONE_BG[n.tone] || TONE_BG.brand;
      const I = Icon[n.icon] || Icon.Bell;
      return /*#__PURE__*/React.createElement("div", {
        key: n.id,
        className: `yn__item${!n.read ? ' yn__item--unread' : ''}`,
        onClick: () => setItems(x => x.map(m => m.id === n.id ? {
          ...m,
          read: true
        } : m))
      }, /*#__PURE__*/React.createElement("div", {
        className: "yn__ic",
        style: {
          background: bg,
          color: col
        }
      }, /*#__PURE__*/React.createElement(I, {
        size: 18
      })), /*#__PURE__*/React.createElement("div", {
        className: "yn__body"
      }, /*#__PURE__*/React.createElement("div", {
        className: "yn__tt"
      }, n.title), /*#__PURE__*/React.createElement("div", {
        className: "yn__msg"
      }, n.msg), /*#__PURE__*/React.createElement("div", {
        className: "yn__time"
      }, n.time)), !n.read && /*#__PURE__*/React.createElement("span", {
        className: "yn__dot"
      }));
    })));
  }
  window.MyOrders = MyOrders;
  window.Notifications = Notifications;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/Misc.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/SellerDashboard.jsx
try { (() => {
/* Yala — Dashboard del vendedor (screen 11). Metrics + tabs. */
(function () {
  const {
    Price,
    Tabs,
    Tag,
    Button,
    ListingCard,
    AuctionCard,
    StatusBadge,
    Avatar,
    Badge
  } = window.YalaDesignSystem_e5dc9e;
  const Icon = window.Icon;
  const {
    listings,
    auctions,
    orders,
    sellerMetrics
  } = window.YData;
  const css = `
  .yd{max-width:1280px;margin:0 auto;padding:24px;}
  .yd__head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;margin-bottom:20px;}
  .yd__h1{font-size:26px;font-weight:800;color:var(--text-strong);letter-spacing:-.02em;}
  .yd__sub{font-size:14px;color:var(--text-muted);margin-top:3px;}
  .yd__metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:26px;}
  .yd__metric{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:18px;}
  .yd__micon{width:38px;height:38px;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;margin-bottom:12px;}
  .yd__mlabel{font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:5px;}
  .yd__mval{font-size:24px;font-weight:800;color:var(--text-strong);font-family:var(--font-mono);letter-spacing:-.01em;}
  .yd__mfoot{font-size:12px;color:var(--text-subtle);margin-top:6px;}
  .yd__bar{height:6px;background:var(--surface-sunken);border-radius:999px;overflow:hidden;margin-top:10px;}
  .yd__barfill{height:100%;background:var(--brand);border-radius:999px;}
  .yd__tabs{margin-bottom:20px;}
  .yd__grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
  .yd__addcard{border:1.5px dashed var(--border-default);border-radius:var(--radius-card);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--text-muted);cursor:pointer;min-height:300px;transition:all var(--dur-fast);}
  .yd__addcard:hover{border-color:var(--brand);color:var(--brand);background:var(--brand-subtle);}
  .yd__table{background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);overflow:hidden;}
  .yd__tr{display:grid;grid-template-columns:1fr 130px 110px 150px;align-items:center;gap:12px;padding:13px 18px;border-bottom:1px solid var(--border-subtle);}
  .yd__tr:last-child{border-bottom:none;}
  .yd__trh{background:var(--surface-sunken);font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--text-subtle);}
  .yd__titem{display:flex;align-items:center;gap:12px;min-width:0;}
  .yd__timg{width:46px;height:46px;border-radius:var(--radius-sm);object-fit:cover;flex:none;background:var(--surface-sunken);}
  .yd__tname{font-size:13px;font-weight:600;color:var(--text-strong);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .yd__tparty{font-size:12px;color:var(--text-muted);}
  @media(max-width:1080px){.yd__metrics{grid-template-columns:repeat(2,1fr)}.yd__grid{grid-template-columns:repeat(3,1fr)}}
  `;
  let ic = false;
  function ensure() {
    if (!ic) {
      ic = true;
      const s = document.createElement('style');
      s.textContent = css;
      document.head.appendChild(s);
    }
  }
  function Metric({
    icon,
    bg,
    color,
    label,
    value,
    foot,
    bar
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "yd__metric"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yd__micon",
      style: {
        background: bg,
        color
      }
    }, icon), /*#__PURE__*/React.createElement("div", {
      className: "yd__mlabel"
    }, label), /*#__PURE__*/React.createElement("div", {
      className: "yd__mval"
    }, value), bar != null && /*#__PURE__*/React.createElement("div", {
      className: "yd__bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yd__barfill",
      style: {
        width: `${bar}%`
      }
    })), foot && /*#__PURE__*/React.createElement("div", {
      className: "yd__mfoot"
    }, foot));
  }
  function SellerDashboard({
    onNew,
    onOpenAuction,
    onOpenOrder
  }) {
    ensure();
    const [tab, setTab] = React.useState('listings');
    const m = sellerMetrics;
    const myListings = listings.slice(0, 7);
    const sellerOrders = orders.slice(0, 4);
    return /*#__PURE__*/React.createElement("div", {
      className: "yd"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yd__head"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "yd__h1"
    }, "Panel del vendedor"), /*#__PURE__*/React.createElement("div", {
      className: "yd__sub"
    }, "Hola Marco \u2014 esto es lo que pasa con tu tienda hoy.")), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon.Plus, {
        size: 17
      }),
      onClick: onNew
    }, "Nueva publicaci\xF3n")), /*#__PURE__*/React.createElement("div", {
      className: "yd__metrics"
    }, /*#__PURE__*/React.createElement(Metric, {
      icon: /*#__PURE__*/React.createElement(Icon.TrendingUp, {
        size: 20
      }),
      bg: "var(--brand-subtle)",
      color: "var(--brand)",
      label: "Ventas del mes",
      value: `S/. ${m.salesTotal.toLocaleString('es-PE')}`,
      foot: "+18% vs. mayo"
    }), /*#__PURE__*/React.createElement(Metric, {
      icon: /*#__PURE__*/React.createElement(Icon.Wallet, {
        size: 20
      }),
      bg: "var(--success-bg)",
      color: "var(--success)",
      label: "Neto (92%)",
      value: `S/. ${m.net.toLocaleString('es-PE')}`,
      foot: `Comisión Yala: S/. ${m.commission.toLocaleString('es-PE')}`
    }), /*#__PURE__*/React.createElement(Metric, {
      icon: /*#__PURE__*/React.createElement(Icon.LayoutGrid, {
        size: 20
      }),
      bg: "var(--info-bg)",
      color: "var(--info)",
      label: "Publicaciones activas",
      value: `${m.activeListings} / ${m.maxListings}`,
      bar: m.activeListings / m.maxListings * 100,
      foot: `${m.maxListings - m.activeListings} cupos libres`
    }), /*#__PURE__*/React.createElement(Metric, {
      icon: /*#__PURE__*/React.createElement(Icon.Gavel, {
        size: 20
      }),
      bg: "var(--live-subtle)",
      color: "var(--live-hover)",
      label: "Subastas en curso",
      value: m.activeAuctions,
      foot: "2 cierran hoy"
    })), /*#__PURE__*/React.createElement("div", {
      className: "yd__tabs"
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      tabs: [{
        value: 'listings',
        label: 'Mis publicaciones',
        count: m.activeListings
      }, {
        value: 'auctions',
        label: 'Mis subastas',
        count: m.activeAuctions
      }, {
        value: 'orders',
        label: 'Órdenes como vendedor',
        count: 8
      }]
    })), tab === 'listings' && /*#__PURE__*/React.createElement("div", {
      className: "yd__grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yd__addcard",
      onClick: onNew
    }, /*#__PURE__*/React.createElement(Icon.Plus, {
      size: 28
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 14
      }
    }, "Nueva publicaci\xF3n")), myListings.map((l, i) => /*#__PURE__*/React.createElement(ListingCard, {
      key: l.id,
      image: l.img,
      title: l.title,
      condition: l.cond,
      price: l.price,
      status: i === 0 ? 'ACTIVE' : i === 4 ? 'SOLD' : i === 6 ? 'DRAFT' : 'ACTIVE'
    }))), tab === 'auctions' && /*#__PURE__*/React.createElement("div", {
      className: "yd__grid"
    }, auctions.slice(0, 3).map(a => /*#__PURE__*/React.createElement(AuctionCard, {
      key: a.id,
      image: a.img,
      title: a.title,
      currentBid: a.bid,
      bidsCount: a.bids,
      endsAt: a.endsAt,
      status: a.status,
      sellerName: a.seller.name,
      sellerVerified: a.seller.verified,
      as: "a",
      onClick: e => {
        e.preventDefault();
        onOpenAuction && onOpenAuction(a.id);
      },
      href: "#"
    }))), tab === 'orders' && /*#__PURE__*/React.createElement("div", {
      className: "yd__table"
    }, /*#__PURE__*/React.createElement("div", {
      className: "yd__tr yd__trh"
    }, /*#__PURE__*/React.createElement("span", null, "\xCDtem"), /*#__PURE__*/React.createElement("span", null, "Comprador"), /*#__PURE__*/React.createElement("span", null, "Monto"), /*#__PURE__*/React.createElement("span", null, "Acci\xF3n")), sellerOrders.map(o => /*#__PURE__*/React.createElement("div", {
      className: "yd__tr",
      key: o.id
    }, /*#__PURE__*/React.createElement("div", {
      className: "yd__titem"
    }, /*#__PURE__*/React.createElement("img", {
      className: "yd__timg",
      src: o.img,
      alt: ""
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "yd__tname"
    }, o.title), /*#__PURE__*/React.createElement("div", {
      className: "yd__tparty"
    }, "#", o.id, " \xB7 ", o.date))), /*#__PURE__*/React.createElement("div", {
      className: "yd__tparty"
    }, o.party), /*#__PURE__*/React.createElement(Price, {
      value: o.amount,
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", null, o.status === 'CONFIRMED' ? /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon.Truck, {
        size: 15
      }),
      onClick: () => onOpenOrder && onOpenOrder(o.id)
    }, "Enviar") : o.status === 'PENDING' ? /*#__PURE__*/React.createElement(StatusBadge, {
      kind: "order",
      status: "PENDING"
    }) : /*#__PURE__*/React.createElement(StatusBadge, {
      kind: "order",
      status: o.status
    }))))));
  }
  window.SellerDashboard = SellerDashboard;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/SellerDashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/data.js
try { (() => {
/* Yala UI-kit mock data. Realistic geek collectibles, prices in S/. (soles). */
(function () {
  const P = f => 'assets/products/' + f + '.png';
  const now = Date.now();
  const inMin = m => new Date(now + m * 60000);
  const sellers = {
    marco: {
      id: 'marco',
      name: 'Marco Salazar',
      verified: true,
      rating: 4.8,
      pct: 98,
      reviews: 213,
      since: '2021',
      sales: 412
    },
    cardvault: {
      id: 'cardvault',
      name: 'CardVault PE',
      verified: true,
      rating: 4.9,
      pct: 99,
      reviews: 528,
      since: '2019',
      sales: 1340,
      store: true
    },
    lucia: {
      id: 'lucia',
      name: 'Lucía Pérez',
      verified: true,
      rating: 4.6,
      pct: 95,
      reviews: 87,
      since: '2022',
      sales: 96
    },
    geek: {
      id: 'geek',
      name: 'GeekLima',
      verified: false,
      rating: 4.2,
      pct: 89,
      reviews: 41,
      since: '2023',
      sales: 38,
      store: true
    },
    comic: {
      id: 'comic',
      name: 'ComicVault',
      verified: true,
      rating: 4.9,
      pct: 99,
      reviews: 302,
      since: '2020',
      sales: 760,
      store: true
    },
    ana: {
      id: 'ana',
      name: 'Ana Quispe',
      verified: false,
      rating: 4.1,
      pct: 86,
      reviews: 19,
      since: '2024',
      sales: 14
    }
  };
  const listings = [{
    id: 'l1',
    img: P('charizard'),
    title: 'Charizard Base Set Holo — 1ª edición',
    cond: 'PSA 10',
    price: 14500,
    cat: 'Cartas Pokémon',
    seller: sellers.marco,
    fav: true
  }, {
    id: 'l2',
    img: P('blastoise'),
    title: 'Blastoise Base Set Holo',
    cond: 'PSA 8',
    price: 690,
    orig: 850,
    cat: 'Cartas Pokémon',
    seller: sellers.cardvault
  }, {
    id: 'l3',
    img: P('mewtwo'),
    title: 'Mewtwo Base Set Holo unlimited',
    cond: 'PSA 8',
    price: 420,
    cat: 'Cartas Pokémon',
    seller: sellers.ana
  }, {
    id: 'l4',
    img: P('comic-asm'),
    title: 'Amazing Spider-Man #300 — 1ª Venom',
    cond: 'CGC 9.6',
    price: 2100,
    cat: 'Comics',
    seller: sellers.comic
  }, {
    id: 'l5',
    img: P('funko-spider'),
    title: 'Funko Spider-Man Metallic — sellado',
    cond: 'Sin gradar',
    price: 160,
    cat: 'Funko Pop',
    seller: sellers.geek
  }, {
    id: 'l6',
    img: P('comic-batman'),
    title: 'Batman #423 McFarlane — portada icónica',
    cond: 'CGC 9.4',
    price: 980,
    cat: 'Comics',
    seller: sellers.comic
  }, {
    id: 'l7',
    img: P('mewtwo'),
    title: 'Mewtwo GX Full Art',
    cond: 'PSA 9',
    price: 310,
    cat: 'Cartas Pokémon',
    seller: sellers.lucia
  }, {
    id: 'l8',
    img: P('funko-vader'),
    title: 'Funko Darth Vader Glow — exclusivo',
    cond: 'Sin gradar',
    price: 220,
    cat: 'Funko Pop',
    seller: sellers.geek
  }, {
    id: 'l9',
    img: P('blastoise'),
    title: 'Blastoise GX Premium',
    cond: 'PSA 9',
    price: 540,
    cat: 'Cartas Pokémon',
    seller: sellers.cardvault
  }, {
    id: 'l10',
    img: P('comic-asm'),
    title: 'Spider-Man #1 Edición especial',
    cond: 'CGC 9.8',
    price: 1450,
    cat: 'Comics',
    seller: sellers.comic
  }, {
    id: 'l11',
    img: P('charizard'),
    title: 'Charizard VMAX Rainbow',
    cond: 'PSA 10',
    price: 880,
    cat: 'Cartas Pokémon',
    seller: sellers.marco
  }, {
    id: 'l12',
    img: P('funko-vader'),
    title: 'Funko Boba Fett — caja sellada',
    cond: 'Sin gradar',
    price: 140,
    cat: 'Funko Pop',
    seller: sellers.geek
  }];
  const auctions = [{
    id: 'a1',
    img: P('pikachu'),
    title: 'Pikachu Illustrator — Promo (PSA 9)',
    bid: 32000,
    bids: 47,
    endsAt: inMin(132),
    status: 'ACTIVE',
    seller: sellers.cardvault,
    start: 25000
  }, {
    id: 'a2',
    img: P('umbreon'),
    title: 'Umbreon VMAX Alt Art — PSA 10',
    bid: 920,
    bids: 12,
    endsAt: inMin(7),
    status: 'ACTIVE',
    seller: sellers.lucia,
    start: 600
  }, {
    id: 'a3',
    img: P('lugia'),
    title: 'Lugia Neo Genesis 1ª Ed — PSA 9',
    bid: 2750,
    bids: 31,
    endsAt: inMin(95),
    status: 'ACTIVE',
    seller: sellers.marco,
    start: 1800
  }, {
    id: 'a4',
    img: P('charizard'),
    title: 'Charizard Shadowless Holo — PSA 9',
    bid: 8400,
    bids: 58,
    endsAt: inMin(altMin(220)),
    status: 'ACTIVE',
    seller: sellers.cardvault,
    start: 6000
  }, {
    id: 'a5',
    img: P('mewtwo'),
    title: 'Mewtwo Base Set Shadowless',
    bid: 540,
    bids: 9,
    endsAt: inMin(48),
    status: 'ACTIVE',
    seller: sellers.ana,
    start: 400
  }];
  function altMin(x) {
    return x;
  }

  // live auction (screen 3) detail with bid history
  const liveAuction = {
    ...auctions[0],
    gallery: [P('pikachu'), P('charizard'), P('umbreon'), P('lugia'), P('mewtwo')],
    desc: 'Pikachu Illustrator, una de las cartas más codiciadas del TCG. Ejemplar gradado PSA 9, conservado en estuche desde su adquisición. Solo 39 copias gradadas en el mundo.',
    cond: 'PSA 9 Mint',
    cat: 'Cartas Pokémon',
    minIncrement: 320,
    bidHistory: [{
      user: 'kanto_king',
      amount: 32000,
      time: 'hace 2 min',
      leader: true
    }, {
      user: 'pdiglett',
      amount: 31700,
      time: 'hace 5 min'
    }, {
      user: 'Marco S.',
      amount: 31200,
      time: 'hace 9 min'
    }, {
      user: 'kanto_king',
      amount: 30500,
      time: 'hace 14 min'
    }, {
      user: 'collector_lima',
      amount: 29800,
      time: 'hace 21 min'
    }, {
      user: 'pdiglett',
      amount: 28000,
      time: 'hace 33 min'
    }, {
      user: 'ash_k',
      amount: 26500,
      time: 'hace 48 min'
    }]
  };
  const orders = [{
    id: '1042',
    item: listings[0],
    img: listings[0].img,
    title: listings[0].title,
    amount: 14500,
    status: 'PENDING',
    party: 'CardVault PE',
    role: 'buyer',
    payBy: inMin(180),
    date: '14 jun 2026'
  }, {
    id: '1039',
    item: listings[3],
    img: listings[3].img,
    title: listings[3].title,
    amount: 2100,
    status: 'IN_TRANSIT',
    party: 'ComicVault',
    role: 'buyer',
    tracking: 'OLVA-PE-8842193',
    date: '10 jun 2026'
  }, {
    id: '1031',
    img: P('umbreon'),
    title: 'Umbreon VMAX Alt Art — PSA 10',
    amount: 920,
    status: 'COMPLETED',
    party: 'Lucía Pérez',
    role: 'buyer',
    date: '2 jun 2026'
  }, {
    id: '1028',
    img: P('blastoise'),
    title: 'Blastoise Base Set Holo',
    amount: 690,
    status: 'CONFIRMED',
    party: 'TCG Store',
    role: 'buyer',
    date: '28 may 2026'
  }, {
    id: '1018',
    img: P('mewtwo'),
    title: 'Mewtwo Base Set Holo',
    amount: 420,
    status: 'CANCELLED',
    party: 'Ana Quispe',
    role: 'buyer',
    date: '20 may 2026'
  }];
  const checkoutOrder = orders[0];
  const notifications = [{
    id: 'n1',
    type: 'BID_OUTBID',
    tone: 'warning',
    icon: 'Gavel',
    title: '¡Te superaron!',
    msg: 'Alguien pujó S/. 3,350 por Umbreon VMAX Alt Art.',
    time: 'hace 1 min',
    read: false
  }, {
    id: 'n2',
    type: 'AUCTION_WON',
    tone: 'live',
    icon: 'Gavel',
    title: '¡Ganaste la subasta!',
    msg: 'Charizard Shadowless es tuyo por S/. 8,400. Pagá en 48h.',
    time: 'hace 22 min',
    read: false
  }, {
    id: 'n3',
    type: 'PAYMENT_RECEIVED',
    tone: 'success',
    icon: 'Wallet',
    title: 'Pago confirmado',
    msg: 'Recibimos tu pago de la orden #1039.',
    time: 'hace 3 h',
    read: false
  }, {
    id: 'n4',
    type: 'NEW_BID',
    tone: 'brand',
    icon: 'Gavel',
    title: 'Nueva puja en tu subasta',
    msg: 'Lugia Neo recibió una puja de S/. 2,750.',
    time: 'hace 5 h',
    read: true
  }, {
    id: 'n5',
    type: 'SALE_CONFIRMED',
    tone: 'success',
    icon: 'Check',
    title: 'Venta confirmada',
    msg: 'Blastoise Base Set fue confirmada por el comprador.',
    time: 'ayer',
    read: true
  }, {
    id: 'n6',
    type: 'SELLER_VERIFIED',
    tone: 'brand',
    icon: 'Shield',
    title: 'Identidad verificada',
    msg: 'Tu cuenta ahora muestra el ícono de identidad verificada.',
    time: 'hace 2 días',
    read: true
  }, {
    id: 'n7',
    type: 'AUCTION_NO_BIDS',
    tone: 'warning',
    icon: 'AlertTriangle',
    title: 'Subasta sin pujas',
    msg: 'Mewtwo Shadowless cerró sin ofertas. Podés relistarla.',
    time: 'hace 3 días',
    read: true
  }];
  const categories = [{
    name: 'Cartas Pokémon',
    count: 1284
  }, {
    name: 'Funko Pop',
    count: 642
  }, {
    name: 'Comics',
    count: 418
  }, {
    name: 'Cartas Magic',
    count: 233
  }, {
    name: 'Figuras',
    count: 187
  }, {
    name: 'Accesorios',
    count: 96
  }];
  const sellerMetrics = {
    salesTotal: 28450,
    commission: 2276,
    net: 26174,
    activeListings: 14,
    maxListings: 20,
    activeAuctions: 3
  };
  window.YData = {
    P,
    sellers,
    listings,
    auctions,
    liveAuction,
    orders,
    checkoutOrder,
    notifications,
    categories,
    sellerMetrics
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/data.js", error: String((e && e.message) || e) }); }

// ui_kits/marketplace/icons.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Yala UI-kit icon set — thin, consistent line icons (Lucide-style, 2px stroke).
   Attached to window.Icon so all kit screens share them. */
(function () {
  const S = ({
    d,
    fill,
    size = 20,
    sw = 2,
    children,
    ...p
  }) => /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill || 'none',
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, p), children || (Array.isArray(d) ? d.map((dd, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: dd
  })) : /*#__PURE__*/React.createElement("path", {
    d: d
  })));
  const Icon = {
    Search: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 21-4.3-4.3"
    })),
    Bell: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("path", {
      d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
    })),
    Heart: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("path", {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
    })),
    User: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M20 21a8 8 0 0 0-16 0"
    })),
    Gavel: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("path", {
      d: "m14.5 12.5-8 8a2.12 2.12 0 1 1-3-3l8-8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m16 16 6-6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m8 8 6-6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m9 7 8 8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 11-8-8"
    })),
    ChevronDown: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("polyline", {
      points: "6 9 12 15 18 9"
    })),
    ChevronRight: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("polyline", {
      points: "9 18 15 12 9 6"
    })),
    ChevronLeft: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("polyline", {
      points: "15 18 9 12 15 6"
    })),
    Check: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("polyline", {
      points: "20 6 9 17 4 12"
    })),
    X: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("line", {
      x1: "18",
      y1: "6",
      x2: "6",
      y2: "18"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "6",
      x2: "18",
      y2: "18"
    })),
    Shield: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("path", {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m9 12 2 2 4-4"
    })),
    Truck: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("path", {
      d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 9h4l4 4v4a1 1 0 0 1-1 1h-1"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "7.5",
      cy: "18.5",
      r: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17.5",
      cy: "18.5",
      r: "2"
    })),
    Package: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("path", {
      d: "M16.5 9.4 7.5 4.21"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m3.3 7 8.7 5 8.7-5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 22V12"
    })),
    Filter: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("polygon", {
      points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
    })),
    Plus: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "5",
      x2: "12",
      y2: "19"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    })),
    CreditCard: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("rect", {
      x: "2",
      y: "5",
      width: "20",
      height: "14",
      rx: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "2",
      y1: "10",
      x2: "22",
      y2: "10"
    })),
    Clock: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 7 12 12 15 14"
    })),
    MapPin: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("path", {
      d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "3"
    })),
    Tag: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("path", {
      d: "M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.42l8.83 8.83a2 2 0 0 0 2.82 0l7.17-7.17a2 2 0 0 0 0-2.82z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "7.5",
      cy: "7.5",
      r: "1.2",
      fill: "currentColor"
    })),
    Menu: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "6",
      x2: "21",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "12",
      x2: "21",
      y2: "12"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "18",
      x2: "21",
      y2: "18"
    })),
    LayoutGrid: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "14",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "14",
      width: "7",
      height: "7",
      rx: "1"
    })),
    Image: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "9",
      r: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"
    })),
    Star: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("polygon", {
      points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
    })),
    TrendingUp: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("polyline", {
      points: "22 7 13.5 15.5 8.5 10.5 2 17"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "16 7 22 7 22 13"
    })),
    Wallet: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("path", {
      d: "M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 12a2 2 0 0 0-2-2h-3a2 2 0 0 0 0 4h3a2 2 0 0 0 2-2z"
    })),
    AlertTriangle: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("path", {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "9",
      x2: "12",
      y2: "13"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "17",
      x2: "12.01",
      y2: "17"
    })),
    Settings: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
    })),
    SearchX: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 21-4.3-4.3M9 9l4 4M13 9l-4 4"
    })),
    Inbox: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("polyline", {
      points: "22 12 16 12 14 15 10 15 8 12 2 12"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
    })),
    Logout: p => /*#__PURE__*/React.createElement(S, p, /*#__PURE__*/React.createElement("path", {
      d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "16 17 21 12 16 7"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "12",
      x2: "9",
      y2: "12"
    }))
  };
  window.Icon = Icon;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketplace/icons.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AuctionCard = __ds_scope.AuctionCard;

__ds_ns.ListingCard = __ds_scope.ListingCard;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Countdown = __ds_scope.Countdown;

__ds_ns.Price = __ds_scope.Price;

__ds_ns.ReputationStars = __ds_scope.ReputationStars;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.DniGate = __ds_scope.DniGate;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.ORDER_STEPS = __ds_scope.ORDER_STEPS;

__ds_ns.OrderStepper = __ds_scope.OrderStepper;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.CardSkeleton = __ds_scope.CardSkeleton;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.ORDER_STATUS = __ds_scope.ORDER_STATUS;

__ds_ns.AUCTION_STATUS = __ds_scope.AUCTION_STATUS;

__ds_ns.LISTING_STATUS = __ds_scope.LISTING_STATUS;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Tag = __ds_scope.Tag;

})();
