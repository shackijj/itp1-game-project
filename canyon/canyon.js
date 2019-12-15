function Canyon(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
}

Canyon.prototype.saveBackground = function(x, y, canvas) {
    if (!this.image) {
        this.image = createImage(this.width, this.height);
        this.image.copy(
            canvas,
            x - this.width / 2,
            y,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height);
    }
}

Canyon.prototype.draw = function(x, y) {
    push();
    noSmooth();
    image(this.image, x - this.width / 2, y);
    pop();
}