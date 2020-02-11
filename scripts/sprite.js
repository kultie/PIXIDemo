let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

var Kultie = Kultie || {};

Kultie.Entity = class extends PIXI.Sprite{
    constructor(source, prefix, animData){
        super();
        loader.add(source).load(this.spriteReady.bind(this));
        this._prefix = prefix;
        this._isReady = false;
        this._animData = animData;
        this._sheet = this._animData["idle"];
        this._animation = new Kultie.AnimationSystem(this._sheet.length, true, 12);
    }

    update(){
        if(this._isReady){
            this._animation.update();
            this.texture = this.getSprite();
        }        
    }

    getSprite(){
        let animIndex = this._animation.index();
        let sheetIndex = this._sheet[animIndex];
        let texture = TextureCache[this._prefix + String(sheetIndex) + ".png"];
        return texture
    }

    requestAnimation(name, resetIndex, loop, interval){
        this._sheet = this._animData[name];
        this._animation.setLoop(loop);
        this._animation.setInterval(interval);
        this._animation.setMaxFrame(this._sheet.length);
        if(resetIndex){
            this._animation.resetIndex();
        }
    }

    spriteReady(){
        this._isReady = true;
    }

    isReady(){
        return this._isReady;
    }
}

Kultie.AnimationSystem = class {
  constructor(maxFrames, loop, interval) {
    this._maxFrames = maxFrames;
    this._loop = loop;
    this._interval = interval;
    this._frameCount = 0;
    this._index = 0;
  }

  resetIndex(){
      this._index = 0;
  }

  setMaxFrame(value) {
    this._maxFrames = value;
  }

  setLoop(value) {
    this._loop = value;
  }

  setInterval(value) {
    this._interval = value;
  }

  setIndex(value) {
    this._index = index;
  }

  index() {
    return this._index;
  }

  update() {
    this._frameCount++;
    if (this._frameCount >= this._interval) {
      this._index++;
      this._frameCount = 0;
      if (this._index >= this._maxFrames) {
        if (this._loop) {
          this._index = 0;
        } else {
          this._index = this._maxFrames - 1;
        }
      }
    }
  }

  isFinished() {
    return !this._loop && this._index == this._maxFrames - 1;
  }
};
