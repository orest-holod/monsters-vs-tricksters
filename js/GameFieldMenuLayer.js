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

    googleMenuItem.setX(0);
    googleMenuItem.setY(this._menuHeader.getY() + this._menuHeader.getHeight() - 90);

    facebookMenuItem.setX(0);
    facebookMenuItem.setY(googleMenuItem.getY() + googleMenuItem.getHeight() + 15);

    saveGameMenuItem.setX(0);
    saveGameMenuItem.setY(facebookMenuItem.getY() + facebookMenuItem.getHeight() + 15);

    resumeGameMenuItem.setX(0);
    resumeGameMenuItem.setY(saveGameMenuItem.getY() + saveGameMenuItem.getHeight() + 15);

    stopGameMenuItem.setX(0);
    stopGameMenuItem.setY(resumeGameMenuItem.getY() + resumeGameMenuItem.getHeight() + 15);

    playGameMenuItem.setX(0);
    playGameMenuItem.setY(stopGameMenuItem.getY() + stopGameMenuItem.getHeight() + 15);
    
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
