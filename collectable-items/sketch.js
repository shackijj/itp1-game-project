var appleItem;
var silverRingItem;
var ballItem;
var item_x;
var item_y;


function setup () {
    createCanvas(1000, 1000);
}

function preload() {
    appleItem = new AppleCollectableItem();
    silverRingItem = new SilverRingCollectableItem();
    ballItem = new BallCollectableItem();
}

function grid(x, y, cellWidth, cellHeight, rows, colums) {
    var columnIndex = 0;
    var result = [];
    for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
        result.push([]);
        for(var columnIndex = 0; columnIndex < colums; columnIndex++) {
            stroke(100);
            noFill();
            const cellX = x + columnIndex * cellWidth;
            const cellY = y + rowIndex * cellHeight;
            rect(cellX, cellY, cellWidth, cellHeight);
            result[rowIndex].push({x: cellX + cellWidth / 2, y: cellY + cellHeight});
        }
    }
    return result;
}

function draw () {
    background(255);
    var table = grid(0, 0, 100, 100, 1, 3);
    appleItem.draw(table[0][0].x, table[0][0].y);
    silverRingItem.draw(table[0][1].x, table[0][1].y);
    ballItem.draw(table[0][2].x, table[0][2].y);
}
