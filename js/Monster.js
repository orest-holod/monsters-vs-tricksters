/* Start Monster */

function Monster(parentDOMElement, appendToParentDOMElement, id, textContent) {

    GameEntity.call(this, 'div', parentDOMElement, true, id, ['monster'], textContent);
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

/* End Public Methods */

/* End Monster */