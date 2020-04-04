/**
 * Extenstion 1 Add advanced graphics
 * 
 * As to add advanced graphic I used sprites (https://en.wikipedia.org/wiki/Sprite_(computer_graphics))
 * It means that images are used for representing object in the game world. The main advantage of
 * using sprites is that we can use images created in a graphics editor rather than drawing them
 * using code. It significally reduces amout of code.
 * 
 * Spritesheet animation allowed to me to make the game characted looking alive.
 * See the implementation in adventurer/adventurer.js file. The principle behind
 * this technique is the same as used in usual animation. An image used for
 * drawing the game character is changed over a constant time interval.
 * 
 * The most difficult thing was to find images because there is a lot of the on the Internet.
 * I used https://itch.io/ website because images there are grouped into categories and 
 * most of images are free.
 */

/**
 * Extension 3 Create platforms
 * 
 * First, I created a platform class (platform/platform.js). Then, removed floor and canyons
 * with platforms. So, now if a game characted is not standing on a platform his is falling.
 * This allowed me to use sprites for drawing background of the game.
 * 
 * Second, I added two variables for platforms platformsBackground and platformsForeground as to
 * draw them on top of each other. It's useful for creating hills where a game char can jump onto.
 * 
 * This extension was not hard to implement because the material provided in the lecure 
 * is very helpful.
 */

// constants
var BACKGROUND_COLOR = [100,155,255];
var CANYON_WIDTH = 150;
var TREES_X = [-200, 150, 900, 3100];
var CLOUDS_X = [-450, 200, 700, 1600];
var CLOUDS_POSTION_Y = 300;
var CANVAS_WIDTH = 1024;
var CANVAS_HEIGHT = 640;
var JUMP_ACCEL = 200;

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
const platforms = [];
var platformsBackground;
var platformsForeground;
var level;
var sounds;
var gameState;
var skeleton;
var enemies;
var spells;

function setup() {
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	lives = 3;
	floorPosY = height * 3/4;
	startGame();
    spells = new SpellContainer();
}

function startGame() {
    gameState = 1 ;
	player = {
		x: width / 2,
		y: floorPosY,
		jumpAccel: 0,
		actual: {
			x: width / 2
		},
		height: adventurer.height
	};
	jumpHeight = floorPosY - 200;
	scrollPos = 0;
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	isFound = false;
	lastDirection = LastDirection.Left;
	platformsBackground = [
		new Platform(300, floorPosY - 120, 64 * 3),
	];
	platformsForeground = [
		new Platform(-1000, floorPosY, 64 * 9),
		new Platform(-300, floorPosY, 64 * 14 ),
		new Platform(750, floorPosY, 300),
		new Platform(
			1200,
			floorPosY - 50,
			64 * 3, {
				range: {
					y: {
						min: floorPosY - 200,
						max: floorPosY
					},
				},
			}
		),
		new Platform(
			1600,
			floorPosY,
			1000, {
				range: {
					x: {
						min: 1400,
						max: 1600 + 300
					}
				}
			}
		),
		new Platform(3000, floorPosY, 1000),
	];
	platforms.splice(0, platforms.length)
	platforms.push(...platformsBackground)
	platforms.push(...platformsForeground);
	gameScore = 0;
	flagpole = {x: 3600, isReached: false};
	collectables = [
		{x: 100, y: floorPosY, isFound: false},
		{x: 3100, y: floorPosY, isFound: false},
		{x: 800, y: floorPosY, isFound: false},
		{x: 375, y: floorPosY - 120, isFound: false}
	];

	enemies = [
		{x: 100, y: floorPosY, direction: -1, range: 50, curStep: 0}
	]
}




