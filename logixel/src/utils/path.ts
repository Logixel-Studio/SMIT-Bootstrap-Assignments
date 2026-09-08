export interface Point {
  x: number;
  y: number;
}

export type Orientation = 'horizontal' | 'vertical';

/**
 * Smooth cubic-bezier connector between two ports. Control-point offset
 * scales with distance so short hops stay tight and long hops stay calm.
 */
export function connectorPath(a: Point, b: Point, orientation: Orientation): string {
  if (orientation === 'horizontal') {
    const d = Math.max(36, Math.abs(b.x - a.x) * 0.55);
    return `M ${a.x} ${a.y} C ${a.x + d} ${a.y}, ${b.x - d} ${b.y}, ${b.x} ${b.y}`;
  }
  const d = Math.max(36, Math.abs(b.y - a.y) * 0.55);
  return `M ${a.x} ${a.y} C ${a.x} ${a.y + d}, ${b.x} ${b.y - d}, ${b.x} ${b.y}`;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(v: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, v));
}

/** Smoothstep for gentler in/out easing on interpolated values. */
export function smooth(t: number): number {
  const c = clamp(t);
  return c * c * (3 - 2 * c);
}
