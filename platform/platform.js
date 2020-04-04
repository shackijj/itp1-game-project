(function() {
    var REAL_SIZE = 64;
    var SPRITE_SIZE = 16;
    const DOWN = 0;
    const UP = 1;
    const LEFT = 2;
    const RIGHT = 3;

    function Platform(x, y, length, movementConfig) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.height = REAL_SIZE

        if (movementConfig) {
            const { range, speed = 2 } = movementConfig;

            this.movement = {
                direction: range.y ? UP : RIGHT,
                range,
                speed
            }
        }

        this.spritesheet = loadImage('/platform/Tileset.png')

        return this;
    }

    Platform.prototype.drawSprite = function(x, y, sx, sy) {
        push();
        noSmooth();
        image(
            this.spritesheet,
            x - REAL_SIZE / 2,
            y,
            REAL_SIZE,
            REAL_SIZE,
            sx,
            sy,
            SPRITE_SIZE,
            SPRITE_SIZE,
        );
        pop();
    }

    Platform.prototype.drawGrass = function() {
        this.drawSprite(this.x, this.y - REAL_SIZE, SPRITE_SIZE * 6, SPRITE_SIZE * 1);
        this.drawSprite(this.x, this.y, SPRITE_SIZE * 6, SPRITE_SIZE * 2);
        for(var i = REAL_SIZE; i < this.length; i += REAL_SIZE) {
            this.drawSprite(this.x + i, this.y - REAL_SIZE, SPRITE_SIZE * 7, SPRITE_SIZE * 1);
            this.drawSprite(this.x + i, this.y, SPRITE_SIZE * 8, SPRITE_SIZE * 2);    
        }
        this.drawSprite(this.x + this.length, this.y - REAL_SIZE, SPRITE_SIZE * 9, SPRITE_SIZE * 1);
        this.drawSprite(this.x + this.length, this.y, SPRITE_SIZE * 9, SPRITE_SIZE * 2);
    }

    Platform.prototype.draw = function() {
        this.drawSprite(this.x, this.y, SPRITE_SIZE * 0, SPRITE_SIZE * 0);
        this.drawSprite(this.x, this.y + REAL_SIZE, SPRITE_SIZE * 0, SPRITE_SIZE * 1);
        this.drawSprite(this.x, this.y + REAL_SIZE * 2, SPRITE_SIZE * 0, SPRITE_SIZE * 2);
        for(var i = REAL_SIZE; i < this.length; i += REAL_SIZE) {
            this.drawSprite(this.x + i, this.y, SPRITE_SIZE * 1, SPRITE_SIZE * 0);
            this.drawSprite(this.x + i, this.y + REAL_SIZE, SPRITE_SIZE * 1, SPRITE_SIZE * 1);
            this.drawSprite(this.x + i, this.y + REAL_SIZE * 2, SPRITE_SIZE * 1, SPRITE_SIZE * 2);
        }
        this.drawSprite(this.x + this.length, this.y, SPRITE_SIZE * 2, SPRITE_SIZE * 0);
        this.drawSprite(this.x + this.length, this.y + REAL_SIZE, SPRITE_SIZE * 2, SPRITE_SIZE * 1);
        this.drawSprite(this.x + this.length, this.y + REAL_SIZE * 2, SPRITE_SIZE * 2, SPRITE_SIZE * 2);
        this.drawGrass();
    }

    Platform.prototype.updatePosition = function() {
        const delta = {
            x: 0,
            y: 0
        }

        if (this.movement) {
            switch (this.movement.direction) {
                case UP: {
                    delta.y = -this.movement.speed;
                    if (this.y <= this.movement.range.y.min) {
                        this.movement.direction = DOWN
                    }
                    break;
                }
                case DOWN: {
                    delta.y = this.movement.speed;
                    if (this.y >= this.movement.range.y.max) {
                        this.movement.direction = UP
                    }
                    break;
                }
                case RIGHT: {
                    delta.x = this.movement.speed;
                    if (this.x >= this.movement.range.x.max) {
                        this.movement.direction = LEFT
                    }
                    break;
                }
                case LEFT: {
                    delta.x = -this.movement.speed;
                    if (this.x <= this.movement.range.x.min) {
                        this.movement.direction = RIGHT
                    }
                    break;
                }
                default:
                    throw new Error(`Unhandled movement direction ${this.movement.direction}`)
            }

            this.x += delta.x;
            this.y += delta.y;
        }
        return delta;
    }

    window.Platform = Platform;
})();