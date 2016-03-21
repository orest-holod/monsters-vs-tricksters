/* Start Game Field Tower */

function GameFieldTower(parentDOMElement, appendToParentDOMElement) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, 'game-field-tower', ['game-field']);

    this._pixel = 0;
    this._maxX = this.getWidth();
    this._maxY = this.getHeight();
    this._widthX = Math.floor(this._maxX / 5);
    this._heightY = gameConfigs.gameField.gameFieldTower.steps.heightOfLevel;

    this._steps = [];
    this._tricksters = [];
    this._monsters = [];
    this._lifes = [];

    this._visibleSteps = [];
    this._visibleTricksters = [];
    this._visibleMonsters = [];
    this._visibleLifes = [];

    /* Start Init */

    this.generateSteps();
    this.generateTricksters();
    this.generateMonsters();
    this.generateLifes();

    /* End Init */
}

GameFieldTower.prototype = Object.create(GameFieldLayer.prototype);

/* Start Public Methods */

GameFieldTower.prototype.generateSteps = function () {

    for (var y = 0; y < gameConfigs.gameField.gameFieldTower.steps.numberOfLevels; y++) {

        for (var x = 0; x < 5; x++) {

            if ((x + y) % 3 === 0) {

                var randX = Math.floor(Math.random() * 3) * Math.floor(this._widthX / 3);

                if ((x + 1) * this._widthX + randX + this._widthX > this._maxX) {
                    randX = 0;
                }

                var stepColor = gameConfigs.colors[Math.floor(Math.random() * gameConfigs.colors.length)];

                this._steps.push(new Step(this._DOMElement, false, x * this._widthX, y, (this._widthX + randX), this._heightY, stepColor));
            }
        }
    }
}

GameFieldTower.prototype.generateTricksters = function () {

    var that = this;

    var numberOfSteps = this._steps.length;

    var numberOfTricksters = Math.min(gameConfigs.gameField.gameFieldTower.tricksters.numberOfTricksters, numberOfSteps);

    var indexOfTricksters = Math.floor(numberOfSteps / numberOfTricksters);

    this._steps.filter(function (step, index) {

        return index % indexOfTricksters === 0;

    }).forEach(function (step) {

        var trickster = new Trickster(that._DOMElement, false, gameConfigs.alphabet[Math.floor(Math.random() * (gameConfigs.alphabet.length))]);
        var color = gameConfigs.colors[Math.floor(Math.random() * gameConfigs.colors.length)];
        trickster.setColor(color);
        trickster.setTextShadow('0px 0px 3rem ' + color);
        trickster.setDX(gameConfigs.gameField.gameFieldTower.tricksters.arrayOfDX[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.tricksters.arrayOfDX.length)]);
        trickster.setDY(gameConfigs.gameField.gameFieldTower.tricksters.arrayOfDY[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.tricksters.arrayOfDY.length)]);
        trickster.setDAngle(gameConfigs.gameField.gameFieldTower.tricksters.arrayOfDAngle[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.tricksters.arrayOfDAngle.length)]);
        trickster.setLevitateDX(gameConfigs.gameField.gameFieldTower.tricksters.arrayOfLevitateDX[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.tricksters.arrayOfLevitateDX.length)]);
        trickster.setLevitateDY(gameConfigs.gameField.gameFieldTower.tricksters.arrayOfLevitateDY[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.tricksters.arrayOfLevitateDY.length)]);

        trickster.setTargetStep(step);
        that._tricksters.push(trickster);
    });
}

