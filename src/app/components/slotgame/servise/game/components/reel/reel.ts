import * as PIXI from "pixi.js";
import GlobalStorage from "../../common/globalStorage";
import Symbol from "../symbol/symbol";

export default class Reel extends PIXI.Container {
  public blurFilter = new PIXI.BlurFilter();
  public symbols: Array<Symbol> = [];
  public currentPositionY: number = 0;
  public previousPositionY: number = 0;

  constructor(symbolsCount: number) {
    super();
    for (let i = 0; i < symbolsCount; i++) {
      const texture = this.getRandomTexture();
      const symbol = new Symbol(texture, GlobalStorage.configs.SYMBOL_SIZE);
      this.currentPositionY = i * GlobalStorage.configs.SYMBOL_SIZE;
      symbol.y = this.previousPositionY = this.currentPositionY;
      this.blurFilter.blurX = this.blurFilter.blurY = 0;
      this.filters = [this.blurFilter];
      this.symbols.push(symbol)
      this.addChild(symbol);
    }
  }

  getRandomTexture() {
    const rndTextureIndex = Math.floor(Math.random() * GlobalStorage.textures.length);
    return GlobalStorage.textures[rndTextureIndex];
  }

  updateSymbolsAnimation() {
    for (let j = 0; j < this.symbols.length; j++) {
      const currentSymbol = this.symbols[j];
      const prevY = currentSymbol.y;
      currentSymbol.y = (((this.currentPositionY + j) % this.symbols.length)-1) * GlobalStorage.configs.SYMBOL_SIZE;
      if (currentSymbol.y < 0 && prevY > GlobalStorage.configs.SYMBOL_SIZE) {
        // Detect going over and swap a texture.
        currentSymbol.texture = GlobalStorage.textures[Math.floor(Math.random() * GlobalStorage.textures.length)];
      }
    }
  }
}
