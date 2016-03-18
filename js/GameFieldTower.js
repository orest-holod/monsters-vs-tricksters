/* Start Game Field Tower */

function GameFieldTower(parentDOMElement, appendToParentDOMElement) {

    GameEntity.call(this, 'div', parentDOMElement, appendToParentDOMElement, 'game-field-tower', ['game-field']);

    this._pixel = 0;
    this._maxX = this.getWidth();
    this._maxY = this.getHeight();
    this._widthX = Math.floor(this._maxX / 5);
    this._heightY = Math.floor(this._maxY / 12);

    this._steps = [];
    this._tricksters = [];
    this._monsters = [];
}

GameFieldTower.prototype = Object.create(GameFieldLayer.prototype);

/* Start Public Methods */

GameFieldTower.prototype.generateSteps = function (colors) {

    for (var y = 0; y < 100; y++) {
        for (var x = 0; x < 5; x++) {

            if ((x + y) % 3 === 0) {

                var randX = Math.floor(Math.random() * 3) * Math.floor(this._widthX / 3);

                if ((x + 1) * this._widthX + randX + this._widthX > this._maxX) {
                    randX = 0;
                }

                var stepColor = colors[Math.floor(Math.random() * colors.length)];

                this._steps.push(new Step(this._DOMElement, false, x * this._widthX, y, (this._widthX + randX), this._heightY, stepColor));
            }
        }
    }
}

GameFieldTower.prototype.generateTricksters = function (colors, alphabet) {

    var that = this;

    this._steps.filter(function (step, index) {

        return index % 4 === 0;

    }).forEach(function (step) {

        var trickster = new Trickster(that._DOMElement, false, alphabet[Math.floor(Math.random() * (alphabet.length))]);

        var color = colors[Math.floor(Math.random() * colors.length)];
        trickster.setColor(color);
        trickster.setTextShadow('0px 0px 3rem ' + color);
        trickster.setX(step.getX() + step.getWidth() / 2);
        trickster.setY(step.getY() + step.getHeight() + 10);
        trickster.setDX(10);
        trickster.setDY(10);
        trickster.setDAngle(5);
        trickster.setLevitateDX(step.getWidth() / 2);
        trickster.setTargetStep(step);
        that._tricksters.push(trickster);
    });

}

GameFieldTower.prototype.generateMonsters = function (colors, alphabet) {

    var that = this;

    this._steps.filter(function (step, index) {

        return index % 4 === 1;

    }).forEach(function (step) {

        var monster = new Monster(that._DOMElement, false, '', alphabet[Math.floor(Math.random() * (alphabet.length))]);

        var color = colors[Math.floor(Math.random() * colors.length)];
        monster.setColor(color);
        monster.setTextShadow('0px 0px 3rem ' + color);
        monster.setX(step.getX() + step.getWidth() / 2);
        monster.setY(step.getY() + step.getHeight() + 10);
        monster.setDAngle(5);
        monster.setTargetStep(step);
        that._monsters.push(monster);

    });

}

GameFieldTower.prototype.getTrickstersByTargetStep = function (targetStep) {

    var tricksters = [];

    this._tricksters.forEach(function (trickster) {

        if (trickster.getTargetStep() === targetStep) {
            tricksters.push(trickster);
        }

    });

    return tricksters;

}

GameFieldTower.prototype.getMonstersByTargetStep = function (targetStep) {

    var monsters = [];

    this._monsters.forEach(function (monster) {

        if (monster.getTargetStep() === targetStep) {
            monsters.push(monster);
        }

    });

    return monsters;

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

GameFieldTower.prototype.getVisibleSteps = function () {

    return this._steps.filter(function (step) { return step.isAppendedToParentDOMElement(); });
}

GameFieldTower.prototype.getVisibleTricksters = function () {

    return this._tricksters.filter(function (trickster) { return trickster.isAppendedToParentDOMElement(); });;
}

GameFieldTower.prototype.getVisibleMonsters = function () {

    return this._monsters.filter(function (monster) { return monster.isAppendedToParentDOMElement(); });;
}

GameFieldTower.prototype.getGamer = function() {

    return this._gamer;
}

GameFieldTower.prototype.saveMonster = function (monster) {

    monster.removeFromParentDOMElement();
}

GameFieldTower.prototype.repaint = function () {

    GameFieldLayer.prototype.repaint.call(this);

    var that = this;

    this._steps.forEach(function (step) {

        var trickstersByTargetStep = that.getTrickstersByTargetStep(step);
        var monstersByTargetStep = that.getMonstersByTargetStep(step);

        if ((step.getY() <= that._pixel + that._maxY && !step.getDOMElement().parentNode && step.getY() >= that._pixel)) {

            step.appendToParentDOMElement();

            trickstersByTargetStep.forEach(function (trickster) { trickster.appendToParentDOMElement(); });
            monstersByTargetStep.forEach(function (monster) { monster.appendToParentDOMElement(); });

        } else if ((step.getY() < that._pixel || step.getY() > that._pixel + that._maxY) && step.getDOMElement().parentNode) {

            step.removeFromParentDOMElement();

            trickstersByTargetStep.forEach(function (trickster) { trickster.removeFromParentDOMElement(); });
            monstersByTargetStep.forEach(function (monster) { monster.removeFromParentDOMElement(); });
        }

        step.repaint();
        trickstersByTargetStep.forEach(function (trickster) { trickster.repaint(); });
        monstersByTargetStep.forEach(function (monster) { monster.repaint(); });

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