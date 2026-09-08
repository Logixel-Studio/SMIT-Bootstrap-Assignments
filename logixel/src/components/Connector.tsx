import { connectorPath, type Point, type Orientation } from '../utils/path';
import './wire.css';

interface ConnectorProps {
  id: string;
  from: Point;
  to: Point;
  orientation: Orientation;
  /** 0..1 — fades the wire in as its stage becomes current */
  opacity: number;
  flowing: boolean;
  label?: string;
  /** stagger the packet animation so parallel wires don't pulse in lockstep */
  delay?: number;
}

export function Connector({ id, from, to, orientation, opacity, flowing, label, delay = 0 }: ConnectorProps) {
  if (opacity <= 0.01) return null;
  const d = connectorPath(from, to, orientation);
  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };

  return (
    <g className={`wire${flowing ? ' wire-flowing' : ''}`} style={{ opacity }}>
      <path d={d} className="wire-base" fill="none" />
      {flowing && (
        <path d={d} className="wire-packet" fill="none" pathLength={1} style={{ animationDelay: `${delay}s` }} />
      )}
      {label && flowing && (
        <text x={mid.x} y={mid.y - 8} className="wire-label" textAnchor="middle">
          {label}
        </text>
      )}
      <title>{id}</title>
    </g>
  );
}
