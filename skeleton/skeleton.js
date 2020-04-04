(function() {
    var SPRITE_WIDTH = 150;
    var SPRITE_HEIGHT = 150
    var X_OFFSET = 175;
    var Y_OFFSET = 102;
    var AREA_WIDTH = 450;
    var AREA_HEIGHT = 450;

    class Skeleton {
        constructor() {
            console.log('skeleton');
            this._load();
        }

        _load() {
            this.spritesheet = loadImage("/skeleton/idle.png");
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
            this.x = x;
            this.y = y;
            this._drawSprite(0, 0);
        }
    }

    window.Skeleton = Skeleton;
})();