import * as PIXI from "pixi.js";
import Reels from "./components/reels/reels";
import GlobalStorage from "./common/globalStorage";
import {BehaviorSubject} from "rxjs";
import {SpinAction} from "../enums/spin.action";
import {gsap} from "gsap";

export default class SlotGame extends PIXI.Application {


  public worldEmitter: BehaviorSubject<SpinAction>;
  private conf = GlobalStorage.configs;
  private running = false;
  private reels: Reels;

  constructor(parent: any, _worldEmitter: BehaviorSubject<SpinAction>) {
    super(GlobalStorage.applicationCanvasOptions);
    this.worldEmitter = _worldEmitter;

    parent.appendChild(this.view);
    this.stage.alpha = 0;

    PIXI.Assets.init({basePath: this.conf.IMAGE_PATH})
    PIXI.Assets.addBundle(this.conf.SYMBOLS_PATH_ID, this.conf.SYMBOL_IMAGE_MANIFEST);
    PIXI.Assets.loadBundle(this.conf.SYMBOLS_PATH_ID).then((_) => {
      this.onAssetsLoaded(_)
    });
    this.worldEmitter.next(SpinAction.LOADING_ASSETS_START);
  }

  onAssetsLoaded(_textures: any) {
    gsap.to(this.stage, {alpha: 1, duration: this.conf.START_ALPHA_DURATION})
    GlobalStorage.textures = Object.values(_textures);
    GlobalStorage.app = this;
    this.buildScreen();
    this.worldEmitter.next(SpinAction.LOADING_ASSETS_END);
  }

  onSpinEnd = () => {
    this.running = false;
    this.worldEmitter.next(SpinAction.SPIN_END);
  }

  buildScreen() {
    const reelContainer = new PIXI.Container();
    this.reels = new Reels(this.conf.REEL_WIDTH, this.conf.REELS_COUNT, this.onSpinEnd);
    const SCALED = this.conf.SYMBOL_SIZE * this.reels.scale.x;
    const maskHeight = SCALED * this.conf.VISIBLE_SYMBOLS;
    const offsetTop = (this.screen.height - maskHeight) * 0.5;
    const reelsMask = new PIXI.Graphics();
    this.reels.y = offsetTop;
    reelsMask.beginFill(0x00FF00, .5);
    reelsMask.drawRect(0, offsetTop, this.screen.width, maskHeight);
    reelsMask.endFill();
    reelContainer.addChild(reelsMask)
    reelContainer.addChild(this.reels);
    this.reels.mask = reelsMask;
    this.stage.addChild(reelContainer);
  }

  startSpin() {
    if (this.running) return;
    this.running = true;
    this.reels.startSpin();
    this.worldEmitter.next(SpinAction.SPIN_START);
  }
}
