/* Start Gamer */

function Gamer(gameField) {

    GameEntity.call(this, 'div', gameField.getGameFieldTower().getDOMElement(), true, 'gamer', ['monster'], 'Q');

    this._gameField = gameField;
    this._gameFieldTower = gameField.getGameFieldTower();

    this._targetStep = gameField.getGameFieldTower().getSteps()[10];

    this._isFalling = false;
    this._isJumping = false;
    this._fallingCounter = 0;
    this._nearestTargetBottomStep = null;
    this._ddy = 10;

    this.setX(this._targetStep.getX());
    this.setY(this._targetStep.getY());

    this.setDX(10);
    this.setDY(10);
    this.setDAngle(10);
}

Gamer.prototype = Object.create(GameEntity.prototype);

/* Start Public Methods */

Gamer.prototype.setTargetStep = function (value) {

    this._targetStep = value;
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

        if (step !== that.getTargetStep() && that.getY() >= step.getY() && that.getX() + that.getWidth() > step.getX() && that.getX() < step.getX() + step.getWidth()) {

            if (that.getTargetStep().getY() < step.getY() || firstTime) {

                nearestBottomTargetStep = step;
            }

            firstTime = false;
        }
    });

    return nearestBottomTargetStep;
}

Gamer.prototype.moveLeft = function () {

        if (this.getAngle() < 0) {

            this.setAngle(this.getAngle() + this.getDAngle());
        }
        else {

            this.setAngle(this.getAngle() - this.getDAngle());
        }

    this.setX(this.getX() - this.getDX());
}

Gamer.prototype.moveRight = function () {

    if (this.getAngle() > 0) {

        this.setAngle(this.getAngle() - this.getDAngle());
    }
    else {

        this.setAngle(this.getAngle() + this.getDAngle());
    }
    
    this.setX(this.getX() + this.getDX());
}

Gamer.prototype.standStill = function() {
    
    if (this.getAngle() !== 0) {

        this.setAngle(0);
    }

}

Gamer.prototype.jump = function () {

    this.setY(this.getY() + this.getDY());
    this.fall();

}

Gamer.prototype.fall = function () {

    if (!this._isFalling) {

        this._nearestTargetBottomStep = this.getNearestBottomTargetStep();
        this._isFalling = true;
    }

    this.setY(this.getY() - this.getDY() * Math.pow(this._ddy, this._fallingCounter));
    this._fallingCounter++;

    if (this._isFalling) {

        if (this._nearestTargetBottomStep) {

            if (this.getY() <= this._nearestTargetBottomStep.getY()) {

                this._isFalling = false;
                this._fallingCounter = 0;
                this.setTargetStep(this._nearestTargetBottomStep);
                this.setY(this.getTargetStep().getY());
            }
        }
        else {

            if (this.getY() < 0) {

                this._isFalling = false;
                this._fallingCounter = 0;
            }

        }
    }
}

/* End Public Methods */

/* End Gamer */