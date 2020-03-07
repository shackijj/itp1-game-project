var tileset;
var platform;
var tableForTiles;
var table;

function setup () {
    createCanvas(1000, 1000);
    tableForTiles = new Table(0, 0, 16, 16, 6, 10);
    table = new Table(0, 100, 256, 256, 1, 1);
    platform = new Platform(table.grid[0][0].x - 64, table.grid[0][0].y, 128);
}

function preload() {
    tileset = loadImage('./Tileset.png');
}

function Table(x, y, cellWidth, cellHeight, rows, colums) {
    var columnIndex = 0;
    this.grid = [];
    for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
        this.grid.push([]);
        for(var columnIndex = 0; columnIndex < colums; columnIndex++) {
            const cellX = x + columnIndex * cellWidth;
            const cellY = y + rowIndex * cellHeight;
            this.grid[rowIndex].push({x: cellX + cellWidth / 2, y: cellY});
        }
    }
    this.draw = function() {
        for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
            for(var columnIndex = 0; columnIndex < colums; columnIndex++) {
                stroke(100);
                noFill();
                const cellX = x + columnIndex * cellWidth;
                const cellY = y + rowIndex * cellHeight;
                rect(cellX, cellY, cellWidth, cellHeight);
            }
        }
    };
}

function draw () {
    background(255);
    image(tileset, 0, 0)
    tableForTiles.draw();
    table.draw();
    platform.draw();
}
