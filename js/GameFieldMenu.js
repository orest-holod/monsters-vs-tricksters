/* Start Game Field Menu Layer */

function GameFieldMenu(parentDOMElement, appendToParentDOMElement) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, 'game-field-menu', ['game-field']);

    this._menuHeader = new GameFieldMenuHeader(this.getDOMElement(), 'Monsters vs Tricksters');
    this._menuItems = [];
    this._menuInputName =[];

    var playGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'play-game-menu-item', 'New Game');
    var stopGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'stop-game-menu-item', 'Stop Game');
    var resumeGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'resume-game-menu-item', 'Resume Game');
    var saveGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'save-game-menu-item', 'Save Game');
    var facebookMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'facebook-menu-item', 'FB');
    var googleMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'google-menu-item', 'G+');
    var createAccountMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'create-account');
    var startGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'start-new-game', 'Start Game');

    var textGameCreateAccount = new MenuInputName(this.getDOMElement(), 'input-text', 'input text');

    this._menuItems.push(playGameMenuItem);
    this._menuItems.push(stopGameMenuItem);
    this._menuItems.push(resumeGameMenuItem);
    this._menuItems.push(saveGameMenuItem);
    this._menuItems.push(facebookMenuItem);
    this._menuItems.push(googleMenuItem);
    this._menuItems.push(createAccountMenuItem);
    this._menuItems.push(startGameMenuItem);
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
function MenuInputName(parentDOMElement, id, textContent) {

    GameEntity.call(this, 'input', parentDOMElement, true, id, ['game-field-menu-item'], textContent);
}
GameFieldMenuItem.prototype = Object.create(GameEntity.prototype);
MenuInputName.prototype = Object.create(GameEntity.prototype);

function GameFieldMenuHeader(parentDOMElement, textContent) {

    GameEntity.call(this, 'h1', parentDOMElement, true, 'menu-header', ['game-field-menu-header'], textContent);

}

GameFieldMenuHeader.prototype = Object.create(GameEntity.prototype);


/* End Game Field Menu Layer */
