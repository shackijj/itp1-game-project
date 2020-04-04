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
        this.spritesheetFlying = loadImage("/flying-eye-enemy/flight.png");
        this.spritesheetAttacking = loadImage("/flying-eye-enemy/attack.png");
        this.spritesheetDying = loadImage("/flying-eye-enemy/death.png");
        this.spritesheetHit = loadImage("/flying-eye-enemy/take-hit.png");
    }
    
    FlyingEyeEnemy.prototype.isSafari = function() {
        var ua = window.navigator.userAgent.toLocaleLowerCase();
        return ua.indexOf('safari') > -1 && ua.indexOf('chrome') === -1;
    }
    
    /**
     * @param {number} count
     */
    FlyingEyeEnemy.prototype.onFrameChange = function onFrameChange() {
        this.frameCount += 1;
        this.updateFlyingFrame(this.frameCount);
        this.updateAttackingFrame(this.frameCount);
        this.updateDyingFrame(this.frameCount);
        this.updateHitFrame(this.frameCount);
    };
    
    // Adventurer.prototype.resetPlummetingFrame = function resetPlummetingFrame() {
    //     this.plummeting.frame = 0;
    // }
    
    // FlyingEyeEnemy.prototype.updateFlyingFrame = function(count) {
    //     if (count % 12 === 0) {
    //         this.standing.frame++;
    //         if (this.standing.frame > 3) {
    //             this.standing.frame = 0;
    //         }
    //     }
    //     this.standing.x = SPRITE_WIDTH * this.standing.frame;
    //     this.standing.y = 0;
    // }

    FlyingEyeEnemy.prototype.updateFlyingFrame = function(count) {
        if (count % 6 === 0) {
            this.flying.frame++;
            if (this.flying.frame > 5) {
                this.flying.frame = 0;
            }
        }
        this.flying.x = SPRITE_WIDTH * this.flying.frame + SPRITE_WIDTH;
        this.flying.y = SPRITE_HEIGHT;
    }
    
    FlyingEyeEnemy.prototype.updateAttackingFrame = function(count) {
        if (count % 6 === 0) {
            this.attacking.frame++;
            if (this.attacking.frame > 5) {
                this.attacking.frame = 0;
            }
        }
        this.attacking.x = SPRITE_WIDTH * this.attacking.frame + SPRITE_WIDTH;
        this.attacking.y = SPRITE_HEIGHT;
    }


    FlyingEyeEnemy.prototype.updateDyingFrame = function(count) {
        if (count % 6 === 0) {
            this.dying.frame++;
            if (this.dying.frame > 5) {
                this.dying.frame = 0;
            }
        }
        this.dying.x = SPRITE_WIDTH * this.dying.frame + SPRITE_WIDTH;
        this.dying.y = SPRITE_HEIGHT;
    }

    FlyingEyeEnemy.prototype.updateHitFrame = function(count) {
        if (count % 6 === 0) {
            this.hit.frame++;
            if (this.hit.frame > 5) {
                this.hit.frame = 0;
            }
        }
        this.hit.x = SPRITE_WIDTH * this.hit.frame + SPRITE_WIDTH;
        this.hit.y = SPRITE_HEIGHT;
    }

    
    // FlyingEyeEnemy.prototype.updatePlummetingFrame = function(count) {
    //     if (count % 3 === 0) {
    //         this.plummeting.frame++;
    //         if (this.plummeting.frame > 7) {
    //             this.plummeting.frame = 0;
    //         }
    //     }
    //     if (this.plummeting.frame < 6) {
    //         this.plummeting.x = SPRITE_WIDTH * this.plummeting.frame + SPRITE_WIDTH;
    //         this.plummeting.y = SPRITE_HEIGHT * 2, SPRITE_WIDTH;
    //     } else {
    //         this.plummeting.x = 0;
    //         this.plummeting.y = SPRITE_HEIGHT * 3, SPRITE_WIDTH;
    //     }
    // }
    
    // FlyingEyeEnemy.prototype.updateFallingFrame = function(count) {
    //     if (count % 6 === 0) {
    //         this.falling.frame++;
    //         if (this.falling.frame > 1) {
    //             this.falling.frame = 0;
    //         }
    //     }
    //     if (this.falling.frame === 0) {
    //         this.falling.x = SPRITE_WIDTH;
    //         this.falling.y = SPRITE_HEIGHT * 3, SPRITE_WIDTH;
    //     } else {
    //         this.falling.x = SPRITE_WIDTH * 2;
    //         this.falling.y = SPRITE_HEIGHT * 3, SPRITE_WIDTH;
    //     }
    // }
    
    FlyingEyeEnemy.prototype._drawSprite = function (xDest, yDest, flippedHor) {
        push();
        var xMultiplier = 1;
        if (flippedHor) {
            scale(-1.0, 1.0);
            xMultiplier = -1;
        }
        if (!this.safari) {
            noSmooth();
        }

        let sheetToUse; 

        switch(this.state) {
            case FlyingEyeEnemy.States.Flight:
                sheetToUse = this.spritesheetFlying;
                break;
            case FlyingEyeEnemy.States.Attack:
                sheetToUse = this.spritesheetAttacking;
                break;
            case FlyingEyeEnemy.States.Death:
                sheetToUse = this.spritesheetDying;
                break;
            case FlyingEyeEnemy.States.TakeHit:
                sheetToUse = this.spritesheetHit;
                break;
            default:
                throw new Error("Unknown state: " + this.state);
        }

        image(
            this.sheetToUse,
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
    
    FlyingEyeEnemy.prototype.drawFlying = function () {
        this._drawSprite(this.flying.x, this.flying.y);
    };
    
    FlyingEyeEnemy.prototype.drawAttacking = function () {
        this._drawSprite(this.attacking.x, this.attacking.y, true);
    }
    
    FlyingEyeEnemy.prototype.drawDying = function () {
        this._drawSprite(this.dying.x, this.dying.y, true);
    }
    
    FlyingEyeEnemy.prototype.drawHit = function () {
        this._drawSprite(this.hit.x, this.hit.y, true);
    }
    

    
    /**
     * @param {number} state
     */
    FlyingEyeEnemy.prototype.setState = function setState(state) {
        this.state = state;
    }
     
    /**
     * @type {number} x
     * @type {number} y
     */
    FlyingEyeEnemy.prototype.draw = function draw(x, y) {
        this.onFrameChange();
        this.x = x;
        this.y = y;

        switch(this.state) {
            case FlyingEyeEnemy.States.Flight:
                this.drawFlying();
                break;
            case FlyingEyeEnemy.States.Attack:
                this.drawAttacking();
                break;
            case FlyingEyeEnemy.States.Death:
                this.drawDying();
                break;
            case FlyingEyeEnemy.States.TakeHit:
                this.drawHit();
                break;
            default:
                throw new Error("Unknown state: " + this.state);
        }

    }
    window.FlyingEyeEnemy = FlyingEyeEnemy;
})();