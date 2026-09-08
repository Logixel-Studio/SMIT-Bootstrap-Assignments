import { STAGES } from '../data/timeline';
import { Dashboard } from './Dashboard';
import { useInView } from '../hooks/useInView';
import './mobile-result.css';

export function MobileResult() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const copy = STAGES[8];

  return (
    <div ref={ref} className={`mresult${inView ? ' mresult-in' : ''}`}>
      <div className="mscene-copy">
        <span className="stage-eyebrow">{copy.eyebrow}</span>
        <h3 className="mscene-title">{copy.title}</h3>
        <p className="mscene-body">{copy.body}</p>
      </div>
      <div className="mresult-dash">
        <Dashboard progress={1} />
      </div>
    </div>
  );
}
