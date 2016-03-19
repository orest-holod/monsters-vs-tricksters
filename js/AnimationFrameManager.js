/* Start Animation Frame Manager */

function AnimationFrameManager() {

    this._animationFrameId = 0;

    this._now = Date.now();
    this._then = this._now;
    this._delta = 0;
    this._second = 0;
    this._animationFrameCounter = 0;
    this._currentFPS = 0;
}

/* Start Public Methods */

AnimationFrameManager.prototype.stop = function () {

    if (this._animationFrameId) {

        cancelAnimationFrame(this._animationFrameId);
    }
}

AnimationFrameManager.prototype.getCurrentFPS = function () {

    return this._currentFPS;
}

AnimationFrameManager.prototype.runAtFPS = function (fn, fps) {

    var that = this;

    var then = performance.now();

    fps = fps || 60;

    var interval = 1000 / fps;

    return (function loop() {

        that._animationFrameId = requestAnimationFrame(loop);

        var now = performance.now();
        var delta = now - then;

        if (delta > interval) {

            then = now - (delta % interval);

            that._second += delta;

            if (that._second >= 1000) {

                that._currentFPS = that._animationFrameCounter;
                that._animationFrameCounter = 0;
                that._second = 0;
            }

            that._animationFrameCounter++;

            fn();
        }
    }());
}

/* End Public Methods */

/* End Animation Frame Manager */