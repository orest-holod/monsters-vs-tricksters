/* Start Main Function */

var gameWrapper = document.getElementById('game-wrapper');

var game = new Game(gameWrapper);

/* Start Event Listeners */

document.addEventListener('keydown', game.keyDownEventHandler.bind(game), false);
document.addEventListener('keyup', game.keyUpEventHandler.bind(game), false);
document.addEventListener('click', game.mouseClickEventHandler.bind(game), false);

/* End Event Listeners */

/* Connect with server*/
var wsUrl = 'ws://185.69.152.203:4871';
var ws = new WebSocket(wsUrl);

/* Start initialize callback function*/
ws.onopen = function() { console.log('connected!') }
ws.onclose = function(event) { console.log('closed'+event.code) }
ws.onmessage = function(event) {
	var data = JSON.parse(event.data);
	if (data.keyDownEvent) {
		game.keyDownEventHandler(data);
	} else {
		game.keyUpEventHandler(data);
	}
	console.log(data);
}

/* End initialize callback function*/

game.start();

/* End Main Function */