/** Compact random id for app-facing entities (matches the mock's `s-1`, `a-1` style). */
export function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}