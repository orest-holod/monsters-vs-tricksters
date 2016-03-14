/* Start Game Field Menu Layer */

function GameFieldMenuLayer(parentDOMElement, appendToParentDOMElement) {

    GameFieldLayer.call(this, parentDOMElement, appendToParentDOMElement, 'menu');

    this._menuHeader = new MenuHeader(this.getDOMElement(), 'Monsters vs Tricksters');
    this._menuItems = [];

    var playGameMenuItem = new MenuItem(this.getDOMElement(), 'play-game-menu-item', 'New Game');
    var stopGameMenuItem = new MenuItem(this.getDOMElement(), 'stop-game-menu-item', 'Stop Game');
    var resumeGameMenuItem = new MenuItem(this.getDOMElement(), 'resume-game-menu-item', 'Resume Game');
    var saveGameMenuItem = new MenuItem(this.getDOMElement(), 'save-game-menu-item', 'Save Game');
    var facebookMenuItem = new MenuItem(this.getDOMElement(), 'facebook-menu-item', 'FB');
    var googleMenuItem = new MenuItem(this.getDOMElement(), 'google-menu-item', 'G+');

    playGameMenuItem.setX(0);
    playGameMenuItem.setY(this._menuHeader.getY() + this._menuHeader.getHeight() + 50);

    stopGameMenuItem.setX(0);
    stopGameMenuItem.setY(playGameMenuItem.getY() + playGameMenuItem.getHeight() + 10);

    resumeGameMenuItem.setX(0);
    resumeGameMenuItem.setY(stopGameMenuItem.getY() + stopGameMenuItem.getHeight() + 10);

    saveGameMenuItem.setX(0);
    saveGameMenuItem.setY(resumeGameMenuItem.getY() + resumeGameMenuItem.getHeight() + 10);

    facebookMenuItem.setX(0);
    facebookMenuItem.setY(saveGameMenuItem.getY() + saveGameMenuItem.getHeight() + 10);

    googleMenuItem.setX(0);
    googleMenuItem.setY(facebookMenuItem.getY() + facebookMenuItem.getHeight() + 10);

    this._menuItems.push(playGameMenuItem);
    this._menuItems.push(stopGameMenuItem);
    this._menuItems.push(resumeGameMenuItem);
    this._menuItems.push(saveGameMenuItem);
    this._menuItems.push(facebookMenuItem);
    this._menuItems.push(googleMenuItem);
}

GameFieldMenuLayer.prototype = Object.create(GameFieldLayer.prototype);

GameFieldMenuLayer.prototype.repaint = function () {

    GameFieldLayer.prototype.repaint.call(this);

    this._menuHeader.repaint();
    this._menuItems.forEach(function (menuItem) {
        menuItem.repaint();
    });

}

function MenuItem(parentDOMElement, id, textContent) {

    GameEntity.call(this, "div", parentDOMElement, true, id, [], textContent);
}

MenuItem.prototype = Object.create(GameEntity.prototype);

function MenuHeader(parentDOMElement, textContent) {

    GameEntity.call(this, "h1", parentDOMElement, true, 'menu-header', [], textContent);

}

MenuHeader.prototype = Object.create(GameEntity.prototype);

/* End Game Field Menu Layer */
