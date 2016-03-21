/* Start Trickster */

function Trickster(parentDOMElement, appendToParentDOMElement, textContent) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, '', ['trickster'], textContent);

    this._preLevitateX = 0;
    this._preLevitateY = 0;
    this._levitateDX = 0;
    this._levitateDY = 0;

    this._targetStep = null;
}

Trickster.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

Trickster.prototype.setLevitateDX = function (value) {

    this._levitateDX = value;
}

Trickster.prototype.getLevitateDX = function () {

    return this._levitateDX;
}

Trickster.prototype.setLevitateDY = function (value) {

    this._levitateDY = value;
}

Trickster.prototype.getLevitateDY = function () {

    return this._levitateDY;
}

Trickster.prototype.levitate = function () {

    if (!this._preLevitateX) {

        this._preLevitateX = this.getX();
    }

    if (!this._preLevitateY) {

        this._preLevitateY = this.getY();
    }

    if (this.getDX() >= 0) {

        if (this.getX() + this.getDX() * GameEntity.FPS_INDEX <= this._preLevitateX + this._levitateDX) {

            this.setX(this.getX() + this.getDX() * GameEntity.FPS_INDEX);
        }
        else {

            this.setDX(-1 * this.getDX());
        }
    }
    else {

        if (this.getX() + this.getDX() * GameEntity.FPS_INDEX >= this._preLevitateX - this._levitateDX) {

            this.setX(this.getX() + this.getDX() * GameEntity.FPS_INDEX);
        }
        else {

            this.setDX(-1 * this.getDX());
        }
    }

    if (this.getDY() >= 0) {

        if (this.getY() + this.getDY() * GameEntity.FPS_INDEX <= this._preLevitateY + this._levitateDY) {

            this.setY(this.getY() + this.getDY() * GameEntity.FPS_INDEX);
        }
        else {

            this.setDY(-1 * this.getDY());
        }
    }
    else {

        if (this.getY() + this.getDY() * GameEntity.FPS_INDEX >= this._preLevitateY - this._levitateDY) {

            this.setY(this.getY() + this.getDY() * GameEntity.FPS_INDEX);
        }
        else {

            this.setDY(-1 * this.getDY());
        }
    }
}

Trickster.prototype.rotate = function () {

    this.setAngle(this.getAngle() + this.getDAngle() * GameEntity.FPS_INDEX);
}

Trickster.prototype.setTargetStep = function (value) {

    this._targetStep = value;
    value.setTargetTrickster(this);
    this.setX(this._targetStep.getX());
    this.setY(this._targetStep.getY() + this._targetStep.getHeight() * 3);
}

Trickster.prototype.getTargetStep = function () {

    return this._targetStep;
}

/* End Public Methods */

/* End Trickster */