function TelphoneControl() {
    /* Connect with server */
    
    var wsUrl = 'ws://185.69.152.203:4871';
    var ws = new WebSocket(wsUrl);
    ws.onopen = function() { alert('connected!') };
    ws.onclose = function(event) { alert('closed'+event.code) };
    
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
            'keyDownEvent': true,
            'keyCode': keyCode
        }
        ws.send(JSON.stringify(sendObject));
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
            'keyDownEvent': false,
            'keyCode': keyCode
        }
        ws.send(JSON.stringify(sendObject));
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

TelphoneControl();