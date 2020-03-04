(function() {
    var COLLECTABLE_ITEM_SIZE = [40, 40];
    var SPRITE_SIZE = [16, 16];
    
    function CollectableItem() {
        this.offsetX = COLLECTABLE_ITEM_SIZE[0] / 2
        this.offsetY = COLLECTABLE_ITEM_SIZE[1];
    }
    
    CollectableItem.prototype.load = function() {
        this.spritesheet = loadImage("/collectable-items/collectable-items.png");
    }
    
    CollectableItem.prototype.drawSprite = function(x, y, sx, sy) {
        push();
        noSmooth();
        image(
            this.spritesheet,
            x - this.offsetX,
            y - this.offsetY,
            COLLECTABLE_ITEM_SIZE[0],
            COLLECTABLE_ITEM_SIZE[1],
            sx,
            sy,
            SPRITE_SIZE[0],
            SPRITE_SIZE[1],
        );
        pop();
    }
    
    function AppleCollectableItem() {
        CollectableItem.apply(this);
        this.load();
    }
    
    AppleCollectableItem.prototype = new CollectableItem();
    AppleCollectableItem.prototype.draw = function(x, y) {
        var ROW = 8;
        this.drawSprite(x, y, 0, SPRITE_SIZE[1] * ROW);
    }
    
    
    function SilverRingCollectableItem() {
        CollectableItem.apply(this);
        this.load();
    }
    SilverRingCollectableItem.prototype = new CollectableItem();
    SilverRingCollectableItem.prototype.draw = function(x, y) {
        var ROW = 5;
        var COLUMN = 2;
        this.drawSprite(x, y, SPRITE_SIZE[0] * COLUMN, SPRITE_SIZE[1] * ROW);
    }

    function BallCollectableItem() {
        CollectableItem.apply(this);
        this.load();
    }
    BallCollectableItem.prototype = new CollectableItem();
    BallCollectableItem.prototype.draw = function(x, y) {
        var ROW = 3;
        var COLUMN = 2;
        this.drawSprite(x, y, SPRITE_SIZE[0] * COLUMN, SPRITE_SIZE[1] * ROW);
    }

    window.BallCollectableItem = BallCollectableItem;
    window.AppleCollectableItem = AppleCollectableItem;
    window.SilverRingCollectableItem = SilverRingCollectableItem;
})();