/* Start Monster */

function Monster(parentDOMElement, appendToParentDOMElement, id, textContent) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, id, ['monster'], textContent);

    this._targetStep = null;
}

Monster.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

Monster.prototype.rotate = function () {

    this.setAngle(this.getAngle() + this.getDAngle() * GameEntity.FPS_INDEX);
}

Monster.prototype.setTargetStep = function (value) {

    this._targetStep = value;
    value.setTargetMonster(this);
    this.setX(this._targetStep.getX() + Math.floor(this._targetStep.getWidth() / 2));
    this.setY(this._targetStep.getY() + this._targetStep.getHeight() * 3);
}

Monster.prototype.getTargetStep = function () {

    return this._targetStep;
}


/* End Public Methods */

/* End Monster */