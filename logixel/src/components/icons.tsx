// Small, original line-icon glyphs for LOGIXEL's own system nodes.
// Deliberately restrained: uniform 1.6px stroke, rounded caps, a touch of
// organic asymmetry — a technical-diagram feel rather than a stock icon set.

import type { SVGProps } from 'react';

const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function WebsiteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6.5c0-1.1 1-2 2.3-2h11.4c1.3 0 2.3.9 2.3 2v11c0 1.1-1 2-2.3 2H6.3C5 19.5 4 18.6 4 17.5v-11Z" />
      <path d="M4 9.2h16" />
      <circle cx="7" cy="7.3" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FunnelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 5.2h15l-5.7 7.4v5.6l-3.6 2v-7.6L4.5 5.2Z" />
    </svg>
  );
}

export function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4.2c.5 3.3 1.1 5 2.3 6.4 1.3 1.4 3.1 2 6 2.4-2.9.4-4.7 1-6 2.4-1.2 1.4-1.8 3.1-2.3 6.4-.5-3.3-1.1-5-2.3-6.4-1.3-1.4-3.1-2-6-2.4 2.9-.4 4.7-1 6-2.4 1.2-1.4 1.8-3.1 2.3-6.4Z" />
    </svg>
  );
}

export function BranchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 12h2.5c1.4 0 2.1-.6 2.8-1.6l.9-1.4c.7-1 1.4-1.6 2.8-1.6H16" />
      <path d="M8 12h2.5c1.4 0 2.1.6 2.8 1.6l.9 1.4c.7 1 1.4 1.6 2.8 1.6H16" />
    </svg>
  );
}

export function ReplyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9 8 4.8 12 9 16" />
      <path d="M4.8 12h9.4c3 0 5.4 2.3 5.4 5.2v1" />
    </svg>
  );
}

export function DatabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="2.6" />
      <path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
      <path d="M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" />
    </svg>
  );
}

export function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 6.8c0-1.3 1.1-2.3 2.5-2.3h10c1.4 0 2.5 1 2.5 2.3v6.4c0 1.3-1.1 2.3-2.5 2.3H10l-4 3.2v-3.2H7c-1.4 0-2.5-1-2.5-2.3V6.8Z" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function GaugeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 15.5a7.5 7.5 0 1 1 15 0" />
      <path d="M12 15.5l3.3-4.6" />
      <circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
