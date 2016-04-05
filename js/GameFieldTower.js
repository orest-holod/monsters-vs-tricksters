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

    this._steps = this.generateSteps();
    this._tricksters = this.generateTricksters(this._steps);
    this._monsters = this.generateMonsters(this._steps);
    this._lifes = this.generateLifes(this._steps);

    this.update();

    /* End Init */
}

GameFieldTower.prototype = Object.create(GameFieldLayer.prototype);

/* Start Public Methods */

GameFieldTower.prototype.generateSteps = function (previousSteps) {

    var steps = [];

    var startLevel = 0;
    var endLevel = gameConfigs.gameField.gameFieldTower.steps.numberOfLevels;

    if (previousSteps) {

        startLevel = previousSteps[previousSteps.length - 1].getLevelIndex() + 1;
        endLevel = startLevel + gameConfigs.gameField.gameFieldTower.steps.numberOfLevels;
    }

    for (var y = startLevel; y < endLevel; y++) {

        for (var x = 0; x < 5; x++) {

            if ((x + y) % 3 === 0) {

                var randX = Math.floor(Math.random() * 3) * Math.floor(this._widthX / 3);

                if ((x + 1) * this._widthX + randX + this._widthX > this._maxX) {
                    randX = 0;
                }

                var stepColor = gameConfigs.colors[Math.floor(Math.random() * gameConfigs.colors.length)];

                steps.push(new Step(this._DOMElement, false, x * this._widthX, y, (this._widthX + randX), this._heightY, stepColor));
            }
        }
    }

    return steps;
}

GameFieldTower.prototype.generateTricksters = function (steps) {

    var tricksters = [];

    var that = this;

    var numberOfSteps = steps.length;

    var numberOfTricksters = Math.min(gameConfigs.gameField.gameFieldTower.tricksters.numberOfTricksters, numberOfSteps);

    var indexOfTricksters = Math.floor(numberOfSteps / numberOfTricksters);

    steps.filter(function (step, index) {

        return index % indexOfTricksters === 0;

    }).forEach(function (step) {

        var trickster = new Trickster(that._DOMElement, false, gameConfigs.alphabet[Math.floor(Math.random() * (gameConfigs.alphabet.length))]);
        var color = gameConfigs.colors[Math.floor(Math.random() * gameConfigs.colors.length)];
        trickster.setColor(color);
        trickster.setDX(gameConfigs.gameField.gameFieldTower.tricksters.arrayOfDX[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.tricksters.arrayOfDX.length)]);
        trickster.setDY(gameConfigs.gameField.gameFieldTower.tricksters.arrayOfDY[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.tricksters.arrayOfDY.length)]);
        trickster.setDAngle(gameConfigs.gameField.gameFieldTower.tricksters.arrayOfDAngle[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.tricksters.arrayOfDAngle.length)]);
        trickster.setLevitateDX(gameConfigs.gameField.gameFieldTower.tricksters.arrayOfLevitateDX[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.tricksters.arrayOfLevitateDX.length)]);
        trickster.setLevitateDY(gameConfigs.gameField.gameFieldTower.tricksters.arrayOfLevitateDY[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.tricksters.arrayOfLevitateDY.length)]);
        trickster.setDScale(gameConfigs.gameField.gameFieldTower.tricksters.dScale);

        trickster.setTargetStep(step);
        tricksters.push(trickster);
    }, this);

    return tricksters;
}

