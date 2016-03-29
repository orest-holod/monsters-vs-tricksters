function FacebookShare(score) {
  function statusChangeCallback(response) {
    if (response.status === 'connected') {
      sharePost(score)
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      FB.login(function(response) {
        sharePost(score);
      });
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      FB.login(function(response) {
        sharePost(score);
      });
    }
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '451460438391465',
      cookie     : true,  
      xfbml      : true,  
      version    : 'v2.5' 
    });
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };
    

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function sharePost(score) {
    FB.ui({
      method: 'feed',
      link: 'http://orest-o-holod.github.io/monsters-vs-tricksters/',
      picture: 'https://pp.vk.me/c629405/v629405403/3f301/iP02mTEe4lk.jpg',
      name: 'Monsters-VS-Tricksters',
      description: 'I scored: ' + score + ' points in a game monsters-vs-tricksters. Betcha can\'t score more point!',
      caption: 'Monsters-VS-Tricksters - pure Javascript DOM based game',
      }, function(response) {
          if (response && !response.error_message) {
            alert('Posting completed.');
          } else {
            alert('Error while posting.');
          }
        });
  } 
}