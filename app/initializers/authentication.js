import Cookies from 'appkit/utils/cookies';

var AuthenticationInitializer = {
  name: "authentication",

  initialize: function(container, application) {
    var location = window.location;
    var url = window.purl(location.href);
    var isLogout = url.param('logout');
    
    if (isLogout === 'true') {
      Cookies.removeItem('api_key');
      Cookies.removeItem('user_name');
      Ember.Logger.debug('App.initializer authentication logged out');

    } else {
      var apiKey = url.param('api_key');
      var userName = url.param('user_name');

      if (Ember.isEmpty(apiKey)) {
        apiKey = Cookies.getItem('api_key');
        userName = Cookies.getItem('user_name');
      }

      if (!Ember.isEmpty(apiKey)) {
        var auth = Ember.Object.createWithMixins({
          apiKey: apiKey,
          userName: userName,
          logoutUrl: function() {
            return window.ENV.api_base_url + '/auth/logout?api_key=' +
              encodeURIComponent(this.get('apiKey'));
          }.property('apiKey')
        });
        Cookies.setItem('api_key', apiKey);
        Cookies.setItem('user_name', userName);
        application.register('auth:main', auth, { instantiate: false });
        application.inject('controller', 'auth', 'auth:main');
        application.inject('component', 'auth', 'auth:main');
        Ember.Logger.debug('App.initializer authentication succeeded: '+auth.get('userName'));
      }
    }

    // Clean the auth info querystring from the document's URL.
    var cleanPath = url.attr('path') + '#' + url.attr('fragment');
    window.history.replaceState("authenticationInitialized", "", cleanPath);
  }
};

export default AuthenticationInitializer;
