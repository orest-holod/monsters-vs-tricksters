/* Start Game */

function Game(parentDOMElement) {

    var that = this;

    this._parentDOMElement = parentDOMElement;

    this._animationFrameManager = new AnimationFrameManager(gameConfigs.fps);

    this._fpsIndex = 1;

    this._gameField = new GameField(that._parentDOMElement, true);
    this._gamer = new Gamer(that._gameField);

    this.soundManager = new SoundManager(parentDOMElement);
    this.soundManager.getBackgroundSound().loop = true;
    this.soundManager.getBackgroundSound().play();

    this._isMusicOn = true;
    this._isSoundOn = true;
    this._isEscPressed = false;
    this._isRightKeyPressed = false;
    this._isLeftKeyPressed = false;
    this._isUpKeyPressed = false;
    this._isDownKeyPressed = false;
    this._isSpaceKeyPressed = false;

    this._isGameOver = false;
    this._isGameStop = false;
    this._isGameWin = false;

    this._isTouchDevice = false;
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

    if (!this._isTouchDevice) {

        switch (e.target.id) {

            case 'play-game-menu-item':
                {

                    this.reset();
                    break;
                }

            case 'resume-game-menu-item':
                {

                    this._gameField.getGameFieldMenu().makeHidden();
                    this._isGameStop = false;
                    break;
                }

            case 'music-on-off-menu-item':
                {

                    if (this._isMusicOn) {
                        this.soundManager.getBackgroundSound().pause();
                        this._isMusicOn = false;
                        document.getElementById('music-on-off-menu-item').innerHTML = 'Music ON';
                    } else {
                        this.soundManager.getBackgroundSound().play();
                        this._isMusicOn = true;
                        document.getElementById('music-on-off-menu-item').innerHTML = 'Music OFF';
                    }

                    break;
                }

            case 'sound-on-off-menu-item':
                {

                    if (this._isSoundOn) {
                        this._isSoundOn = false;
                        document.getElementById('sound-on-off-menu-item').innerHTML = 'Sound ON';
                    } else {
                        this._isSoundOn = true;
                        document.getElementById('sound-on-off-menu-item').innerHTML = 'Sound OFF';
                    }

                    break;
                }

            case 'facebook-menu-item':
                {
                    FacebookShare(this._gameField.getGameFieldScore().getMonsters());
                    break;
                }

            case 'google-menu-item':
                {

                    GoogleLogIn();
                    break;
                }


            case 'connect-menu-item':
                {

                    this._gameField.getGameFieldMenu().getGameFieldMenuConnectComputerItem().makeHidden();
                    ConnectComputer();
                    break;
                }

            case 'remote-control-menu-item':
                {

                    window.location = 'telephonecontrol.html';
                    break;
                }

            default:
                {

                    if (this._gameField.getGameFieldMenu().isVisible()) {

                        this._gameField.getGameFieldMenu().makeHidden();
                        this._isGameStop = false;

                    } else {

                        this._gameField.getGameFieldMenu().makeVisible();
                        this._isGameStop = true;
                    }
                }
        }
    }
}

Game.prototype.touchStartEventHandler = function (e) {

    if (!this._isTouchDevice) {

        this._isTouchDevice = true;
    }

    switch (e.target.id) {

        case 'game-field-touch-left': {

            this._isLeftKeyPressed = true;
            break;
        }

        case 'game-field-touch-right': {

            this._isRightKeyPressed = true;
            break;
        }

        case 'game-field-touch-space': {

            this._isSpaceKeyPressed = true;
            break;
        }

        case 'play-game-menu-item': {

            this.reset();
            break;
        }

        case 'resume-game-menu-item': {

            this._gameField.getGameFieldMenu().makeHidden();
            this._isGameStop = false;
            break;
        }

        case 'music-on-off-menu-item': {

            if (this._isMusicOn) {
                this.soundManager.getBackgroundSound().pause();
                this._isMusicOn = false;
                document.getElementById('music-on-off-menu-item').innerHTML = 'Music ON';
            }
            else {
                this.soundManager.getBackgroundSound().play();
                this._isMusicOn = true;
                document.getElementById('music-on-off-menu-item').innerHTML = 'Music OFF';
            }

            break;
        }

        case 'sound-on-off-menu-item': {

            if (this._isSoundOn) {
                this._isSoundOn = false;
                document.getElementById('sound-on-off-menu-item').innerHTML = 'Sound ON';
            }
            else {
                this._isSoundOn = true;
                document.getElementById('sound-on-off-menu-item').innerHTML = 'Sound OFF';
            }

            break;
        }

        case 'facebook-menu-item': {

            FacebookShare(this._gameField.getGameFieldScore().getMonsters());
            break;
        }

        case 'google-menu-item': {

            GoogleLogIn();
            break;
        }


        case 'connect-menu-item': {

            this._gameField.getGameFieldMenu().getGameFieldMenuConnectComputerItem().makeHidden();
            ConnectComputer();
            break;
        }

        case 'remote-control-menu-item': {

            window.location = 'telephonecontrol.html';
            break;
        }


        default: {

            if (this._gameField.getGameFieldMenu().isVisible()) {

                this._gameField.getGameFieldMenu().makeHidden();
                this._isGameStop = false;
            }
            else {

                this._gameField.getGameFieldMenu().makeVisible();
                this._isGameStop = true;
            }
        }
    }

}

