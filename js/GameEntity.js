/* Start Game Entity */

function GameEntity(DOMElementTagName, parentDOMElement, appendToParentDOMElement, id, classNameList, textContent) {

    /* Start Initialize Private Data */

    this._DOMElement = document.createElement(DOMElementTagName);
    this._parentDOMElement = parentDOMElement;
    this._appendedToParentDOMElement = appendToParentDOMElement;

    if (this._parentDOMElement && this._appendedToParentDOMElement) {

        this._parentDOMElement.appendChild(this._DOMElement);
    }

    this._DOMElement.className = 'game-entity';

    if (id) {

        this._DOMElement.id = id;
    }

    if (classNameList) {

        var that = this;

        classNameList.forEach(function (className) {
            that._DOMElement.classList.add(className);
        });
    }

    if (textContent) {

        this._DOMElement.textContent = textContent;
    }

    var cr = this._DOMElement.getBoundingClientRect();

    this._x = cr.left;
    this._y = cr.bottom;


    this._width = cr.width;
    this._height = cr.height;

    this._dx = 0;
    this._dy = 0;
    this._angle = 0;
    this._dAngle = 0;
    this._color = '';
    this._backgroundColor = '';
    this._textShadow = '';
    this._boxShadow = '';
    this._backgroundPositionX = 0;
    this._backgroundPositionY = 0;
    this._backgroundPositionDX = 0;
    this._backgroundPositionDY = 0;
    this._display = 'block';

    this._needRepaint = {
        x: false,
        y: false,
        angle: false,
        width: false,
        height: false,
        color: false,
        backgroudColor: false,
        textShadow: false,
        boxShadow: false,
        backgroundPositionX: false,
        backgroundPositionY: false,
        display: false
    };

    /* End Initialize Private Data */
}

/* Start Static Constants */

GameEntity.prototype.CSS_UNIT = 'px';

GameEntity.prototype.FPS_INDEX = 1;

/* End Static Constants */

/* Start Public Methods */

GameEntity.prototype.getX = function () {

    return this._x;
}

GameEntity.prototype.setX = function (value) {

    this._x = value;

    this._needRepaint.x = true;
}

GameEntity.prototype.getY = function () {

    return this._y;
}

GameEntity.prototype.setY = function (value) {

    this._y = value;

    this._needRepaint.y = true;
}

GameEntity.prototype.getWidth = function () {

    return this._width;
}

GameEntity.prototype.setWidth = function (value) {

    this._width = value;

    this._needRepaint.width = true;
}

GameEntity.prototype.getHeight = function () {

    return this._height;
}

