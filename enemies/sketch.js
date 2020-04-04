var skeleton1;
var skeleton2;
var flyingEye1;
var flyingEye2;
var mushroomEnemy1;
var mushroomEnemy2;
var goblinEnenemy1;
var goblinEnenemy2;

function setup () {
    createCanvas(1000, 1000);
}

function preload() {
    skeleton1 = new Skeleton();
    skeleton2 = new Skeleton();
    flyingEye1 = new FlyingEyeEnemy();
    flyingEye2 = new FlyingEyeEnemy();
    mushroomEnemy1 = new MushroomEnemy();
    mushroomEnemy2 = new MushroomEnemy();
    goblinEnenemy1 = new GoblinEnemy();
    goblinEnenemy2 = new GoblinEnemy();
    mushroomEnemy2.setState(EnemyState.MovingRight);
    flyingEye2.setState(EnemyState.MovingRight);
    skeleton2.setState(EnemyState.MovingRight);
    goblinEnenemy2.setState(EnemyState.MovingRight);
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
    var table = grid(0, 0, 200, 200, 4, 2);
    skeleton2.draw(table[0][0].x, table[0][0].y);
    skeleton1.draw(table[0][1].x, table[0][1].y);
    flyingEye1.draw(table[1][1].x, table[1][1].y);
    flyingEye2.draw(table[1][0].x, table[1][0].y);
    mushroomEnemy1.draw(table[2][1].x, table[2][1].y);
    mushroomEnemy2.draw(table[2][0].x, table[2][0].y);
    goblinEnenemy1.draw(table[3][1].x, table[3][1].y);
    goblinEnenemy2.draw(table[3][0].x, table[3][0].y);
}
