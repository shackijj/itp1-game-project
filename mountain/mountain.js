(function() {
    function Mountain() {
        this.size = [366, 193]
        this.offsetX = this.size[0] / 2
        this.offsetY = this.size[1];
        this.spritesheet = loadImage("/mountain/mountain.png");
    }
    
    Mountain.prototype.draw = function(x, y) {
        push();
        noSmooth();
        image(
            this.spritesheet,
            x - this.offsetX,
            y - this.offsetY,
            this.size[0],
            this.size[1]);
        pop();
    }
    
    window.Mountain = Mountain;
}());