GameEntity.prototype.setHeight = function (value) {

    this._height = value;

    this._needRepaint.height = true;
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

    this._needRepaint.angle = true;
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

GameEntity.prototype.getColor = function () {

    return this._color;
}

GameEntity.prototype.setColor = function (value) {

    this._color = value;

    this._needRepaint.color = true;
}

GameEntity.prototype.getBackgroundColor = function () {

    return this._backgroundColor;
}

GameEntity.prototype.setBackgroundColor = function (value) {

    this._backgroundColor = value;

    this._needRepaint.backgroudColor = true;
}

GameEntity.prototype.getTextShadow = function () {

    return this._textShadow;
}

GameEntity.prototype.setTextShadow = function (value) {

    this._textShadow = value;

    this._needRepaint.textShadow = true;
}

GameEntity.prototype.getBoxShadow = function () {

    return this._boxShadow;
}

GameEntity.prototype.setBoxShadow = function (value) {

    this._boxShadow = value;

    this._needRepaint.boxShadow = true;
}

GameEntity.prototype.getBackgroundPositionX = function () {

    return this._backgroundPositionX;
}

GameEntity.prototype.setBackgroundPositionX = function (value) {

    this._backgroundPositionX = value;

    this._needRepaint.backgroundPositionX = true;
}

GameEntity.prototype.getBackgroundPositionY = function () {

    return this._backgroundPositionY;
}

GameEntity.prototype.setBackgroundPositionY = function (value) {

    this._backgroundPositionY = value;

    this._needRepaint.backgroundPositionY = true;
}

GameEntity.prototype.getBackgroundPositionDX = function () {

    return this._backgroundPositionDX;
}

GameEntity.prototype.setBackgroundPositionDX = function (value) {

    this._backgroundPositionDX = value;
}

GameEntity.prototype.getBackgroundPositionDY = function () {

    return this._backgroundPositionDY;
}

GameEntity.prototype.setBackgroundPositionDY = function (value) {

    this._backgroundPositionDY = value;
}

GameEntity.prototype.makeHidden = function () {

    this._display = 'none';

    this._needRepaint.display = true;
}

GameEntity.prototype.makeVisible = function () {

    this._display = 'block';

    this._needRepaint.display = true;
}

GameEntity.prototype.isVisible = function () {

    return this._display !== 'none';
}

GameEntity.prototype.repaint = function () {

    var cssText = '';

    if (this._needRepaint.x) {

        this._DOMElement.style.left = '{x}{CSS_UNIT}'
            .replace('{x}', this._x)
            .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);

        //cssText += 'left: {x}{CSS_UNIT};'
        //    .replace('{x}', this._x)
        //    .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);

        this._needRepaint.x = false;
    }

    if (this._needRepaint.y) {

        this._DOMElement.style.bottom = '{y}{CSS_UNIT}'
            .replace('{y}', this._y)
            .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);

        //cssText += 'bottom: {y}{CSS_UNIT};'
        //    .replace('{y}', this._y)
        //    .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);

        this._needRepaint.y = false;
    }

    if (this._needRepaint.width) {

        this._DOMElement.style.width = '{width}{CSS_UNIT}'
            .replace('{width}', this._width)
            .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);

        //cssText += 'width: {width}{CSS_UNIT};'
        //    .replace('{width}', this._width)
        //    .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);

        this._needRepaint.width = false;
    }

    if (this._needRepaint.height) {

        this._DOMElement.style.height = '{height}{CSS_UNIT}'
            .replace('{height}', this._height)
            .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);

        //cssText += 'height: {height}{CSS_UNIT};'
        //    .replace('{height}', this._height)
        //    .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);

        this._needRepaint.height = false;
    }

    if (this._needRepaint.angle) {

        this._DOMElement.style.transform = 'rotate({angle}deg)'
            .replace('{angle}', this._angle);

        //cssText += 'transform: rotate({angle}deg);'
        //    .replace('{angle}', this._angle);

        this._needRepaint.angle = false;
    }

    if (this._needRepaint.backgroundPositionX || this._needRepaint.backgroundPositionY) {

        this._DOMElement.style.backgroundPosition = '{x}{CSS_UNIT} {y}{CSS_UNIT}'
            .replace('{x}', this._backgroundPositionX)
            .replace('{y}', this._backgroundPositionY)
            .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT)
            .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);

        //cssText += 'background-position: {x}{CSS_UNIT} {y}{CSS_UNIT};'
        //    .replace('{x}', this._backgroundPositionX)
        //    .replace('{y}', this._backgroundPositionY)
        //    .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT)
        //    .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);

        this._needRepaint.backgroundPositionX = false;
        this._needRepaint.backgroundPositionY = false;
    }

    if (this._needRepaint.color) {

        this._DOMElement.style.color = '{color}'
            .replace('{color}', this._color);

        //cssText += 'color: {color};'
        //    .replace('{color}', this._color);

        this._needRepaint.color = false;
    }

    if (this._needRepaint.backgroundColor) {

        this._DOMElement.style.backgroundColor = '{background-color}'
            .replace('{background-color}', this._backgroundColor);

        //cssText += 'background-color: {background-color};'
        //    .replace('{background-color}', this._backgroundColor);

        this._needRepaint.backgroundColor = false;
    }

    if (this._needRepaint.textShadow) {

        this._DOMElement.style.textShadow = '{text-shadow}'
            .replace('{text-shadow}', this._textShadow);

        //cssText += 'text-shadow: {text-shadow};'
        //    .replace('{text-shadow}', this._textShadow);

        this._needRepaint.textShadow = false;
    }

    if (this._needRepaint.boxShadow) {

        this._DOMElement.style.boxShadow = '{box-shadow}'
            .replace('{box-shadow}', this._boxShadow);

        //cssText += 'box-shadow: {box-shadow};'
        //    .replace('{box-shadow}', this._boxShadow);

        this._needRepaint.boxShadow = false;
    }

    if (this._needRepaint.display) {

        this._DOMElement.style.display = '{display}'
            .replace('{display}', this._display);

        //cssText += 'display: {display}'
        //    .replace('{display}', this._display);

        this._needRepaint.display = false;

    }

    if (cssText) {

        this._DOMElement.style.cssText = cssText;
    }
}

/* End Public Methods */

/* End Game Entity */
