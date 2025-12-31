import type { AnimationOptions, StrokeOptions } from '../types';

export const DEFAULT_OPTIONS: Required<AnimationOptions> = {
  duration: 1000,
  'timing-function': 'linear',
  'iteration-count': 1,
  direction: 'normal',
  'fill-mode': 'forwards',
  delay: 0,
  mode: 'sync'
};

export const DEFAULT_STROKE: Required<StrokeOptions> = {
  stroke: '#000',
  'stroke-width': '1px',
  'font-size': 72,
  'fill-color': 'transparent'
};
