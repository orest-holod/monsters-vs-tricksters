/* Start Game Entity */

function GameEntity(DOMElement, parentDOMElement, id, className, textContent) {

    /* Start Initialize Protected Data */

    this._DOMElement = DOMElement || document.createElement("div");
    this._parentDOMElement = parentDOMElement || document.body;

    this._DOMElement.className = className || "";
    this._DOMElement.classList.add("game-entity");
    this._DOMElement.id = id || "";
    this._DOMElement.textContent = textContent || "";

    this._parentDOMElement.appendChild(this._DOMElement)

    var cr = this._DOMElement.getBoundingClientRect();

    this._x = cr.left;
    this._y = cr.top;
    this._width = cr.width;
    this._height = cr.height;

    this._dx = 3;
    this._dy = 3;
    this._angle = 0;
    this._dAngle = 3;
    this._color = "#fff";

    this._fps = 60;

    this._isPositionChanged = false;
    this._isAngleChanged = false;
    this._isDimensionChanged = false;
    this._isColorChanged = false;

    /* End Initialize Protected Data */
}

GameEntity.prototype.getX = function () {

    return this._x;
}

GameEntity.prototype.setX = function (value) {

    this._x = value;
    this._isPositionChanged = true;
}

GameEntity.prototype.getY = function () {

    return this._y;
}

GameEntity.prototype.setY = function (value) {

    this._y = value;
    this._isPositionChanged = true;
}

GameEntity.prototype.getWidth = function () {

    return this._width;
}

GameEntity.prototype.setWidth = function (value) {

    this._width = value;
    this._isDimensionChanged = true;
}

GameEntity.prototype.getHeight = function () {

    return this._height;
}

GameEntity.prototype.setHeight = function (value) {

    this._height = value;
    this._isDimensionChanged = true;
}

GameEntity.prototype.getDX = function () {

    return this._dx;
}

GameEntity.prototype.setDX = function (value) {

    this._dx = value;
}

GameEntity.prototype.getDY = function () {

    return this._dy;
}

GameEntity.prototype.setDY = function (value) {

    this._dy = value;
}

GameEntity.prototype.getAngle = function () {

    return this._angle;
}

GameEntity.prototype.setAngle = function (value) {

    this._angle = value;
    this._isAngleChanged = true;
}

GameEntity.prototype.getDAngle = function () {

    return this._dAngle;
}

GameEntity.prototype.setDAngle = function (value) {

    this._dAngle = value;
}

GameEntity.prototype.getDOMElement = function () {

    return this._DOMElement;
}

GameEntity.prototype.getParentDOMElement = function () {

    return this._parentDOMElement;
}

GameEntity.prototype.getFPS = function () {

    return this._fps;
}

GameEntity.prototype.setFPS = function (value) {

    this._fps = value;
}

GameEntity.prototype.getColor = function () {

    return this._color;
}

GameEntity.prototype.setColor = function (value) {

    this._color = value;

    this._isColorChanged = true;
}

