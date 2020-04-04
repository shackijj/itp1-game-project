(function() {
    var SPRITE_WIDTH = 150;
    var SPRITE_HEIGHT = 150
    var X_OFFSET = 225;
    var Y_OFFSET = 302;
    var AREA_WIDTH = 450;
    var AREA_HEIGHT = 450;


    var EnemyState = {
        MovingLeft: 1,
        MovingRight: 2
    };

    class Enemy {
        constructor(imagePath) {
            this.imagePath = imagePath;
            this._load();
            this.animationStep = 0;
            this.state = EnemyState.MovingLeft;
        }

        _load() {
            this.spritesheet = loadImage(this.imagePath);
        }

        _drawSprite = function (x, y) {
            push();
            var xMultiplier = 1;
            if (this.state === EnemyState.MovingLeft) {
                scale(-1.0, 1.0);
                xMultiplier = -1;
            }
            noSmooth();
            image(
                this.spritesheet,
                xMultiplier * (x - X_OFFSET),
                y - Y_OFFSET,
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
            if (this.animationStep > 3) {
                this.animationStep = 0;
             }
            this._drawSprite(x, y);
        }

        setState(state) {
            this.state = state;
        }
    }

    class SkeletonEnemy extends Enemy {
        constructor() {
            super("/enemies/skeleton.png");
        }
        draw(x, y) {
            if (frameCount % 6 === 0) {
                this.animationStep++;
            }
            if (this.animationStep > 3) {
                this.animationStep = 0;
             }
            this._drawSprite(x, y);
        }
    }

    class FlyingEyeEnemy extends Enemy {
        constructor() {
            super("/enemies/flight.png");
        }
        draw(x, y) {
            if (frameCount % 6 === 0) {
                this.animationStep++;
            }
            if (this.animationStep > 7) {
                this.animationStep = 0;
            }
            this._drawSprite(x, y);
        }
    }

    class MushroomEnemy extends Enemy {
        constructor() {
            super("/enemies/mushroom.png");
        }
        draw(x, y) {
            if (frameCount % 6 === 0) {
                this.animationStep++;
            }
            if (this.animationStep > 7) {
                this.animationStep = 0;
            }
            this._drawSprite(x, y);
        }
    }

    class GoblinEnemy extends Enemy {
        constructor() {
            super("/enemies/goblin.png");
        }
        draw(x, y) {
            if (frameCount % 6 === 0) {
                this.animationStep++;
            }
            if (this.animationStep > 7) {
                this.animationStep = 0;
            }
            this._drawSprite(x, y);
        }
    }

    window.GoblinEnemy = GoblinEnemy;
    window.MushroomEnemy = MushroomEnemy;
    window.FlyingEyeEnemy = FlyingEyeEnemy;
    window.Skeleton = SkeletonEnemy;
    window.EnemyState = EnemyState;
})();