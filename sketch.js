var gameChar_x;
var gameChar_y;
var item_x;
var item_y;
var canyon_x;
var canyon_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isFallingInCanyon;
var isPlummeting;
var jumpHeight;
var isFound;
var BACKGROUND_COLOR = [100,155,255];
var adventurer;
var appleItem;
var ringItem;
var smallTree;
var bigTree;
var canyon;
var canyonWidth;
var lastDirection;
var LastDirection = {
	Left: 1,
	Right: 2,
};
var trees_x;
var clouds_x;
var clouds_y;
var scrollPos;
var actualPos;
var aCloud;
var bCloud;
var canyons_x;
var mountain;
var collectables;
var game_score;
var fontRegular;
var lives;
var flagpole;
var ballItem;

function setup() {
	createCanvas(1024, 640);
	lives = 3;
	floorPos_y = height * 3/4;
	startGame();
}

function startGame() {
	jumpHeight = floorPos_y - 200;
	gameChar_x = width/2;
	actualGameChar_x = gameChar_x;
	scrollPos = 0;
	gameChar_y = floorPos_y;
	item_x = gameChar_x - 50;
	item_y = floorPos_y;
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	isFound = false;
	isFallingInCanyon = false;
	lastDirection = LastDirection.Left;
	canyon_x = gameChar_x + 200;
	canyon_y = floorPos_y;
	canyonWidth = 150;
	canyon = new Canyon(canyonWidth,  height - floorPos_y, BACKGROUND_COLOR);
	trees_x = [-200, 150, 900, 1500];
	clouds_x = [-450, 200, 700, 1600];
	clouds_y = 300;
	game_score = 0;
	canyons_x = [-60, 700, 1200];
	mountains_x = [-900, 430, 1800];
	flagpole = {x: 2000, isReached: false};
	collectables = [
		{x: 100, isFound: false},
		{x: 1400, isFound: false},
		{x: 800, isFound: false},
		{x: 400, isFound: false}
	];
}

function preload() {
	adventurer = new Adventurer();
	appleItem = new AppleCollectableItem();
	ringItem = new SilverRingCollectableItem();
	ballItem = new BallCollectableItem();
	smallTree = new SmallTree();
	bigTree = new BigTree();
	aCloud = new ACloud();
	bCloud = new BCloud();
	mountain = new Mountain();
	fontRegular = loadFont('assets/PressStart2P-Regular.ttf');
	adventurer.load();
	appleItem.load();
	smallTree.load();
	bigTree.load();
	aCloud.load();
	bCloud.load();
	mountain.load();
	ringItem.load();
	ballItem.load();
}

function draw() {
	if (lives === 0) {
		drawInstructions('Game over. Press space to continue.');
		return;
	}
	if (flagpole.isReached) {
		drawInstructions('Level complete. Press space to continue.');
		return;
	}
	background(BACKGROUND_COLOR)
	drawGround();
	push();
	translate(scrollPos, 0);
	setGameCharState();
	/**
	 * for loop could be used instead of .forEach, but .forEach is better
	 * because it's less error prone. We don't need to track .length and create
	 * a variable for tracking the current index.
	 */
	mountains_x.forEach(function(x) {
		mountain.draw(x, floorPos_y);
	});
	clouds_x.forEach(function(x, index) {
		var cloud = index % 2 ? aCloud : bCloud;
		cloud.draw(x, clouds_y)
	});
	trees_x.forEach(function(x, index) {
		var treeObject = index % 2 ? smallTree : bigTree
		treeObject.draw(x, floorPos_y)
	});
	collectables.forEach(function(item, index) {
		if (!item.isFound) {
			var object = index % 2 ? appleItem : ringItem;
			object.draw(item.x, floorPos_y)
		}
	});
	canyons_x.forEach(function(x) {
		canyon.draw(x, floorPos_y);
	});
	drawFlagpole();
	pop();
	
	adventurer.draw(gameChar_x, gameChar_y);
	drawGameScore();
	drawLives();

	processInteractions();
	checkPlayerDie();
	checkFlagpole();
}

function drawInstructions(message) {
	textSize(16);
	textFont(fontRegular);
	textAlign(CENTER);
	fill(0);
	text(message, (width / 2), 200);
}

function drawGround() {
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y);
}

