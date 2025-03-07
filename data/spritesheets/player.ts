import { SpritesheetData } from './types';

export const data: SpritesheetData = {
  frames: {
    left: {
      frame: { x: 0, y: 0, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    left2: {
      frame: { x: 16, y: 0, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    left3: {
      frame: { x: 32, y: 0, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    up: {
      frame: { x: 0, y: 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    up2: {
      frame: { x: 16, y: 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    up3: {
      frame: { x: 32, y: 16, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    down: {
      frame: { x: 0, y: 32, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    down2: {
      frame: { x: 16, y: 32, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    down3: {
      frame: { x: 32, y: 32, w: 16, h: 16 },
      sourceSize: { w: 16, h: 16 },
      spriteSourceSize: { x: 0, y: 0 },
    },
  },
  meta: {
    scale: '1',
  },
  animations: {
    left: ['left', 'left2', 'left3'],
    up: ['up', 'up2', 'up3'],
    down: ['down', 'down2', 'down3'],
  },
};
