var Kultie = Kultie || {};

Kultie.Entity = class extends PIXI.Sprite{
    constructor(texture, prefix){
        super(texture);
        this._prefix = prefix;
        this._animData = {
            "idle": [ 0, 1, 2, 3 ],
            "walk": [ 4, 5, 6, 7, 8, 9, 10, 11 ],
            "start_jump": [ 12, 13 ],
            "air": [ 14, 15 ],
            "end_jump": [ 16, 17, 18, 19 ],
            "ground_punch": [ 74, 75, 76, 77, 78, 79, 80, 81, 82 ],
            "ground_kick": [ 83, 84, 84, 84, 84, 84, 86, 88, 84, 91, 92, 84, 97, 98, 84, 86, 88, 84, 91, 92, 84, 97, 98, 99, 99, 100 ]
        }
        this._sheet = this._animData["idle"];
        this._animation = new Kultie.AnimationSystem(this._sheet.length, true, 12);
    }

    update(){
        this._animation.update();
        this.setTexture(this.getSprite());
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
