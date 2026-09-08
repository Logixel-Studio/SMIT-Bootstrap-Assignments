import type { NodeId } from './nodes';

export interface StageCopy {
  eyebrow: string;
  title: string;
  body: string;
}

/** The nine beats of the automation story. Index === stage number. */
export const STAGES: StageCopy[] = [
  {
    eyebrow: 'The Problem',
    title: 'Your business already runs on great tools.',
    body: 'LinkedIn, forms, spreadsheets, a CRM, email, a calendar, chat — all doing their job. None of them talking to each other.',
  },
  {
    eyebrow: 'Stage 01 — Capture',
    title: 'Capture opportunities automatically.',
    body: 'Every new lead — a form reply, a message, a spreadsheet row — lands in one place the moment it appears.',
  },
  {
    eyebrow: 'Stage 02 — Intelligence',
    title: 'Turn raw leads into actionable intelligence.',
    body: 'Company, role, industry and intent are evaluated in real time, before a person ever looks at it.',
  },
  {
    eyebrow: 'Stage 03 — Decision',
    title: 'Automation that decides, not just moves data.',
    body: 'Qualified leads advance immediately. Everyone else is queued for a smarter follow-up.',
  },
  {
    eyebrow: 'Stage 04 — CRM',
    title: 'Keep your pipeline updated automatically.',
    body: 'Name, company, email, intent score and status — populated the instant a lead is qualified.',
  },
  {
    eyebrow: 'Stage 05 — Action',
    title: 'From decision to action — automatically.',
    body: 'Personalized outreach, a scheduled meeting, an internal alert — triggered in parallel, not in sequence.',
  },
  {
    eyebrow: 'Stage 06 — Follow-Up',
    title: 'No opportunity gets forgotten.',
    body: "Leads that don't book get re-engaged automatically. Leads that do keep the whole team in sync.",
  },
  {
    eyebrow: 'Systems, not scripts',
    title: 'The workflow becomes the architecture.',
    body: 'What looked like scattered automation reorganizes into one coherent, engineered system.',
  },
  {
    eyebrow: 'The Result',
    title: 'This is what gets built.',
    body: 'The same data, decisions and actions you just watched connect — now a live operating picture of your pipeline.',
  },
];

export interface Keyframe {
  stage: number;
  x: number;
  y: number;
}

/**
 * Sparse position keyframes per node, in percent of the canvas. A node
 * holds its last position until its next keyframe — repeated values are
 * used deliberately to keep a node still through several stages before
 * it moves again, rather than drifting the whole time.
 */
// The stage copy panel occupies the bottom-left corner (roughly x 0-33%,
// y 68-95%) and the scroll hint sits bottom-center (x 43-57%, y 88-100%) —
// scatter and dock positions below are kept clear of both.
export const NODE_TIMELINE: Record<NodeId, Keyframe[]> = {
  linkedin: [
    { stage: 0, x: 9, y: 16 },
    { stage: 1, x: 18, y: 28 },
  ],
  website: [
    { stage: 0, x: 66, y: 80 },
    { stage: 1, x: 18, y: 40 },
  ],
  sheets: [
    { stage: 0, x: 7, y: 42 },
    { stage: 1, x: 18, y: 54 },
  ],
  typeform: [
    { stage: 0, x: 88, y: 74 },
    { stage: 1, x: 18, y: 66 },
  ],
  leadCapture: [
    { stage: 1, x: 27, y: 50 },
    { stage: 2, x: 24, y: 50 },
  ],
  aiQualification: [{ stage: 2, x: 44, y: 50 }],
  decision: [{ stage: 3, x: 58, y: 50 }],
  crm: [
    { stage: 0, x: 56, y: 84 },
    { stage: 3, x: 56, y: 84 },
    { stage: 4, x: 76, y: 50 },
  ],
  gmail: [
    { stage: 0, x: 52, y: 10 },
    { stage: 4, x: 52, y: 10 },
    { stage: 5, x: 88, y: 16 },
  ],
  calendar: [
    { stage: 0, x: 86, y: 22 },
    { stage: 4, x: 86, y: 22 },
    { stage: 5, x: 88, y: 50 },
  ],
  slack: [
    { stage: 0, x: 88, y: 50 },
    { stage: 4, x: 88, y: 50 },
    { stage: 5, x: 88, y: 84 },
  ],
  followUp: [{ stage: 6, x: 58, y: 84 }],
};

export type ConnectionState = 'hidden' | 'active';

