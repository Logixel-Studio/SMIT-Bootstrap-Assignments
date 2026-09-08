import { useMemo } from 'react';
import { NODES, type NodeId } from '../data/nodes';
import { NODE_TIMELINE, CONNECTIONS, CRM_FIELDS, nodeStatus } from '../data/timeline';
import { resolveKeyframes } from '../utils/interpolate';
import { clamp, smooth, type Point } from '../utils/path';
import { Node } from './Node';
import { Connector } from './Connector';
import { useElementSize } from '../hooks/useElementSize';
import './canvas.css';

interface WorkflowCanvasProps {
  /** continuous 0..STAGE_COUNT-1 */
  stage: number;
}

interface ResolvedNode {
  id: NodeId;
  cx: number;
  cy: number;
  boxW: number;
  boxH: number;
  opacity: number;
}

const PORT_SPREAD = 0.3;

function boxSize(id: NodeId, expandT: number) {
  const def = NODES[id];
  const w = def.expandedWidth ? def.width + (def.expandedWidth - def.width) * expandT : def.width;
  const h = def.expandedHeight ? def.height + (def.expandedHeight - def.height) * expandT : def.height;
  return { w, h };
}

function buildPorts(resolved: Map<NodeId, ResolvedNode>) {
  const outGroups = new Map<NodeId, string[]>();
  const inGroups = new Map<NodeId, string[]>();

  for (const c of CONNECTIONS) {
    if (!outGroups.has(c.from)) outGroups.set(c.from, []);
    outGroups.get(c.from)!.push(c.id);
    if (!inGroups.has(c.to)) inGroups.set(c.to, []);
    inGroups.get(c.to)!.push(c.id);
  }

  const sortBySide = (ids: string[], byTarget: 'to' | 'from') =>
    [...ids].sort((a, b) => {
      const ca = CONNECTIONS.find((c) => c.id === a)!;
      const cb = CONNECTIONS.find((c) => c.id === b)!;
      const na = resolved.get(ca[byTarget]);
      const nb = resolved.get(cb[byTarget]);
      return (na?.cy ?? 0) - (nb?.cy ?? 0);
    });

  const ports = new Map<string, Point>();

  outGroups.forEach((ids, nodeId) => {
    const sorted = sortBySide(ids, 'to');
    const n = resolved.get(nodeId);
    if (!n) return;
    sorted.forEach((connId, i) => {
      const frac = sorted.length > 1 ? -PORT_SPREAD + (2 * PORT_SPREAD * i) / (sorted.length - 1) : 0;
      ports.set(`${connId}:out`, { x: n.cx + n.boxW / 2, y: n.cy + frac * n.boxH });
    });
  });

  inGroups.forEach((ids, nodeId) => {
    const sorted = sortBySide(ids, 'from');
    const n = resolved.get(nodeId);
    if (!n) return;
    sorted.forEach((connId, i) => {
      const frac = sorted.length > 1 ? -PORT_SPREAD + (2 * PORT_SPREAD * i) / (sorted.length - 1) : 0;
      ports.set(`${connId}:in`, { x: n.cx - n.boxW / 2, y: n.cy + frac * n.boxH });
    });
  });

  return ports;
}

const BRANCH_LABELS = { qualified: 'Qualified', notQualified: 'Not qualified' };

export function WorkflowCanvas({ stage }: WorkflowCanvasProps) {
  const { ref, size } = useElementSize<HTMLDivElement>();
  const w = size.width || 1200;
  const h = size.height || 620;
  const nodeScale = clamp(w / 1400, 0.62, 1.05);
  const expandT = smooth(clamp(stage - 4, 0, 1));
  const collapse = smooth(clamp(stage - 7, 0, 1));

  const resolved = useMemo(() => {
    const map = new Map<NodeId, ResolvedNode>();
    (Object.keys(NODE_TIMELINE) as NodeId[]).forEach((id) => {
      const r = resolveKeyframes(NODE_TIMELINE[id], stage);
      const { w: boxW, h: boxH } = boxSize(id, id === 'crm' ? expandT : 0);
      map.set(id, {
        id,
        cx: (r.x / 100) * w,
        cy: (r.y / 100) * h,
        boxW,
        boxH,
        opacity: r.opacity,
      });
    });
    return map;
  }, [stage, w, h, expandT]);

  const ports = useMemo(() => buildPorts(resolved), [resolved]);

  return (
    <div
      className="wf-canvas"
      ref={ref}
      style={{
        transform: `translate(${collapse * -7}%, ${collapse * 5}%) scale(${1 - collapse * 0.4})`,
        opacity: 1 - collapse * 0.92,
      }}
    >
      <svg className="wf-wires" width={w} height={h} aria-hidden="true">
        {CONNECTIONS.map((c, i) => {
          const from = ports.get(`${c.id}:out`);
          const to = ports.get(`${c.id}:in`);
          const fromNode = resolved.get(c.from);
          const toNode = resolved.get(c.to);
          if (!from || !to || !fromNode || !toNode) return null;
          const endpointOpacity = Math.min(fromNode.opacity, toNode.opacity);
          const revealWindow = 0.4;
          const wireT = clamp((stage - (c.activeStage - revealWindow)) / revealWindow);
          const opacity = smooth(wireT) * endpointOpacity;
          return (
            <Connector
              key={c.id}
              id={c.id}
              from={from}
              to={to}
              orientation="horizontal"
              opacity={opacity}
              flowing={stage >= c.activeStage}
              label={c.label}
              delay={(i % 5) * 0.18}
            />
          );
        })}
      </svg>
      <div className="wf-nodes">
        {(Object.keys(NODES) as NodeId[]).map((id) => {
          const def = NODES[id];
          const r = resolved.get(id);
          if (!r || r.opacity <= 0.01) return null;
          return (
            <div
              key={id}
              className="wf-node-slot"
              style={{ left: r.cx, top: r.cy }}
            >
              <Node
                def={def}
                status={nodeStatus(id, def.kind, stage)}
                reveal={r.opacity}
                expandT={id === 'crm' ? expandT : 0}
                fields={id === 'crm' ? CRM_FIELDS : undefined}
                branchLabels={id === 'decision' ? BRANCH_LABELS : undefined}
                scale={nodeScale}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
