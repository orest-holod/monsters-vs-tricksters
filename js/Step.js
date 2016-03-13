function Step(parentDOMElement, appendToParentDOMElement, left, levelIndex, width, levelHeight, color) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, '', ['step']);

    this._levelIndex = levelIndex;
    this._levelHeight = levelHeight;
    this.setBoxShadow('0 0 1rem 1rem ' + color);
    this.setX(left);
    this.setY(levelIndex * levelHeight);
    this.setHeight(5);
    this.setWidth(width);
}

Step.prototype = Object.create(GameEntity.prototype);


Step.prototype.repaint = function () {

    GameEntity.prototype.repaint.call(this);
}