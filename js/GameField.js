/* Start Game Field */

function GameField(parentDOMElement, appendToParentDOMElement) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, ['game-field']);

    this._skyLayer = new GameFieldLayer(this._DOMElement, true, 'sky');
    this._starsLayer = new GameFieldLayer(this._DOMElement, true, 'stars');
    this._cloudsLayer = new GameFieldLayer(this._DOMElement, true, 'clouds');
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
    this._towerLayer = new GameFieldLayer(this._DOMElement, true, 'tower');
    this._stepsLayer = new GameFieldStepsLayer(this._DOMElement, true);
>>>>>>> origin/master
=======
   
>>>>>>> parent of 53c4bfd... Clickable menu in correct order with monster cursor
=======
   
>>>>>>> parent of 53c4bfd... Clickable menu in correct order with monster cursor
=======
   
>>>>>>> parent of 53c4bfd... Clickable menu in correct order with monster cursor
=======
   
>>>>>>> parent of 53c4bfd... Clickable menu in correct order with monster cursor
    this._menuLayer = new GameFieldMenuLayer(this._DOMElement, true);
=======
>>>>>>> parent of 9ac0384... Menu
=======
>>>>>>> parent of 9ac0384... Menu
=======
>>>>>>> parent of 9ac0384... Menu
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    return this._towerLayer;
}

GameField.prototype.getStepsLayer = function () {

    return this._stepsLayer;
}

GameField.prototype.getMenuLayer = function () {

    return this._menuLayer;
}

=======
>>>>>>> parent of 9ac0384... Menu
=======
>>>>>>> parent of 9ac0384... Menu
=======
>>>>>>> parent of 9ac0384... Menu
GameField.prototype.getFPSLayer = function () {

    return this._fpsLayer;
}

GameField.prototype.repaint = function () {

    GameEntity.prototype.repaint.call(this);

    this._skyLayer.repaint();
    this._starsLayer.repaint();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    this._cloudsLayer.repaint();
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
    this._stepsLayer.repaint();
>>>>>>> origin/master
=======
  
>>>>>>> parent of 53c4bfd... Clickable menu in correct order with monster cursor
=======
  
>>>>>>> parent of 53c4bfd... Clickable menu in correct order with monster cursor
=======
  
>>>>>>> parent of 53c4bfd... Clickable menu in correct order with monster cursor
=======
  
>>>>>>> parent of 53c4bfd... Clickable menu in correct order with monster cursor
    this._menuLayer.repaint();
=======
>>>>>>> parent of 9ac0384... Menu
=======
>>>>>>> parent of 9ac0384... Menu
=======
>>>>>>> parent of 9ac0384... Menu
}

/* End Public Methods */

/* End Game Field */




