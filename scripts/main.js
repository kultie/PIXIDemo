
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
    cat = new Kultie.Entity(catRes, "cat",{
        "idle": [ 0, 1, 2, 3 ],
        "walk": [ 4, 5, 6, 7, 8, 9, 10, 11 ],
        "start_jump": [ 12, 13 ],
        "air": [ 14, 15 ],
        "end_jump": [ 16, 17, 18, 19 ],
        "ground_punch": [ 74, 75, 76, 77, 78, 79, 80, 81, 82 ],
        "ground_kick": [ 83, 84, 84, 84, 84, 84, 86, 88, 84, 91, 92, 84, 97, 98, 84, 86, 88, 84, 91, 92, 84, 97, 98, 99, 99, 100 ]
    });
    app.stage.addChild(cat);

    app.ticker.add(update);
}

function update(delta){
    cat.update();
}


