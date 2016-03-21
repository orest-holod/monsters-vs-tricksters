/* Start Gamer */

function Gamer(gameField) {

    GameEntity.call(this, 'div', gameField.getGameFieldTower().getDOMElement(), true, 'gamer', ['monster'], 'Q');

    this._gameField = gameField;
    this._gameFieldTower = gameField.getGameFieldTower();
    this._targetStep = gameField.getGameFieldTower().getSteps()[10];

    this.setDX(gameConfigs.gamer.dx);
    this.setDY(gameConfigs.gamer.dy);
    this.setDAngle(gameConfigs.gamer.dAngle);

    this.setX(this._targetStep.getX());
    this.setY(this._targetStep.getY() + this._targetStep.getHeight());

    this._isFalling = false;
    this._fallingCounter = 0;
    this._nearestTargetBottomStep = null;

    this._isJumping = false;
    this._jumpingCounter = 0;
    this._currentDY = this.getDY();

    this._ddy = gameConfigs.gamer.ddy;
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

    var touchedTrickster = false;

    this._gameFieldTower.getVisibleTricksters().forEach(function (trickster) {

        if (that.checkIfTouches(trickster)) {

            touchedTrickster = true;
        }

    });

    return touchedTrickster;

}

Gamer.prototype.getTouchedMonster = function () {

    var that = this;

    var touchedMonster = false;

    this._gameFieldTower.getVisibleMonsters().forEach(function (monster) {

        if (that.checkIfTouches(monster)) {

            touchedMonster = monster;
        }

    });

    return touchedMonster;

}

Gamer.prototype.getTouchedLife = function () {

    var that = this;

    var touchedLife = false;

    this._gameFieldTower.getVisibleLifes().forEach(function (life) {

        if (that.checkIfTouches(life)) {

            touchedLife = life;
        }

    });

    return touchedLife;

}

Gamer.prototype.moveLeft = function () {

    if (this.getAngle() < 0) {

        this.setAngle(this.getAngle() + this.getDAngle() * GameEntity.FPS_INDEX);
    }
    else {

        this.setAngle(this.getAngle() - this.getDAngle() * GameEntity.FPS_INDEX);
    }

    this.setX(this.getX() - this.getDX() * GameEntity.FPS_INDEX);

    if (!this._isFalling && !this._isJumping && this.getX() - this.getDX() * GameEntity.FPS_INDEX + this.getWidth() < this.getTargetStep().getX()) {

        this._isFalling = true;
    }
}

Gamer.prototype.moveRight = function () {

    if (this.getAngle() > 0) {

        this.setAngle(this.getAngle() - this.getDAngle() * GameEntity.FPS_INDEX);
    }
    else {

        this.setAngle(this.getAngle() + this.getDAngle() * GameEntity.FPS_INDEX);
    }

    this.setX(this.getX() + this.getDX() * GameEntity.FPS_INDEX);

    if (!this._isFalling && !this._isJumping && this.getX() + this.getDX() * GameEntity.FPS_INDEX > this.getTargetStep().getX() + this.getTargetStep().getWidth()) {

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

    var dy = this.getDY() * GameEntity.FPS_INDEX + this.getDDY() * GameEntity.FPS_INDEX * this._jumpingCounter;

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

    var dy = this.getDY() * GameEntity.FPS_INDEX + this.getDDY() * GameEntity.FPS_INDEX * this._fallingCounter;

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

/* End Public Methods */

/* End Gamer */