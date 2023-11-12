import { Viewport } from 'pixi-viewport';
import { Application } from 'pixi.js';

export function attachCamera(app: Application) {
  const viewport = new Viewport({
    screenHeight: app.screen.height,
    screenWidth: app.screen.width,
    worldHeight: app.stage.height,
    worldWidth: app.stage.width,
    events: app.renderer.events,
    // passiveWheel: false,
    ticker: app.ticker,
    disableOnContextMenu: true
  });

  // app.stage.addChild(viewport);
  app.stage = viewport; // Use the viewport as the stage so zoom/pan/etc. applies to all content

  viewport
    .drag({
      direction: 'all', // (x, y, or all) direction to drag
      pressDrag: true, // whether click to drag is active
      // wheel: true, // use wheel to scroll in direction (unless wheel plugin is active)
      // wheelScroll: 1, // number of pixels to scroll with each wheel spin
      reverse: false, // reverse the direction of the wheel scroll
      clampWheel: false, // clamp wheel (to avoid weird bounce with mouse wheel)
      underflow: 'center', // (top-left, top-center, etc.) where to place world if too small for screen
      factor: 1, // factor to multiply drag to increase the speed of movement
      mouseButtons: 'all', // changes which mouse buttons trigger drag, use: 'all', 'left', right' 'middle', or some combination, like, 'middle-right'; you may want to set viewport.options.disableOnContextMenu if you want to use right-click dragging
      keyToPress: null, // array containing https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code codes of keys that can be pressed for the drag to be triggered, e.g.: ['ShiftLeft', 'ShiftRight'}
      ignoreKeyToPressOnTouch: false, // ignore keyToPress for touch events
      lineHeight: 20 // scaling factor for non-DOM_DELTA_PIXEL scrolling events (used for firefox mouse scrolling)
    })
    .decelerate({
      friction: 0.92, // percent to decelerate after movement
      bounce: 0.8, // percent to decelerate when past boundaries (only applicable when viewport.bounce() is active)
      minSpeed: 0.01 // minimum velocity before stopping/reversing acceleration
    })
    .wheel({
      smooth: 30,
      percent: 0.2, // smooth the zooming by providing the number of frames to zoom between wheel spins
      interrupt: true, // stop smoothing with any user input on the viewport
      reverse: false, // reverse the direction of the scroll
      center: null, // place this point at center during zoom instead of current mouse position
      lineHeight: 20, // scaling factor for non-DOM_DELTA_PIXEL scrolling events
      axis: 'all' // axis to zoom
    });

  // viewport.mouseEdges({
  //   distance: 50
  // });
}