Game.prototype.touchEndEventHandler = function (e) {

    switch (e.target.id) {

        case 'game-field-touch-left': {

            this._isLeftKeyPressed = false;
            break;
        }

        case 'game-field-touch-right': {

            this._isRightKeyPressed = false;
            break;
        }

        case 'game-field-touch-space': {

            this._isSpaceKeyPressed = false;
            break;
        }
    }

}

Game.prototype.resizeEventHandler = function (e) {

    var gameFieldTower = this._gameField.getGameFieldTower();
    var gameFieldBackground = this._gameField.getGameFieldBackground();
    var gameFieldBackgroundTowerLayer = gameFieldBackground.getGameFieldBackgroundTowerLayer();

    var towerClientRect = gameFieldBackgroundTowerLayer.getDOMElement().getBoundingClientRect();
    var towerWidthBeforeResize = gameFieldBackgroundTowerLayer.getWidth();
    var towerWidthAfterResize = towerClientRect.width;

    var towerWidthIndex = towerWidthAfterResize / towerWidthBeforeResize;

    var towerHeightBeforeResize = gameFieldBackgroundTowerLayer.getHeight();
    var towerHeightAfterResize = towerClientRect.height;

    var towerHeightIndex = towerHeightAfterResize / towerHeightBeforeResize;

    if (towerWidthIndex !== 1) {

        var steps = gameFieldTower.getSteps();

        steps.forEach(function (step) {

            step.setWidth(step.getWidth() * towerWidthIndex);
            step.setX(step.getX() * towerWidthIndex);

            var targetMonster = step.getTargetMonster();

            if (targetMonster) {

                targetMonster.setTargetStep(step);
                targetMonster.setDX(targetMonster.getDX() * towerWidthIndex);
                targetMonster.setDY(targetMonster.getDY() * towerWidthIndex);
            }

            var targetTrickster = step.getTargetTrickster();

            if (targetTrickster) {
                targetTrickster.setTargetStep(step);
                targetTrickster.setDX(targetTrickster.getDX() * towerWidthIndex);
                targetTrickster.setDY(targetTrickster.getDY() * towerWidthIndex);
            }

            var targetLife = step.getTargetLife();

            if (targetLife) {
                targetLife.setTargetStep(step);
            }

            this._gamer.setX(this._gamer.getTargetStep().getX());

        }, this);

        this._gamer.setDX(this._gamer.getDX() * towerWidthIndex);

        gameFieldBackgroundTowerLayer.setWidth(towerWidthAfterResize, false);
    }

    if (towerHeightIndex !== 1) {


        if (towerHeightIndex > 1) {

            gameFieldTower.addPixel(towerHeightAfterResize - towerHeightBeforeResize);
        }
        else {

            gameFieldTower.minusPixel(towerHeightBeforeResize - towerHeightAfterResize);
        }

        gameFieldBackgroundTowerLayer.setHeight(towerHeightAfterResize, false);

    }

    var middleStep = gameFieldTower.getSteps()[Math.floor(window.innerHeight / gameConfigs.gameField.gameFieldTower.steps.heightOfLevel)];
    this._gamer.setTargetStep(middleStep);
    this._gamer.setX(this._gamer.getTargetStep().getX());
}

/* End Event Handlers */

/* Start Public Methods */

