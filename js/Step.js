function Step(parentDOMElement, appendToParentDOMElement, left, levelIndex, width, levelHeight, color) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, '', ['step']);

    this._levelIndex = levelIndex;
    this._levelHeight = levelHeight;
    this.setBoxShadow('0 0 1rem 1rem ' + color);
    this.setX(left);
    this.setY(levelIndex * levelHeight);
    this.setHeight(5);
    this.setWidth(width);
    this._targetMonster = null;
    this._targetTrickster = null;
}

Step.prototype = Object.create(GameEntity.prototype);

Step.prototype.getLevelIndex = function() {

    return this._levelIndex;
}

Step.prototype.setTargetMonster = function (value) {

    this._targetMonster = value;
}

Step.prototype.getTargetMonster = function () {

    return this._targetMonster;
}

Step.prototype.setTargetTrickster = function (value) {
    
    this._targetTrickster = value;
}

Step.prototype.getTargetTrickster = function () {

    return this._targetTrickster;
}

Step.prototype.setTargetLife = function (value) {

    this._targetLife = value;
}

Step.prototype.getTargetLife = function () {

    return this._targetLife;
}

Step.prototype.repaint = function () {

    GameEntity.prototype.repaint.call(this);
}