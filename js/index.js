/* Start Main Function */

var gameWrapper = document.getElementById('game-wrapper');

var game = new Game(gameWrapper);

/* Start Event Listeners */

document.addEventListener('keydown', game.keyDownEventHandler.bind(game), false);
document.addEventListener('keyup', game.keyUpEventHandler.bind(game), false);
document.addEventListener('click', game.mouseClickEventHandler.bind(game), false);
window.addEventListener('resize', debounce(game.resizeEventHandler.bind(game), 10), false);
window.addEventListener('touchstart', game.touchStartEventHandler.bind(game), false);
window.addEventListener('touchend', game.touchEndEventHandler.bind(game), false);

function menuEventHandler(hide) {
    var GameButton = $('#play-game-menu-item');
    var game = $('#game-field-menu');
    var facebook = $('#facebook-menu-item');
    var googleplus = $('#google-menu-item');
    var startGame = $('#start-new-game');
    var createAcccount = $('#create-account');
    var header = $('#menu-header');
    var inputNickname = $('#input-text');
    var resumeGame = $('#resume-game-menu-item');
    var saveGame = $('#save-game-menu-item');
    var newGame = $('#play-game-menu-item');
    var stopGame = $('#stop-game-menu-item');

    inputNickname.addClass('disabled').attr('placeholder', 'enter your nickname');
    startGame.addClass('disabled');

    if (hide) {
        $('#gamer').addClass('disabled');
        GameButton.on('click', function () {
            game.find('.game-field-menu-item').addClass('disabled');
            facebook.removeClass('disabled').addClass('visible').addClass('facebookCreateUser');
            googleplus.removeClass('disabled').addClass('visible').addClass('googleCreateUser');
            startGame.removeClass('disabled').addClass('visible');
            createAcccount.removeClass('disabled').addClass('visible');
            inputNickname.removeClass('disabled').addClass('visible');

        });
    } else {
        resumeGame.removeClass('disabled').addClass('visible');
        saveGame.removeClass('disabled').addClass('visible');
        newGame.removeClass('disabled').addClass('visible');
        stopGame.addClass('disabled');

        facebook.removeClass('visible').addClass('disabled');
        googleplus.removeClass('visible').addClass('disabled');
        startGame.removeClass('visible').addClass('disabled');
        inputNickname.removeClass('visible').addClass('disabled');

    }

}


/* End Event Listeners */

menuEventHandler(true);
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