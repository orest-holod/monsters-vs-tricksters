/* Start Monster */

function Monster(parentDOMElement, appendToParentDOMElement, id, textContent) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, id, ['monster'], textContent);

    this._targetStep = null;
}

Monster.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

Monster.prototype.rotate = function () {

    this.setAngle(this.getAngle() + this.getDAngle());
}

Monster.prototype.moveRight = function () {

    this.setX(this.getX() + this.getDX());
}

Monster.prototype.moveLeft = function () {

    this.setX(this.getX() - this.getDX());
}

Monster.prototype.jump = function() {
    
    this.setY(this.getY() + this.getDY());
}

Monster.prototype.setTargetStep = function (value) {

    this._targetStep = value;
}

Monster.prototype.getTargetStep = function () {

    return this._targetStep;
}


/* End Public Methods */

/* End Monster */