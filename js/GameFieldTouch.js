function GameFieldTouch(parentDOMElement, appendToParentDOMElement) {
    
    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, 'game-field-touch', ['game-field']);

    this._gameFieldTouchLeft = new GameEntity('div', this.getDOMElement(), true, 'game-field-touch-left', ['game-field-touch-item']);
    this._gameFieldTouchSpace = new GameEntity('div', this.getDOMElement(), true, 'game-field-touch-space', ['game-field-touch-item']);
    this._gameFieldTouchRight = new GameEntity('div', this.getDOMElement(), true, 'game-field-touch-right', ['game-field-touch-item']);
}

GameFieldTouch.prototype = Object.create(GameEntity.prototype);

GameFieldTouch.prototype.repaint = function() {
    
    GameEntity.prototype.repaint.call(this);

    this._gameFieldTouchLeft.repaint();
    this._gameFieldTouchSpace.repaint();
    this._gameFieldTouchRight.repaint();
}