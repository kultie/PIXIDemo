
var Kultie = Kultie || {}

const app = new PIXI.Application({
    width: 600,
    height: 600
});

document.body.appendChild(app.view);
const catRes = "images/cat/cat.json"
let cat;
setup();

function setup(){
    cat = new Kultie.Entity(catRes, "cat");
    app.stage.addChild(cat);

    app.ticker.add(update);
}

function update(delta){
    cat.update();
}


