var aCloud;
var bCloud;
var item_x;
var item_y;


function setup () {
    createCanvas(1200, 1000);
}

function preload() {
    aCloud = new ACloud();
    bCloud = new BCloud();
}

function draw () {
    background(255);
    // Standing, facing frontwards

    stroke(100);
    noFill();
    rect(20, 60, 512, 512);
    noStroke();
    fill(0);
    text('1. Cloud A', 20, 592);
    item_x = 276;
    item_y = 572;
    aCloud.draw(item_x, item_y);

    // Jumping facing forwards
    stroke(100);
    noFill();
    rect(552, 60, 512, 512);
    noStroke();
    fill(0);
    text('2. Cloud B', 552, 592);

    item_x = 808;
    item_y = 572;
    bCloud.draw(item_x, item_y);
}
