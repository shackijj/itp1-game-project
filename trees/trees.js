(function() {
    var COLLECTABLE_ITEM_SIZE = [512, 512];
    var SPRITE_SIZE = [128, 128];
    
    function Tree() {
        this.offsetX = COLLECTABLE_ITEM_SIZE[0] / 2
        this.offsetY = COLLECTABLE_ITEM_SIZE[1];
        this.spritesheet = loadImage("/trees/Trees.png");
    }
    
    Tree.prototype.drawSprite = function(x, y, sx, sy) {
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
    
    function SmallTree() {
        Tree.apply(this);
    }
    
    SmallTree.prototype = Tree.prototype;
    SmallTree.prototype.draw = function(x, y) {
        var ROW = 0;
        this.drawSprite(x, y, 0, SPRITE_SIZE[1] * ROW);
    }
    
    
    function BigTree() {
        Tree.apply(this);
    }
    BigTree.prototype = Tree.prototype;
    BigTree.prototype.draw = function(x, y) {
        var ROW = 0;
        var COLUMN = 1;
        this.drawSprite(x, y, SPRITE_SIZE[0] * COLUMN, SPRITE_SIZE[1] * ROW);
    }

    window.SmallTree = SmallTree;
    window.BigTree = BigTree;
}());
