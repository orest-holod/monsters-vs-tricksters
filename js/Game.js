/* Start Game */

function Game(parentDOMElement) {

    var that = this;

    this._parentDOMElement = parentDOMElement;

    this._animationFrameManager = new AnimationFrameManager(gameConfigs.fps);

    this._gameField = new GameField(that._parentDOMElement, true);
    this._gamer = new Gamer(that._gameField);
    this._gamers = [this._gamer];

    this.soundManager = new SoundManager(parentDOMElement);
    this.soundManager.getBackgroundSound().loop = true;
    this.soundManager.getBackgroundSound().play();

    this._isTouchDevice = false;
    this._isFirstTouch = true;

    this._isMusicOn = true;
    this._isSoundOn = true;
   
    this._isGameOver = false;
    this._isGameStop = false;
}

/* Start Event Handlers */

Game.prototype.keyDownEventHandler = function (e) {

    var gamer = null;

    if (e.gamerID) {

        gamer = this.getGamerById(e.gamerID);
    }
    else {
        
        gamer = this.getGamerById(1);
    }

    switch (e.keyCode) {

        case 27: {

            if (!gamer.getIsEscPressed()) {

                gamer.setIsEscPressed(true);
            }

            break;
        }

        case 38: {

            gamer.setIsUpKeyPressed(true);
            break;
        }

        case 40: {

            gamer.setIsDownKeyPressed(true);
            break;
        }

        case 39: {

            if (this._isSoundOn) {

                this.soundManager.getStepSound().play();
            }

            gamer.setIsRightKeyPressed(true);
            break;
        }

        case 37: {

            if (this._isSoundOn) {

                this.soundManager.getStepSound().play();
            }

            gamer.setIsLeftKeyPressed(true);
            break;
        }

        case 32: {

            if (this._isSoundOn) {

                this.soundManager.getJumpSound().play();
            }

            gamer.setIsSpaceKeyPressed(true);
            break;
        }
    }
}

Game.prototype.keyUpEventHandler = function (e) {

    var gamer = null;

    if (e.gamerID) {

        gamer = this.getGamerById(e.gamerID);
    }
    else {

        gamer = this.getGamerById(1);
    }

    switch (e.keyCode) {

        case 27: {

            if (gamer.getIsEscPressed()) {

                gamer.setIsEscPressed(false);
            }

            break;
        }

        case 38: {

            gamer.setIsUpKeyPressed(false);
            break;
        }

        case 40: {

            gamer.setIsDownKeyPressed(false);
            break;
        }

        case 39: {

            gamer.setIsRightKeyPressed(false);
            break;
        }

        case 37: {

            gamer.setIsLeftKeyPressed(false);
            break;
        }

        case 32: {

            gamer.setIsSpaceKeyPressed(false);
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
                    } else {
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
                    } else {
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

            this._gamer.setIsLeftKeyPressed(true);
            break;
        }

        case 'game-field-touch-right': {

            if (this._isSoundOn) {

                this.soundManager.getStepSound().play();
            }

            this._gamer.setIsRightKeyPressed(true);
            break;
        }

        case 'game-field-touch-space': {

            if (this._isSoundOn) {

                this.soundManager.getJumpSound().play();
            }

            this._gamer.setIsSpaceKeyPressed(true);
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

    switch (e.target.id) {

        case 'game-field-touch-left': {

            this._gamer.setIsLeftKeyPressed(false);
            break;
        }

        case 'game-field-touch-right': {

            this._gamer.setIsRightKeyPressed(false);
            break;
        }

        case 'game-field-touch-space': {

            this._gamer.setIsSpaceKeyPressed(false);
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

            }

            var targetTrickster = step.getTargetTrickster();

            if (targetTrickster) {

                targetTrickster.setTargetStep(step);
            }

            var targetLife = step.getTargetLife();

            if (targetLife) {

                targetLife.setTargetStep(step);
            }

            this._gamers.forEach(function (gamer) {

                gamer.setX(this._gamer.getTargetStep().getX());

            }, this);

        }, this);

        gameFieldBackgroundTowerLayer.setWidth(towerWidthAfterResize, false);
    }

    if (towerHeightIndex !== 1) {

        if (towerHeightIndex > 1) {

            gameFieldTower.addPixel(towerHeightAfterResize - towerHeightBeforeResize);
        }
        else {

            gameFieldTower.minusPixel(towerHeightBeforeResize - towerHeightAfterResize);
        }

        var middleStep = gameFieldTower.getVisibleSteps()[Math.floor(window.innerHeight / gameConfigs.gameField.gameFieldTower.steps.heightOfLevel)];

        this._gamers.forEach(function (gamer) {

            gamer.setTargetStep(middleStep);
            gamer.setX(this._gamer.getTargetStep().getX());

        }, this);
      
        gameFieldBackgroundTowerLayer.setHeight(towerHeightAfterResize, false);
    }
}

