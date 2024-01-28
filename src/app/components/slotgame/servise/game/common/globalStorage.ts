import * as PIXI from "pixi.js";
export default class GlobalStorage {
  public static textures: Array<PIXI.Texture> = [];
  public static app: PIXI.Application;
  public static applicationCanvasOptions: PIXI.IApplicationOptions = {
    antialias: false,
    backgroundAlpha: 1,
    backgroundColor: '0xCCCCCC',
    clearBeforeRender: true,
    context: null,
    hello: false,
    powerPreference: "low-power",
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    width: 800,
    height: 600
  };
  public static configs = {
    REELS_COUNT: 5,
    SYMBOLS_PER_REEL: 4,
    VISIBLE_SYMBOLS: 3, // May be < SYMBOLS_PER_REEL
    IMAGE_PATH: './assets/slotgame/images/',
    SYMBOLS_PATH_ID: 'symbol',
    SYMBOL_IMAGE_MANIFEST: {
      symbol1: 'symbol/1.png',
      symbol2: 'symbol/2.png',
      symbol3: 'symbol/3.png',
      symbol4: 'symbol/4.png',
    },
    // Animation tunes
    START_ALPHA_DURATION: 1,
    REEL_STEP_HEIGHT: 10,
    EXTRA_REEL_STEPS: 3,
    REEL_SPEED_GROW: 5,
    MIN_SPIN_TIME: 2500,
    REEL_TIME_GROW: 500,
    BLUR_MULTIPLY: 150,
    // Default if you need scale game zone, actual for any canvas size REELS_COUNT or SYMBOLS_PER_REEL (applicationOptions)
    REEL_WIDTH: 160,
    SYMBOL_SIZE: 150
  }
}

