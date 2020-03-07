(function() {
    var REAL_SIZE = 64;
    var SPRITE_SIZE = 16;
    function Platform(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.spritesheet = loadImage('/platform/Tileset.png')
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

    window.Platform = Platform;
})();