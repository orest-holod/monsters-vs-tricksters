function ConnectComputer() {
	/* Connect with server*/
	var wssUrl = 'wss://powerful-anchorage-61180.herokuapp.com';
	var wss = new WebSocket(wssUrl);
	var pinCodeForRemoteControl;

	/* Start initialize callback function*/
	wss.onopen = function() { 
		console.log('connected!');
		pinCodeForRemoteControl = prompt('Please enter pin code for your game (for remote contol)');
	}
	wss.onclose = function(event) { console.log('closed'+event.code) }
	wss.onmessage = function(event) {
		try {
			var data = JSON.parse(event.data);
			if (pinCodeForRemoteControl == data.pinCode) {
				if (data.firstConnect && !game.getGamer().getID()) {
					game.getGamer().setID(data.gamerID);
					game._gameField.getGameFieldBackground().getGameFieldBackgroundRemoteLayer().setTextContent("Remote control ON<br/>PIN to access: " + pinCodeForRemoteControl);
				} else if (game.getGamer().getID() == data.gamerID) {
					if (data.keyDownEvent) {
						game.keyDownEventHandler(data);
					} else if (data.keyUpEvent) {
						game.keyUpEventHandler(data);
					} else if (data.target.id == 'play-game-menu-item') {
						game.reset(); 
						var sendObject = {
							'gamerID': data.gamerID,
							'pinCode': data.pinCode,
							'newGame': true
						};
						wss.send(JSON.stringify(sendObject));
					}
				}
			}
			console.log(data);
		} catch (e) {}
	};

    /* End initialize callback function*/
}