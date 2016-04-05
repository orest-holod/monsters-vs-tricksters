/* Start Game */

function Game(parentDOMElement) {

    var that = this;

    this._parentDOMElement = parentDOMElement;

    this._animationFrameManager = new AnimationFrameManager(gameConfigs.fps);

    this._gameField = new GameField(that._parentDOMElement, true);
    this._gamer = new Gamer(that._gameField);

    this.soundManager = new SoundManager(parentDOMElement);
    this.soundManager.getBackgroundSound().loop = true;
    this.soundManager.getBackgroundSound().play();

    this._isTouchDevice = false;
    this._isFirstTouch = true;

    this._isMusicOn = true;
    this._isSoundOn = true;

    this._isEscPressed = false;
    this._isRightKeyPressed = false;
    this._isLeftKeyPressed = false;
    this._isUpKeyPressed = false;
    this._isDownKeyPressed = false;
    this._isSpaceKeyPressed = false;
    this._isSpaceKeyUp = true;

    this._isGameOver = false;
    this._isGameStop = false;
}

/* Start Event Handlers */

Game.prototype.keyDownEventHandler = function (e) {

    e.preventDefault();

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

            if (this._isSoundOn) {

                this.soundManager.getStepSound().play();
            }

            this._isRightKeyPressed = true;
            break;
        }

        case 37: {

            if (this._isSoundOn) {

                this.soundManager.getStepSound().play();
            }

            this._isLeftKeyPressed = true;
            break;
        }

        case 32: {

            if (!this._isSpaceKeyPressed && this._isSpaceKeyUp) {

                if (this._isSoundOn) {

                    this.soundManager.getJumpSound().play();
                }

                this._isSpaceKeyPressed = true;
                this._isSpaceKeyUp = false;
            }

            break;
        }
    }
}

Game.prototype.keyUpEventHandler = function (e) {

    e.preventDefault();

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
            this._isSpaceKeyUp = true;

            break;
        }
    }
}

