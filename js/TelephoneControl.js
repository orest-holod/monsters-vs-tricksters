function TelphoneControl() {
    var wsUrl = 'ws://185.69.152.203:4871';
    var ws = new WebSocket(wsUrl);
    ws.onopen = function() { alert('connected!') };
    ws.onclose = function(event) { alert('closed'+event.code) };
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
    
    
    var left = document.getElementById('left');
    
    left.addEventListener('touchstart', pressDownButton.bind(left));
    
    left.addEventListener('touchend', pressUpButton.bind(left))
    
    var right = document.getElementById('right');
    
    right.addEventListener('touchstart', pressDownButton.bind(right))
    
    right.addEventListener('touchend', pressUpButton.bind(right))
    
    var jump = document.getElementById('jump');
    
    jump.addEventListener('touchstart', pressDownButton.bind(jump))
    
    jump.addEventListener('touchend', pressUpButton.bind(jump))
    
    var pause = document.getElementById('pause');
    
    pause.addEventListener('touchstart', pressDownButton.bind(pause))
    
    pause.addEventListener('touchend', pressUpButton.bind(pause))
    
    
    
    /*var checkbox = document.getElementById('checkbox');
    var container = document.getElementById('container');
    container.addEventListener('touchend', function() {
    
    })*/
    
    /*window.addEventListener('deviceorientation', function(event) {
      alert(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
    });*/
    
}

TelphoneControl();