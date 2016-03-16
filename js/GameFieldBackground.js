/* Start Game Field Background */

function GameFieldBackground(parentDOMElement, appendToParentDOMElement) {
    
    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, 'game-field-background', ['game-field']);

    this._gameFieldBackgroundSkyLayer = new GameFieldLayer(this._DOMElement, true, 'game-field-background-sky-layer');
    this._gameFieldBackgroundStarsLayer = new GameFieldLayer(this._DOMElement, true, 'game-field-background-stars-layer');
    this._gameFieldBackgroundCloudsLayer = new GameFieldLayer(this._DOMElement, true, 'game-field-background-clouds-layer');
    this._gameFieldBackgroundTowerLayer = new GameFieldLayer(this._DOMElement, true, 'game-field-background-tower-layer');
}

GameFieldBackground.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

GameFieldBackground.prototype.getGameFieldBackgroundSkyLayer = function () {

    return this._gameFieldBackgroundSkyLayer;
}

GameFieldBackground.prototype.getGameFieldBackgroundStarsLayer = function () {

    return this._gameFieldBackgroundStarsLayer;
}

GameFieldBackground.prototype.getGameFieldBackgroundCloudsLayer = function () {

    return this._gameFieldBackgroundCloudsLayer;
}

GameFieldBackground.prototype.getGameFieldBackgroundTowerLayer = function () {

    return this._gameFieldBackgroundTowerLayer;
}

GameFieldBackground.prototype.repaint = function() {
    
    GameEntity.prototype.repaint.call(this);

    this._gameFieldBackgroundSkyLayer.repaint();
    this._gameFieldBackgroundStarsLayer.repaint();
    this._gameFieldBackgroundCloudsLayer.repaint();
    this._gameFieldBackgroundTowerLayer.repaint();
}

/* End Public Methods */

/* End Game Field Background */