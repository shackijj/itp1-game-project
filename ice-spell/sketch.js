
var gif_loadImg, gif_createImg;




function setup () {
    createCanvas(1000, 1000);
    // image(img, 0, 0);
}

function preload() {
    img = loadImage("/ice-spell/disintegrate02.png");
}



function draw () {
    background(255);

    image(img, 0, 0);
    img.position(0, 0);
    // var table = grid(0, 0, 200, 200, 1, 2);
    // flyingEye2.draw(table[0][0].x, table[0][0].y);
    // flyingEye1.draw(table[0][1].x, table[0][1].y);
}
