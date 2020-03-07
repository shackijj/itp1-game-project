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

function BackBackground(width, height) {
    Background.apply(this, ["/background/back-background.png", width, height])
    this.load();
}

BackBackground.prototype = new Background();

function FrontBackground(width, height) {
    Background.apply(this, ["/background/front-background.png", width, height]);
    this.load();
}

FrontBackground.prototype = new Background();

function CloudsFrontBackground(width, height) {
    Background.apply(this, ["/background/clouds-front-background.png", width, height]);
    this.load();
}

CloudsFrontBackground.prototype = new Background();

function CloudsBackBackground(width, height) {
    Background.apply(this, ["/background/clouds-back-background.png", width, height]);
    this.load();
}

CloudsBackBackground.prototype = new Background();