/* Start Game Field Layer */

function GameFieldLayer(parentDOMElement, appendToParentDOMElement, id) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, id, ['game-field-layer']);
}

GameFieldLayer.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

GameFieldLayer.prototype.moveBackgroundPositition = function () {

    if (this.getBackgroundPositionDX() > 0 && this.getBackgroundPositionX() >= 0) {

        this.setBackgroundPositionX(-this.getWidth() + window.innerWidth);
    }
    else if (this.getBackgroundPositionDX() < 0 && this.getBackgroundPositionX() + this.getWidth() <= window.innerWidth) {

        this.setBackgroundPositionX(0);
    } else {
        
        this.setBackgroundPositionX(this.getBackgroundPositionX() + this.getBackgroundPositionDX() * GameEntity.FPS_INDEX);
    }


    if (this.getBackgroundPositionDY() > 0 && this.getBackgroundPositionY() >= 0) {

        this.setBackgroundPositionY(-this.getHeight() + window.innerHeight);
    }
    else if (this.getBackgroundPositionDY() < 0 && this.getBackgroundPositionY() + this.getHeight() <= window.innerHeight) {

        this.setBackgroundPositionY(0);
    } else {

        this.setBackgroundPositionY(this.getBackgroundPositionY() + this.getBackgroundPositionDY() * GameEntity.FPS_INDEX);
    }
}

/* End Public Methods */

/* End Game Field Layer */
