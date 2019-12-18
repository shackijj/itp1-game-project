var mountain = new Mountain();
var item_x;
var item_y;


function setup () {
    createCanvas(1200, 1000);
}

function preload() {
    mountain.load();
}

function draw () {
    background(255);
    // Standing, facing frontwards

    stroke(100);
    noFill();
    rect(20, 60, 512, 512);
    noStroke();
    fill(0);
    text('1. Mountain', 20, 592);
    item_x = 276;
    item_y = 572;
    mountain.draw(item_x, item_y);
}