Game.prototype.mouseClickEventHandler = function (e) {

    e.preventDefault();

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
                    this._gameField.getGameFieldTower().makeVisible();
                    this._isGameStop = false;
                    break;
                }

            case 'music-on-off-menu-item':
                {

                    if (this._isMusicOn) {

                        this.soundManager.getBackgroundSound().pause();
                        this._isMusicOn = false;
                        this._gameField.getGameFieldMenu().getGameFieldMenuMusicOnOffItem().setTextContent('Music ON');
                    }
                    else {

                        this.soundManager.getBackgroundSound().play();
                        this._isMusicOn = true;
                        this._gameField.getGameFieldMenu().getGameFieldMenuMusicOnOffItem().setTextContent('Music OFF');
                    }

                    break;
                }

            case 'sound-on-off-menu-item':
                {

                    if (this._isSoundOn) {

                        this._isSoundOn = false;
                        this._gameField.getGameFieldMenu().getGameFieldMenuSoundOnOffItem().setTextContent('Sound ON');
                    }
                    else {

                        this._isSoundOn = true;
                        this._gameField.getGameFieldMenu().getGameFieldMenuSoundOnOffItem().setTextContent('Sound OFF');
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

            case 'about-menu-item': {

                this._gameField.getGameFieldMenu().getGameFieldMenuNewGameItem().makeHidden();
                this._gameField.getGameFieldMenu().getGameFieldMenuResumeItem().makeHidden();
                this._gameField.getGameFieldMenu().getGameFieldMenuMusicOnOffItem().makeHidden();
                this._gameField.getGameFieldMenu().getGameFieldMenuSoundOnOffItem().makeHidden();
                this._gameField.getGameFieldMenu().getGameFieldMenuFacebookItem().makeHidden();
                this._gameField.getGameFieldMenu().getGameFieldMenuGoogleItem().makeHidden();
                this._gameField.getGameFieldMenu().getGameFieldMenuAboutGameItem().makeHidden();
                this._gameField.getGameFieldMenu().getGameFieldMenuConnectComputerItem().makeHidden();
                this._gameField.getGameFieldMenu().getGameFieldMenuRemoteControlItem().makeHidden();
                this._gameField.getGameFieldMenu().getGameFieldMenuAboutGameText().makeVisible();
                this._gameField.getGameFieldMenu().getGameFieldMenuBackToMenuItem().makeVisible();
                break;
            }

            case 'connect-menu-item':
                {

                    this._gameField.getGameFieldMenu().getGameFieldMenuConnectComputerItem().makeHidden();

                    ConnectComputer();

                    this._gameField.getGameFieldBackground().getGameFieldBackgroundRemoteLayer().setTextContent("Remote control ON<br/>PIN to access: ");

                    break;
                }

            case 'remote-control-menu-item':
                {

                    window.location = 'telephonecontrol.html';
                    break;
                }

            case 'back-to-menu-menu-item': {

                this._gameField.getGameFieldMenu().getGameFieldMenuAboutGameText().makeHidden();
                this._gameField.getGameFieldMenu().getGameFieldMenuBackToMenuItem().makeHidden();
                this._gameField.getGameFieldMenu().getGameFieldMenuNewGameItem().makeVisible();
                this._gameField.getGameFieldMenu().getGameFieldMenuResumeItem().makeVisible();
                this._gameField.getGameFieldMenu().getGameFieldMenuMusicOnOffItem().makeVisible();
                this._gameField.getGameFieldMenu().getGameFieldMenuSoundOnOffItem().makeVisible();
                this._gameField.getGameFieldMenu().getGameFieldMenuFacebookItem().makeVisible();
                this._gameField.getGameFieldMenu().getGameFieldMenuGoogleItem().makeVisible();
                this._gameField.getGameFieldMenu().getGameFieldMenuAboutGameItem().makeVisible();
                this._gameField.getGameFieldMenu().getGameFieldMenuConnectComputerItem().makeVisible();
                this._gameField.getGameFieldMenu().getGameFieldMenuRemoteControlItem().makeVisible();
                break;
            }

            default:
                {
                    if (this._gameField.getGameFieldMenu().isVisible()) {

                        this._gameField.getGameFieldMenu().makeHidden();
                        this._gameField.getGameFieldTower().makeVisible();
                        this._isGameStop = false;

                    } else {

                        this._gameField.getGameFieldMenu().makeVisible();
                        this._gameField.getGameFieldTower().makeHidden();
                        this._isGameStop = true;
                    }
                }
        }
    }
}

