(function() {
    var SPRITE_WIDTH = 50;
    var SPRITE_HEIGHT = 37
    var X_OFFSET = 100;
    var Y_OFFSET = 144;
    var AREA_WIDTH = 200;
    var AREA_HEIGHT = 148;
    
    // Adventurer.States = {
    //     FacingLeft: 1,
    //     FacingRight: 2,
    //     WalkingLeft: 3,
    //     WalkingRight: 4,
    //     PlummetingLeft: 5,
    //     PlummetingRight: 6,
    //     FallingLeft: 7,
    //     FallingRight: 8,
    // };
    
    FlyingEyeEnemy.States = {
       Flight: 1,
       Attack: 2,
       Death: 3,
       TakeHit: 4 
    };


    function FlyingEyeEnemy() {
        this.frameCount = 0;
        this.state = FlyingEyeEnemy.States.Flight;

        this.flying = {
            frame: 0,
            x: 0,
            y: 0,
        };
        this.attacking = {
            frame: 0,
            x: 0,
            y: 0,
        };
    
        this.dying = {
            frame: 0,
            x: 0,
            y: 0,
        };
    
        this.hit = {
            frame: 0,
            x: 0,
            y: 0,
        };
        this.safari = this.isSafari();
        this.load();
    }
    
    FlyingEyeEnemy.prototype.load = function () {
        this.spritesheetFlying = loadImage("/adventurer/adventurer.png");
        this.spritesheetAttacking = loadImage("/adventurer/adventurer.png");
        this.spritesheet = loadImage("/adventurer/adventurer.png");
        this.spritesheet = loadImage("/adventurer/adventurer.png");
    }
    
    Adventurer.prototype.isSafari = function() {
        var ua = window.navigator.userAgent.toLocaleLowerCase();
        return ua.indexOf('safari') > -1 && ua.indexOf('chrome') === -1;
    }
    
    /**
     * @param {number} count
     */
    Adventurer.prototype.onFrameChange = function onFrameChange() {
        this.frameCount += 1;
        this.updateStandingFrame(this.frameCount);
        this.updateWalkingFrame(this.frameCount);
        this.updatePlummetingFrame(this.frameCount);
        this.updateFallingFrame(this.frameCount);
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
    
    Adventurer.prototype._drawSprite = function (xDest, yDest, flippedHor) {
        push();
        var xMultiplier = 1;
        if (flippedHor) {
            scale(-1.0, 1.0);
            xMultiplier = -1;
        }
        if (!this.safari) {
            noSmooth();
        }
        image(
            this.spritesheet,
            xMultiplier * (this.x - X_OFFSET),
            this.y - Y_OFFSET,
            xMultiplier * AREA_WIDTH,
            AREA_HEIGHT,
            xDest,
            yDest,
            SPRITE_WIDTH,
            SPRITE_HEIGHT);
        pop();
    }
    
    Adventurer.prototype.drawWalkingRight = function () {
        this._drawSprite(this.walking.x, this.walking.y);
    };
    
    Adventurer.prototype.drawWalkingLeft = function () {
        this._drawSprite(this.walking.x, this.walking.y, true);
    }
    
    Adventurer.prototype.drawFacingRight = function drawFacingRight() {
        this._drawSprite(this.standing.x, this.standing.y);
    }
    
    Adventurer.prototype.drawFacingLeft = function drawFacingLeft() {
        this._drawSprite(this.standing.x, this.standing.y, true);
    }
    
    Adventurer.prototype.drawPlummetingRight = function drawPlummetingRight() {
        this._drawSprite(this.plummeting.x, this.plummeting.y);
    }
    
    Adventurer.prototype.drawPlummetingLeft = function drawPlummetingLeft() {
        this._drawSprite(this.plummeting.x, this.plummeting.y, true);
    }
    
    Adventurer.prototype.drawFallingRight = function drawFallingRight() {
        this._drawSprite(this.falling.x, this.falling.y);
    }
    
    Adventurer.prototype.drawFallingLeft = function drawFallingLeft() {
        this._drawSprite(this.falling.x, this.falling.y, true);
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
        this.onFrameChange();
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
    window.Adventurer = Adventurer;
})();