/* End Event Handlers */

/* Start Public Methods */

Game.prototype.runGameLoop = function () {

    this._gamers.forEach(function(gamer) {

        if (gamer.getIsEscPressed()) {

            if (this._gameField.getGameFieldMenu().isVisible()) {

                this._gameField.getGameFieldMenu().makeHidden();
                this._gameField.getGameFieldTower().makeVisible();
                this._isGameStop = false;

            } else {

                this._gameField.getGameFieldMenu().makeVisible();
                this._gameField.getGameFieldTower().makeHidden();
                this._isGameStop = true;
            }

            gamer.setIsEscPressed(false);
        }

    }, this);

    this._gameField.getGameFieldBackground().getGameFieldBackgroundFPSLayer()
        .setTextContent('{currentFPS}fps'.replace('{currentFPS}', this._animationFrameManager.getCurrentFPS()));

    /* Start Logic */

    if (!this._isGameOver && !this._isGameStop) {

        this._gamers.forEach(function(gamer) {
            
            if (gamer.getIsFalling()) {

                gamer.fall();

            } else if (gamer.getIsJumping()) {

                gamer.jump();

            } else if (gamer.getIsSpaceKeyPressed()) {

                gamer.jump();

                gamer.setIsSpaceKeyPressed(false);
            }

            if (gamer.getIsLeftKeyPressed()) {

                gamer.moveLeft();
            }

            if (gamer.getIsRightKeyPressed()) {

                gamer.moveRight();
            }

            if (!gamer.getIsLeftKeyPressed() && !gamer.getIsRightKeyPressed()) {

                gamer.standStill();
            }

            if (gamer.getY() <= 0) {

                if (this._isSoundOn) {

                    this.soundManager.getGameOverSound().play();
                }

                gamer.setIsGameOver(true);
            }

            var touchedMonster = gamer.getTouchedMonster();

            if (touchedMonster) {

                if (this._isSoundOn) {

                    this.soundManager.getTouchedMonsterSound().play();
                }

                this._gameField.getGameFieldScore().addMonsters();

                this._gameField.getGameFieldTower().pickUpMonster(touchedMonster);
            }

            var touchedLife = gamer.getTouchedLife();

            if (touchedLife && this._gameField.getGameFieldScore().getLifes() < 3) {

                if (this._isSoundOn) {

                    this.soundManager.getLifeSound().play();
                }

                this._gameField.getGameFieldScore().addLifes();

                this._gameField.getGameFieldTower().pickUpLife(touchedLife);
            }

            var touchedTrickster = gamer.getTouchedTrickster();

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

        }, this);

        if (this._gamers.every(function (gamer) { return gamer.getIsGameOver() === true; })) {

            this._isGameOver = true;
        }
          
        this._gameField.getGameFieldTower().getVisibleTricksters().forEach(function (trickster) { trickster.rotate(); });
        this._gameField.getGameFieldTower().getVisibleTricksters().forEach(function (trickster) { trickster.levitate(); });
        this._gameField.getGameFieldTower().getVisibleMonsters().forEach(function (monster) { monster.rotate(); });
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
    this._gamers.forEach(function (gamer) { gamer.repaint(); }, this);

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
    this._gamers = [this._gamer];

    if (!this._isMusicOn) {
        document.getElementById('music-on-off-menu-item').innerHTML = 'Music ON';
    }

    if (!this._isSoundOn) {
        document.getElementById('sound-on-off-menu-item').innerHTML = 'Sound ON';
    }

    this._isGameOver = false;
    this._isGameStop = false;

    this._animationFrameManager.runAtWantedFPS(this.runGameLoop.bind(this));
}

Game.prototype.getGamers = function () {

    return this._gamers;
}

Game.prototype.setGamers = function (value) {

    this._gamers = value;
}

Game.prototype.getGamerById = function (id) {

    var gamers = this._gamers.filter(function (gamer) { return gamer.getID() == id; });

    if (gamers.length) {

        return gamers[0];
    }
    else {

        return null;
    }
}

Game.prototype.addGamer = function (gamer) {

    this._gamers.push(gamer);
}

/* End Public Methods */

/* End Game */
