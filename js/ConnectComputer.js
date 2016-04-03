function ConnectComputer() {
	/* Connect with server*/
	var wssUrl = 'wss://powerful-anchorage-61180.herokuapp.com';
	var wss = new WebSocket(wssUrl);
	var pinCodeForGuest;
	var pinCodeForRemoteControl;

	/* Start initialize callback function*/
	wss.onopen = function() { 
		console.log('connected!');
		pinCodeForRemoteControl = prompt('Please enter pin code for your game (for remote contol)');
		pinCodeForGuest = prompt('Please enter pin code for your game (for guest)'); 
	}
	wss.onclose = function(event) { console.log('closed'+event.code) }
	/*wss.onmessage = function(event) {
		try {
			var data = JSON.parse(event.data);
			if (pinCodeForGuest == data.pinCode) {
				if (data.newGuest) {
					var gamer = new Gamer(game._gameField);
					gamer.setID(data.gamerID);
					game.addGamer(gamer);
				} else {
					if (data.keyDownEvent) {
						game.keyDownEventHandler(data);
					} else {
						game.keyUpEventHandler(data);
					}
				}
			} else if (pinCodeForRemoteControl == data.pinCode) {
				data.gamerID = 1;
				if (data.keyDownEvent) {
					game.keyDownEventHandler(data);
				} else {
					game.keyUpEventHandler(data);
				}
			}
		    console.log(data);
		} catch (e) {}
	};*/

	wss.onmessage = function(event) {
		try {
			var data = JSON.parse(event.data);
			if (pinCodeForRemoteControl == data.pinCode) {
				if (data.keyDownEvent) {
					game.keyDownEventHandler(data);
				} else {
					game.keyUpEventHandler(data);
				}
			}
		    console.log(data);
		} catch (e) {}
	};

	/* End initialize callback function*/
}