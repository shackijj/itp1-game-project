var SPRITE_WIDTH = 50;
var SPRITE_HEIGHT = 37

Adventurer.States = {
    FacingLeft: 1,
    FacingRight: 2,
    WalkingLeft: 3,
    WalkingRight: 4,
    PlummetingLeft: 5,
    PlummetingRight: 6,
    FallingLeft: 7,
    FallingRight: 8,
};

function Adventurer() {
    this.spritesheet = loadImage('adventurer/adventurer.png');
    this.state = Adventurer.States.FacingRight;
    this.standing = {
        frame: 0,
        x: 0,
        y: 0,
    };
    this.walking = {
        frame: 0,
        x: 0,
        y: 0,
    };

    this.plummeting = {
        frame: 0,
        x: 0,
        y: 0,
    };

    this.falling = {
        frame: 0,
        x: 0,
        y: 0,
    };
}

/**
 * @param {number} count
 */
Adventurer.prototype.onFrameChange = function onFrameChange(count) {
    this.updateStandingFrame(count);
    this.updateWalkingFrame(count);
    this.updatePlummetingFrame(count);
    this.updateFallingFrame(count);
};

Adventurer.prototype.resetPlummetingFrame = function resetPlummetingFrame() {
    this.plummeting.frame = 0;
}

Adventurer.prototype.updateStandingFrame = function(count) {
    if (count % 12 === 0) {
        this.standing.frame++;
        if (this.standing.frame > 3) {
            this.standing.frame = 0;
        }
    }
    this.standing.x = SPRITE_WIDTH * this.standing.frame;
    this.standing.y = 0;
}

Adventurer.prototype.updateWalkingFrame = function(count) {
    if (count % 6 === 0) {
        this.walking.frame++;
        if (this.walking.frame > 5) {
            this.walking.frame = 0;
        }
    }
    this.walking.x = SPRITE_WIDTH * this.walking.frame + SPRITE_WIDTH;
    this.walking.y = SPRITE_HEIGHT;
}

Adventurer.prototype.updatePlummetingFrame = function(count) {
    if (count % 3 === 0) {
        this.plummeting.frame++;
        if (this.plummeting.frame > 7) {
            this.plummeting.frame = 0;
        }
    }
    if (this.plummeting.frame < 6) {
        this.plummeting.x = SPRITE_WIDTH * this.plummeting.frame + SPRITE_WIDTH;
        this.plummeting.y = SPRITE_HEIGHT * 2, SPRITE_WIDTH;
    } else {
        this.plummeting.x = 0;
        this.plummeting.y = SPRITE_HEIGHT * 3, SPRITE_WIDTH;
    }
}

Adventurer.prototype.updateFallingFrame = function(count) {
    if (count % 6 === 0) {
        this.falling.frame++;
        if (this.falling.frame > 1) {
            this.falling.frame = 0;
        }
    }
    if (this.falling.frame === 0) {
        this.falling.x = SPRITE_WIDTH;
        this.falling.y = SPRITE_HEIGHT * 3, SPRITE_WIDTH;
    } else {
        this.falling.x = SPRITE_WIDTH * 2;
        this.falling.y = SPRITE_HEIGHT * 3, SPRITE_WIDTH;
    }
}

Adventurer.prototype.drawWalkingRight = function () {
    push();
    noSmooth();
    image(
        this.spritesheet,
        this.x - 100,
        this.y - 144,
        200,
        148,
        this.walking.x,
        this.walking.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT)
    pop();
};

Adventurer.prototype.drawWalkingLeft = function () {
    push()
    noSmooth();
    scale(-1.0, 1.0)
    image(
        this.spritesheet,
        -1 * (this.x - 100),
        this.y - 144,
        -200,
        148,
        this.walking.x,
        this.walking.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT);
    pop();
}

Adventurer.prototype.drawFacingRight = function drawFacingRight() {
    push();
    noSmooth();
    image(
        this.spritesheet,
        this.x - 100,
        this.y - 144,
        200,
        148,
        this.standing.x,
        this.standing.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT);
    pop();
}

Adventurer.prototype.drawFacingLeft = function drawFacingLeft() {
    push();
    noSmooth();
    scale(-1.0, 1.0);
    image(
        this.spritesheet,
        -1 * (this.x - 100),
        this.y - 144,
        -200,
        148,
        this.standing.x,
        this.standing.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT)
    pop();
}

Adventurer.prototype.drawPlummetingRight = function drawPlummetingRight() {
    push();
    noSmooth();
    image(
        this.spritesheet,
        this.x - 100,
        this.y - 144,
        200,
        148,
        this.plummeting.x,
        this.plummeting.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT)
    pop();
}

Adventurer.prototype.drawPlummetingLeft = function drawPlummetingLeft() {
    push();
    noSmooth();
    scale(-1.0, 1.0);
    image(
        this.spritesheet,
        -1 * (this.x - 100),
        this.y - 144,
        -200,
        148,
        this.plummeting.x,
        this.plummeting.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT)
    pop();
}

Adventurer.prototype.drawFallingRight = function drawFallingRight() {
    push();
    noSmooth();
    image(
        this.spritesheet,
        this.x - 100,
        this.y - 144,
        200,
        148,
        this.falling.x,
        this.falling.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT)
    pop();
}

Adventurer.prototype.drawFallingLeft = function drawFallingLeft() {
    push();
    noSmooth();
    scale(-1.0, 1.0);
    image(
        this.spritesheet,
        -1 * (this.x - 100),
        this.y - 144,
        -200,
        148,
        this.falling.x,
        this.falling.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT)
    pop();
}

/**
 * @param {number} state
 */
Adventurer.prototype.setState = function setState(state) {
    this.state = state;
}
 
/**
 * @type {number} x
 * @type {number} y
 */
Adventurer.prototype.draw = function draw(x, y) {
    this.x = x;
    this.y = y;
    switch(this.state) {
        case Adventurer.States.FacingLeft:
            this.drawFacingLeft();
            break;
        case Adventurer.States.FacingRight:
            this.drawFacingRight();
            break;
        case Adventurer.States.WalkingLeft:
            this.drawWalkingLeft();
            break;
        case Adventurer.States.WalkingRight:
            this.drawWalkingRight();
            break;
        case Adventurer.States.PlummetingLeft:
            this.drawPlummetingLeft();
            break;
        case Adventurer.States.PlummetingRight:
            this.drawPlummetingRight();
            break;
        case Adventurer.States.FallingLeft:
            this.drawFallingLeft();
            break;
        case Adventurer.States.FallingRight:
            this.drawFallingRight();
            break;
        default:
            throw new Error("Unknown state: " + this.state);
    }
}