import * as PIXI from "pixi.js";
import Reel from "../reel/reel";
import {gsap} from "gsap";
import GlobalStorage from "../../common/globalStorage";

export default class Reels extends PIXI.Container {

  private spinEndCallBack: Function;
  private _reels: Array<Reel> = new Array<Reel>();
  private conf = GlobalStorage.configs;

  constructor(_reelWidth: number, count: number, _spinEndCallBack: Function) {
    super();
    this.spinEndCallBack = _spinEndCallBack;
    for (let i = 0; i < count; i++) {
      const reel = new Reel(this.conf.SYMBOLS_PER_REEL);
      this._reels.push(reel);
      reel.x = i * _reelWidth;
      this.addChild(reel);
    }
    const searchHeight = this.conf.SYMBOL_SIZE * this.conf.VISIBLE_SYMBOLS;
    const searchWidth = count * _reelWidth;
    const appWidth = GlobalStorage.app.view.width;
    const appHeight = GlobalStorage.app.view.height;
    const scaleCof = Math.min(appWidth / searchWidth, appHeight / searchHeight);
    this.scale.x = this.scale.y = scaleCof
    this.x = Math.round((appWidth - this.width) * 0.5);
  }

  startSpin() {
    for (let i = 0; i < this._reels.length; i++) {
      const currentReel = this._reels[i];
      const extra = Math.floor(Math.random() * this.conf.EXTRA_REEL_STEPS);
      const extraPhase = i * this.conf.REEL_SPEED_GROW;
      const phase = currentReel.currentPositionY + this.conf.REEL_STEP_HEIGHT + extraPhase + extra;
      const extraTime = extra * this.conf.REEL_TIME_GROW;
      const reelIndexTime = i * this.conf.REEL_TIME_GROW;
      const time = (this.conf.MIN_SPIN_TIME + reelIndexTime + extraTime) / 1000;
      const _onComplete = i === this._reels.length - 1 ? this.reelsComplete : undefined;
      // Backout function from tweenjs.
      const backout = (amount: number) => {
        return (t: number) => (--t * t * ((amount + 1) * t + amount) + 1);
      }
      gsap.to(currentReel, {
        currentPositionY: phase,
        duration: time,
        ease: backout(0.5),
        onComplete: _onComplete,
        onUpdate: this.updateAnimation
      })
    }
  }

  reelsComplete = () => {
    this.spinEndCallBack();
  }

  private updateAnimation = () => {
    for (let i = 0; i < this._reels.length; i++) {
      const currentReel = this._reels[i];
      // Update blur filter based on speed.
      const blurIndex = Math.abs(currentReel.currentPositionY - currentReel.previousPositionY)
      currentReel.blurFilter.blurY = blurIndex * this.conf.BLUR_MULTIPLY;
      currentReel.previousPositionY = currentReel.currentPositionY;
      // Update symbol positions on reel.
      currentReel.updateSymbolsAnimation();
    }
  }
}
