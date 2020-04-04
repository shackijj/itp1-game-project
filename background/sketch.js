var backBackground = new BackBackground(1024, 640, 1);
var frontBackground = new FrontBackground(1024, 640, 1);
var cloudsFrontBackground = new CloudsFrontBackground(1024, 640, 1);
var cloudsBackBackground = new CloudsBackBackground(1024, 640, 1);
var item_x;
var item_y;


function setup () {
    createCanvas(1200, 3000);
}

function preload() {
    backBackground.load();
    frontBackground.load();
    cloudsFrontBackground.load();
    cloudsBackBackground.load()
}

var cellWidth = 1024;
var cellHeight = 640;
var topOffset = 60;
var leftOffset = 20;
var spaceForText = 30;
var textMargin = 20;

function draw () {
    background(255);

    stroke(100);
    noFill();
    rect(leftOffset, topOffset, cellWidth, cellHeight);
    noStroke();
    fill(0);
    text('1. BackBackground', leftOffset, topOffset + cellHeight + textMargin);
    item_x = leftOffset;
    item_y = topOffset;
    backBackground.draw(item_x, item_y);

    stroke(100);
    noFill();
    rect(leftOffset, topOffset + (spaceForText + cellHeight) * 1, cellWidth, cellHeight);
    noStroke();
    fill(0);
    text('2. BackBackground', leftOffset, topOffset + spaceForText + cellHeight * 2 + textMargin);
    item_x = leftOffset;
    item_y = topOffset + (spaceForText + cellHeight) * 1;
    frontBackground.draw(item_x, item_y);

    stroke(100);
    noFill();
    rect(leftOffset, topOffset + (spaceForText + cellHeight) * 2, cellWidth, cellHeight);
    noStroke();
    fill(0);
    text('3. BackBackground', leftOffset, topOffset + spaceForText * 2 + cellHeight * 3 + textMargin);
    item_x = leftOffset;
    item_y = topOffset + (spaceForText + cellHeight) * 2;
    cloudsFrontBackground.draw(item_x, item_y);

    stroke(100);
    noFill();
    rect(leftOffset, topOffset + (spaceForText + cellHeight) * 3, cellWidth, cellHeight);
    noStroke();
    fill(0);
    text('4. BackBackground', leftOffset, topOffset + spaceForText * 3 + cellHeight * 4 + textMargin);
    item_x = leftOffset;
    item_y = topOffset + (spaceForText + cellHeight) * 3;
    cloudsBackBackground.draw(item_x, item_y);
}
