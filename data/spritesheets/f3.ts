import { SpritesheetData } from './types';

export const data: SpritesheetData = {
  frames: {
    down: {
      frame: { x: 192, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    down2: {
      frame: { x: 224, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    down3: {
      frame: { x: 256, y: 0, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    left: {
      frame: { x: 192, y: 32, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    left2: {
      frame: { x: 224, y: 32, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    left3: {
      frame: { x: 256, y: 32, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    right: {
      frame: { x: 192, y: 65, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    right2: {
      frame: { x: 224, y: 65, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    right3: {
      frame: { x: 256, y: 65, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    up: {
      frame: { x: 192, y: 96, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    up2: {
      frame: { x: 224, y: 96, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0 },
    },
    up3: {
      frame: { x: 256, y: 96, w: 32, h: 32 },
      sourceSize: { w: 32, h: 32 },
      spriteSourceSize: { x: 0, y: 0 },
    },
  },
  meta: {
    scale: '1',
  },
  animations: {
    left: ['left', 'left2', 'left3'],
    right: ['right', 'right2', 'right3'],
    up: ['up', 'up2', 'up3'],
    down: ['down', 'down2', 'down3'],
  },
};
