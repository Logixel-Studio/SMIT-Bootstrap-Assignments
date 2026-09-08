import { useLayoutEffect, useRef, useState } from 'react';
import { NODES, type NodeId } from '../data/nodes';
import { CRM_FIELDS, type StageCopy } from '../data/timeline';
import { Node } from './Node';
import { Connector } from './Connector';
import { useInView } from '../hooks/useInView';
import type { Point } from '../utils/path';
import './mobile-scene.css';

interface MobileFlowSceneProps {
  copy: StageCopy;
  top: NodeId[];
  bottom: NodeId[];
  branchLabels?: { qualified: string; notQualified: string };
  note?: string;
}

interface Wire {
  key: string;
  from: Point;
  to: Point;
}

export function MobileFlowScene({ copy, top, bottom, branchLabels, note }: MobileFlowSceneProps) {
  const { ref: visRef, inView } = useInView<HTMLDivElement>(0.3);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef(new Map<string, HTMLDivElement>());
  const [wires, setWires] = useState<Wire[]>([]);

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      const next: Wire[] = [];
      top.forEach((topId) => {
        const topEl = nodeRefs.current.get(`top:${topId}`);
        if (!topEl) return;
        const tRect = topEl.getBoundingClientRect();
        const from = { x: tRect.left + tRect.width / 2 - cRect.left, y: tRect.bottom - cRect.top };
        bottom.forEach((bottomId) => {
          const bottomEl = nodeRefs.current.get(`bottom:${bottomId}`);
          if (!bottomEl) return;
          const bRect = bottomEl.getBoundingClientRect();
          const to = { x: bRect.left + bRect.width / 2 - cRect.left, y: bRect.top - cRect.top };
          next.push({ key: `${topId}-${bottomId}`, from, to });
        });
      });
      setWires(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [top, bottom]);

  const renderNode = (id: NodeId, slot: 'top' | 'bottom') => {
    const def = NODES[id];
    const isCrm = id === 'crm' && slot === 'bottom';
    const width = isCrm && def.expandedWidth ? def.expandedWidth : def.width;
    const height = isCrm && def.expandedHeight ? def.expandedHeight : def.height;
    return (
      <div
        key={id}
        ref={(el) => {
          if (el) nodeRefs.current.set(`${slot}:${id}`, el);
        }}
        className="mscene-node"
        style={{ width, height }}
      >
        <Node
          def={def}
          status={isCrm ? 'success' : 'active'}
          reveal={1}
          expandT={isCrm ? 1 : 0}
          fields={isCrm ? CRM_FIELDS : undefined}
          branchLabels={def.kind === 'decision' ? branchLabels : undefined}
        />
      </div>
    );
  };

  return (
    <div ref={visRef} className={`mscene${inView ? ' mscene-in' : ''}`}>
      <div className="mscene-copy">
        <span className="stage-eyebrow">{copy.eyebrow}</span>
        <h3 className="mscene-title">{copy.title}</h3>
        <p className="mscene-body">{copy.body}</p>
      </div>
      <div className="mscene-diagram" ref={containerRef}>
        <svg className="mscene-wires" aria-hidden="true">
          {wires.map((w) => (
            <Connector
              key={w.key}
              id={w.key}
              from={w.from}
              to={w.to}
              orientation="vertical"
              opacity={inView ? 1 : 0}
              flowing={inView}
            />
          ))}
        </svg>
        <div className="mscene-row">{top.map((id) => renderNode(id, 'top'))}</div>
        <div className="mscene-row mscene-row-bottom">{bottom.map((id) => renderNode(id, 'bottom'))}</div>
      </div>
      {note && <p className="mscene-note">{note}</p>}
    </div>
  );
}
