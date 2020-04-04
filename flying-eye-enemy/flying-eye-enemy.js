(function() {
    var SPRITE_WIDTH = 150;
    var SPRITE_HEIGHT = 150
    var X_OFFSET = 225;
    var Y_OFFSET = 302;
    var AREA_WIDTH = 450;
    var AREA_HEIGHT = 450;

    var FlyingEyeEnemyState = {
        MovingLeft: 1,
        MovingRight: 2,
        AttackLeft:3,
        AttackRight:4
    };

    class FlyingEyeEnemy {

        constructor() {

            console.log('flying eyed monster');
            this._load();
            this.animationStep = 0;
            this.frameCount = 0;
            this.state = FlyingEyeEnemyState.MovingLeft;
        }

        _load() {
            this.spritesheet = loadImage("/flying-eye-enemy/flight.png");
        }

        _onFrameChange() {

        }


        _drawSprite = function () {
            var xMultiplier = 1;
            if (this.state === FlyingEyeEnemyState.MovingLeft) {
                scale(-1.0, 1.0);
                xMultiplier = -1;
            }
            push();
            noSmooth();
            image(
                this.spritesheet,
                xMultiplier * (this.x - X_OFFSET),
                this.y - Y_OFFSET,
                xMultiplier * AREA_WIDTH,
                AREA_HEIGHT,
                SPRITE_WIDTH * this.animationStep,
                0,
                SPRITE_WIDTH,
                SPRITE_HEIGHT);
            pop();
        }

        draw(x, y) {

            if (frameCount % 6 === 0) {
                this.animationStep++;
            }
            if (this.animationStep > 7) {
                this.animationStep = 0;
            }
            this.x = x;
            this.y = y;
            this._drawSprite(0, 0);
        }

        setState(state) {
            this.state = state;
        }


    }


    window.FlyingEyeEnemy = FlyingEyeEnemy;
    window.FlyingEyeEnemyState = FlyingEyeEnemyState;
})();