/* Start Game Field */

function GameField(parentDOMElement, appendToParentDOMElement) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, 'game-field', ['game-field']);

    this._gameFieldBackground = new GameFieldBackground(this._DOMElement, true);
    this._gameFieldTower = new GameFieldTower(this._DOMElement, true);
    this._gameFieldMenu = new GameFieldMenu(this._DOMElement, true);
    this._gameFieldTouch = new GameFieldTouch(this._DOMElement, true);
}

GameField.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

GameField.prototype.getGameFieldBackground = function () {

    return this._gameFieldBackground;
}


GameField.prototype.getGameFieldTower = function () {

    return this._gameFieldTower;
}

GameField.prototype.getGameFieldMenu = function () {

    return this._gameFieldMenu;
}

GameField.prototype.getGameFieldTouch = function () {

    return this._gameFieldTouch;
}

GameField.prototype.repaint = function () {

    GameEntity.prototype.repaint.call(this);

    this._gameFieldBackground.repaint();
    this._gameFieldTower.repaint();
    this._gameFieldMenu.repaint();
    this._gameFieldTouch.repaint();
}

/* End Public Methods */

/* End Game Field */




