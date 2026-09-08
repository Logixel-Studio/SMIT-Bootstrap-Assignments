import type { Keyframe } from '../data/timeline';
import { clamp, lerp, smooth } from './path';

export interface Resolved {
  x: number;
  y: number;
  opacity: number;
  appeared: boolean;
}

const REVEAL_WINDOW = 0.55;

/** Resolves a node's percent position + entrance opacity at a continuous stage value. */
export function resolveKeyframes(keyframes: Keyframe[], stage: number): Resolved {
  const first = keyframes[0];
  if (stage < first.stage - REVEAL_WINDOW) {
    return { x: first.x, y: first.y, opacity: 0, appeared: false };
  }

  let k1 = keyframes[0];
  let k2: Keyframe | null = null;
  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i].stage <= stage) k1 = keyframes[i];
    if (keyframes[i].stage > stage) {
      k2 = keyframes[i];
      break;
    }
  }

  const x = k2 ? lerp(k1.x, k2.x, smooth((stage - k1.stage) / (k2.stage - k1.stage))) : k1.x;
  const y = k2 ? lerp(k1.y, k2.y, smooth((stage - k1.stage) / (k2.stage - k1.stage))) : k1.y;
  const opacity = smooth(clamp((stage - (first.stage - REVEAL_WINDOW)) / REVEAL_WINDOW));

  return { x, y, opacity, appeared: opacity > 0.02 };
}
