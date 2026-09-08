import { FunnelIcon, SparkIcon, DatabaseIcon } from './icons';
import './what-we-build.css';

const ITEMS = [
  {
    icon: FunnelIcon,
    title: 'Automated workflows',
    body: 'Your existing tools, connected and orchestrated — no more manual handoffs between systems.',
  },
  {
    icon: SparkIcon,
    title: 'AI-driven decisions',
    body: 'Qualification, scoring and routing logic that acts on data the moment it arrives.',
  },
  {
    icon: DatabaseIcon,
    title: 'Custom SaaS systems',
    body: 'Dashboards and internal tools built around your operation, not a generic template.',
  },
];

export function WhatWeBuild() {
  return (
    <section className="wwb" id="work">
      {ITEMS.map((item) => (
        <div className="wwb-item" key={item.title}>
          <div className="wwb-icon">
            <item.icon width={19} height={19} />
          </div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </section>
  );
}
