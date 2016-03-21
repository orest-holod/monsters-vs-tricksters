/* Start Game Field Layer */

function GameFieldLayer(parentDOMElement, appendToParentDOMElement, id) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, id, ['game-field-layer']);
}

GameFieldLayer.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

GameFieldLayer.prototype.moveBackgroundPositition = function () {

    this.setBackgroundPositionX(this.getBackgroundPositionX() + this.getBackgroundPositionDX() * GameEntity.FPS_INDEX);
    this.setBackgroundPositionY(this.getBackgroundPositionY() + this.getBackgroundPositionDY() * GameEntity.FPS_INDEX);
}

/* End Public Methods */

/* End Game Field Layer */
