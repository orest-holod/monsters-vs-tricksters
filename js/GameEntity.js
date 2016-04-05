/* Start Game Entity */

function GameEntity(DOMElementTagName, parentDOMElement, appendToParentDOMElement, id, classNameList, textContent) {

    /* Start Initialize Private Data */

    this._DOMElement = document.createElement(DOMElementTagName);
    this._parentDOMElement = parentDOMElement;
    this._appendedToParentDOMElement = false;
   
    if (this._parentDOMElement && appendToParentDOMElement) {

        this._parentDOMElement.appendChild(this._DOMElement);
        this._appendedToParentDOMElement = true;
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

        this._DOMElement.innerHTML = textContent;
    }

    this._cr = this._DOMElement.getBoundingClientRect();
    this._x = this._cr.left;
    this._y = this._cr.bottom;
    this._width = this._cr.width;
    this._height = this._cr.height;
    this._dx = 0;
    this._dy = 0;
    this._angle = 0;
    this._dAngle = 0;
    this._color = '';
    this._boxShadow = '';
    this._translateX = 0;
    this._translateY = 0;
    this._display = 'block';
    this._textContent = '';

    this._smthChanged = false;

    this._needRepaint = {

        x: false,
        y: false,
        angle: false,
        width: false,
        height: false,
        color: false,
        boxShadow: false,
        translateX: false,
        translateY: false,
        display: false,
        textContent: false
    };

    /* End Initialize Private Data */
}

/* Start Public Methods */

GameEntity.prototype.getX = function () {

    return this._x;
}

GameEntity.prototype.setX = function (value, needRepaint) {

    this._x = value;

    this._needRepaint.x = needRepaint === undefined ? true : needRepaint;
    this._smthChanged = true;
}

GameEntity.prototype.getY = function () {

    return this._y;
}

GameEntity.prototype.setY = function (value, needRepaint) {

    this._y = value;

    this._needRepaint.y = needRepaint === undefined ? true : needRepaint;
    this._smthChanged = true;
}

GameEntity.prototype.getWidth = function () {

    return this._width;
}

GameEntity.prototype.setWidth = function (value, needRepaint) {

    this._width = value;

    this._needRepaint.width = needRepaint === undefined ? true : needRepaint;
    this._smthChanged = true;
}

GameEntity.prototype.getHeight = function () {

    return this._height;
}

