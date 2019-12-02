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
var adventurer = new Adventurer();
var appleItem = new AppleCollectableItem();
var canyon;
var canyonWidth = 150;
var lastDirection;
var LastDirection = {
	Left: 1,
	Right: 2,
};

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	jumpHeight = floorPos_y - 200;
	gameChar_x = width/2;
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
	canyon = new Canyon(canyonWidth,  height - floorPos_y, BACKGROUND_COLOR);
}

function preload() {
	adventurer.load();
	appleItem.load();
}


function draw()
{
	adventurer.onFrameChange(frameCount);
	///////////DRAWING CODE//////////

	background(BACKGROUND_COLOR); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon


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
	if (!isFound) {
		appleItem.draw(item_x, item_y);
	}
	canyon.draw(canyon_x, canyon_y);
	adventurer.draw(gameChar_x, gameChar_y);
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
	if (isFallingInCanyon) {
		isFalling = true;
		gameChar_y += 10;
		return;
	}
	if (gameChar_y === floorPos_y && dist(gameChar_x, gameChar_y, canyon_x, canyon_y) < (canyonWidth / 2)) {
		isFalling = true;
		isFallingInCanyon = true;
		return;
	}
	if (isRight) {
		gameChar_x += 5;
	}
	if (isLeft) {
		gameChar_x -= 5;
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

	if (!isFound && dist(gameChar_x, gameChar_y, item_x, item_y) < 16) {
		isFound = true;
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
