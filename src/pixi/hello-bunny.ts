import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import type { Viewport } from "pixi-viewport";
import {
  FederatedPointerEvent,
  Filter,
  SCALE_MODES,
  Sprite,
  Texture,
  type Application,
} from "pixi.js";

/**
 * Create a rotating bunny moving in a circle.
 */
export function bunBunCircle(app: Application) {
  const bunny = Sprite.from("./bunny.png");
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
    const circ = Math.min(app.screen.width, app.screen.height);
    bunny.x = circ / 2 + ((Math.cos(elapsed / speed) * circ) / 2) * padding;

    const height = app.screen.height;
    bunny.y = height / 2 + ((Math.sin(elapsed / speed) * circ) / 2) * padding;
  });
}

export function bunBunRandoDrag(app: Application) {
  // create a texture from an image path
  const texture = Texture.from("./bunny.png");

  // Scale mode for pixelation
  texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

  for (let i = 0; i < 216; i++) {
    createBunny(
      Math.floor(Math.random() * app.screen.width),
      Math.floor(Math.random() * app.screen.height),
      app,
      texture
    );
  }

  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  const upCallback = createOnDragEnd(app);
  app.stage.on("pointerup", upCallback);
  app.stage.on("pointerupoutside", upCallback);
}

function createBunny(x: number, y: number, app: Application, texture: Texture) {
  const bunny = new Sprite(texture);
  bunny.eventMode = "static";
  bunny.cursor = "pointer";
  bunny.anchor.set(0.5);
  bunny.scale.set(2.5);
  bunny.on("pointerdown", createOnDragStart(bunny, app));
  bunny.x = x;
  bunny.y = y;

  app.stage.addChild(bunny);
}

let dragTarget: Sprite | undefined;
const dragFilters: Filter[] = [new DropShadowFilter()];

function onDragMove(event: FederatedPointerEvent) {
  if (dragTarget) {
    dragTarget.parent.toLocal(event.global, undefined, dragTarget.position);
  }
}

function createOnDragStart(obj: Sprite, app: Application) {
  return () => {
    obj.alpha = 0.5;
    obj.filters = (obj.filters || []).concat(dragFilters);
    obj.cursor = "grabbing";
    dragTarget = obj;
    app.stage.on("pointermove", onDragMove);
    const viewport = app.stage as Viewport; // weird but this is how it's set up in camera.ts. Probably kinda bad long term...
    viewport.plugins.pause("drag");
    const pan = 0.12;
    viewport.mouseEdges({
      top: app.stage.height * pan,
      bottom: app.stage.height * pan,
      left: app.stage.width * pan,
      right: app.stage.width * pan,
      allowButtons: true,
    });
  };
}

function createOnDragEnd(app: Application) {
  return () => {
    if (dragTarget) {
      app.stage.off("pointermove", onDragMove);
      dragTarget.alpha = 1;
      if (dragTarget.filters) {
        dragTarget.cursor = "pointer";
        for (const filter of dragFilters) {
          dragTarget.filters.splice(dragTarget.filters.indexOf(filter), 1);
        }
        dragTarget.filters.length = 0;
      }
      dragTarget = undefined;
      const viewport = app.stage as Viewport;
      viewport.plugins.resume("drag");
      // viewport.plugins.remove('mouseEdges'); // this doesn't do what I think it does
      viewport.mouseEdges({
        distance: 0,
      });
    }
  };
}
