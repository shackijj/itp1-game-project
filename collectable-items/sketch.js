var appleItem = new AppleCollectableItem();
var silverRingItem = new SilverRingCollectableItem();
var item_x;
var item_y;


function setup () {
    createCanvas(1000, 1000);
}

function preload() {
    appleItem.load();
    silverRingItem.load();
}

function draw () {
    background(255);
    // Standing, facing frontwards

    stroke(100);
    noFill();
    rect(20, 60, 200, 148);
    noStroke();
    fill(0);
    text('1. Apple', 20, 228);
    item_x = 120;
    item_y = 208;
    appleItem.draw(item_x, item_y);

    // Jumping facing forwards
    stroke(100);
    noFill();
    rect(240, 60, 200, 148);
    noStroke();
    fill(0);
    text('2. Ring', 240, 228);

    item_x = 340;
    item_y = 208;
    silverRingItem.draw(item_x, item_y);
}
