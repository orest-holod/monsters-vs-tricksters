function GameFieldScore(parentDOMElement, appendToParentDOMElement) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, 'game-field-score', ['game-field']);

    this._gameFieldScoreLifes = [];

    this._gameFieldScoreMonsters = new GameEntity('div', this.getDOMElement(), true, 'game-field-score-monsters', ['game-field-score-item']);
    this._lifes = gameConfigs.gameField.gameFieldScore.lifes;
    this._monsters = 0;
    this._gameFieldScoreMonsters.setTextContent(this._monsters);
    for(var i = 0; i < this._lifes; i++){
        this._gameFieldScoreLifes.push(new GameEntity('div', this.getDOMElement(), true, '', ['game-field-score-item', 'game-field-score-lifes']));
    }
}

GameFieldScore.prototype = Object.create(GameEntity.prototype);

GameFieldScore.prototype.getLifes = function (){
    return this._lifes;
}

GameFieldScore.prototype.addLifes = function(){
    for(var i = 0; i < this._lifes; i++){
        this._gameFieldScoreLifes[i].removeFromParentDOMElement();
    }
    this._gameFieldScoreLifes = [];
    this._lifes++;
    for(var i = 0; i < this._lifes; i++){
        this._gameFieldScoreLifes.push(new GameEntity('div', this.getDOMElement(), true, '', ['game-field-score-item', 'game-field-score-lifes']));
    }
}
GameFieldScore.prototype.removeLifes = function (){
    for(var i = 0; i < this._lifes; i++){
        this._gameFieldScoreLifes[i].removeFromParentDOMElement();
    }
    this._gameFieldScoreLifes = [];
    this._lifes--;
    for(var i = 0; i < this._lifes; i++){
        this._gameFieldScoreLifes.push(new GameEntity('div', this.getDOMElement(), true, '', ['game-field-score-item', 'game-field-score-lifes']));
    }

}
GameFieldScore.prototype.pickUpMonster = function () {
    this._monsters++;
    this._gameFieldScoreMonsters.setTextContent(this._monsters);
}

GameFieldScore.prototype.repaint = function() {

    GameEntity.prototype.repaint.call(this);

    this._gameFieldScoreLifes.forEach(function(gameScoreLife){
        gameScoreLife.repaint();
    })
    this._gameFieldScoreMonsters.repaint();
}