import type { Viewport } from 'pixi-viewport';
import { Container, FederatedPointerEvent, Sprite, type Application, Texture, SCALE_MODES } from 'pixi.js';

/**
 * Create a rotating bunny moving in a circle.
 */
export function bunBunCircle(app: Application) {
  const bunny = Sprite.from('./bunny.png');
  app.stage.addChild(bunny);
  bunny.anchor.set(0.5);
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  app.ticker.add((delta) => {
    bunny.rotation += 0.1 * delta;
  });

  let elapsed = 0.0;
  app.ticker.add((delta) => {
    elapsed += delta;
    const padding = 0.7;
    const speed = 100;
    const width = app.screen.width;
    bunny.x = width / 2 + ((Math.cos(elapsed / speed) * width) / 2) * padding;

    const height = app.screen.height;
    bunny.y = height / 2 + ((Math.sin(elapsed / speed) * width) / 2) * padding;
  });
}

export function bunBunRandoDrag(app: Application) {
  // create a texture from an image path
  const texture = Texture.from('./bunny.png');

  // Scale mode for pixelation
  texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

  for (let i = 0; i < 13; i++) {
    createBunny(
      Math.floor(Math.random() * app.screen.width),
      Math.floor(Math.random() * app.screen.height),
      app.stage,
      texture
    );
  }

  app.stage.eventMode = 'static';
  app.stage.hitArea = app.screen;
  const upCallback = createOnDragEnd(app.stage);
  app.stage.on('pointerup', upCallback);
  app.stage.on('pointerupoutside', upCallback);
}

function createBunny(x: number, y: number, stage: Container, texture: Texture) {
  const bunny = new Sprite(texture);
  bunny.eventMode = 'static';
  bunny.cursor = 'pointer';
  bunny.anchor.set(0.5);
  bunny.scale.set(2.5);
  bunny.on('pointerdown', createOnDragStart(bunny, stage));
  bunny.x = x;
  bunny.y = y;

  stage.addChild(bunny);
}

let dragTarget: Sprite | undefined;

function onDragMove(event: FederatedPointerEvent) {
  if (dragTarget) {
    dragTarget.parent.toLocal(event.global, undefined, dragTarget.position);
  }
}

function createOnDragStart(obj: Sprite, stage: Container) {
  return () => {
    obj.alpha = 0.5;
    dragTarget = obj;
    stage.on('pointermove', onDragMove);
    const viewport = stage as Viewport; // weird but this is how it's set up in camera.ts. Probably kinda bad long term...
    viewport.plugins.pause('drag');
  };
}

function createOnDragEnd(stage: Container) {
  return () => {
    if (dragTarget) {
      stage.off('pointermove', onDragMove);
      dragTarget.alpha = 1;
      dragTarget = undefined;
      const viewport = stage as Viewport;
      viewport.plugins.resume('drag');
    }
  };
}
