﻿/* Start Game */

function Game(parentDOMElement) {

    var that = this;

    this._parentDOMElement = parentDOMElement;

    this._colors = ['#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000', '#e91e63', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162', '#9c27b0', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff', '#673ab7', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#512da8', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea', '#3f51b5', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe', '#2196f3', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff', '#03a9f4', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5', '#4caf50', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#b9f6ca', '#69f0ae', '#00e676', '#00c853', '#8bc34a', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#ccff90', '#b2ff59', '#76ff03', '#64dd17', '#cddc39', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00', '#ffeb3b', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffea00', '#ffd600', '#ffc107', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00', '#ff9800', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00', '#ff5722', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00'];
    this._alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    this._animationFrameManager = new AnimationFrameManager();

    this._gameField = initializeGameField();

    this._tricksters = initializeTricksters();

    this._monsters = initializeMonsters();

    this._mainMonster = new Monster(this._gameField.getDOMElement(), true, 'main-monster', "A");
    this._mainMonster.setX(0);
    this._mainMonster.setY(0);
    this._mainMonster.setDX(15);

    this._isEscPressed = false;
    this._isRightKeyPressed = false;
    this._isLeftKeyPressed = false;
    this._isUpKeyPressed = false;
    this._isDownKeyPressed = false;

    function initializeGameField() {

        var gameField = new GameField(that._parentDOMElement, true);

        var cloudsLayer = gameField.getCloudsLayer();
        cloudsLayer.setBackgroundPositionDX(5);

        var starsLayer = gameField.getStarsLayer();
        starsLayer.setBackgroundPositionDX(-1);
        starsLayer.setBackgroundPositionDY(-1);

        var stepsLayer = gameField.getStepsLayer();
        stepsLayer.generateSteps(that._colors);

        return gameField;
    }

    function initializeTricksters() {

        var tricksters = [];

        var stepsLayer = that._gameField.getStepsLayer();
        var stepsLayerDOMElement = stepsLayer.getDOMElement();
        var steps = stepsLayer.getSteps();

        steps.filter(function (step, index) {

            return index % 2 === 0;

        }).forEach(function (step) {

            var trickster = new Trickster(stepsLayerDOMElement, true, that._alphabet[Math.floor(Math.random() * (that._alphabet.length + 1))]);

            var color = that._colors[Math.floor(Math.random() * that._colors.length)];
            trickster.setColor(color);
            trickster.setTextShadow("0px 0px 3rem " + color);
            trickster.setX(step.getX() + step.getWidth() / 2);
            trickster.setY(step.getY() + step.getHeight() + 10);
            trickster.setDX(10);
            trickster.setDY(10);
            trickster.setDAngle(5);
            trickster.setLevitateDX(step.getWidth() / 2);
            tricksters.push(trickster);

        });

        tricksters.filter(function (trickster, index) { return index % 2 === 0 }).forEach(function (trickster) { trickster.setLevitateDY(50); });

        return tricksters;
    }

    function initializeMonsters() {

        var monsters = [];

        var stepsLayer = that._gameField.getStepsLayer();
        var stepsLayerDOMElement = stepsLayer.getDOMElement();
        var steps = stepsLayer.getSteps();

        steps.filter(function (step, index) {

            return index % 2 !== 0;

        }).forEach(function (step) {

            var monster = new Monster(stepsLayerDOMElement, true, '', that._alphabet[Math.floor(Math.random() * (that._alphabet.length + 1))]);

            var color = that._colors[Math.floor(Math.random() * that._colors.length)];
            monster.setColor(color);
            monster.setTextShadow("0px 0px 3rem " + color);
            monster.setX(step.getX() + step.getWidth() / 2);
            monster.setY(step.getY() + step.getHeight() + 10);
            monster.setDAngle(5);
            monsters.push(monster);
        });

        return monsters;

    }

}

Game.prototype.keyDownEventHandler = function (e) {

    switch (e.keyCode) {

        case 27:
            {
                if (!this._isEscPressed) {

                    this._isEscPressed = true;
                }

                break;
            }

        case 38: {

            this._isUpKeyPressed = true;
            break;
        }

        case 40: {

            this._isDownKeyPressed = true;
            break;
        }

        case 39: {
            this._isRightKeyPressed = true;
            break;
        }
        case 37: {
            this._isLeftKeyPressed = true;
            break;
        }
    }
}

Game.prototype.keyUpEventHandler = function (e) {

    switch (e.keyCode) {

        case 27:
            {
                if (this._isEscPressed) {

                    this._isEscPressed = false;
                }

                break;
            }

        case 38: {

            this._isUpKeyPressed = false;
            break;
        }

        case 40: {

            this._isDownKeyPressed = false;
            break;
        }

        case 39: {
            this._isRightKeyPressed = false;
            break;
        }
        case 37: {
            this._isLeftKeyPressed = false;
            break;
        }
    }
}

Game.prototype.mouseClickEventHandler = function (e) {

    switch (e.target.id) {

        case 'play-game-menu-item':
            {

                this.start();
                break;
            }

        case 'stop-game-menu-item':
            {

                this.stop();
                break;
            }

        case 'resume-game-menu-item':
            {

                this.resume();
                break;
            }
    }
}

Game.prototype.runGameLoop = function () {

    if (this._isEscPressed) {

        if (this._gameField.getMenuLayer().isVisible()) {

            this._gameField.getMenuLayer().makeHidden();
        }
        else {

            this._gameField.getMenuLayer().makeVisible();
        }

        this._isEscPressed = false;
    }

    if (this._isUpKeyPressed) {

        this._gameField.getStepsLayer().addPixel();
        this._isUpKeyPressed = false;
    }

    if (this._isDownKeyPressed) {

        this._gameField.getStepsLayer().minusPixel();
        this._isDownKeyPressed = false;
    }

    if (this._isLeftKeyPressed) {


        this._isLeftKeyPressed = false;
    }

    if (this._isRightKeyPressed) {


        this._isRightKeyPressed = false;
    }

    this._animationFrameManager.runAtFPS(function () {

        //this._gameField.getFPSLayer().getDOMElement().textContent = this._animationFrameManager.getAvailableFPS() + "fps/" + this._animationFrameManager.getUsedFPS()+ "fps";

        this._gameField.getCloudsLayer().moveBackgroundPositition();
        this._gameField.getStarsLayer().moveBackgroundPositition();

        this._tricksters.filter(function (trickster, index) { return index % 2 === 0; }).forEach(function (trickster) { trickster.rotate() });
        this._tricksters.forEach(function (trickster) { trickster.levitate() });

        this._gameField.repaint();
        this._mainMonster.repaint();

        this._tricksters.forEach(function (trickster) { trickster.repaint() });
        this._monsters.forEach(function (monster) { monster.repaint() });

    }.bind(this), 10);

    this._animationFrameManager.requestAnimationFrame(this.runGameLoop.bind(this));
}

Game.prototype.start = function () {

    this._animationFrameManager.requestAnimationFrame(this.runGameLoop.bind(this));
}

Game.prototype.stop = function () {

    this._animationFrameManager.cancelAnimationFrame();
}

Game.prototype.resume = function () {

    this._animationFrameManager.requestAnimationFrame(this.runGameLoop.bind(this));
}

Game.prototype.reset = function () {
    
    this._animationFrameManager.requestAnimationFrame(this.runGameLoop.bind(this));
}

/* End Game */