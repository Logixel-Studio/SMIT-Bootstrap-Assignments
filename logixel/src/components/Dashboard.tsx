import { GaugeIcon, CheckIcon } from './icons';
import './dashboard.css';

interface DashboardProps {
  /** 0..1 entrance progress */
  progress: number;
}

const STATS = [
  { label: 'Qualified Leads', value: '128', trend: '+18%' },
  { label: 'High Intent', value: '46', trend: '+9%' },
  { label: 'Meetings Booked', value: '31', trend: '+22%' },
  { label: 'Follow-Ups Sent', value: '84', trend: '—' },
];

const ROWS = [
  { company: 'Fenwick Group', score: 86, status: 'Qualified', next: 'Meeting booked' },
  { company: 'Norvale Retail', score: 74, status: 'Qualified', next: 'Outreach sent' },
  { company: 'Atlas Freight', score: 41, status: 'Nurture', next: 'Follow-up queued' },
  { company: 'Beacon Health', score: 92, status: 'Qualified', next: 'Meeting booked' },
];

export function Dashboard({ progress }: DashboardProps) {
  const p = Math.max(0, Math.min(1, progress));
  return (
    <div className="dash" style={{ opacity: p, transform: `scale(${0.94 + p * 0.06}) translateY(${(1 - p) * 14}px)` }}>
      <div className="dash-window">
        <div className="dash-titlebar">
          <div className="dash-brand">
            <span className="dash-mark" />
            <span>Lead Intelligence</span>
          </div>
          <div className="dash-live">
            <GaugeIcon width={14} height={14} />
            <span>Live</span>
          </div>
        </div>

        <div className="dash-stats">
          {STATS.map((s) => (
            <div className="dash-stat" key={s.label}>
              <span className="dash-stat-label">{s.label}</span>
              <span className="dash-stat-value">{s.value}</span>
              <span className="dash-stat-trend">{s.trend}</span>
            </div>
          ))}
        </div>

        <div className="dash-table">
          <div className="dash-row dash-row-head">
            <span>Company</span>
            <span>Score</span>
            <span>Status</span>
            <span>Next Action</span>
          </div>
          {ROWS.map((r) => (
            <div className="dash-row" key={r.company}>
              <span className="dash-cell-company">{r.company}</span>
              <span className="dash-score">
                <span className="dash-score-bar">
                  <span className="dash-score-fill" style={{ width: `${r.score}%` }} />
                </span>
                {r.score}
              </span>
              <span className={`dash-badge ${r.status === 'Qualified' ? 'is-qualified' : 'is-nurture'}`}>
                {r.status === 'Qualified' && <CheckIcon width={11} height={11} />}
                {r.status}
              </span>
              <span className="dash-next">{r.next}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
