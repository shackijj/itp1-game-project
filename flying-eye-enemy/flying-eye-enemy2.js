(function() {
    var SPRITE_WIDTH = 150;
    var SPRITE_HEIGHT = 150
    var X_OFFSET = 175;
    var Y_OFFSET = 102;
    var AREA_WIDTH = 450;
    var AREA_HEIGHT = 450;

    class FlyingEyeEnemy {



        constructor() {

            this.frameCount = 0;

            this.flying = {
                frame: 0,
                x: 0,
                y: 0,
            };

            this.states = {
                Flight: 1,
                Attack: 2,
                Death: 3,
                TakeHit: 4 
             }

            console.log('flying eyed monster');
            this._load();
        }

        _load() {
            this.spritesheet = loadImage("/flying-eye-enemy/flight.png");
        }

        _drawSprite = function (xDest, yDest) {
            push();
            noSmooth();
            image(
                this.spritesheet,
                this.x - X_OFFSET,
                this.y - Y_OFFSET,
                AREA_WIDTH,
                AREA_HEIGHT,
                xDest,
                yDest,
                SPRITE_WIDTH,
                SPRITE_HEIGHT);
            pop();
        }

        draw(x, y) {

            this.onFrameChange();
            this.x = x;
            this.y = y;
            // this.flying.x = x;
            // this.flying.y = y;
            this.drawFlying();
           // this._drawSprite(0, 0);
        }

        drawFlying = function () {
            this._drawSprite(this.flying.x, this.flying.y);
        }

        updateFlyingFrame = function(count) {
            if (count % 6 === 0) {
                this.flying.frame++;
                if (this.flying.frame > 5) {
                    this.flying.frame = 0;
                }
            }
            this.flying.x = SPRITE_WIDTH * this.flying.frame + SPRITE_WIDTH;
            this.flying.y = SPRITE_HEIGHT;
        }

        onFrameChange = function() {
            this.frameCount += 1;
            this.updateFlyingFrame(this.frameCount);
            // this.updateAttackingFrame(this.frameCount);
            // this.updateDyingFrame(this.frameCount);
            // this.updateHitFrame(this.frameCount);
        };
    }

    window.FlyingEyeEnemy = FlyingEyeEnemy;
})();