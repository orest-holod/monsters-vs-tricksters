function ConnectComputer() {
	/* Connect with server*/
	var wsUrl = 'ws://185.69.152.203:4871';
	var ws = new WebSocket(wsUrl);

	/* Start initialize callback function*/
	ws.onopen = function() { console.log('connected!') }
	ws.onclose = function(event) { console.log('closed'+event.code) }
	ws.onmessage = function(event) {
		try {
			var data = JSON.parse(event.data);
			if (data.keyDownEvent) {
				game.keyDownEventHandler(data);
			} else {
				game.keyUpEventHandler(data);
			}
			console.log(data);
		} catch (e) {}
	}

	/* End initialize callback function*/
}