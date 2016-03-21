/* Start Game */

function Game(parentDOMElement) {

    var that = this;

    this._parentDOMElement = parentDOMElement;

    this._animationFrameManager = new AnimationFrameManager(gameConfigs.fps);

    this._fpsIndex = 1;

    this._gameField = new GameField(that._parentDOMElement, true);
    this._gamer = new Gamer(that._gameField);

    this._isEscPressed = false;
    this._isRightKeyPressed = false;
    this._isLeftKeyPressed = false;
    this._isUpKeyPressed = false;
    this._isDownKeyPressed = false;
    this._isSpaceKeyPressed = false;

    this._isGameOver = false;
    this._isGameWin = false;
}

/* Start Event Handlers */

Game.prototype.keyDownEventHandler = function (e) {

    switch (e.keyCode) {

        case 27: {
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

        case 32: {

            this._isSpaceKeyPressed = true;
            break;
        }
    }
}

Game.prototype.keyUpEventHandler = function (e) {

    switch (e.keyCode) {

        case 27: {
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

        case 32: {
            this._isSpaceKeyPressed = false;
            break;
        }
    }
}

Game.prototype.mouseClickEventHandler = function (e) {

    switch (e.target.id) {

        case 'play-game-menu-item':
            {

                this.reset();
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
        case 'facebook-menu-item':
            {
                FacebookLogIn();
                break;
            }
        case 'google-menu-item':
            {
                GoogleLogIn();
                break;
            }
        default:
            {
                this._gameField.getGameFieldMenu().makeHidden();
            }
    }
}

Game.prototype.touchStartEventHandler = function (e) {

    switch (e.target.id) {

        case 'game-field-touch-left':
            {
                this._isLeftKeyPressed = true;
                break;
            }
        case 'game-field-touch-right':
            {
                this._isRightKeyPressed = true;
                break;
            }
        case 'game-field-touch-space':
            {
                this._isSpaceKeyPressed = true;
                break;
            }
        case 'play-game-menu-item':
            {

                this.reset();
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
        case 'facebook-menu-item':
            {
                FacebookLogIn();
                break;
            }
        case 'google-menu-item':
            {
                GoogleLogIn();
                break;
            }
        default:
            {
                this._gameField.getGameFieldMenu().makeHidden();
            }
    }

}

Game.prototype.touchEndEventHandler = function (e) {

    switch (e.target.id) {

        case 'game-field-touch-left':
            {
                this._isLeftKeyPressed = false;
                break;
            }
        case 'game-field-touch-right':
            {
                this._isRightKeyPressed = false;
                break;
            }
        case 'game-field-touch-space':
            {
                this._isSpaceKeyPressed = false;
                break;
            }
    }

}

/* End Event Handlers */

/* Start Public Methods */

Game.prototype.runGameLoop = function () {

    if (!this._isGameOver) {

        this._gameField.getGameFieldBackground().getGameFieldBackgroundFPSLayer()
            .setTextContent('{currentFPS}fps'.replace('{currentFPS}', this._animationFrameManager.getCurrentFPS()));

        /* Adjust speed */

        var fpsIndex = this._animationFrameManager.getFPSIndex();

        if (Math.abs(fpsIndex - this._fpsIndex) >= gameConfigs.fpsDelta) {

            this._fpsIndex = fpsIndex;

            GameEntity.FPS_INDEX = fpsIndex;
        }

        /* Start Logic */

        if (this._isEscPressed) {

            if (this._gameField.getGameFieldMenu().isVisible()) {

                this._gameField.getGameFieldMenu().makeHidden();
            } else {

                this._gameField.getGameFieldMenu().makeVisible();
            }

            this._isEscPressed = false;
        }

        if (this._gamer.getIsFalling()) {

            this._gamer.fall();
        }
        else if (this._gamer.getIsJumping()) {

            this._gamer.jump();
        }
        else if (this._isSpaceKeyPressed) {

            this._gamer.jump();

            this._isSpaceKeyPressed = false;
        }

        if (this._isLeftKeyPressed) {

            this._gamer.moveLeft();

        }

        if (this._isRightKeyPressed) {

            this._gamer.moveRight();
        }

        if (!this._isLeftKeyPressed && !this._isRightKeyPressed) {

            this._gamer.standStill();
        }

        if (this._gamer.getY() <= 0) {

            this._isGameOver = true;
        }

        var touchedMonster = this._gamer.getTouchedMonster();

        if (touchedMonster) {

            this._gameField.getGameFieldTower().saveMonster(touchedMonster);
        }

        var touchedTrickster = this._gamer.getTouchedTrickster();

        if (touchedTrickster) {

            this._isGameOver = true;
        }


        this._gameField.getGameFieldBackground().getGameFieldBackgroundCloudsLayer().moveBackgroundPositition();
        this._gameField.getGameFieldBackground().getGameFieldBackgroundStarsLayer().moveBackgroundPositition();

        this._gameField.getGameFieldTower().getVisibleTricksters().forEach(function (trickster) { trickster.rotate(); });
        this._gameField.getGameFieldTower().getVisibleTricksters().forEach(function (trickster) { trickster.levitate(); });
        this._gameField.getGameFieldTower().getVisibleMonsters().forEach(function (monster) { monster.rotate(); });

        /* End Logic */

        /* Start Repaint */

        this._gameField.repaint();
        this._gamer.repaint();

        /* End Repaint */
    }
}

Game.prototype.start = function () {

    this._animationFrameManager.runAtWantedFPS(this.runGameLoop.bind(this));
}

Game.prototype.stop = function () {

    this._animationFrameManager.stop();
}

Game.prototype.over = function () {

    this._animationFrameManager.stop();
}

Game.prototype.resume = function () {

    this._animationFrameManager.runAtWantedFPS(this.runGameLoop.bind(this));
}

Game.prototype.reset = function () {

    this._animationFrameManager.stop();

    this._gameField.removeFromParentDOMElement();

    this._gameField = new GameField(this._parentDOMElement, true);
    this._gamer = new Gamer(this._gameField);

    this._isEscPressed = false;
    this._isRightKeyPressed = false;
    this._isLeftKeyPressed = false;
    this._isUpKeyPressed = false;
    this._isDownKeyPressed = false;
    this._isSpaceKeyPressed = false;

    this._isGameOver = false;
    this._isGameWin = false;

    this._animationFrameManager.runAtWantedFPS(this.runGameLoop.bind(this));
}

/* End Public Methods */

/* End Game */