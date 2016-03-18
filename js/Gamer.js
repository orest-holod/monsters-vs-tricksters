/* Start Gamer */

function Gamer(gameField) {

    GameEntity.call(this, 'div', gameField.getGameFieldTower().getDOMElement(), true, 'gamer', ['monster'], 'Q');

    this.setDX(20);
    this.setDY(10);
    this.setDAngle(10);

    this._gameField = gameField;
    this._gameFieldTower = gameField.getGameFieldTower();

    this._targetStep = gameField.getGameFieldTower().getSteps()[10];
    this.setX(this._targetStep.getX());
    this.setY(this._targetStep.getY() + this._targetStep.getHeight());

    this._isFalling = false;
    this._fallingCounter = 0;
    this._nearestTargetBottomStep = null;

    this._isJumping = false;
    this._jumpingCounter = 0;
    this._currentDY = this.getDY();

    this._ddy = 10;
    this._jumpDY = 30;

    this._dJump = 150;
}

Gamer.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

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

    this._gameFieldTower.getVisibleSteps().forEach(function (step) {

        var firstTime = true;

        if (that.getY() >= step.getY() && that.getX() + that.getWidth() > step.getX() && that.getX() < step.getX() + step.getWidth()) {

            if (that.getTargetStep().getY() < step.getY() || firstTime) {

                nearestBottomTargetStep = step;
            }

            firstTime = false;
        }
    });

    return nearestBottomTargetStep;
}

Gamer.prototype.getTouchedTopStep = function () {

    var that = this;

    var touchedTopStep = null;

    this._gameFieldTower.getVisibleSteps().filter(function (step) { return that.getY() < step.getY() }).forEach(function (step) {

        if (that.checkIfTouches(step)) {

            touchedTopStep = step;

        }

    });

    return touchedTopStep;
}

Gamer.prototype.checkIfTouchesTrickster = function () {

    var that = this;

    var result = false;

    this._gameFieldTower.getVisibleTricksters().forEach(function (trickster) {

        if (that.checkIfTouches(trickster)) {

            result = true;
        }

    });

    return result;

}

Gamer.prototype.checkIfTouchesMonster = function () {

    var that = this;

    var result = false;

    this._gameFieldTower.getVisibleTricksters().forEach(function (monster) {

        if (that.checkIfTouches(monster)) {

            result = true;
        }

    });

    return result;

}

Gamer.prototype.moveLeft = function () {

    if (this.getAngle() < 0) {

        this.setAngle(this.getAngle() + this.getDAngle());
    }
    else {

        this.setAngle(this.getAngle() - this.getDAngle());
    }

    this.setX(this.getX() - this.getDX());

    if (this.getX() - this.getDX() + this.getWidth() < this.getTargetStep().getX()) {

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

    if (this.getX() + this.getDX() > this.getTargetStep().getX() + this.getTargetStep().getWidth()) {

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

    if (this.getY() < this.getTargetStep().getY() + this._dJump) {

        var dy = this.getDY() + this._ddy * this._jumpingCounter;

        this.setY(this.getY() + dy);


        this._isJumping = true;
        this._jumpingCounter++;
    }
    else {
        this._isJumping = false;
        this._jumpingCounter = 0;
        this._isFalling = true;
    }

    var touchedTopStep = this.getTouchedTopStep();

    if (touchedTopStep) {

        this.setY(touchedTopStep.getY() - this.getHeight());

        this._isJumping = false;
        this._jumpingCounter = 0;
        this._isFalling = true;
    }

    var deltaAfterJump = Math.abs(this.getY() - yBeforeJump);

    if (deltaAfterJump) {

        this._gameFieldTower.addPixel(deltaAfterJump);
    }

}

Gamer.prototype.fall = function () {

    var yBeforeFall = this.getY();

    if (!this._nearestTargetBottomStep) {

        this._nearestTargetBottomStep = this.getNearestBottomTargetStep();
    }

    var dy = this.getDY() + this._ddy * this._fallingCounter;

    this.setY(this.getY() - dy);

    this._fallingCounter++;

    if (this._nearestTargetBottomStep && this.getY() <= this._nearestTargetBottomStep.getY()) {

        this.setTargetStep(this._nearestTargetBottomStep);
        this._nearestTargetBottomStep = null;
        this._isFalling = false;
        this._fallingCounter = 0;
    }

    var deltaAfterFall = Math.abs(this.getY() - yBeforeFall);

    if (deltaAfterFall) {

        this._gameFieldTower.minusPixel(deltaAfterFall);
    }
}

/* End Public Methods */

/* End Gamer */