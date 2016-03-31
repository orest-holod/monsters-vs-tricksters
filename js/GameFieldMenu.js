/* Start Game Field Menu Layer */

function GameFieldMenu(parentDOMElement, appendToParentDOMElement) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, 'game-field-menu', ['game-field']);

    this._menuHeader = new GameFieldMenuHeader(this.getDOMElement(), 'Monsters vs Tricksters');
    this._menuGameOver = new GameFieldMenuGameOver(this.getDOMElement(), 'Game Over');
    this._menuItems = [];

    var playGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'play-game-menu-item', 'New Game');
    var resumeGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'resume-game-menu-item', 'Resume Game');
    var facebookMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'facebook-menu-item', 'FB');
    var googleMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'google-menu-item', 'G+');
    var connectComputerMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'connect-menu-item', 'Connect Computer');
    var remoteControlMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'remote-control-menu-item', 'Remote control page');

    this._menuItems.push(playGameMenuItem);
    this._menuItems.push(resumeGameMenuItem);
    this._menuItems.push(facebookMenuItem);
    this._menuItems.push(googleMenuItem);
    this._menuItems.push(connectComputerMenuItem);
    this._menuItems.push(remoteControlMenuItem);

    this._menuGameOver.makeHidden();
    this.makeHidden();
}

GameFieldMenu.prototype = Object.create(GameFieldLayer.prototype);

GameFieldMenu.prototype.getGameFieldMenuGameOver = function () {

    return this._menuGameOver;
}

GameFieldMenu.prototype.getGameFieldMenuResumeItem = function() {

    return this._menuItems[1];
}

GameFieldMenu.prototype.getGameFieldMenuConnectComputerItem = function() {
    return this._menuItems[4];
}

GameFieldMenu.prototype.repaint = function () {

    GameEntity.prototype.repaint.call(this);

    this._menuHeader.repaint();
    this._menuGameOver.repaint();
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

function GameFieldMenuGameOver(parentDOMElement, textContent) {

    GameEntity.call(this, 'h2', parentDOMElement, true, 'menu-game-over', ['game-field-menu-header'], textContent);

}

GameFieldMenuGameOver.prototype = Object.create(GameEntity.prototype);

/* End Game Field Menu Layer */
