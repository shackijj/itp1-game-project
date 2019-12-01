/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var jumpHeight;
var adventurer;
var lastDirection;
var LastDirection = {
	Left: 1,
	Right: 2,
};
function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	jumpHeight = floorPos_y - 100;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	lastDirection = LastDirection.Left;
}

function preload() {
	adventurer = new Adventurer();
}


function draw()
{
	adventurer.onFrameChange(frameCount);
	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


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
		adventurer.setState(Adventurer.States.FallingLeft);
	}
	else
	{
		adventurer.setState(
			lastDirection === LastDirection.Left
				? Adventurer.States.FacingLeft
				: Adventurer.States.FacingRight);
	}
	adventurer.draw(gameChar_x, gameChar_y);
	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
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
