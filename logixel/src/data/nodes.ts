import type { LogoId } from './logos';
import {
  WebsiteIcon,
  FunnelIcon,
  SparkIcon,
  BranchIcon,
  ReplyIcon,
} from '../components/icons';
import type { ComponentType, SVGProps } from 'react';

export type NodeKind = 'chip' | 'system' | 'crm' | 'decision';

export interface NodeDef {
  id: string;
  kind: NodeKind;
  label: string;
  sublabel?: string;
  appId?: LogoId;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  width: number;
  height: number;
  /** width/height once the node reaches its "expanded" stage (crm only). */
  expandedWidth?: number;
  expandedHeight?: number;
}

export const NODES: Record<string, NodeDef> = {
  linkedin: { id: 'linkedin', kind: 'chip', label: 'LinkedIn', appId: 'linkedin', width: 168, height: 52 },
  website: { id: 'website', kind: 'chip', label: 'Website Form', icon: WebsiteIcon, width: 168, height: 52 },
  sheets: { id: 'sheets', kind: 'chip', label: 'Google Sheets', appId: 'sheets', width: 168, height: 52 },
  gmail: { id: 'gmail', kind: 'chip', label: 'Gmail', appId: 'gmail', width: 168, height: 52 },
  calendar: { id: 'calendar', kind: 'chip', label: 'Calendar', appId: 'calendar', width: 168, height: 52 },
  slack: { id: 'slack', kind: 'chip', label: 'Slack', appId: 'slack', width: 168, height: 52 },
  typeform: { id: 'typeform', kind: 'chip', label: 'Typeform', appId: 'typeform', width: 168, height: 52 },

  leadCapture: {
    id: 'leadCapture',
    kind: 'system',
    label: 'Lead Capture',
    sublabel: 'New opportunity detected',
    icon: FunnelIcon,
    width: 198,
    height: 84,
  },
  aiQualification: {
    id: 'aiQualification',
    kind: 'system',
    label: 'AI Qualification',
    sublabel: 'Scoring company, role, intent',
    icon: SparkIcon,
    width: 216,
    height: 108,
  },
  decision: {
    id: 'decision',
    kind: 'decision',
    label: 'Decision',
    icon: BranchIcon,
    width: 132,
    height: 60,
  },
  crm: {
    id: 'crm',
    kind: 'crm',
    label: 'CRM',
    appId: 'hubspot',
    width: 168,
    height: 52,
    expandedWidth: 264,
    expandedHeight: 190,
  },
  followUp: {
    id: 'followUp',
    kind: 'system',
    label: 'Follow-Up',
    sublabel: 'No opportunity forgotten',
    icon: ReplyIcon,
    width: 190,
    height: 80,
  },
};

export type NodeId = keyof typeof NODES;