Game.prototype.touchStartEventHandler = function (e) {

    e.preventDefault();

    if (this._isFirstTouch) {

        this.soundManager.getBackgroundSound().play();

        this._isFirstTouch = false;
    }

    if (!this._isTouchDevice) {

        this._isTouchDevice = true;
    }

    switch (e.target.id) {

        case 'game-field-touch-left': {

            if (this._isSoundOn) {

                this.soundManager.getStepSound().play();
            }

            this._isLeftKeyPressed = true;
            break;
        }

        case 'game-field-touch-right': {

            if (this._isSoundOn) {

                this.soundManager.getStepSound().play();
            }

            this._isRightKeyPressed = true;
            break;
        }

        case 'game-field-touch-space': {

            if (!this._isSpaceKeyPressed && this._isSpaceKeyUp) {

                if (this._isSoundOn) {

                    this.soundManager.getJumpSound().play();
                }

                this._isSpaceKeyPressed = true;
                this._isSpaceKeyUp = false;
            }

            break;
        }

        case 'play-game-menu-item': {

            this.reset();
            break;
        }

        case 'resume-game-menu-item': {

            this._gameField.getGameFieldMenu().makeHidden();
            this._gameField.getGameFieldTower().makeVisible();
            this._gameField.getGameFieldTouch().makeVisible();
            this._isGameStop = false;
            break;
        }

        case 'music-on-off-menu-item': {

            if (this._isMusicOn) {
                this.soundManager.getBackgroundSound().pause();
                this._isMusicOn = false;
                this._gameField.getGameFieldMenu().getGameFieldMenuMusicOnOffItem().setTextContent('Music ON');
            } else {
                this.soundManager.getBackgroundSound().play();
                this._isMusicOn = true;
                this._gameField.getGameFieldMenu().getGameFieldMenuMusicOnOffItem().setTextContent('Music OFF');
            }

            break;
        }

        case 'sound-on-off-menu-item': {

            if (this._isSoundOn) {
                this._isSoundOn = false;
                this._gameField.getGameFieldMenu().getGameFieldMenuSoundOnOffItem().setTextContent('Sound ON');
            } else {
                this._isSoundOn = true;
                this._gameField.getGameFieldMenu().getGameFieldMenuSoundOnOffItem().setTextContent('Sound OFF');
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

        case 'about-menu-item': {

            this._gameField.getGameFieldMenu().getGameFieldMenuNewGameItem().makeHidden();
            this._gameField.getGameFieldMenu().getGameFieldMenuResumeItem().makeHidden();
            this._gameField.getGameFieldMenu().getGameFieldMenuMusicOnOffItem().makeHidden();
            this._gameField.getGameFieldMenu().getGameFieldMenuSoundOnOffItem().makeHidden();
            this._gameField.getGameFieldMenu().getGameFieldMenuFacebookItem().makeHidden();
            this._gameField.getGameFieldMenu().getGameFieldMenuGoogleItem().makeHidden();
            this._gameField.getGameFieldMenu().getGameFieldMenuAboutGameItem().makeHidden();
            this._gameField.getGameFieldMenu().getGameFieldMenuConnectComputerItem().makeHidden();
            this._gameField.getGameFieldMenu().getGameFieldMenuRemoteControlItem().makeHidden();
            this._gameField.getGameFieldMenu().getGameFieldMenuAboutGameText().makeVisible();
            this._gameField.getGameFieldMenu().getGameFieldMenuBackToMenuItem().makeVisible();
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

        case 'back-to-menu-menu-item': {

            this._gameField.getGameFieldMenu().getGameFieldMenuAboutGameText().makeHidden();
            this._gameField.getGameFieldMenu().getGameFieldMenuBackToMenuItem().makeHidden();
            this._gameField.getGameFieldMenu().getGameFieldMenuNewGameItem().makeVisible();
            this._gameField.getGameFieldMenu().getGameFieldMenuResumeItem().makeVisible();
            this._gameField.getGameFieldMenu().getGameFieldMenuMusicOnOffItem().makeVisible();
            this._gameField.getGameFieldMenu().getGameFieldMenuSoundOnOffItem().makeVisible();
            this._gameField.getGameFieldMenu().getGameFieldMenuFacebookItem().makeVisible();
            this._gameField.getGameFieldMenu().getGameFieldMenuGoogleItem().makeVisible();
            this._gameField.getGameFieldMenu().getGameFieldMenuAboutGameItem().makeVisible();
            this._gameField.getGameFieldMenu().getGameFieldMenuConnectComputerItem().makeVisible();
            this._gameField.getGameFieldMenu().getGameFieldMenuRemoteControlItem().makeVisible();
            break;
        }

        default: {

            if (this._gameField.getGameFieldMenu().isVisible()) {

                this._gameField.getGameFieldMenu().makeHidden();
                this._gameField.getGameFieldTower().makeVisible();
                this._gameField.getGameFieldTouch().makeVisible();
                this._isGameStop = false;
            }
            else {

                this._gameField.getGameFieldMenu().makeVisible();
                this._gameField.getGameFieldTower().makeHidden();
                this._gameField.getGameFieldTouch().makeHidden();
                this._isGameStop = true;
            }
        }
    }

}

Game.prototype.touchEndEventHandler = function (e) {

    e.preventDefault();

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
            this._isSpaceKeyUp = true;
            break;
        }
    }
}

Game.prototype.resizeEventHandler = function (e) {

    var gameFieldTower = this._gameField.getGameFieldTower();
    var gameFieldBackground = this._gameField.getGameFieldBackground();
    var gameFieldBackgroundTowerLayer = gameFieldBackground.getGameFieldBackgroundTowerLayer();
    var gameFieldBackgroundStarsLayer = gameFieldBackground.getGameFieldBackgroundStarsLayer();
    var gameFieldBackgroundCloudsLayer = gameFieldBackground.getGameFieldBackgroundCloudsLayer();

    var towerClientRect = gameFieldTower.getDOMElement().getBoundingClientRect();
    var towerLayerClientRect = gameFieldBackgroundTowerLayer.getDOMElement().getBoundingClientRect();

    var towerWidthBeforeResize = gameFieldTower.getWidth();
    var towerWidthAfterResize = towerClientRect.width;
    var towerWidthIndex = towerWidthAfterResize / towerWidthBeforeResize;

    var towerHeightBeforeResize = gameFieldBackgroundTowerLayer.getHeight();
    var towerHeightAfterResize = towerLayerClientRect.height;
    var towerHeightIndex = towerHeightAfterResize / towerHeightBeforeResize;

    if (towerWidthIndex !== 1) {

        var steps = gameFieldTower.getSteps();

        steps.forEach(function (step) {

            step.setWidth(step.getWidth() * towerWidthIndex);
            step.setX(step.getX() * towerWidthIndex);

            var targetMonster = step.getTargetMonster();

            if (targetMonster) {

                targetMonster.setTargetStep(step);
            }

            var targetTrickster = step.getTargetTrickster();

            if (targetTrickster) {

                targetTrickster.setTargetStep(step);
            }

            var targetLife = step.getTargetLife();

            if (targetLife) {

                targetLife.setTargetStep(step);
            }

        }, this);

        this._gamer.setX(this._gamer.getTargetStep().getX());

        gameFieldTower.setWidth(towerWidthAfterResize, false);
    }

    if (towerHeightIndex !== 1) {

        gameFieldTower.setHeight(gameFieldTower.getPixel() + towerHeightAfterResize);

        gameFieldTower.update();

        var middleStep = gameFieldTower.getVisibleSteps()[Math.floor(window.innerHeight / gameConfigs.gameField.gameFieldTower.steps.heightOfLevel)];
        this._gamer.setTargetStep(middleStep);
        this._gamer.setX(this._gamer.getTargetStep().getX());

        gameFieldBackgroundTowerLayer.setHeight(towerHeightAfterResize, false);
    }

    if (gameFieldBackgroundStarsLayer.getDX() !== 0) {

        gameFieldBackgroundStarsLayer.setWidth(window.innerWidth * 5);

        if (gameFieldBackgroundStarsLayer.getDX() > 0) {

            gameFieldBackgroundStarsLayer.setTranslateX(gameFieldBackgroundStarsLayer.getWidth() + window.innerWidth);
        }
    }

    if (gameFieldBackgroundCloudsLayer.getDX() !== 0) {

        gameFieldBackgroundCloudsLayer.setWidth(window.innerWidth * 5);

        if (gameFieldBackgroundCloudsLayer.getDX() > 0) {

            gameFieldBackgroundCloudsLayer.setTranslateX(gameFieldBackgroundCloudsLayer.getWidth() + window.innerWidth);
        }
    }

    if (gameFieldBackgroundStarsLayer.getDY() !== 0) {

        gameFieldBackgroundStarsLayer.setHeight(window.innerHeight * 5);

        if (gameFieldBackgroundStarsLayer.getDY() > 0) {

            gameFieldBackgroundStarsLayer.setTranslateY(-gameFieldBackgroundStarsLayer.getHeight() + window.innerHeight);
        }
    }

    if (gameFieldBackgroundCloudsLayer.getDY() !== 0) {

        gameFieldBackgroundCloudsLayer.setHeight(window.innerHeight * 5);

        if (gameFieldBackgroundCloudsLayer.getDY() > 0) {

            gameFieldBackgroundCloudsLayer.setTranslateY(-gameFieldBackgroundCloudsLayer.getHeight() + window.innerHeight);
        }
    }
}

/* End Event Handlers */

/* Start Public Methods */

Game.prototype.runGameLoop = function () {

    if (this._isEscPressed) {

        if (this._gameField.getGameFieldMenu().isVisible()) {

            this._gameField.getGameFieldMenu().makeHidden();
            this._gameField.getGameFieldTower().makeVisible();
            this._isGameStop = false;

        } else {

            this._gameField.getGameFieldMenu().makeVisible();
            this._gameField.getGameFieldTower().makeHidden();
            this._isGameStop = true;
        }

        this._isEscPressed = false;
    }

    this._gameField.getGameFieldBackground().getGameFieldBackgroundFPSLayer()
        .setTextContent('{currentFPS}fps'.replace('{currentFPS}', this._animationFrameManager.getCurrentFPS()));

    /* Start Logic */

    if (!this._isGameOver && !this._isGameStop) {

        if (this._gamer.getIsFalling()) {

            this._gamer.fall();

        } else if (this._gamer.getIsJumping()) {

            this._gamer.jump();

        } else if (this._isSpaceKeyPressed) {

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
        this._gameField.getGameFieldTower().getVisibleLifes().forEach(function (life) { life.scale(); });
    }
    else if (this._isGameOver) {

        this._gameField.getGameFieldMenu().makeVisible();
        this._gameField.getGameFieldTower().makeHidden();
        this._gameField.getGameFieldTouch().makeHidden();
        this._gameField.getGameFieldMenu().getGameFieldMenuGameOver().makeVisible();
        this._gameField.getGameFieldMenu().getGameFieldMenuResumeItem().makeHidden();
        this._gameField.getGameFieldMenu().getGameFieldMenuGamePaused().makeHidden();
    }
    else if (this._isGameStop) {

        this._gameField.getGameFieldMenu().getGameFieldMenuGamePaused().makeVisible();
    }

    this._gameField.getGameFieldBackground().getGameFieldBackgroundCloudsLayer().move();
    this._gameField.getGameFieldBackground().getGameFieldBackgroundStarsLayer().move();

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

    this._isGameOver = false;
    this._isGameStop = false;

    this._animationFrameManager.runAtWantedFPS(this.runGameLoop.bind(this));
}

Game.prototype.getGamer = function () {

    return this._gamer;
}

Game.prototype.setGamer = function (value) {

    this._gamer = value;
}

Game.prototype.getIsEscPressed = function () {

    return this._isEscPressed;
}

Game.prototype.setIsEscPressed = function (value) {

    this._isEscPressed = value;
}

Game.prototype.getIsRightKeyPressed = function () {

    return this._isRightKeyPressed;
}

Game.prototype.setIsRightKeyPressed = function (value) {

    this._isRightKeyPressed = value;
}

Game.prototype.getIsLeftKeyPressed = function () {

    return this._isLeftKeyPressed;
}

Game.prototype.setIsLeftKeyPressed = function (value) {

    this._isLeftKeyPressed = value;
}

Game.prototype.getIsUpKeyPressed = function () {

    return this._isUpKeyPressed;
}

Game.prototype.setIsUpKeyPressed = function (value) {

    this._isUpKeyPressed = value;
}

Game.prototype.getIsDownKeyPressed = function () {

    return this._isDownKeyPressed;
}

Game.prototype.setIsDownKeyPressed = function (value) {

    this._isDownKeyPressed = value;
}

Game.prototype.getIsSpaceKeyPressed = function () {

    return this._isSpaceKeyPressed;
}

Game.prototype.setIsSpaceKeyPressed = function (value) {

    this._isSpaceKeyPressed = value;
}

Game.prototype.getIsGameOver = function () {

    return this._isGameOver;
}

Game.prototype.setIsGameOver = function (value) {

    this._isGameOver = value;
}

Game.prototype.getIsGameStop = function () {

    return this._isGameStop;
}

Game.prototype.setIsGameStop = function (value) {

    this._isGameStop = value;
}

/* End Public Methods */

/* End Game */
