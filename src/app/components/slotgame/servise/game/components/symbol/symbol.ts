import * as PIXI from "pixi.js";

export default class Symbol extends PIXI.Container {
  private symbolTexture:PIXI.Sprite;
  constructor(_texture:PIXI.Texture, _size?: number) {
    super();
    this.symbolTexture  = new PIXI.Sprite(_texture);
    this.addChild(this.symbolTexture);
    if (!_size){ _size=this.width;}

    this.scale.x = this.scale.y = Math.min(_size / this.width, _size / this.height);
    this.x = Math.round((_size - this.width) * 0.5);

  }

  set texture(_texture:PIXI.Texture){
    this.symbolTexture.texture=_texture;
  }
}
