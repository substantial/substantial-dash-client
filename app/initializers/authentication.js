import Cookies from 'appkit/utils/cookies';

var AuthenticationInitializer = {
  name: "authentication",

  initialize: function(container, application) {
    var location = window.location;
    var url = window.purl(location.href);
    var apiKey = url.param('api_key');
    var userName = url.param('user_name');

    if (Ember.isEmpty(apiKey)) {
      apiKey = Cookies.getItem('api_key');
      userName = Cookies.getItem('user_name');
    }

    if (!Ember.isEmpty(apiKey)) {
      var auth = Ember.Object.create({
        apiKey: apiKey,
        userName: userName
      });
      Cookies.setItem('api_key', apiKey);
      Cookies.setItem('user_name', userName);
      application.register('auth:main', auth, { instantiate: false });
      application.inject('controller', 'auth', 'auth:main');
      // Clean the auth info querystring from the document's URL.
      var authenticatedPath = url.attr('path') + '#' + url.attr('fragment');
      window.history.replaceState("authenticated", "", authenticatedPath);

      Ember.Logger.debug('App.initializer authenticated: '+auth.get('name'));
    }
  }
};

export default AuthenticationInitializer;
