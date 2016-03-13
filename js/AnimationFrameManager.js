/* Start Animation Frame Manager */

function AnimationFrameManager() {

    this._animationFrameId = 0;

    this._now = Date.now();
    this._then = this._now;
    this._delta = 0;
    this._availableFPS = 0;

    this._usedNow = this._now;
    this._usedThen = this._then;
    this._usedDelta = 0;
    this._usedFPS = 0;
}

/* Start Public Methods */

AnimationFrameManager.prototype.requestAnimationFrame = function (callback) {

    this._now = Date.now();
    this._delta = this._now - this._then;
    this._availableFPS = Math.floor(1000 / this._delta);
    this._then = this._now;

    this._animationFrameId = requestAnimationFrame(callback);
}

AnimationFrameManager.prototype.cancelAnimationFrame = function () {

    if (this._animationFrameId) {

        cancelAnimationFrame(this._animationFrameId);
    }
}

AnimationFrameManager.prototype.getAvailableFPS = function () {

    return this._availableFPS;
}

AnimationFrameManager.prototype.getUsedFPS = function () {

    return this._usedFPS;
}

AnimationFrameManager.prototype.runAtFPS = function (fn, fps) {

    this._usedNow = Date.now();
    this._usedDelta = this._usedNow - this._usedThen;
    this._usedFPS = Math.floor(1000 / this._usedDelta);

    if (this._usedDelta >= (1000 / fps) || this._availableFPS <= fps) {

        fn();
        this._usedThen = this._usedNow;
    }
}

/* End Public Methods */

/* End Animation Frame Manager */