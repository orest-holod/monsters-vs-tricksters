function FacebookLogIn() {
  function statusChangeCallback(response) {
    if (response.status === 'connected') {
      FB.api('/me', function(response){
        console.log(response.name);
      });
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      FB.login(function(response) {
        FB.api('/me', function(response){
          console.log(response.name);
        });
      });
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      FB.login(function(response) {
        FB.api('/me', function(response){
          console.log(response.name);
        });
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
}



function FacebookShare(text) {
  try {
    FB.ui({
      method: 'feed',
      link: 'http://orest-o-holod.github.io/monsters-vs-tricksters/',
      caption: 'An example caption' + text,
      }, function(response) {
          if (response && !response.error_message) {
            alert('Posting completed.');
          } else {
            alert('Error while posting.');
          }
        });
  } catch (e) {}
}