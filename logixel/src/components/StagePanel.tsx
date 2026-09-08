import { STAGES, STAGE_COUNT } from '../data/timeline';
import './stage-panel.css';

interface StagePanelProps {
  stage: number;
}

export function StagePanel({ stage }: StagePanelProps) {
  const index = Math.round(Math.max(0, Math.min(STAGE_COUNT - 1, stage)));
  const copy = STAGES[index];

  return (
    <div className="stage-panel">
      <div className="stage-progress" aria-hidden="true">
        {STAGES.slice(0, STAGE_COUNT - 1).map((_, i) => (
          <span key={i} className={i <= index ? 'seg seg-done' : 'seg'} />
        ))}
      </div>
      <div className="stage-copy" key={index}>
        <span className="stage-eyebrow">{copy.eyebrow}</span>
        <h2 className="stage-title">{copy.title}</h2>
        <p className="stage-body">{copy.body}</p>
      </div>
    </div>
  );
}
