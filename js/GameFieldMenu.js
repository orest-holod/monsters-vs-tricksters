/* Start Game Field Menu Layer */

function GameFieldMenu(parentDOMElement, appendToParentDOMElement) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, 'game-field-menu', ['game-field']);

    this._menuHeader = new GameFieldMenuHeader(this.getDOMElement(), 'Monsters vs Tricksters');
    this._menuItems = [];

    var playGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'play-game-menu-item', 'New Game');
    var stopGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'stop-game-menu-item', 'Stop Game');
    var resumeGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'resume-game-menu-item', 'Resume Game');
    var saveGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'save-game-menu-item', 'Save Game');
    var facebookMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'facebook-menu-item', 'FB');
    var googleMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'google-menu-item', 'G+');

    this._menuItems.push(playGameMenuItem);
    this._menuItems.push(stopGameMenuItem);
    this._menuItems.push(resumeGameMenuItem);
    this._menuItems.push(saveGameMenuItem);
    this._menuItems.push(facebookMenuItem);
    this._menuItems.push(googleMenuItem);
}

GameFieldMenu.prototype = Object.create(GameFieldLayer.prototype);

GameFieldMenu.prototype.repaint = function () {

    GameEntity.prototype.repaint.call(this);

    this._menuHeader.repaint();
    this._menuItems.forEach(function (menuItem) {
        menuItem.repaint();
    });

}

function GameFieldMenuItem(parentDOMElement, id, textContent) {

    GameEntity.call(this, 'div', parentDOMElement, true, id, ['game-field-menu-item'], textContent);
}

GameFieldMenuItem.prototype = Object.create(GameEntity.prototype);

function GameFieldMenuHeader(parentDOMElement, textContent) {

    GameEntity.call(this, 'h1', parentDOMElement, true, 'menu-header', ['game-field-menu-header'], textContent);

}

GameFieldMenuHeader.prototype = Object.create(GameEntity.prototype);

/* End Game Field Menu Layer */
