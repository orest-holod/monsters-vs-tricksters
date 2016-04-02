/* Start Game Field Layer */

function GameFieldLayer(parentDOMElement, appendToParentDOMElement, id) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, id, ['game-field-layer']);
}

GameFieldLayer.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

GameFieldLayer.prototype.move = function () {

    if (this.getDX() > 0 && this.getTranslateX() >= 0) {

        this.setTranslateX(-this.getWidth() + window.innerWidth);
    }
    else if (this.getDX() < 0 && this.getTranslateX() + this.getWidth() <= window.innerWidth) {

        this.setTranslateX(0);

    } else {
        
        this.setTranslateX(this.getTranslateX() + this.getDX());
    }


    if (this.getDY() > 0 && this.getTranslateY() >= 0) {

        this.setTranslateY(-this.getHeight() + window.innerHeight);
    }
    else if (this.getDY() < 0 && this.getTranslateY() + this.getHeight() <= window.innerHeight) {

        this.setTranslateY(0);

    } else {

        this.setTranslateY(this.getTranslateY() + this.getDY());
    }
}

/* End Public Methods */

/* End Game Field Layer */
