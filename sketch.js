// constants
var BACKGROUND_COLOR = [100,155,255];
var CANYON_WIDTH = 150;
var TREES_X = [-200, 150, 900, 1500];
var CLOUDS_X = [-450, 200, 700, 1600];
var CANYONS_X = [-60, 700, 1200];
var MOUNTAINS_X = [-900, 430, 1800];
var CLOUDS_POSTION_Y = 300;

// enums
var LastDirection = {
	Left: 1,
	Right: 2,
};

// variables
var player;
var floorPosY;
var isLeft;
var isRight;
var isFalling;
var isFallingInCanyon;
var isPlummeting;
var jumpHeight;
var isFound;
var adventurer;
var appleItem;
var ringItem;
var smallTree;
var bigTree;
var canyon;
var clouds_y;
var scrollPos;
var actualPos;
var aCloud;
var bCloud;
var collectables;
var gameScore;
var fontRegular;
var lives;
var flagpole;
var ballItem;

function setup() {
	createCanvas(1024, 640);
	lives = 3;
	floorPosY = height * 3/4;
	startGame();
}

function startGame() {
	player = {
		x: width / 2,
		y: floorPosY,
		actual: {
			x: width / 2
		}
	};
	jumpHeight = floorPosY - 200;
	scrollPos = 0;
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	isFound = false;
	isFallingInCanyon = false;
	lastDirection = LastDirection.Left;
	canyon = {
		x: player.x + 200,
		y: floorPosY
	};
	canyon = new Canyon(CANYON_WIDTH,  height - floorPosY, BACKGROUND_COLOR);
	gameScore = 0;
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

	drawMountains();
	drawClouds();
	drawTrees();
	drawCollectables();
	drawCanyons();
	drawFlagpole();

	pop();
	
	adventurer.draw(player.x, player.y);
	drawGameScore();
	drawLives();

	processInteractions();
	checkPlayerDie();
	checkFlagpole();
}

function drawCanyons() {
	CANYONS_X.forEach(function(x) {
		canyon.draw(x, floorPosY);
	});
}

function drawCollectables() {
	collectables.forEach(function(item, index) {
		if (!item.isFound) {
			var object = index % 2 ? appleItem : ringItem;
			object.draw(item.x, floorPosY)
		}
	});
}

function drawTrees() {
	TREES_X.forEach(function(x, index) {
		var treeObject = index % 2 ? smallTree : bigTree
		treeObject.draw(x, floorPosY)
	});
}

function drawMountains() {
	MOUNTAINS_X.forEach(function(x) {
		mountain.draw(x, floorPosY);
	});
}

function drawClouds() {
	CLOUDS_X.forEach(function(x, index) {
		var cloud = index % 2 ? aCloud : bCloud;
		cloud.draw(x, CLOUDS_POSTION_Y);
	});
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
	rect(0, floorPosY, width, height - floorPosY);
}

function drawFlagpole() {
	noStroke();
	fill(200, 0, 0);
	rect(flagpole.x, floorPosY - 200, 100, 50);
	strokeWeight(4);
	stroke(0, 0, 0);
	line(flagpole.x, floorPosY - 200, flagpole.x, floorPosY);
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
    text('SCORE:' + gameScore + ' LIVES:', width - 370, 32);
}

function processCollectablesInteractions() {
	collectables.forEach(function(item) {
		if (!item.isFound && dist(player.actual.x, player.y, item.x, floorPosY) < 10) {
			item.isFound = true;
			gameScore += 1;
		}
	});
}

function checkFlagpole() {
	if (player.actual.x > flagpole.x) {
		flagpole.isReached = true;
	}
}

function checkPlayerDie() {
	if (player.y > height) {
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
		player.y += 10;
		return;
	}
	if (player.y === floorPosY) {
		var canyon = CANYONS_X.find(function(x) {
			return dist(player.actual.x, player.y, x, floorPosY) < (CANYON_WIDTH / 2);
		})
		if (canyon) {
			isFalling = true;
			isFallingInCanyon = true;
			return;
		}
	}
	if (isRight) {
		player.actual.x += 5;
		if (player.x < width * 0.8) {
			player.x  += 5;
		} else {
			scrollPos -= 5; // negative for moving against the background
		}
	}
	if (isLeft) {
		player.actual.x -= 5;
		if(player.x > width * 0.2) {
			player.x -= 5;
		} else {
			scrollPos += 5;
		}
	}
	if (player.y === jumpHeight) {
		isPlummeting = false;
		isFalling = true;
	}
	if (player.y === floorPosY) {
		isFalling = false; 
	}
	if (isPlummeting) {
		player.y -= 10;
	}
	if (isFalling) {
		player.y += 10;
	}
}

function setGameCharState() {
	if(isLeft && isFalling) {
		adventurer.setState(Adventurer.States.FallingLeft);
	} else if(isRight && isFalling) {
		adventurer.setState(Adventurer.States.FallingRight);
	} else if(isLeft && isPlummeting) {
		adventurer.setState(Adventurer.States.PlummetingLeft);
	} else if(isRight && isPlummeting) {
		adventurer.setState(Adventurer.States.PlummetingRight);
	} else if(isLeft) {
		adventurer.setState(Adventurer.States.WalkingLeft);
	} else if(isRight) {
		adventurer.setState(Adventurer.States.WalkingRight);
	} else if(isFalling) {
		adventurer.setState(
			lastDirection === LastDirection.Left
			? Adventurer.States.FallingLeft
			: Adventurer.States.FallingRight);
	} else if(isPlummeting) {
		adventurer.setState(
			lastDirection === LastDirection.Left
			? Adventurer.States.PlummetingLeft
			: Adventurer.States.PlummetingRight);
	} else {
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
