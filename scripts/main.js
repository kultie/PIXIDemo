let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;
var Kultie = Kultie || {}

const app = new PIXI.Application({
    width: 600,
    height: 600
});

document.body.appendChild(app.view);
const catRes = "images/cat/cat.json"
let cat;

loader
  .add(catRes)
  .load(setup);

function setup(){
    let texture = TextureCache["cat0.png"];
    cat = new Kultie.Entity(texture, "cat");
    app.stage.addChild(cat);

    app.ticker.add(update);
}

function update(delta){
    cat.update();
}


