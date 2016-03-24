function GameFieldScore(parentDOMElement, appendToParentDOMElement) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, 'game-field-score', ['game-field']);

    this._lifes = gameConfigs.gameField.gameFieldScore.lifes;
    this._gameFieldScoreLifes = new GameEntity('div', this.getDOMElement(), true, 'game-field-score-lifes', []);
    this._gameFieldScoreLifesItems = [];

    for (var i = 0; i < this._lifes; i++) {
        this._gameFieldScoreLifesItems.push(new GameEntity('div', this._gameFieldScoreLifes.getDOMElement(), true, '', ['game-field-score-item', 'game-field-score-lifes']));
    }

    this._gameFieldScoreMonsters = new GameEntity('div', this.getDOMElement(), true, 'game-field-score-monsters', ['game-field-score-item']);

    this._monsters = 0;
    this._gameFieldScoreMonsters.setTextContent('F ' + this._monsters);
}

GameFieldScore.prototype = Object.create(GameEntity.prototype);

GameFieldScore.prototype.getLifes = function () {
    return this._lifes;
}

GameFieldScore.prototype.addLifes = function () {

    for (var i = 0; i < this._lifes; i++) {
        this._gameFieldScoreLifesItems[i].removeFromParentDOMElement();
    }

    this._gameFieldScoreLifesItems = [];
    this._lifes++;

    for (var i = 0; i < this._lifes; i++) {
        this._gameFieldScoreLifesItems.push(new GameEntity('div', this._gameFieldScoreLifes.getDOMElement(), true, '', ['game-field-score-item', 'game-field-score-lifes']));
    }
}
GameFieldScore.prototype.removeLifes = function () {

    for (var i = 0; i < this._lifes; i++) {
        this._gameFieldScoreLifesItems[i].removeFromParentDOMElement();
    }

    this._gameFieldScoreLifesItems = [];
    this._lifes--;

    for (var i = 0; i < this._lifes; i++) {
        this._gameFieldScoreLifesItems.push(new GameEntity('div', this._gameFieldScoreLifes.getDOMElement(), true, '', ['game-field-score-item', 'game-field-score-lifes']));
    }

}
GameFieldScore.prototype.addMonsters = function () {

    this._monsters++;
    this._gameFieldScoreMonsters.setTextContent('F ' + this._monsters);
}

GameFieldScore.prototype.repaint = function () {

    GameEntity.prototype.repaint.call(this);

    this._gameFieldScoreLifesItems.forEach(function (gameScoreLife) {
        gameScoreLife.repaint();
    });

    this._gameFieldScoreMonsters.repaint();
}