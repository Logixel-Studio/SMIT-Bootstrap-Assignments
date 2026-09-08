import { MOBILE_SCENES, STAGES } from '../data/timeline';
import { MobileToolGrid } from './MobileToolGrid';
import { MobileFlowScene } from './MobileFlowScene';
import { MobileResult } from './MobileResult';
import './mobile-story.css';

export function MobileStory() {
  return (
    <section className="mstory">
      <MobileToolGrid />
      {MOBILE_SCENES.map((scene) => (
        <MobileFlowScene
          key={scene.stage}
          copy={STAGES[scene.stage]}
          top={scene.top}
          bottom={scene.bottom}
          branchLabels={scene.branchLabels}
          note={scene.note}
        />
      ))}
      <MobileResult />
    </section>
  );
}