GameEntity.prototype.checkIfIsInViewport = function () {

    var cr = this._DOMElement.getBoundingClientRect();

    return (
        cr.top >= 0 &&
        cr.left >= 0 &&
        cr.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        cr.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

GameEntity.prototype.checkIfTouches = function (otherGameEntity) {

    var isTouches = false;

    if (otherGameEntity instanceof GameEntity) {

        function getPositions(entity) {

            return [[entity.getX(), entity.getX() + entity.getWidth()], [entity.getY(), entity.getY() + entity.getHeight()]];
        }

        function comparePositions(p1, p2) {
            var r1, r2;
            r1 = p1[0] < p2[0] ? p1 : p2;
            r2 = p1[0] < p2[0] ? p2 : p1;
            return r1[1] > r2[0] || r1[0] === r2[0];
        }


        var pos1 = getPositions(this);
        var pos2 = getPositions(otherGameEntity);

        isTouches = comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
    }

    return isTouches;
}

GameEntity.prototype.repaint = function () {

    if (this._isPositionChanged) {

        this._DOMElement.style.left = "{x}px".replace("{x}", this._x);
        this._DOMElement.style.bottom = "{y}px".replace("{y}", this._y);

        this._isPositionChanged = false;
    }

    if (this._isDimensionChanged) {

        this._DOMElement.style.width = "{width}px".replace("{width}", this._width);
        this._DOMElement.style.height = "{height}px".replace("{height}", this._height);

        this._isDimensionChanged = false;
    }

    if (this._isAngleChanged) {

        this._DOMElement.style.transform = "rotate({angle}deg)".replace("{angle}", this._angle);

        this._isAngleChanged = false;
    }

    if (this._isColorChanged) {

        this._DOMElement.style.color = this._color;

        this._isColorChanged = false;
    }
}

/* End Game Entity */

/* Start Game Field */

function GameField(parentDOMElement) {

    GameEntity.call(this, null, parentDOMElement, "game-field");

    this._skyLayer = new GameFieldLayer(this._DOMElement, "sky");
    this._starsLayer = new GameFieldLayer(this._DOMElement, "stars");
    this._twinklingLayer = new GameFieldLayer(this._DOMElement, "twinkling");
    this._cloudsLayer = new GameFieldLayer(this._DOMElement, "clouds");
    this._waterLayer = new GameFieldLayer(this._DOMElement, "water");

    this._starsLayer.setFPS(6);
    this._starsLayer.setBackgroundPositionDX(-1);
    this._cloudsLayer.setFPS(5);
    this._cloudsLayer.setBackgroundPositionDX(10);
}

GameField.prototype = Object.create(GameEntity.prototype);

GameField.prototype.getSkyLayer = function () {

    return this._skyLayer;
}

GameField.prototype.getStarsLayer = function () {

    return this._starsLayer;
}

GameField.prototype.getTwinklingLayer = function () {

    return this._twinklingLayer;
}

GameField.prototype.getCloudsLayer = function () {

    return this._cloudsLayer;
}

GameField.prototype.getWaterLayer = function () {

    return this._waterLayer;
}

GameField.prototype.repaint = function () {

    GameEntity.prototype.repaint.call(this);

    this._starsLayer.repaint();
    this._cloudsLayer.repaint();
}

/* End Game Field */


/* Start Game Field Layer */

function GameFieldLayer(parentDOMElement, id) {

    GameEntity.call(this, null, parentDOMElement, id, "game-field-layer");

    this._backgroundPositionX = 0;
    this._backgroundPositionY = 0;
    this._backgroundPositionDX = 1;
    this._backgroundPositionDY = 1;

    this._isBackgroundPositionChanged = false;
}

GameFieldLayer.prototype = Object.create(GameEntity.prototype);

GameFieldLayer.prototype.getBackgroundPositionX = function () {

    return this._backgroundPositionX;
}

GameFieldLayer.prototype.setBackgroundPositionX = function (value) {

    this._backgroundPositionX = value;

    this._isBackgroundPositionChanged = true;
}

GameFieldLayer.prototype.getBackgroundPositionY = function () {

    return this._backgroundPositionY;
}

GameFieldLayer.prototype.setBackgroundPositionY = function (value) {

    this._backgroundPositionY = value;

    this._isBackgroundPositionChanged = true;
}

GameFieldLayer.prototype.getBackgroundPositionDX = function () {

    return this._backgroundPositionDX;
}

GameFieldLayer.prototype.setBackgroundPositionDX = function (value) {

    this._backgroundPositionDX = value;
}

GameFieldLayer.prototype.getBackgroundPositionDY = function () {

    return this._backgroundPositionDY;
}

GameFieldLayer.prototype.setBackgroundPositionDY = function (value) {

    this._backgroundPositionDY = value;
}

GameFieldLayer.prototype.moveBackgroundX = function () {

    this._backgroundPositionX += this._backgroundPositionDX;

    this._isBackgroundPositionChanged = true;
}

GameFieldLayer.prototype.moveBackgroundY = function () {

    this._backgroundPositionY += this._backgroundPositionDY;

    this._isBackgroundPositionChanged = true;
}

GameFieldLayer.prototype.repaint = function () {

    GameEntity.prototype.repaint.call(this);

    if (this._isBackgroundPositionChanged) {

        this.getDOMElement().style.backgroundPosition = "{x}px {y}px".replace("{x}", this._backgroundPositionX).replace("{y}", this._backgroundPositionY);

        this._isBackgroundPositionChanged = false;
    }
}

/* End Game Field Layer */

/* Start Trickster */

function Trickster(parentDOMElement, textContent) {

    GameEntity.call(this, null, parentDOMElement, null, "trickster", textContent);

    this._fps = 10;
    this._shadowColor = "#fff";
    this._PreLevitateX = 0;
    this._PreLevitateY = 0;
    this._LevitateDX = 50;
    this._LevitateDY = 50;

    this._isShadowColorChanged = false;
}

Trickster.prototype = Object.create(GameEntity.prototype);

Trickster.prototype.getShadowColor = function () {

    return this._shadowColor;
}

Trickster.prototype.setShadowColor = function (value) {

    this._shadowColor = value;

    this._isShadowColorChanged = true;
}

Trickster.prototype.levitate = function () {

    if (!this._PreLevitateX) {

        this._PreLevitateX = this.getX();
    }

    if (!this._PreLevitateY) {
        this._PreLevitateY = this.getY();
    }

    if (this.getDX() >= 0) {

        if (this.getX() + this.getDX() <= this._PreLevitateX + this._LevitateDX) {

            this.setX(this.getX() + this.getDX());
        }
        else {
            this.setDX(-1 * this.getDX());
        }
    }
    else {

        if (this.getX() + this.getDX() >= this._PreLevitateX - this._LevitateDX) {

            this.setX(this.getX() + this.getDX());
        }
        else {
            this.setDX(-1 * this.getDX());
        }
    }

    if (this.getDY() >= 0) {

        if (this.getY() + this.getDY() <= this._PreLevitateY + this._LevitateDY) {

            this.setY(this.getY() + this.getDY());
        }
        else {
            this.setDY(-1 * this.getDY());
        }
    }
    else {

        if (this.getY() + this.getDY() >= this._PreLevitateY - this._LevitateDY) {

            this.setY(this.getY() + this.getDY());
        }
        else {
            this.setDY(-1 * this.getDY());
        }
    }
}

Trickster.prototype.rotate = function () {

    this.setAngle(this.getAngle() + this.getDAngle());
}

Trickster.prototype.repaint = function () {

    GameEntity.prototype.repaint.call(this);

    if (this._isShadowColorChanged) {

        this.getDOMElement().style.textShadow = "0px 0px 3rem {color}".replace("{color}", this._shadowColor);

        this._isShadowColorChanged = false;
    }
}

/* End Trickster */

/* Start Game */

function Game(parentDOMElement) {

    var colours = ["#f44336", "#ffebee", "#ffcdd2", "#ef9a9a", "#e57373", "#ef5350", "#f44336", "#e53935", "#d32f2f", "#c62828", "#b71c1c", "#ff8a80", "#ff5252", "#ff1744", "#d50000", "#e91e63", "#fce4ec", "#f8bbd0", "#f48fb1", "#f06292", "#ec407a", "#e91e63", "#d81b60", "#c2185b", "#ad1457", "#880e4f", "#ff80ab", "#ff4081", "#f50057", "#c51162", "#9c27b0", "#f3e5f5", "#e1bee7", "#ce93d8", "#ba68c8", "#ab47bc", "#9c27b0", "#8e24aa", "#7b1fa2", "#6a1b9a", "#4a148c", "#ea80fc", "#e040fb", "#d500f9", "#aa00ff", "#673ab7", "#ede7f6", "#d1c4e9", "#b39ddb", "#9575cd", "#7e57c2", "#673ab7", "#5e35b1", "#512da8", "#4527a0", "#311b92", "#b388ff", "#7c4dff", "#651fff", "#6200ea", "#3f51b5", "#e8eaf6", "#c5cae9", "#9fa8da", "#7986cb", "#5c6bc0", "#3f51b5", "#3949ab", "#303f9f", "#283593", "#1a237e", "#8c9eff", "#536dfe", "#3d5afe", "#304ffe", "#2196f3", "#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5", "#2196f3", "#1e88e5", "#1976d2", "#1565c0", "#0d47a1", "#82b1ff", "#448aff", "#2979ff", "#2962ff", "#03a9f4", "#e1f5fe", "#b3e5fc", "#81d4fa", "#4fc3f7", "#29b6f6", "#03a9f4", "#039be5", "#0288d1", "#0277bd", "#01579b", "#80d8ff", "#40c4ff", "#00b0ff", "#0091ea", "#00bcd4", "#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7", "#00838f", "#006064", "#84ffff", "#18ffff", "#00e5ff", "#00b8d4", "#009688", "#e0f2f1", "#b2dfdb", "#80cbc4", "#4db6ac", "#26a69a", "#009688", "#00897b", "#00796b", "#00695c", "#004d40", "#a7ffeb", "#64ffda", "#1de9b6", "#00bfa5", "#4caf50", "#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20", "#b9f6ca", "#69f0ae", "#00e676", "#00c853", "#8bc34a", "#f1f8e9", "#dcedc8", "#c5e1a5", "#aed581", "#9ccc65", "#8bc34a", "#7cb342", "#689f38", "#558b2f", "#33691e", "#ccff90", "#b2ff59", "#76ff03", "#64dd17", "#cddc39", "#f9fbe7", "#f0f4c3", "#e6ee9c", "#dce775", "#d4e157", "#cddc39", "#c0ca33", "#afb42b", "#9e9d24", "#827717", "#f4ff81", "#eeff41", "#c6ff00", "#aeea00", "#ffeb3b", "#fffde7", "#fff9c4", "#fff59d", "#fff176", "#ffee58", "#ffeb3b", "#fdd835", "#fbc02d", "#f9a825", "#f57f17", "#ffff8d", "#ffff00", "#ffea00", "#ffd600", "#ffc107", "#fff8e1", "#ffecb3", "#ffe082", "#ffd54f", "#ffca28", "#ffc107", "#ffb300", "#ffa000", "#ff8f00", "#ff6f00", "#ffe57f", "#ffd740", "#ffc400", "#ffab00", "#ff9800", "#fff3e0", "#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726", "#ff9800", "#fb8c00", "#f57c00", "#ef6c00", "#e65100", "#ffd180", "#ffab40", "#ff9100", "#ff6d00", "#ff5722", "#fbe9e7", "#ffccbc", "#ffab91", "#ff8a65", "#ff7043", "#ff5722", "#f4511e", "#e64a19", "#d84315", "#bf360c", "#ff9e80", "#ff6e40", "#ff3d00", "#dd2c00", "#795548", "#efebe9", "#d7ccc8", "#bcaaa4", "#a1887f", "#8d6e63", "#795548", "#6d4c41", "#5d4037", "#4e342e", "#3e2723", "#9e9e9e", "#fafafa", "#f5f5f5", "#eeeeee", "#e0e0e0", "#bdbdbd", "#9e9e9e", "#757575", "#616161", "#424242", "#212121", "#607d8b", "#eceff1", "#cfd8dc", "#b0bec5", "#90a4ae", "#78909c", "#607d8b", "#546e7a", "#455a64", "#37474f", "#263238", "#000000", "#ffffff"];

    this._requestAnimationFrameId;
    this._requestAnimationFrameCounter = 0;

    this._gameField = new GameField(parentDOMElement);

    this._tricksters = [];

    for (var i = 0; i < 26; i++) {

        var trickster = new Trickster(this._gameField.getDOMElement(), String.fromCharCode("A".charCodeAt(0) + i));
        trickster.setX(trickster.getWidth() * i);
        trickster.setY(trickster.getHeight() * i);
        trickster.setColor(colours[Math.floor(Math.random() * colours.length)]);
        trickster.setShadowColor(trickster.getColor());

        if (i % 2 == 0) {
            trickster.setDAngle(-i);
            trickster.setDX(-i);
        }
        else {
            trickster.setDAngle(i);
            trickster.setDX(i);
        }

        this._tricksters.push(trickster);
    }

}

Game.prototype.runGameLoop = function () {

    /* Game Field */

    var gameFieldStarsLayer = this._gameField.getStarsLayer();
    var gameFieldCloudsLayer = this._gameField.getCloudsLayer();

    if (this._requestAnimationFrameCounter % Math.floor(60 / gameFieldStarsLayer.getFPS()) == 0) {

        gameFieldStarsLayer.moveBackgroundX();
        gameFieldStarsLayer.moveBackgroundY();
    }

    if (this._requestAnimationFrameCounter % Math.floor(60 / gameFieldCloudsLayer.getFPS()) == 0) {

        gameFieldCloudsLayer.moveBackgroundX();
    }

    this._gameField.repaint();

    if (this._requestAnimationFrameCounter % Math.floor(60 / this._tricksters[0].getFPS()) == 0) {

        this._tricksters.forEach(function (trickster) { trickster.levitate(); });
        this._tricksters.forEach(function (trickster) { trickster.rotate(); });

    }

    this._tricksters.forEach(function (trickster) { trickster.repaint(); });

    this._requestAnimationFrameCounter++;

    this._requestAnimationFrameId = requestAnimationFrame(this.runGameLoop.bind(this));
}

Game.prototype.start = function () {

    this._requestAnimationFrameId = requestAnimationFrame(this.runGameLoop.bind(this));
}

Game.prototype.stop = function () {

    if (this._requestAnimationFrameId) {

        cancelAnimationFrame(this._requestAnimationFrameId);
    }
}

/* End Game */

/* Utility Functions */

/* Start Main Function */

var gameWrapper = document.getElementById("game-wrapper");

var game = new Game(gameWrapper);

game.start();

/* End Main Function */