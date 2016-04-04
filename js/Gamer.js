/* Start Gamer */

function Gamer(gameField) {

    GameEntity.call(this, 'div', gameField.getGameFieldTower().getDOMElement(), true, 'gamer', ['monster'], 'Q');

    this._id = 1;

    this._gameField = gameField;
    this._gameFieldTower = gameField.getGameFieldTower();
    this._targetStep = gameField.getGameFieldTower().getVisibleSteps()[Math.floor(window.innerHeight / gameConfigs.gameField.gameFieldTower.steps.heightOfLevel)];

    this.setX(this._targetStep.getX());
    this.setY(this._targetStep.getY() + this._targetStep.getHeight());
    this.setDX(gameConfigs.gamer.dx);
    this.setDY(gameConfigs.gamer.dy);
    this.setDAngle(gameConfigs.gamer.dAngle);

    this._ddy = gameConfigs.gamer.ddy;

    this._isFalling = false;
    this._fallingCounter = 0;
    this._nearestTargetBottomStep = null;

    this._isJumping = false;
    this._jumpingCounter = 0;
  
    this._lastTouchedTrickster = null;

    this._isEscPressed = false;
    this._isRightKeyPressed = false;
    this._isLeftKeyPressed = false;
    this._isUpKeyPressed = false;
    this._isDownKeyPressed = false;
    this._isSpaceKeyPressed = false;

    this._isGameOver = false;
    this._isGameStop = false;
}

Gamer.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

Gamer.prototype.setID = function (value) {

    this._id = value;
}

Gamer.prototype.getID = function () {

    return this._id;
}

Gamer.prototype.setTargetStep = function (value) {

    this._targetStep = value;

    this.setY(this._targetStep.getY() + this._targetStep.getHeight());
}

Gamer.prototype.getTargetStep = function () {

    return this._targetStep;
}

Gamer.prototype.setDDY = function (value) {

    this._ddy = value;
}

Gamer.prototype.getDDY = function () {

    return this._ddy;
}

Gamer.prototype.getIsFalling = function () {

    return this._isFalling;
}

Gamer.prototype.getIsJumping = function () {

    return this._isJumping;
}

Gamer.prototype.getNearestBottomTargetStep = function () {

    var that = this;

    var nearestBottomTargetStep = null;

    var firstTime = true;

    this._gameFieldTower.getVisibleSteps().filter(function (step) { return step.getY() <= that.getY(); }).forEach(function (step) {

        if (step.getX() < that.getX() + that.getWidth() && step.getX() + step.getWidth() > that.getX()) {

            if (firstTime || nearestBottomTargetStep.getY() < step.getY()) {

                nearestBottomTargetStep = step;
            }

            firstTime = false;
        }
    });

    return nearestBottomTargetStep;
}

Gamer.prototype.getNearestTopTargetStep = function () {

    var that = this;

    var nearestTopTargetStep = null;

    var firstTime = true;

    this._gameFieldTower.getVisibleSteps().filter(function (step) { return step.getY() >= that.getY(); }).forEach(function (step) {

        if (step.getX() < that.getX() + that.getWidth() && step.getX() + step.getWidth() > that.getX()) {

            if (firstTime || nearestTopTargetStep.getY() > step.getY()) {

                nearestTopTargetStep = step;
            }

            firstTime = false;
        }
    });

    return nearestTopTargetStep;
}

Gamer.prototype.getTouchedTrickster = function () {

    var that = this;

    var touchedTrickster = null;

    this._gameFieldTower.getVisibleTricksters().forEach(function (trickster) {

        if (that.checkIfTouches(trickster)) {

            touchedTrickster = true;
        }

    });

    if (touchedTrickster !== this._lastTouchedTrickster) {

        this._lastTouchedTrickster = touchedTrickster;
    }
    else if (!touchedTrickster) {

        this._lastTouchedTrickster = null;
    }
    else {
        touchedTrickster = null;
    }

    return touchedTrickster;

}

Gamer.prototype.getTouchedMonster = function () {

    var that = this;

    var touchedMonster = null;

    this._gameFieldTower.getVisibleMonsters().forEach(function (monster) {

        if (that.checkIfTouches(monster)) {

            touchedMonster = monster;
        }

    });

    return touchedMonster;
}

Gamer.prototype.getTouchedLife = function () {

    var that = this;

    var touchedLife = null;

    this._gameFieldTower.getVisibleLifes().forEach(function (life) {

        if (that.checkIfTouches(life)) {

            touchedLife = life;
        }

    });

    return touchedLife;

}

