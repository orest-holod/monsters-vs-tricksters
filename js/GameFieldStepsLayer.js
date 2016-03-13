/* Start Game Field Steps Layer */

function GameFieldStepsLayer(parentDOMElement, appendToParentDOMElement) {

    GameFieldLayer.call(this, parentDOMElement, appendToParentDOMElement, 'steps');

    this._pixel = 0;
    this._maxX = this._DOMElement.getBoundingClientRect().width;
    this._maxY = window.innerHeight;
    this._widthX = Math.floor(this._maxX / 5);
    this._heightY = Math.floor(this._maxY / 5);
    this._steps = [];
}

GameFieldStepsLayer.prototype = Object.create(GameFieldLayer.prototype);

GameFieldStepsLayer.prototype.generateSteps = function (colors) {

    for (var y = 0; y < 30; y++) {
        for (var x = 0; x < 5; x++) {

            if ((x + y) % 3 == 0) {

                var randX = Math.floor(Math.random() * 3) * Math.floor(this._widthX / 3);

                if ((x + 1) * this._widthX + randX + this._widthX > this._maxX) {
                    randX = 0;
                }

                //var stepColor = colors[Math.floor(y / 5)];

                var stepColor = colors[Math.floor(Math.random() * colors.length)];

                this._steps.push(new Step(this._DOMElement, false, x * this._widthX, y, (this._widthX + randX), this._heightY, stepColor));
            }

        }
    }
}

GameFieldStepsLayer.prototype.getSteps = function () {

    return this._steps;
}

GameFieldStepsLayer.prototype.repaint = function () {

    var that = this;

    this._steps.forEach(function (step) {

        if ((step.getY() <= that._pixel + that._maxY && !step.getDOMElement().parentNode && step.getY() >= that._pixel)) {

            step.repaint();
            that._DOMElement.appendChild(step.getDOMElement());

        } else if ((step.getY() < that._pixel || step.getY() > that._pixel + that._maxY) && step.getDOMElement().parentNode) {

            that._DOMElement.removeChild(step.getDOMElement());
        }
    });
}

GameFieldStepsLayer.prototype.addPixel = function () {
    this._pixel += 0.01 * this._maxY;
    this._DOMElement.style.height = '{height}px'.replace('{height}', (this._DOMElement.getBoundingClientRect().height + 0.01 * this._maxY));
}

GameFieldStepsLayer.prototype.minusPixel = function () {
    this._pixel -= 0.01 * this._maxY;
    this._DOMElement.style.height = '{height}px'.replace('{height}', (this._DOMElement.getBoundingClientRect().height - 0.01 * this._maxY));
}

/* End Game Field Steps Layer */