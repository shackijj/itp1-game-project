(function() {
    function Platform(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
    }

    Platform.prototype.draw = function() {
        rect(this.x, this.y, this.length, 10);
    }

    window.Platform = Platform;
})();