export interface ConnectionDef {
  id: string;
  from: NodeId;
  to: NodeId;
  /** stage at which this wire is drawn and its packet starts flowing */
  activeStage: number;
  label?: string;
}

export const CONNECTIONS: ConnectionDef[] = [
  { id: 'c-linkedin-capture', from: 'linkedin', to: 'leadCapture', activeStage: 1 },
  { id: 'c-website-capture', from: 'website', to: 'leadCapture', activeStage: 1 },
  { id: 'c-sheets-capture', from: 'sheets', to: 'leadCapture', activeStage: 1 },
  { id: 'c-typeform-capture', from: 'typeform', to: 'leadCapture', activeStage: 1 },
  { id: 'c-capture-ai', from: 'leadCapture', to: 'aiQualification', activeStage: 2 },
  { id: 'c-ai-decision', from: 'aiQualification', to: 'decision', activeStage: 3 },
  { id: 'c-decision-crm', from: 'decision', to: 'crm', activeStage: 4 },
  { id: 'c-crm-gmail', from: 'crm', to: 'gmail', activeStage: 5 },
  { id: 'c-crm-calendar', from: 'crm', to: 'calendar', activeStage: 5 },
  { id: 'c-crm-slack', from: 'crm', to: 'slack', activeStage: 5 },
  { id: 'c-calendar-crm', from: 'calendar', to: 'crm', activeStage: 6 },
  { id: 'c-decision-followup', from: 'decision', to: 'followUp', activeStage: 6 },
  { id: 'c-crm-followup', from: 'crm', to: 'followUp', activeStage: 6 },
  { id: 'c-followup-gmail', from: 'followUp', to: 'gmail', activeStage: 6 },
];

export const CRM_FIELDS = [
  { label: 'Name', value: 'A. Whitfield' },
  { label: 'Company', value: 'Fenwick Group' },
  { label: 'Email', value: 'a.whitfield@fenwick.co' },
  { label: 'Intent Score', value: '86 / 100' },
  { label: 'Status', value: 'Qualified' },
];

export const STAGE_COUNT = STAGES.length;

/** Compact per-stage compositions used on mobile/tablet in place of the pinned canvas. */
export interface MobileScene {
  stage: number;
  top: NodeId[];
  bottom: NodeId[];
  branchLabels?: { qualified: string; notQualified: string };
  note?: string;
}

export const TOOL_GRID: NodeId[] = [
  'linkedin',
  'website',
  'sheets',
  'gmail',
  'calendar',
  'slack',
  'typeform',
  'crm',
];

/** The stage at which a node is the narrative focus (distinct from when it first appears). */
export const FOCUS_STAGE: Record<NodeId, number> = {
  linkedin: 1,
  website: 1,
  sheets: 1,
  typeform: 1,
  leadCapture: 1,
  aiQualification: 2,
  decision: 3,
  crm: 4,
  gmail: 5,
  calendar: 5,
  slack: 5,
  followUp: 6,
};

const RECEDES_AFTER_CAPTURE = new Set<NodeId>(['linkedin', 'website', 'sheets', 'typeform']);

export function nodeStatus(
  id: NodeId,
  kind: 'chip' | 'system' | 'crm' | 'decision',
  stage: number,
): 'idle' | 'active' | 'processing' | 'success' {
  const focus = FOCUS_STAGE[id];
  if (stage < focus - 0.15) return 'idle';
  if (stage < focus + 0.9) return kind === 'chip' ? 'active' : 'processing';
  if (RECEDES_AFTER_CAPTURE.has(id)) return 'idle';
  return kind === 'crm' ? 'success' : 'active';
}

export const MOBILE_SCENES: MobileScene[] = [
  { stage: 1, top: ['linkedin', 'website', 'sheets', 'typeform'], bottom: ['leadCapture'] },
  { stage: 2, top: ['leadCapture'], bottom: ['aiQualification'] },
  {
    stage: 3,
    top: ['aiQualification'],
    bottom: ['decision'],
    branchLabels: { qualified: 'Qualified', notQualified: 'Not qualified' },
  },
  { stage: 4, top: ['decision'], bottom: ['crm'] },
  { stage: 5, top: ['crm'], bottom: ['gmail', 'calendar', 'slack'] },
  {
    stage: 6,
    top: ['crm', 'decision'],
    bottom: ['followUp'],
    note: 'Booked meetings loop back through the CRM and notify the team in Slack. Everyone else gets a re-engagement email from Follow-Up.',
  },
];