GameEntity.prototype.setHeight = function (value, needRepaint) {

    this._height = value;

    this._needRepaint.height = needRepaint === undefined ? true : needRepaint;
    this._smthChanged = true;
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

GameEntity.prototype.setAngle = function (value, needRepaint) {

    if (value >= 360) {

        value = value - 360;
    }
    else if (value <= -360) {

        value = value + 360;
    }

    this._angle = value;

    this._needRepaint.angle = needRepaint === undefined ? true : needRepaint;
    this._smthChanged = true;
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

GameEntity.prototype.setColor = function (value, needRepaint) {

    this._color = value;

    this._needRepaint.color = needRepaint === undefined ? true : needRepaint;
    this._smthChanged = true;
}

GameEntity.prototype.getBoxShadow = function () {

    return this._boxShadow;
}

GameEntity.prototype.setBoxShadow = function (value, needRepaint) {

    this._boxShadow = value;

    this._needRepaint.boxShadow = needRepaint === undefined ? true : needRepaint;
    this._smthChanged = true;
}

GameEntity.prototype.getTranslateX = function () {

    return this._translateX;
}

GameEntity.prototype.setTranslateX = function (value, needRepaint) {

    this._translateX = value;

    this._needRepaint.translateX = needRepaint === undefined ? true : needRepaint;
    this._smthChanged = true;
}

GameEntity.prototype.getTranslateY = function () {

    return this._translateY;
}

GameEntity.prototype.setTranslateY = function (value, needRepaint) {

    this._translateY = value;

    this._needRepaint.translateY = needRepaint === undefined ? true : needRepaint;
    this._smthChanged = true;
}

GameEntity.prototype.getTextContent = function () {

    return this._textContent;
}

GameEntity.prototype.setTextContent = function (value, needRepaint) {

    this._textContent = value;

    this._needRepaint.textContent = needRepaint === undefined ? true : needRepaint;
    this._smthChanged = true;
}

GameEntity.prototype.makeHidden = function () {

    this._display = 'none';

    this._needRepaint.display = true;
    this._smthChanged = true;
}

GameEntity.prototype.makeVisible = function () {

    this._display = 'block';

    this._needRepaint.display = true;
    this._smthChanged = true;
}

GameEntity.prototype.isVisible = function () {

    return this._display !== 'none';
}

GameEntity.prototype.appendToParentDOMElement = function() {

    if (!this._appendedToParentDOMElement) {

        this._parentDOMElement.appendChild(this._DOMElement);

        this._appendedToParentDOMElement = true;
    }
}

GameEntity.prototype.removeFromParentDOMElement = function() {

    if (this._appendedToParentDOMElement) {
        
        this._parentDOMElement.removeChild(this._DOMElement);

        this._appendedToParentDOMElement = false;
    }
}

GameEntity.prototype.isAppendedToParentDOMElement = function() {

    return this._appendedToParentDOMElement;
}

GameEntity.prototype.checkIfTouches = function (otherGameEntity) {

    var isTouches = false;

    if (otherGameEntity instanceof GameEntity) {

        function getPositions(entity) {

            return [[entity.getX(), entity.getX() + entity.getWidth()], [entity.getY(), entity.getY() + entity.getHeight()]];
        }

        function comparePositions(p1, p2) {
            
            var r1 = p1[0] < p2[0] ? p1 : p2;
            var r2 = p1[0] < p2[0] ? p2 : p1;

            return r1[1] > r2[0] || r1[0] === r2[0];
        }

        var pos1 = getPositions(this);
        var pos2 = getPositions(otherGameEntity);

        isTouches = comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
    }

    return isTouches;
}

GameEntity.prototype.repaint = function () {

    if (this._appendedToParentDOMElement && this._smthChanged) {

        if (this._needRepaint.x) {

            this._DOMElement.style.left = '{x}px'
                .replace('{x}', this._x);

            this._needRepaint.x = false;
        }

        if (this._needRepaint.y) {

            this._DOMElement.style.bottom = '{y}px'
                .replace('{y}', this._y);

            this._needRepaint.y = false;
        }

        if (this._needRepaint.width) {

            this._DOMElement.style.width = '{width}px'
                .replace('{width}', this._width);

            this._needRepaint.width = false;
        }

        if (this._needRepaint.height) {

            this._DOMElement.style.height = '{height}px'
                .replace('{height}', this._height);

            this._needRepaint.height = false;
        }

        if (this._needRepaint.angle || this._needRepaint.translateX || this._needRepaint.translateY) {

            this._DOMElement.style.transform = 'rotate({angle}deg) translate3d({x}px, {y}px, 0)'
                .replace('{angle}', this._angle)
                .replace('{x}', this._translateX)
                .replace('{y}', this._translateY);

            this._needRepaint.angle = false;
            this._needRepaint.translateX = false;
            this._needRepaint.translateY = false;
        }

        if (this._needRepaint.color) {

            this._DOMElement.style.color = '{color}'
                .replace('{color}', this._color);

            this._needRepaint.color = false;
        }

        if (this._needRepaint.boxShadow) {

            this._DOMElement.style.boxShadow = '{box-shadow}'
                .replace('{box-shadow}', this._boxShadow);

            this._needRepaint.boxShadow = false;
        }

        if (this._needRepaint.display) {

            this._DOMElement.style.display = '{display}'
                .replace('{display}', this._display);

            this._needRepaint.display = false;
        }

        if (this._needRepaint.textContent) {

            this._DOMElement.innerHTML = this._textContent;

            this._needRepaint.textContent = false;
        }

        this._smthChanged = false;
    }
}

/* End Public Methods */

/* End Game Entity */
