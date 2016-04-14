/* Start Game Field Menu Layer */

function GameFieldMenu(parentDOMElement, appendToParentDOMElement) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, 'game-field-menu', ['game-field']);

    var aboutGameContent = 'Gamer (main monster) jumps up an infinite tower looking and trying to resque his friends (other monsters) that have been kidnapped and now being under the spell of evil tricksters. Evil tricksters do their best to keep monster from resquing his friends...';

    this._menuHeader = new GameFieldMenuHeader(this.getDOMElement(), 'Monsters<br/>vs<br/>Tricksters');
    this._menuGameOver = new GameFieldMenuGameInfo(this.getDOMElement(),'menu-game-over', 'Game Over');
    this._menuGamePaused = new GameFieldMenuGameInfo(this.getDOMElement(), 'menu-game-paused', 'Game Paused');
    this._menuAboutGame = new GameFieldMenuText(this.getDOMElement(), 'menu-game-about-text', aboutGameContent);
    this._menuItems = [];

    var playGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'play-game-menu-item', 'New Game');
    var resumeGameMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'resume-game-menu-item', 'Resume Game');
    var musicOnOff = new GameFieldMenuItem(this.getDOMElement(), 'music-on-off-menu-item', 'Music OFF');
    var soundOnOff = new GameFieldMenuItem(this.getDOMElement(), 'sound-on-off-menu-item', 'Sound OFF');
    var facebookMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'facebook-menu-item', 'FB');
    var aboutMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'about-menu-item', 'About');
    var connectComputerMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'connect-menu-item', 'Connect Computer');
    var remoteControlMenuItem = new GameFieldMenuItem(this.getDOMElement(), 'remote-control-menu-item', 'Remote control');
    var backToMenu = new GameFieldMenuItem(this.getDOMElement(), 'back-to-menu-menu-item', 'Go back to menu');

    this._menuItems.push(playGameMenuItem);
    this._menuItems.push(resumeGameMenuItem);
    this._menuItems.push(musicOnOff);
    this._menuItems.push(soundOnOff);
    this._menuItems.push(facebookMenuItem);
    this._menuItems.push(aboutMenuItem);
    this._menuItems.push(connectComputerMenuItem);
    this._menuItems.push(remoteControlMenuItem);
    this._menuItems.push(backToMenu);

    this._menuGameOver.makeHidden();
    this._menuGamePaused.makeHidden();
    this._menuAboutGame.makeHidden();
    this._menuItems[8].makeHidden();
    this.makeHidden();
}

GameFieldMenu.prototype = Object.create(GameFieldLayer.prototype);

GameFieldMenu.prototype.getGameFieldMenuGameOver = function () {

    return this._menuGameOver;
}

GameFieldMenu.prototype.getGameFieldMenuGamePaused = function () {

    return this._menuGamePaused;
}

GameFieldMenu.prototype.getGameFieldMenuAboutGameText = function () {

    return this._menuAboutGame;
}

GameFieldMenu.prototype.getGameFieldMenuNewGameItem = function() {

    return this._menuItems[0];
}

GameFieldMenu.prototype.getGameFieldMenuResumeItem = function() {

    return this._menuItems[1];
}

GameFieldMenu.prototype.getGameFieldMenuMusicOnOffItem = function() {

    return this._menuItems[2];
}

GameFieldMenu.prototype.getGameFieldMenuSoundOnOffItem = function() {

    return this._menuItems[3];
}

GameFieldMenu.prototype.getGameFieldMenuFacebookItem = function() {

    return this._menuItems[4];
}


GameFieldMenu.prototype.getGameFieldMenuAboutGameItem = function() {

    return this._menuItems[5];
}

GameFieldMenu.prototype.getGameFieldMenuConnectComputerItem = function() {
    return this._menuItems[6];
}

GameFieldMenu.prototype.getGameFieldMenuRemoteControlItem = function() {
    return this._menuItems[7];
}

GameFieldMenu.prototype.getGameFieldMenuBackToMenuItem = function() {
    return this._menuItems[8];
}

GameFieldMenu.prototype.repaint = function () {

    GameEntity.prototype.repaint.call(this);

    this._menuHeader.repaint();
    this._menuGameOver.repaint();
    this._menuGamePaused.repaint();
    this._menuAboutGame.repaint();
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

function GameFieldMenuGameInfo(parentDOMElement, id, textContent) {

    GameEntity.call(this, 'h2', parentDOMElement, true, id, ['game-field-menu-header'], textContent);
}

GameFieldMenuGameInfo.prototype = Object.create(GameEntity.prototype);

function GameFieldMenuText(parentDOMElement, id, textContent) {

    GameEntity.call(this, 'div', parentDOMElement, true, id, ['game-field-menu-text'], textContent);
}

GameFieldMenuText.prototype = Object.create(GameEntity.prototype);

/* End Game Field Menu Layer */