function preload() {
    level = 1;
	adventurer = new Adventurer();
	appleItem = new AppleCollectableItem();
	ringItem = new SilverRingCollectableItem();
	ballItem = new BallCollectableItem();
	smallTree = new SmallTree();
	bigTree = new BigTree();
	aCloud = new ACloud();
	bCloud = new BCloud();
	skeleton = new Skeleton()
	backBackground = new BackBackground(CANVAS_WIDTH, CANVAS_HEIGHT, level);
	frontBackground = new FrontBackground(CANVAS_WIDTH, CANVAS_HEIGHT, level);
	cloudsFrontBackground = new CloudsFrontBackground(CANVAS_WIDTH, CANVAS_HEIGHT, level);
	cloudsBackBackground = new CloudsBackBackground(CANVAS_WIDTH, CANVAS_HEIGHT, level);
	fontRegular = loadFont('assets/PressStart2P-Regular.ttf');
    
    sounds = {dieSound : loadSound("sounds/die.flac"),
             jumpSound : loadSound("sounds/jump.wav"),
             music : loadSound("sounds/forest.mp3"),
             fireballSound : loadSound("sounds/fireball.wav"),
             magnetSpellSound : loadSound("sounds/magnet.wav"),
             getSpellSound : loadSound("sounds/getspell.wav"),
             getCollectableSound : loadSound("sounds/getspell.wav")};
    sprite = loadImage("/spells/fireball.png");
}

function draw() {
    //Game state of 0 means title screen
    if (gameState == 0)
    {
        background(100, 100, 200);
        
        text('Press a key to begin', (width / 2), 200)
    }
    
    if (gameState == 1)
    {
        if (lives === 0) {
            drawInstructions('Game over. Reload page to play again.');
            return;
        }
        if (flagpole.isReached) {
            drawInstructions('Level complete. Reload page to play again.');
            return;
        }
        drawBackground();
        push();
        translate(scrollPos, 0);
        setGameCharState();

        drawClouds();
        drawTrees();
        drawFlagpole();
        drawPlatforms();
        drawCollectables();
		drawEnemies();

        pop();
        adventurer.draw(player.x, player.y);
        drawGameScore();
        drawLives();

        processInteractions();
        checkPlayerDie();
        checkFlagpole();
	}
	updateEnemies();
    drawSpells();
}

function drawSpells()
{
	spells.spells.forEach(function(spell) {
		spell.updateSpell();
	});
}

function drawPlatforms() {
	platformsBackground.forEach((platform) => {
		platform.draw();
	});
	platformsForeground.forEach((platform) => {
		platform.updatePosition();

		platform.draw();
	});
}

function drawBackground() {
	var PARALAX_RATIO = -0.2;
	var deltaX = scrollPos * PARALAX_RATIO;
	cloudsBackBackground.draw(0 - deltaX, 0);
	cloudsBackBackground.draw(0 - CANVAS_WIDTH - deltaX, 0);
	cloudsBackBackground.draw(CANVAS_WIDTH - deltaX, 0);
	cloudsFrontBackground.draw(0 - deltaX, 0);
	cloudsFrontBackground.draw(0 - CANVAS_WIDTH - deltaX, 0);
	cloudsFrontBackground.draw(CANVAS_WIDTH - deltaX, 0);
	backBackground.draw(0 - deltaX, 0);
	backBackground.draw(0 - CANVAS_WIDTH - deltaX, 0);
	backBackground.draw(CANVAS_WIDTH - deltaX, 0);
	frontBackground.draw(0 - deltaX, 0);
	frontBackground.draw(0 - CANVAS_WIDTH - deltaX, 0);
	frontBackground.draw(CANVAS_WIDTH - deltaX, 0);
}

function drawCollectables() {
	collectables.forEach(function(item, index) {
		if (!item.isFound) {
			var object = index % 2 ? appleItem : ringItem;
			object.draw(item.x, item.y)
		}
	});
}

