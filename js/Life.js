/* Start Monster */

function Life(parentDOMElement, appendToParentDOMElement) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, '', ['life']);

    this._targetStep = null;
}

Life.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

Life.prototype.setTargetStep = function (value) {

    this._targetStep = value;
    value.setTargetLife(this);
    this.setX(this._targetStep.getX() + Math.floor(this._targetStep.getWidth() / 2));
    this.setY(this._targetStep.getY() + this._targetStep.getHeight() * 3);
}

Life.prototype.getTargetStep = function () {

    return this._targetStep;
}

Life.prototype.pulse = function () {

    this.setScale(this.getScale() + this.getDScale());

    if (this.getScale() > 1.4) {

        this.setDScale(-this.getDScale());
    }

    else if (this.getScale() < 1) {

        this.setDScale(-this.getDScale());
    }
}

/* End Public Methods */

/* End Monster */