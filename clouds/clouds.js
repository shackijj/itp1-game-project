(function() {
    const CLOUD_SIZE = [512, 256];

    function Cloud() {
        this.offsetX = CLOUD_SIZE[0] / 2
        this.offsetY = CLOUD_SIZE[1];
    }
    
    Cloud.prototype.load = function(url) {
        this.spritesheet = loadImage(url);
    }
    
    Cloud.prototype.draw = function(x, y) {
        push();
        noSmooth();
        image(
            this.spritesheet,
            x - this.offsetX,
            y - this.offsetY,
            CLOUD_SIZE[0],
            CLOUD_SIZE[1]);
        pop();
    }
    
    function ACloud() {
        Cloud.apply(this);
        this.load("/clouds/cloud-a.png");
    }
    
    ACloud.prototype = new Cloud();
    
    function BCloud() {
        Cloud.apply(this);
        this.load("/clouds/cloud-b.png");
    }
    
    BCloud.prototype = new Cloud();

    window.ACloud = ACloud;
    window.BCloud = BCloud;
}());