function drawTrees() {
	TREES_X.forEach(function(x, index) {
		var treeObject = index % 2 ? smallTree : bigTree
		treeObject.draw(x, floorPosY)
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

function drawEnemies() {
	enemies.forEach(function(enemy) {
		if (enemy.direction > 0) {
			skeleton.setState(SkeletonState.MovingRight);
		} else {
			skeleton.setState(SkeletonState.MovingLeft);
		}
		skeleton.draw(enemy.x, enemy.y);
	})
}

function updateEnemies() {
	enemies.forEach(function(enemy) {
		enemy.x += enemy.direction;
		enemy.curStep += 1;
		if (enemy.curStep === enemy.range) {
			enemy.curStep = 0;
			enemy.direction *= -1;
		}
	})
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
		if (!item.isFound && dist(player.actual.x, player.y, item.x, item.y) < 10) {
			item.isFound = true;
			gameScore += 1;
		}
	});
}

function checkFlagpole() {
	if (player.actual.x > flagpole.x) {
		flagpole.isReached = true;
        changeLevel();
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

function simpleCollisionDetection(obj1, obj2) {
	return obj1.x >= obj2.x &&
		obj1.x <= obj2.x + obj2.width &&
		(obj1.y === obj2.y ||
			obj1.y + obj1.height >= obj2.y
				&& obj1.y <= obj2.y + obj2.height)

}

function checkIfThePlayerIsOnPlatform() {
	let result = false;
	for(let i = 0; i < platforms.length; i++) {
		// platform.movement && console.log(platform)

		const collision = simpleCollisionDetection({
			x: player.actual.x,
			y: player.y,
			height: player.height
		}, {
			x: platforms[i].x,
			y: platforms[i].y,
			width: platforms[i].length,
			height: platforms[i].height
		}, !!platforms[i].movement)
		if (isFalling && collision) {
			console.log('fell collision')
		}
		if (collision && !isPlummeting) {
			const prev = platforms[i].isStoodOn
			platforms[i].isStoodOn = true

			player.y = platforms[i].y
			if (!prev)  console.log('collide', platforms[i])
			//if (platform.movement && prev)  console.log(platform)
		} else {
			if (platforms[i].isStoodOn) {
				console.log('leave',platforms[i])
			}
			platforms[i].isStoodOn = false
		}
	}
	return platforms.some(p => p.isStoodOn);
}

function processInteractions() {
	processCollectablesInteractions();
	if (checkIfThePlayerIsOnPlatform()) {
		isFalling = false;
	} else {
		if (!isPlummeting) {
			isFalling = true;
		}
	}
	if (isRight) {
		player.actual.x += 5;
		if (player.x < width * 0.6) {
			player.x += 5;
		} else {
			scrollPos -= 5; // negative for moving against the background
		}
	}
	if (isLeft) {
		player.actual.x -= 5;
		if (player.x > width * 0.4) {
			player.x -= 5;
		} else {
			scrollPos += 5;
		}
	}
	if (player.jumpAccel === 0 && isPlummeting) {
		isPlummeting = false;
		isFalling = true;
	} 
	if (isPlummeting) {
		player.y -= 10;
		player.jumpAccel -= 10;
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
var FIREBALL_CODE = 70;

function keyPressed()
{
    if(keyCode == FIREBALL_CODE)
    {
		spells.keyPressed(player.x, player.y, isLeft);
    }
    
    if(gameState == 0)
    {   
        gameState = 1;
        sounds.music.play();
    }
    
	if (keyCode === LEFT_ARROW_CODE) {
		isLeft = true;
		lastDirection = LastDirection.Left;
	}
	if (keyCode === RIGHT_ARROW_CODE) {
		isRight = true;
		lastDirection = LastDirection.Right;
	}
	if ((keyCode === SPACEBAR_CODE || keyCode == 38) && !(isPlummeting || isFalling)) {
		adventurer.resetPlummetingFrame();
		isPlummeting = true;
		player.jumpAccel = JUMP_ACCEL ;
        sounds.jumpSound.play();
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

function changeLevel()
{
    level = 2;
    backBackground = new BackBackground(CANVAS_WIDTH, CANVAS_HEIGHT, level);
	frontBackground = new FrontBackground(CANVAS_WIDTH, CANVAS_HEIGHT, level);
	cloudsFrontBackground = new CloudsFrontBackground(CANVAS_WIDTH, CANVAS_HEIGHT, level);
	cloudsBackBackground = new CloudsBackBackground(CANVAS_WIDTH, CANVAS_HEIGHT, level);
    
    flagpole.isReached = false;
}
