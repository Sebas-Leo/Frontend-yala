// Small presentation helpers shared across screens.

// Relative time in Spanish, e.g. "hace 5 min", "hace 2 h", "ayer".
export function timeAgo(input) {
  if (!input) return '';
  const then = new Date(input).getTime();
  if (Number.isNaN(then)) return '';
  const diff = Date.now() - then;
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'recién';
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  if (d === 1) return 'ayer';
  if (d < 30) return `hace ${d} días`;
  return formatDate(input);
}

// Short absolute date, e.g. "14 jun 2026".
export function formatDate(input) {
  if (!input) return '';
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Soles formatting, e.g. "S/. 1,400.00".
export function money(value, currency = 'S/.') {
  const n = Number(value || 0);
  return `${currency} ${n.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ISO-8601 string `days` from now (for auction endsAt). Local time, no timezone suffix
// so the backend parses it as a LocalDateTime.
export function isoFromDays(days) {
  const d = new Date(Date.now() + Number(days) * 86400000);
  return toLocalIso(d);
}

export function toLocalIso(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  );
}
