/* Start Main Function */

var gameWrapper = document.getElementById('game-wrapper');

var game = new Game(gameWrapper);

/* Start Event Listeners */

document.addEventListener('keydown', game.keyDownEventHandler.bind(game), false);
document.addEventListener('keyup', game.keyUpEventHandler.bind(game), false);
document.addEventListener('click', game.mouseClickEventHandler.bind(game), false);
document.addEventListener('touchstart', game.touchStartEventHandler.bind(game), false);
document.addEventListener('touchend', game.touchEndEventHandler.bind(game), false);
window.addEventListener('resize', debounce(game.resizeEventHandler.bind(game), 100), false);

/* End Event Listeners */

game.start();

/* End Main Function */

/* Start Utility Functions */

function debounce(func, timeToWait) {

    var timeout;

    return function () {

        var context = this;
        var args = arguments;

        clearTimeout(timeout);

        timeout = setTimeout(function () {

            func.apply(context, args);

        }, timeToWait);
    };
}

/* End Utility Functions */