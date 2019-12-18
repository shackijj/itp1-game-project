(function() {
    const CLOUD_SIZE = [512, 256];

    function Cloud() {
        this.offsetX = CLOUD_SIZE[0] / 2
        this.offsetY = CLOUD_SIZE[1];
    }
    
    Cloud.prototype.load = function() {
        this.spritesheet = loadImage(this.url);
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
        this.url = "/clouds/cloud-a.png";
        Cloud.apply(this)
    }
    
    ACloud.prototype = new Cloud();
    
    function BCloud() {
        this.url = "/clouds/cloud-b.png";
        Cloud.apply(this)
    }
    
    BCloud.prototype = new Cloud();

    window.ACloud = ACloud;
    window.BCloud = BCloud;
}());