Gamer.prototype.moveLeft = function () {

    if (this.getAngle() < 0) {

        this.setAngle(this.getAngle() + this.getDAngle());
    }
    else {

        this.setAngle(this.getAngle() - this.getDAngle());
    }

    this.setX(this.getX() - this.getDX());

    if (!this._isFalling && !this._isJumping && this.getX() - this.getDX() + this.getWidth() < this.getTargetStep().getX()) {

        this._isFalling = true;
    }
}

Gamer.prototype.moveRight = function () {

    if (this.getAngle() > 0) {

        this.setAngle(this.getAngle() - this.getDAngle());
    }
    else {

        this.setAngle(this.getAngle() + this.getDAngle());
    }

    this.setX(this.getX() + this.getDX());

    if (!this._isFalling && !this._isJumping && this.getX() + this.getDX() > this.getTargetStep().getX() + this.getTargetStep().getWidth()) {

        this._isFalling = true;
    }
}

Gamer.prototype.standStill = function () {

    if (this.getAngle() !== 0) {

        this.setAngle(0);
    }
}

Gamer.prototype.jump = function () {

    var yBeforeJump = this.getY();

    if (!this._isJumping) {

        this._isJumping = true;
    }

    var nearestTopTargetStep = this.getNearestTopTargetStep();

    if (!nearestTopTargetStep) {

        this._isJumping = false;
        this._jumpingCounter = 0;
        this._isFalling = true;
    }

    var dy = this.getDY() + this.getDDY() * this._jumpingCounter;

    this.setY(this.getY() + dy);

    this._jumpingCounter++;

    if (nearestTopTargetStep && this.getY() >= nearestTopTargetStep.getY()) {

        this.setTargetStep(nearestTopTargetStep);
        this._isJumping = false;
        this._jumpingCounter = 0;
    }

    var deltaAfterJump = Math.abs(this.getY() - yBeforeJump);

    if (deltaAfterJump) {

        this._gameFieldTower.addPixel(deltaAfterJump);
    }
}

Gamer.prototype.fall = function () {

    this._isJumping = false;

    var yBeforeFall = this.getY();

    var nearestBottomTargetStep = this.getNearestBottomTargetStep();

    var dy = this.getDY() + this.getDDY() * this._fallingCounter;

    this.setY(this.getY() - dy);

    this._fallingCounter++;

    if (nearestBottomTargetStep && this.getY() <= nearestBottomTargetStep.getY()) {

        this.setTargetStep(nearestBottomTargetStep);
        this._isFalling = false;
        this._fallingCounter = 0;
    }

    var deltaAfterFall = Math.abs(this.getY() - yBeforeFall);

    if (deltaAfterFall) {

        this._gameFieldTower.minusPixel(deltaAfterFall);
    }
}

Gamer.prototype.getIsEscPressed = function () {

    return this._isEscPressed;
}

Gamer.prototype.setIsEscPressed = function (value) {

    this._isEscPressed = value;
}

Gamer.prototype.getIsRightKeyPressed = function () {

    return this._isRightKeyPressed;
}

Gamer.prototype.setIsRightKeyPressed = function (value) {

    this._isRightKeyPressed = value;
}

Gamer.prototype.getIsLeftKeyPressed = function () {

    return this._isLeftKeyPressed;
}

Gamer.prototype.setIsLeftKeyPressed = function (value) {

    this._isLeftKeyPressed = value;
}

Gamer.prototype.getIsUpKeyPressed = function () {

    return this._isUpKeyPressed;
}

Gamer.prototype.setIsUpKeyPressed = function (value) {

    this._isUpKeyPressed = value;
}

Gamer.prototype.getIsDownKeyPressed = function () {

    return this._isDownKeyPressed;
}

Gamer.prototype.setIsDownKeyPressed = function (value) {

    this._isDownKeyPressed = value;
}

Gamer.prototype.getIsSpaceKeyPressed = function () {

    return this._isSpaceKeyPressed;
}

Gamer.prototype.setIsSpaceKeyPressed = function (value) {

    this._isSpaceKeyPressed = value;
}

Gamer.prototype.getIsGameOver = function () {

    return this._isGameOver;
}

Gamer.prototype.setIsGameOver = function (value) {

    this._isGameOver = value;
}

Gamer.prototype.getIsGameStop = function () {

    return this._isGameStop;
}

Gamer.prototype.setIsGameStop = function (value) {

    this._isGameStop = value;
}

/* End Public Methods */

/* End Gamer */