function drawFlagpole() {
	noStroke();
	fill(200, 0, 0);
	rect(flagpole.x, floorPos_y - 200, 100, 50);
	strokeWeight(4);
	stroke(0, 0, 0);
	line(flagpole.x, floorPos_y - 200, flagpole.x, floorPos_y);
}


function drawLives() {
	for(var i = 0; i < lives; i++) {
		ballItem.draw(width - 120 + (45 * i), 40)
	}
}

function drawGameScore() {
	textSize(16);
	fill(0);
	textFont(fontRegular)
	noStroke();
    text('SCORE:' + game_score + ' LIVES:', width - 370, 32);
}

function processCollectablesInteractions() {
	collectables.forEach(function(item) {
		if (!item.isFound && dist(actualGameChar_x, gameChar_y, item.x, floorPos_y) < 10) {
			item.isFound = true;
			game_score += 1;
		}
	});
}

function checkFlagpole() {
	if (actualGameChar_x > flagpole.x) {
		flagpole.isReached = true;
	}
}

function checkPlayerDie() {
	if (gameChar_y > height) {
		if (lives > 0) {
			lives -= 1;
			startGame();
		}
	}
}

function processInteractions() {
	processCollectablesInteractions();
	if (isFallingInCanyon) {
		isFalling = true;
		gameChar_y += 10;
		return;
	}
	if (gameChar_y === floorPos_y) {
		var canyon = canyons_x.find(function(x) {
			return dist(actualGameChar_x, gameChar_y, x, floorPos_y) < (canyonWidth / 2);
		})
		if (canyon) {
			isFalling = true;
			isFallingInCanyon = true;
			return;
		}
	}
	if (isRight) {
		actualGameChar_x += 5;
		if(gameChar_x < width * 0.8) {
			gameChar_x  += 5;
		} else {
			scrollPos -= 5; // negative for moving against the background
		}
	}
	if (isLeft) {
		actualGameChar_x -= 5;
		if(gameChar_x > width * 0.2) {
			gameChar_x -= 5;
		} else {
			scrollPos += 5;
		}
	}
	if (gameChar_y === jumpHeight) {
		isPlummeting = false;
		isFalling = true;
	}
	if (gameChar_y === floorPos_y) {
		isFalling = false; 
	}
	if (isPlummeting) {
		gameChar_y -= 10
	}
	if (isFalling) {
		gameChar_y += 10
	}
}

function setGameCharState() {
	//the game character
	if(isLeft && isFalling)
	{
		adventurer.setState(Adventurer.States.FallingLeft);
	}
	else if(isRight && isFalling)
	{
		adventurer.setState(Adventurer.States.FallingRight);
	}
	else if(isLeft && isPlummeting)
	{
		adventurer.setState(Adventurer.States.PlummetingLeft);
	}
	else if(isRight && isPlummeting)
	{
		adventurer.setState(Adventurer.States.PlummetingRight);
	} 
	else if(isLeft)
	{
		adventurer.setState(Adventurer.States.WalkingLeft);
	}
	else if(isRight)
	{
		adventurer.setState(Adventurer.States.WalkingRight);
	}
	else if(isFalling)
	{
		adventurer.setState(
			lastDirection === LastDirection.Left
			? Adventurer.States.FallingLeft
			: Adventurer.States.FallingRight);
	}
	else if(isPlummeting)
	{
		adventurer.setState(
			lastDirection === LastDirection.Left
			? Adventurer.States.PlummetingLeft
			: Adventurer.States.PlummetingRight);
	}
	else
	{
		adventurer.setState(
			lastDirection === LastDirection.Left
				? Adventurer.States.FacingLeft
				: Adventurer.States.FacingRight);
	}
}

var LEFT_ARROW_CODE = 37;
var RIGHT_ARROW_CODE = 39;
var SPACEBAR_CODE = 32;

function keyPressed()
{
	if (keyCode === LEFT_ARROW_CODE) {
		isLeft = true;
		lastDirection = LastDirection.Left;
	}
	if (keyCode === RIGHT_ARROW_CODE) {
		isRight = true;
		lastDirection = LastDirection.Right;
	}
	if (keyCode === SPACEBAR_CODE && !(isPlummeting || isFalling)) {
		adventurer.resetPlummetingFrame();
		isPlummeting = true;
	}
}

function keyReleased()
{
	if (keyCode === LEFT_ARROW_CODE) {
		isLeft = false;
	}
	if (keyCode === RIGHT_ARROW_CODE) {
		isRight = false;
	}
}
