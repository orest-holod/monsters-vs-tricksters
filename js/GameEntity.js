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

        classNameList.forEach(function(className) {
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

    this._isVisible = true;

    this._backgroundPositionX = 0;
    this._backgroundPositionY = 0;
    this._backgroundPositionDX = 0;
    this._backgroundPositionDY = 0;

    this._needRepaint = false;

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

    this._needRepaint = true;
}

GameEntity.prototype.getY = function () {

    return this._y;
}

GameEntity.prototype.setY = function (value) {

    this._y = value;

    this._needRepaint = true;
}

GameEntity.prototype.getWidth = function () {

    return this._width;
}

GameEntity.prototype.setWidth = function (value) {

    this._width = value;

    this._needRepaint = true;
}

GameEntity.prototype.getHeight = function () {

    return this._height;
}

GameEntity.prototype.setHeight = function (value) {

    this._height = value;

    this._needRepaint = true;
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

    this._needRepaint = true;
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

    this._needRepaint = true;
}

GameEntity.prototype.getBackgroundColor = function () {

    return this._backgroundColor;
}

GameEntity.prototype.setBackgroundColor = function (value) {

    this._backgroundColor = value;

    this._needRepaint = true;
}

GameEntity.prototype.getTextShadow = function () {

    return this._textShadow;
}

GameEntity.prototype.setTextShadow = function (value) {

    this._textShadow = value;

    this._needRepaint = true;
}

GameEntity.prototype.getBoxShadow = function () {

    return this._boxShadow;
}

GameEntity.prototype.setBoxShadow = function (value) {

    this._boxShadow = value;

    this._needRepaint = true;
}

GameEntity.prototype.getBackgroundPositionX = function () {

    return this._backgroundPositionX;
}

GameEntity.prototype.setBackgroundPositionX = function (value) {

    this._backgroundPositionX = value;

    this._needRepaint = true;
}

GameEntity.prototype.getBackgroundPositionY = function () {

    return this._backgroundPositionY;
}

GameEntity.prototype.setBackgroundPositionY = function (value) {

    this._backgroundPositionY = value;

    this._needRepaint = true;
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

GameEntity.prototype.makeHidden = function() {

    this._isVisible = false;
    this._x = 0;

    this._needRepaint = true;
}

GameEntity.prototype.makeVisible = function () {

    this._isVisible = true;
    this._x = 0;

    this._needRepaint = true;
}

GameEntity.prototype.isVisible = function() {

    return this._isVisible;
}

GameEntity.prototype.repaint = function () {

    if (this._needRepaint) {

        var cssText = '';

        if (this._x) {

            cssText += 'left: {x}{CSS_UNIT};'
                .replace('{x}', this._x)
                .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);
        }

        if (this._y) {

            cssText += 'bottom: {y}{CSS_UNIT};'
                .replace('{y}', this._y)
                .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);
        }

        if (this._width) {

            cssText += 'width: {width}{CSS_UNIT};'
                .replace('{width}', this._width)
                .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);
        }

        if (this._height) {

            cssText += 'height: {height}{CSS_UNIT};'
                .replace('{height}', this._height)
                .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);
        }

        if (this._angle) {

            cssText += 'transform: rotate({angle}deg);'
                .replace('{angle}', this._angle);
        }

        if (this._backgroundPositionX || this._backgroundPositionY) {
            
            cssText += 'background-position: {x}{CSS_UNIT} {y}{CSS_UNIT};'
                .replace('{x}', this._backgroundPositionX)
                .replace('{y}', this._backgroundPositionY)
                .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT)
                .replace('{CSS_UNIT}', GameEntity.prototype.CSS_UNIT);
        }

        if (this._color) {

            cssText += 'color: {color};'
                .replace('{color}', this._color);
        }

        if (this._backgroundColor) {

            cssText += 'background-color: {background-color};'
                .replace('{background-color}', this._backgroundColor);
        }

        if (this._textShadow) {

            cssText += "text-shadow: {text-shadow};"
                .replace('{text-shadow}', this._textShadow);
        }

        if (this._boxShadow) {

            cssText += "box-shadow: {box-shadow};"
                .replace('{box-shadow}', this._boxShadow);
        }

        if (!this._isVisible) {

            this._DOMElement.classList.add("hidden");
        } else {

            this._DOMElement.classList.remove("hidden");
        }

        this._DOMElement.style.cssText = cssText;

        this._needRepaint = false;
    }
}

/* End Public Methods */

/* End Game Entity */
