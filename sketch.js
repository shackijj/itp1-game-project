/*

The Game Project

Week 3

Game interaction

*/


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
var collectables_x;

function setup()
{
	createCanvas(1024, 640);
	floorPos_y = height * 3/4;
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

	canyons_x = [-60, 700, 1200];
	mountains_x = [-900, 430, 1800];
	collectables_x = [100, 1400, 800, 400];
}

function preload() {
	adventurer = new Adventurer();
	appleItem = new AppleCollectableItem();
	ringItem = new SilverRingCollectableItem();
	smallTree = new SmallTree();
	bigTree = new BigTree();
	aCloud = new ACloud();
	bCloud = new BCloud();
	mountain = new Mountain();
	adventurer.load();
	appleItem.load();
	smallTree.load();
	bigTree.load();
	aCloud.load();
	bCloud.load();
	mountain.load();
	ringItem.load();
}


function draw()
{
	background(BACKGROUND_COLOR)
	adventurer.onFrameChange(frameCount);
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground
	push();
	translate(scrollPos, 0);
	setGameCharState();
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
	collectables_x.forEach(function(x, index) {
		var object = index % 2 ? appleItem : ringItem;
		object.draw(x, floorPos_y)
	});
	canyons_x.forEach(function(x) {
		canyon.draw(x, floorPos_y);
	});
	pop();
	adventurer.draw(gameChar_x, gameChar_y);

	processInteractions();
}

function processInteractions() {
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
