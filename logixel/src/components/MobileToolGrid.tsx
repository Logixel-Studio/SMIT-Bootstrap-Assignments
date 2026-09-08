import { TOOL_GRID, STAGES } from '../data/timeline';
import { NODES } from '../data/nodes';
import { AppIcon } from './AppIcon';
import { useInView } from '../hooks/useInView';
import './mobile-tool-grid.css';

export function MobileToolGrid() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const copy = STAGES[0];

  return (
    <div ref={ref} className={`mtool${inView ? ' mtool-in' : ''}`}>
      <div className="mscene-copy">
        <span className="stage-eyebrow">{copy.eyebrow}</span>
        <h3 className="mscene-title">{copy.title}</h3>
        <p className="mscene-body">{copy.body}</p>
      </div>
      <div className="mtool-grid">
        {TOOL_GRID.map((id, i) => {
          const def = NODES[id];
          return (
            <div className="mtool-item" key={id} style={{ transitionDelay: `${i * 60}ms` }}>
              {def.appId ? (
                <AppIcon id={def.appId} size={30} radius={8} />
              ) : def.icon ? (
                <div className="mtool-icon">
                  <def.icon width={16} height={16} />
                </div>
              ) : null}
              <span>{def.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
