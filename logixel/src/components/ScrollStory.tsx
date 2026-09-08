import { useScrollStage } from '../hooks/useScrollStage';
import { STAGE_COUNT } from '../data/timeline';
import { clamp, smooth } from '../utils/path';
import { WorkflowCanvas } from './WorkflowCanvas';
import { StagePanel } from './StagePanel';
import { Dashboard } from './Dashboard';
import './scroll-story.css';

const STAGE_VH = 118;

export function ScrollStory() {
  const { ref, stage } = useScrollStage(STAGE_COUNT);
  const dashboardProgress = smooth(clamp((stage - 6.4) / 1.6));
  const scrollHint = 1 - smooth(clamp(stage / 0.25));

  return (
    <section ref={ref} className="story" style={{ height: `${(STAGE_COUNT - 1) * STAGE_VH}vh` }}>
      <div className="story-pin">
        <div className="story-field">
          <WorkflowCanvas stage={stage} />
          {dashboardProgress > 0.01 && <Dashboard progress={dashboardProgress} />}
        </div>
        <StagePanel stage={stage} />
        {scrollHint > 0.02 && (
          <div className="scroll-hint" style={{ opacity: scrollHint }}>
            <span>Scroll to build the system</span>
            <span className="scroll-hint-chevron" />
          </div>
        )}
      </div>
    </section>
  );
}