GameFieldTower.prototype.generateMonsters = function (steps) {

    var monsters = [];

    var that = this;

    var numberOfSteps = steps.length;

    var numberOfMonsters = Math.min(gameConfigs.gameField.gameFieldTower.monsters.numberOfMonsters, numberOfSteps);

    var indexOfMonsters = Math.floor(numberOfSteps / numberOfMonsters);

    steps.filter(function (step, index) {

        return index % indexOfMonsters === 0;

    }).forEach(function (step) {

        var monster = new Monster(that._DOMElement, false, '', gameConfigs.alphabet[Math.floor(Math.random() * (gameConfigs.alphabet.length))]);

        var color = gameConfigs.colors[Math.floor(Math.random() * gameConfigs.colors.length)];
        monster.setColor(color);
        monster.setDAngle(gameConfigs.gameField.gameFieldTower.monsters.arrayOfDAngle[Math.floor(Math.random() * gameConfigs.gameField.gameFieldTower.monsters.arrayOfDAngle.length)]);
        monster.setTargetStep(step);
        monsters.push(monster);

    }, this);

    return monsters;
}
GameFieldTower.prototype.generateLifes = function (steps) {

    var lifes = [];

    var that = this;

    var numberOfSteps = steps.length;

    var numberOfLifes = Math.min(gameConfigs.gameField.gameFieldTower.lifes.numberOfLifes, numberOfSteps);

    var indexOfLifes = Math.floor(numberOfSteps / numberOfLifes);

    steps.filter(function (step, index) {

        return index % indexOfLifes === 0;

    }).forEach(function (step) {

        var life = new Life(that._DOMElement, false);

        life.setDScale(gameConfigs.gameField.gameFieldTower.lifes.dScale);
        life.setTargetStep(step);
        lifes.push(life);

    });

    return lifes;

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

GameFieldTower.prototype.pickUpMonster = function (monster) {

    monster.removeFromParentDOMElement();

    this._monsters.splice(this._monsters.indexOf(monster), 1);
    this._visibleMonsters.splice(this._visibleMonsters.indexOf(monster), 1);

    var targetStep = monster.getTargetStep();
    targetStep.setTargetMonster(null);
}

GameFieldTower.prototype.pickUpLife = function (life) {

    life.removeFromParentDOMElement();

    this._lifes.splice(this._lifes.indexOf(life), 1);
    this._visibleLifes.splice(this._visibleLifes.indexOf(life), 1);

    var targetStep = life.getTargetStep();
    targetStep.setTargetLife(null);
}

GameFieldTower.prototype.update = function () {

    if (this._visibleSteps.length && this._visibleSteps[this._visibleSteps.length - 1].getLevelIndex() === this._steps[this._steps.length - 1].getLevelIndex()) {

        var additionalSteps = this.generateSteps(this._steps);
        this._steps = this._steps.concat(additionalSteps);
        this._tricksters = this._tricksters.concat(this.generateTricksters(additionalSteps));
        this._monsters = this._monsters.concat(this.generateMonsters(additionalSteps));
        this._lifes = this._lifes.concat(this.generateLifes(additionalSteps));
    }

    var that = this;

    this._steps.forEach(function (step) {

        var trickster = step.getTargetTrickster();
        var monster = step.getTargetMonster();
        var life = step.getTargetLife();

        if (!step.isAppendedToParentDOMElement() && step.getY() <= that.getHeight() && step.getY() >= that._pixel) {

            step.appendToParentDOMElement();
            that._visibleSteps.push(step);

            if (trickster) {

                trickster.appendToParentDOMElement();

                if (!trickster.getWidth()) {

                    var tricksterCR = trickster.getDOMElement().getBoundingClientRect();
                    trickster.setWidth(tricksterCR.width);
                    trickster.setHeight(tricksterCR.height);
                }

                that._visibleTricksters.push(trickster);
            }

            if (monster) {

                monster.appendToParentDOMElement();

                if (!monster.getWidth()) {

                    var monsterCR = monster.getDOMElement().getBoundingClientRect();
                    monster.setWidth(monsterCR.width);
                    monster.setHeight(monsterCR.height);
                }

                that._visibleMonsters.push(monster);
            }

            if (life) {

                life.appendToParentDOMElement();

                if (!life.getWidth()) {

                    var lifeCR = life.getDOMElement().getBoundingClientRect();
                    life.setWidth(lifeCR.width);
                    life.setHeight(lifeCR.height);
                }

                that._visibleLifes.push(life);
            }

        } else if (step.isAppendedToParentDOMElement() && (step.getY() < that._pixel || step.getY() > that.getHeight())) {

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
    });
}

GameFieldTower.prototype.repaint = function () {

    GameFieldLayer.prototype.repaint.call(this);

    this._visibleSteps.forEach(function (step) {

        step.repaint();

        var trickster = step.getTargetTrickster();

        if (trickster) {

            trickster.repaint();
        }

        var monster = step.getTargetMonster();

        if (monster) {

            monster.repaint();
        }

        var life = step.getTargetLife();

        if (life) {

            life.repaint();
        }
    });
}

GameFieldTower.prototype.addPixel = function (value) {

    this._pixel += value;
    this.setHeight(this.getHeight() + value);
    this.update();
}

GameFieldTower.prototype.minusPixel = function (value) {

    this._pixel -= value;
    this.setHeight(this.getHeight() - value);
    this.update();
}

GameFieldTower.prototype.getPixel = function() {

    return this._pixel;
}

/* End Public Methods */

/* End Game Field Tower */