GameFieldTower.prototype.generateMonsters = function () {

    var that = this;

    var numberOfSteps = this._steps.length;

    var numberOfMonsters = Math.min(gameConfigs.gameField.gameFieldTower.monsters.numberOfMonsters, numberOfSteps);

    var indexOfMonsters = Math.floor(numberOfSteps / numberOfMonsters);

    this._steps.filter(function (step, index) {

        return index % indexOfMonsters === 0;

    }).forEach(function (step) {

        var monster = new Monster(that._DOMElement, false, '', gameConfigs.alphabet[Math.floor(Math.random() * (gameConfigs.alphabet.length))]);

        var color = gameConfigs.colors[Math.floor(Math.random() * gameConfigs.colors.length)];
        monster.setColor(color);
        monster.setTextShadow('0px 0px 3rem ' + color);
        monster.setDAngle(gameConfigs.gameField.gameFieldTower.monsters.arrayOfDAngle[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.monsters.arrayOfDAngle.length)]);
        monster.setTargetStep(step);
        that._monsters.push(monster);

    });

}
GameFieldTower.prototype.generateLifes = function () {

    var that = this;

    var numberOfSteps = this._steps.length;

    var numberOfLifes = Math.min(gameConfigs.gameField.gameFieldTower.lifes.numberOfLifes, numberOfSteps);

    var indexOfLifes = Math.floor(numberOfSteps / numberOfLifes);

    this._steps.filter(function (step, index) {

        return index % indexOfLifes === 0;

    }).forEach(function (step) {

        var life = new Life(that._DOMElement, false);

        life.setDAngle(gameConfigs.gameField.gameFieldTower.lifes.arrayOfDAngle[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.lifes.arrayOfDAngle.length)]);
        life.setTargetStep(step);
        that._lifes.push(life);

    });

}
GameFieldTower.prototype.getSteps = function () {

    return this._steps;
}

GameFieldTower.prototype.getTricksters = function () {

    return this._tricksters;
}

GameFieldTower.prototype.getMonsters = function () {

    return this._monsters;
}
GameFieldTower.prototype.getLifes = function () {

    return this._lifes;
}

GameFieldTower.prototype.getVisibleSteps = function () {

    return this._visibleSteps;
}

GameFieldTower.prototype.getVisibleTricksters = function () {

    return this._visibleTricksters;
}

GameFieldTower.prototype.getVisibleMonsters = function () {

    return this._visibleMonsters;
}
GameFieldTower.prototype.getVisibleLifes = function () {

    return this._visibleLifes;
}

GameFieldTower.prototype.getGamer = function () {

    return this._gamer;
}

GameFieldTower.prototype.saveMonster = function (monster) {

    monster.removeFromParentDOMElement();
}

GameFieldTower.prototype.pickUpLife = function (life) {

    life.removeFromParentDOMElement();
}
GameFieldTower.prototype.repaint = function () {

    GameFieldLayer.prototype.repaint.call(this);

    var that = this;

    this._steps.forEach(function (step) {

        var trickster = step.getTargetTrickster();
        var monster = step.getTargetMonster();
        var life = step.getTargetLife();

        if ((step.getY() <= that._pixel + that._maxY && !step.getDOMElement().parentNode && step.getY() >= that._pixel)) {

            step.appendToParentDOMElement();
            that._visibleSteps.push(step);

            if (trickster) {
                trickster.appendToParentDOMElement();
                that._visibleTricksters.push(trickster);
            }

            if (monster) {
                monster.appendToParentDOMElement();
                that._visibleMonsters.push(monster);
            }
            if (life) {
                life.appendToParentDOMElement();
                that._visibleLifes.push(life);
            }
            
            

        } else if ((step.getY() < that._pixel || step.getY() > that._pixel + that._maxY) && step.getDOMElement().parentNode) {

            step.removeFromParentDOMElement();
            that._visibleSteps.splice(that._visibleSteps.indexOf(step), 1);

            if (trickster) {
                trickster.removeFromParentDOMElement();
                that._visibleTricksters.splice(that._visibleTricksters.indexOf(trickster), 1);
            }

            if (monster) {
                monster.removeFromParentDOMElement();
                that._visibleMonsters.splice(that._visibleMonsters.indexOf(monster), 1);
            }
            if (life) {
                life.removeFromParentDOMElement();
                that._visibleLifes.splice(that._visibleLifes.indexOf(life), 1);
            }
            
            
        }

        step.repaint();

        if (trickster) {
            trickster.repaint();
        }
        
        if (monster) {
            monster.repaint();
        }
        if (life) {
            life.repaint();
        }
       

    });
}

GameFieldTower.prototype.addPixel = function (value) {

    this._pixel += value;
    this.setHeight(this.getHeight() + value);
}

GameFieldTower.prototype.minusPixel = function (value) {

    this._pixel -= value;
    this.setHeight(this.getHeight() - value);
}

/* End Public Methods */

/* End Game Field Tower */