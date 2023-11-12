import type { Application } from 'pixi.js';
import * as PIXI from 'pixi.js';

export function initPixi(target: HTMLElement, renderFns: ((app: Application) => void)[]) {
  const app = new PIXI.Application<HTMLCanvasElement>({
    antialias: true,
    background: '#1099bb',
    resizeTo: target
  });

  target.appendChild(app.view);
  for (const fn of renderFns) {
    fn(app);
  }
}
