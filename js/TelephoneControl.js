function TelephoneControl() {
    var pinCode;
    var gamerID = (function () {
        function s4 () {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    })();
    /* Connect with server */
    
    var wssUrl = 'wss://powerful-anchorage-61180.herokuapp.com';
    var wss = new WebSocket(wssUrl);
    wss.onopen = function() { 
        alert('connected!');
        pinCode = prompt('Please enter pin code for current game');
        var sendObject = {
            'firstConnect': true,
            'pinCode': pinCode,
            'gamerID': gamerID
        };
        wss.send(JSON.stringify(sendObject)); 
    };
    wss.onclose = function(event) { alert('closed'+event.code) };
    
    /* Initialization necessary functions */
    
    function pressDownButton() {
        this.className += ' action-button';
        var keyCode;
        switch (this.id) {
            case 'left': {
                keyCode = 37;
                break;
            }
            case 'right': {
                keyCode = 39;
                break;
            }
            case 'jump': {
                keyCode = 32;
                break;
            }
            case 'pause': {
                keyCode = 27;
                break;
            }
        }
        var sendObject = {
            'pinCode': pinCode,
            'firstConnect': false,
            'gamerID': gamerID,
            'keyDownEvent': true,
            'keyCode': keyCode
        }
        wss.send(JSON.stringify(sendObject));
    }
    
    function pressUpButton() {
        this.className = this.className.replace(' action-button', '');
        var keyCode;
        switch (this.id) {
            case 'left': {
                keyCode = 37;
                break;
            }
            case 'right': {
                keyCode = 39;
                break;
            }
            case 'jump': {
                keyCode = 32;
                break;
            }
            case 'pause': {
                keyCode = 27;
                break;
            }
            
        }
        var sendObject = {
            'pinCode': pinCode,
            'firstConnect': false,
            'gamerID': gamerID,
            'keyUpEvent': true,
            'keyCode': keyCode
        }
        wss.send(JSON.stringify(sendObject));
    }
    
    function DeviceOrient (event) {
        if (event.beta < -6 && !isGo) {
            leftDownButton();
            isGo = true;
        } else if (event.beta > 6 && !isGo) {
            rightDownButton();
            isGo = true;
        } else if (event.beta > -6 && event.beta < 6 && isGo) {
            rightUpButton();
            leftUpButton();
            isGo = false;
        }
    }
    
    /* End  initialization */
    
    /* Initialization control button */
    
    
    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var jump = document.getElementById('jump');
    var pause = document.getElementById('pause');
    var checkbox = document.getElementById('checkbox');
    var container = document.getElementById('container');
    
    /*End initialization */
    
    
    /* Initialization necessary functions */
    
    var leftDownButton = pressDownButton.bind(left);
    var leftUpButton = pressUpButton.bind(left);
    
    var rightDownButton = pressDownButton.bind(right);
    var rightUpButton = pressUpButton.bind(right);
    
    var  isGo = false;
    
    /* End initialization */
    
    
    /* Add events to buttons */
    
    left.addEventListener('touchstart', leftDownButton);
    left.addEventListener('touchend', leftUpButton);
   
    right.addEventListener('touchstart', rightDownButton)
    right.addEventListener('touchend', rightUpButton)
    
    jump.addEventListener('touchstart', pressDownButton.bind(jump))
    jump.addEventListener('touchend', pressUpButton.bind(jump))
    
    pause.addEventListener('touchstart', pressDownButton.bind(pause))
    pause.addEventListener('touchend', pressUpButton.bind(pause))
    
    container.addEventListener('touchend', function() {
        if (checkbox.checked) {
            rightUpButton();
            leftUpButton();
            right.addEventListener('touchstart', pressDownButton.bind(right));
            right.addEventListener('touchend', pressUpButton.bind(right));
            left.addEventListener('touchstart', leftDownButton);
            left.addEventListener('touchend', leftUpButton);
            window.removeEventListener('deviceorientation', DeviceOrient);
        } else {
            isGo = false;
            left.removeEventListener('touchstart', leftDownButton);
            left.removeEventListener('touchend', leftUpButton);
            right.removeEventListener('touchstart', rightDownButton);
            right.removeEventListener('touchend', rightUpButton);
            window.addEventListener('deviceorientation', DeviceOrient);
        }
    });
    
    /* End add event */
}

TelephoneControl();