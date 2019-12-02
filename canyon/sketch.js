var canyon = new Canyon(50, 500, [0, 0, 255]);

function setup () {
    createCanvas(1000, 1000);
}

function draw () {
    background(255);

    stroke(100);
    noFill();
    rect(20, 60, 200, 148);
    noStroke();
    fill(0);
    text('1. Canyon', 20, 228);
    item_x = 120;
    item_y = 208;
    canyon.draw(item_x, item_y);
}
