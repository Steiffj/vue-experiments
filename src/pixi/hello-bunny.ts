import { Sprite, type Application } from 'pixi.js';

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
