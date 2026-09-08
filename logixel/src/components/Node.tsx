import type { CSSProperties } from 'react';
import { AppIcon } from './AppIcon';
import type { NodeDef } from '../data/nodes';
import './node.css';

export type NodeStatus = 'idle' | 'active' | 'processing' | 'success';

export interface CrmField {
  label: string;
  value: string;
}

interface NodeProps {
  def: NodeDef;
  status: NodeStatus;
  /** 0..1 — drives corner-tick / border reveal and content fade-in as the node arrives. */
  reveal: number;
  /** 0..1 — continuous progress from base size/content to the expanded (crm) card. */
  expandT?: number;
  fields?: CrmField[];
  branchLabels?: { qualified: string; notQualified: string };
  scale?: number;
}

function CornerTicks({ active }: { active: boolean }) {
  return (
    <div className={`node-ticks${active ? ' node-ticks-active' : ''}`} aria-hidden="true">
      <span className="tick tl" />
      <span className="tick tr" />
      <span className="tick bl" />
      <span className="tick br" />
    </div>
  );
}

export function Node({ def, status, reveal, expandT = 0, fields, branchLabels, scale = 1 }: NodeProps) {
  const t = Math.max(0, Math.min(1, expandT));
  const width = def.expandedWidth ? def.width + (def.expandedWidth - def.width) * t : def.width;
  const height = def.expandedHeight ? def.height + (def.expandedHeight - def.height) * t : def.height;
  const expanded = t > 0.4;
  const fieldsRevealed = fields ? Math.round(Math.max(0, (t - 0.35) / 0.65) * fields.length) : 0;
  const Icon = def.icon;

  const style: CSSProperties = {
    width,
    height,
    opacity: Math.max(0, Math.min(1, reveal)),
    transform: `scale(${(0.86 + 0.14 * Math.min(1, reveal)) * scale})`,
  };

  if (def.kind === 'chip') {
    return (
      <div className={`node node-chip status-${status}`} style={style}>
        {def.appId ? <AppIcon id={def.appId} size={34} radius={9} /> : Icon ? (
          <div className="node-chip-icon">
            <Icon width={18} height={18} />
          </div>
        ) : null}
        <span className="node-chip-label">{def.label}</span>
        <span className="node-dot" />
      </div>
    );
  }

  if (def.kind === 'decision') {
    return (
      <div className={`node node-decision status-${status}`} style={style}>
        <div className="node-decision-inner">
          {Icon && <Icon width={17} height={17} />}
          <span>{def.label}</span>
        </div>
        {branchLabels && (
          <>
            <span className="node-branch-tag node-branch-yes">{branchLabels.qualified}</span>
            <span className="node-branch-tag node-branch-no">{branchLabels.notQualified}</span>
          </>
        )}
      </div>
    );
  }

  if (def.kind === 'crm') {
    if (t < 0.08) {
      return (
        <div className={`node node-chip status-${status}`} style={style}>
          {def.appId && <AppIcon id={def.appId} size={34} radius={9} />}
          <span className="node-chip-label">{def.label}</span>
          <span className="node-dot" />
        </div>
      );
    }
    return (
      <div className={`node node-card node-crm status-${status}`} style={style}>
        <CornerTicks active={status !== 'idle'} />
        <div className="node-card-header">
          {def.appId && <AppIcon id={def.appId} size={28} radius={8} />}
          <div className="node-card-heading">
            <span className="node-card-title">HubSpot</span>
            <span className="node-card-sub">CRM · pipeline</span>
          </div>
          <span className="node-dot" />
        </div>
        {expanded && fields && (
          <div className="node-fields">
            {fields.map((f, i) => (
              <div
                key={f.label}
                className="node-field-row"
                style={{ opacity: i < fieldsRevealed ? 1 : 0, transform: `translateY(${i < fieldsRevealed ? 0 : 4}px)` }}
              >
                <span className="node-field-label">{f.label}</span>
                <span className="node-field-value">{f.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // system
  return (
    <div className={`node node-card status-${status}`} style={style}>
      <CornerTicks active={status !== 'idle'} />
      <div className="node-card-header">
        {Icon && (
          <div className="node-card-icon">
            <Icon width={17} height={17} />
          </div>
        )}
        <div className="node-card-heading">
          <span className="node-card-title">{def.label}</span>
          {def.sublabel && <span className="node-card-sub">{def.sublabel}</span>}
        </div>
        <span className="node-dot" />
      </div>
    </div>
  );
}
