/* Start Game Field */

function GameField(parentDOMElement, appendToParentDOMElement) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, ['game-field']);

    this._skyLayer = new GameFieldLayer(this._DOMElement, true, 'sky');
    this._starsLayer = new GameFieldLayer(this._DOMElement, true, 'stars');
    this._cloudsLayer = new GameFieldLayer(this._DOMElement, true, 'clouds');
    this._towerLayer = new GameFieldLayer(this._DOMElement, true, 'tower');
    this._stepsLayer = new GameFieldStepsLayer(this._DOMElement, true);
  
    this._fpsLayer = new GameFieldLayer(this._DOMElement, true, "fps");
}

GameField.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

GameField.prototype.getSkyLayer = function () {

    return this._skyLayer;
}

GameField.prototype.getStarsLayer = function () {

    return this._starsLayer;
}

GameField.prototype.getCloudsLayer = function () {

    return this._cloudsLayer;
}

GameField.prototype.getTowerLayer = function () {

    return this._towerLayer;
}

GameField.prototype.getStepsLayer = function () {

    return this._stepsLayer;
}

GameField.prototype.getFPSLayer = function () {

    return this._fpsLayer;
}

GameField.prototype.repaint = function () {

    GameEntity.prototype.repaint.call(this);

    this._skyLayer.repaint();
    this._starsLayer.repaint();
    this._cloudsLayer.repaint();
    this._stepsLayer.repaint();
   
}

/* End Public Methods */

/* End Game Field */




