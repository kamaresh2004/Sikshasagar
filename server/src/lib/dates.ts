/** Date helpers — the app renders dates as "07 Aug 2026" strings, so every
 *  API response must serialize DateTime values into that exact format. */

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** DB Date/ISO -> "07 Aug 2026" */
export function fmtDate(d: Date | string | number | null | undefined): string {
  if (!d) return '';
  const date = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return String(d);
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** DB Date/ISO -> "07 Aug 2026, 9:05 AM" (used for notifications/decidedAt) */
export function fmtDateTime(d: Date | string | number | null | undefined): string {
  if (!d) return '';
  const date = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return String(d);
  let h = date.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${fmtDate(date)}, ${h}:${m} ${ampm}`;
}

/** Parse "07 Aug 2026" -> midnight Date local time. */
export function parseDisplayDate(s: string): Date | null {
  const m = s.trim().match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (!m) return null;
  const month = MONTHS.findIndex((x) => x.toLowerCase() === m[2].toLowerCase());
  if (month === -1) return null;
  const d = new Date(Number(m[3]), month, Number(m[1]));
  return Number.isNaN(d.getTime()) ? null : d;
}