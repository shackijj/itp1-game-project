var mushroom1;
var mushroom2;

function setup () {
    createCanvas(1000, 1000);
}

function preload() {
    mushroom1 = new MushroomEnemy();
    mushroom2 = new MushroomEnemy();
    mushroom2.setState(MushroomEnemyState.MovingRight);
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
    var table = grid(0, 0, 200, 200, 1, 2);
    mushroom2.draw(table[0][0].x, table[0][0].y);
    mushroom1.draw(table[0][1].x, table[0][1].y);
}
