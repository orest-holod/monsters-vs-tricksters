/* Start Main Function */

var gameWrapper = document.getElementById('game-wrapper');

var game = new Game(gameWrapper);

/* Start Event Listeners */

document.addEventListener('keydown', game.keyDownEventHandler.bind(game), false);
document.addEventListener('keyup', game.keyDownEventHandler.bind(game), false);
document.addEventListener('click', game.mouseClickEventHandler.bind(game), false);

/* End Event Listeners */

game.start();

/* End Main Function */