Game.prototype.runGameLoop = function () {

    if (this._isEscPressed) {

        if (this._gameField.getGameFieldMenu().isVisible()) {

            this._gameField.getGameFieldMenu().makeHidden();
            this._isGameStop = false;

        } else {

            this._gameField.getGameFieldMenu().makeVisible();
            this._isGameStop = true;
        }

        this._isEscPressed = false;

    }

    this._gameField.getGameFieldBackground().getGameFieldBackgroundFPSLayer()
        .setTextContent('{currentFPS}fps'.replace('{currentFPS}', this._animationFrameManager.getCurrentFPS()));

    /* Adjust speed */

    var fpsIndex = this._animationFrameManager.getFPSIndex();

    if (Math.abs(fpsIndex - this._fpsIndex) >= gameConfigs.fpsDelta) {

        this._fpsIndex = fpsIndex;

        GameEntity.FPS_INDEX = fpsIndex;
    }

    /* Start Logic */

    if (!this._isGameOver && !this._isGameStop) {

        if (this._gamer.getIsFalling()) {

            this._gamer.fall();

        } else if (this._gamer.getIsJumping()) {

            this._gamer.jump();

        } else if (this._isSpaceKeyPressed) {

            if (this._isSoundOn) {
                this.soundManager.getJumpSound().play();
            }

            this._gamer.jump();

            this._isSpaceKeyPressed = false;
        }

        if (this._isLeftKeyPressed) {

            if (this._isSoundOn) {
                this.soundManager.getStepSound().play();
            }

            this._gamer.moveLeft();
        }

        if (this._isRightKeyPressed) {

            if (this._isSoundOn) {
                this.soundManager.getStepSound().play();
            }

            this._gamer.moveRight();
        }

        if (!this._isLeftKeyPressed && !this._isRightKeyPressed) {

            this._gamer.standStill();
        }

        if (this._gamer.getY() <= 0) {

            if (this._isSoundOn) {
                this.soundManager.getGameOverSound().play();
            }

            this._isGameOver = true;
        }

        var touchedMonster = this._gamer.getTouchedMonster();

        if (touchedMonster) {

            if (this._isSoundOn) {
                this.soundManager.getTouchedMonsterSound().play();
            }

            this._gameField.getGameFieldScore().addMonsters();

            this._gameField.getGameFieldTower().pickUpMonster(touchedMonster);
        }

        var touchedLife = this._gamer.getTouchedLife();

        if (touchedLife && this._gameField.getGameFieldScore().getLifes() < 3) {

            if (this._isSoundOn) {
                this.soundManager.getLifeSound().play();
            }

            this._gameField.getGameFieldScore().addLifes();

            this._gameField.getGameFieldTower().pickUpLife(touchedLife);
        }

        var touchedTrickster = this._gamer.getTouchedTrickster();

        if (touchedTrickster) {

            if (this._isSoundOn) {
                this.soundManager.getTouchedTricksterSound().play();
            }

            this._gameField.getGameFieldScore().removeLifes();

            if (!this._gameField.getGameFieldScore().getLifes()) {

                if (this._isSoundOn) {
                    this.soundManager.getGameOverSound().play();
                }

                this._isGameOver = true;
            }
        }

        this._gameField.getGameFieldTower().getVisibleTricksters().forEach(function (trickster) { trickster.rotate(); });
        this._gameField.getGameFieldTower().getVisibleTricksters().forEach(function (trickster) { trickster.levitate(); });
        this._gameField.getGameFieldTower().getVisibleMonsters().forEach(function (monster) { monster.rotate(); });
    }
    else if (this._isGameOver) {

        this._gameField.getGameFieldMenu().makeVisible();
        this._gameField.getGameFieldMenu().getGameFieldMenuGameOver().makeVisible();
        this._gameField.getGameFieldMenu().getGameFieldMenuResumeItem().makeHidden();
    }

    this._gameField.getGameFieldBackground().getGameFieldBackgroundCloudsLayer().moveBackgroundPositition();
    this._gameField.getGameFieldBackground().getGameFieldBackgroundStarsLayer().moveBackgroundPositition();

    /* End Logic */

    /* Start Repaint */

    this._gameField.repaint();
    this._gamer.repaint();

    /* End Repaint */
}

Game.prototype.start = function () {

    this._animationFrameManager.runAtWantedFPS(this.runGameLoop.bind(this));
}

Game.prototype.reset = function () {

    this._animationFrameManager.stop();

    this._gameField.removeFromParentDOMElement();

    this._gameField = new GameField(this._parentDOMElement, true);
    this._gamer = new Gamer(this._gameField);

    if (!this._isMusicOn) {
        document.getElementById('music-on-off-menu-item').innerHTML = 'Music ON';
    }

    if (!this._isSoundOn) {
        document.getElementById('sound-on-off-menu-item').innerHTML = 'Sound ON';
    }

    this._isEscPressed = false;
    this._isRightKeyPressed = false;
    this._isLeftKeyPressed = false;
    this._isUpKeyPressed = false;
    this._isDownKeyPressed = false;
    this._isSpaceKeyPressed = false;

    this._isGameOver = false;
    this._isGameWin = false;
    this._isGameStop = false;

    this._animationFrameManager.runAtWantedFPS(this.runGameLoop.bind(this));
}

/* End Public Methods */

/* End Game */
