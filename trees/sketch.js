var smallTree = new SmallTree();
var bigTree = new BigTree();
var item_x;
var item_y;


function setup () {
    createCanvas(1200, 1000);
}

function preload() {
    smallTree.load();
    bigTree.load();
}

function draw () {
    background(255);
    // Standing, facing frontwards

    stroke(100);
    noFill();
    rect(20, 60, 512, 512);
    noStroke();
    fill(0);
    text('1. Tree A', 20, 592);
    item_x = 276;
    item_y = 572;
    smallTree.draw(item_x, item_y);

    // Jumping facing forwards
    stroke(100);
    noFill();
    rect(552, 60, 512, 512);
    noStroke();
    fill(0);
    text('2. Three B', 552, 592);

    item_x = 808;
    item_y = 572;
    bigTree.draw(item_x, item_y);
}
