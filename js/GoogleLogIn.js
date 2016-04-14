function GoogleLogIn() {
  gapi.load('auth2', function(){
    auth2 = gapi.auth2.init({
      client_id: '663037420647-qoa491drdnci24io42dok540h3pv81er.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
    });
    auth2.signIn().then(function() {
      console.log(auth2.currentUser.get().getBasicProfile().getName());
    });
  });
}