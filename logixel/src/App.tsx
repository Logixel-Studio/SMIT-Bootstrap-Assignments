import { Nav } from './components/Nav';
import { ScrollStory } from './components/ScrollStory';
import { MobileStory } from './components/MobileStory';
import { FinalStatement } from './components/FinalStatement';
import { WhatWeBuild } from './components/WhatWeBuild';
import { Footer } from './components/Footer';
import { useIsDesktop } from './hooks/useBreakpoint';

function App() {
  const isDesktop = useIsDesktop(900);

  return (
    <div id="top">
      <Nav />
      {isDesktop ? <ScrollStory /> : <MobileStory />}
      <FinalStatement />
      <WhatWeBuild />
      <Footer />
    </div>
  );
}

export default App;
