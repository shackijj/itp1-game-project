function Background(url, width, height) {
    this.url = url;
    this.width = width;
    this.height = height;
}

Background.prototype.load = function() {
    this.spritesheet = loadImage(this.url);
}

Background.prototype.draw = function(x, y) {
    push();
    noSmooth();
    image(
        this.spritesheet,
        x,
        y,
        this.width,
        this.height,
    );
    pop();
}

function BackBackground(width, height, level) {    
        
    console.log(level);
    
    Background.apply(this, ["/background/Level " + level + "/back-background.png", width, height])
    this.load();
}

BackBackground.prototype = new Background();

function FrontBackground(width, height, level) {
    Background.apply(this, ["/background/Level " + level + "/front-background.png", width, height]);
    this.load();
}

FrontBackground.prototype = new Background();

function CloudsFrontBackground(width, height, level) {
    Background.apply(this, ["/background/Level " + level + "/clouds-front-background.png", width, height]);
    this.load();
}

CloudsFrontBackground.prototype = new Background();

function CloudsBackBackground(width, height, level) {
    Background.apply(this, ["/background/Level " + level + "/clouds-back-background.png", width, height]);
    this.load();
}

CloudsBackBackground.prototype = new Background();










